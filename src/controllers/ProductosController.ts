import { z } from "zod";
import { exigirRol } from "../auth/permisos";
import { identificarUsuario } from "../auth/sesion";
import {
  DatosInvalidos,
  NoAutenticado,
  PermisoDenegado,
  ProductoYaExiste,
} from "../domain/errores";
import type { Producto } from "../domain/Producto";
import type { RepositorioUsuarios } from "../repositories/interfaces";
import { ProductoNuevoSchema, type ProductoDTO } from "../schemas/producto";
import type { RegistrarProductoNuevo } from "../services/RegistrarProductoNuevo";

function aDTO(p: Producto): ProductoDTO {
  return {
    codigo: p.codigo,
    nombre: p.nombre,
    categoria: p.categoria,
    talla: p.talla,
    color: p.color,
    precio: p.precio,
    existencia: p.existencia,
    stockMinimo: p.stockMinimo,
    activo: p.activo,
  };
}

function json(cuerpo: unknown, status: number): Response {
  return Response.json(cuerpo, { status });
}

/** Controlador (MVC) de POST /api/productos: 201, 400, 401, 403, 409. */
export class ProductosController {
  constructor(
    private readonly registrarProductoNuevo: RegistrarProductoNuevo,
    private readonly usuarios: RepositorioUsuarios,
  ) {}

  async registrar(request: Request): Promise<Response> {
    try {
      const usuario = await identificarUsuario(request, this.usuarios);
      exigirRol(usuario, "GERENTE"); // 401/403 antes de revisar los datos

      let cuerpo: unknown;
      try {
        cuerpo = await request.json();
      } catch {
        return json({ error: "El cuerpo de la petición no es un JSON válido." }, 400);
      }

      const resultado = ProductoNuevoSchema.safeParse(cuerpo);
      if (!resultado.success) {
        return json(
          {
            error: "Faltan datos obligatorios o hay datos inválidos. Complétalos para continuar.",
            errores: z.flattenError(resultado.error).fieldErrors,
          },
          400,
        );
      }

      const producto = await this.registrarProductoNuevo.ejecutar(usuario, resultado.data);
      return json(aDTO(producto), 201);
    } catch (error) {
      if (error instanceof NoAutenticado) return json({ error: error.message }, 401);
      if (error instanceof PermisoDenegado) return json({ error: error.message }, 403);
      if (error instanceof DatosInvalidos) {
        return json({ error: error.message, errores: error.campos }, 400);
      }
      if (error instanceof ProductoYaExiste) {
        return json(
          { error: error.message, sugerencia: "actualizar_stock", existente: error.existente },
          409,
        );
      }
      console.error("Error al registrar producto:", error);
      return json({ error: "Error interno del servidor." }, 500);
    }
  }
}
