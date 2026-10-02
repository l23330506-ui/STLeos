import { exigirRol } from "../auth/permisos";
import { generarCodigoEan13 } from "../domain/codigoBarras";
import { CodigoDuplicado, ProductoYaExiste, VarianteDuplicada } from "../domain/errores";
import { Producto, type DatosProductoNuevo } from "../domain/Producto";
import type { UnidadDeTrabajo, UsuarioActual } from "../repositories/interfaces";

const MAX_INTENTOS_CODIGO = 5;

/**
 * Caso de uso: Registrar productos nuevos (actor: Gerente).
 *
 * Precondiciones: usuario con rol Gerente; datos de un producto que aún no existe.
 * Poscondiciones: el producto queda guardado con código EAN-13 único, activo y disponible
 * en el inventario, y el evento queda en la bitácora (todo en una sola transacción).
 * Flujos alternativos: datos inválidos → `DatosInvalidos`; producto existente → `ProductoYaExiste`
 * (sugiere actualizar el stock).
 */
export class RegistrarProductoNuevo {
  constructor(
    private readonly unidadDeTrabajo: UnidadDeTrabajo,
    private readonly generarCodigo: () => string = generarCodigoEan13,
  ) {}

  async ejecutar(usuario: UsuarioActual | null, datos: DatosProductoNuevo): Promise<Producto> {
    exigirRol(usuario, "GERENTE");
    const gerente = usuario as UsuarioActual;

    for (let intento = 1; intento <= MAX_INTENTOS_CODIGO; intento++) {
      // Valida los datos antes de tocar la base de datos.
      const producto = Producto.crear(datos, this.generarCodigo());
      try {
        return await this.unidadDeTrabajo.ejecutar(async ({ productos, bitacora }) => {
          const existente = await productos.buscarVariante(producto);
          if (existente) throw new ProductoYaExiste(existente);

          await productos.crear(producto);
          await bitacora.registrar({
            usuarioId: gerente.id,
            accion: "REGISTRAR_PRODUCTO",
            detalle: `Producto nuevo ${producto.codigo}: ${producto.nombre} (${producto.categoria})`,
          });
          return producto;
        });
      } catch (error) {
        if (error instanceof CodigoDuplicado && intento < MAX_INTENTOS_CODIGO) continue;
        if (error instanceof VarianteDuplicada) {
          // Otra petición registró el mismo producto justo antes: se informa como "ya existe".
          const existente = await this.unidadDeTrabajo.ejecutar(({ productos }) =>
            productos.buscarVariante(producto),
          );
          if (existente) throw new ProductoYaExiste(existente);
        }
        throw error;
      }
    }
    throw new CodigoDuplicado("No se pudo generar un código de barras único.");
  }
}
