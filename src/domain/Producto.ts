import { DatosInvalidos } from "./errores";

export interface DatosProductoNuevo {
  nombre: string;
  categoria: string;
  talla?: string | null;
  color?: string | null;
  precio: number;
  existencia: number;
  stockMinimo: number;
}

/**
 * Producto del inventario.
 *
 * Invariantes: nombre y categoría no vacíos; precio > 0 con máximo 2 decimales;
 * existencia y stock mínimo enteros >= 0.
 * Precondición de `crear`: los datos corresponden a un producto que aún no existe.
 * Poscondición de `crear`: devuelve un producto con código asignado, activo y listo para guardarse.
 */
export class Producto {
  private constructor(
    readonly codigo: string,
    readonly nombre: string,
    readonly categoria: string,
    readonly talla: string | null,
    readonly color: string | null,
    readonly precio: number,
    readonly existencia: number,
    readonly stockMinimo: number,
    readonly activo: boolean,
  ) {}

  static crear(datos: DatosProductoNuevo, codigo: string): Producto {
    const errores: Record<string, string[]> = {};
    const nombre = datos.nombre?.trim() ?? "";
    const categoria = datos.categoria?.trim() ?? "";

    if (!nombre) errores.nombre = ["El nombre es obligatorio."];
    if (!categoria) errores.categoria = ["La categoría es obligatoria."];
    if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
      errores.precio = ["El precio debe ser mayor a 0."];
    } else if (Math.abs(datos.precio * 100 - Math.round(datos.precio * 100)) > 1e-6) {
      errores.precio = ["El precio admite máximo 2 decimales."];
    }
    if (!Number.isInteger(datos.existencia) || datos.existencia < 0) {
      errores.existencia = ["La existencia debe ser un entero mayor o igual a 0."];
    }
    if (!Number.isInteger(datos.stockMinimo) || datos.stockMinimo < 0) {
      errores.stockMinimo = ["El stock mínimo debe ser un entero mayor o igual a 0."];
    }
    if (Object.keys(errores).length > 0) {
      throw new DatosInvalidos("Datos del producto inválidos.", errores);
    }

    return new Producto(
      codigo,
      nombre,
      categoria,
      datos.talla?.trim() || null,
      datos.color?.trim() || null,
      datos.precio,
      datos.existencia,
      datos.stockMinimo,
      true,
    );
  }
}
