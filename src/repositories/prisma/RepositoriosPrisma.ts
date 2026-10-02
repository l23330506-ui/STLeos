import type { Prisma, PrismaClient } from "../../generated/prisma/client";
import { CodigoDuplicado, VarianteDuplicada } from "../../domain/errores";
import type { Producto } from "../../domain/Producto";
import type {
  EventoBitacora,
  ProductoExistente,
  RepositorioBitacora,
  RepositorioProductos,
  RepositorioUsuarios,
  UnidadDeTrabajo,
  UsuarioActual,
  VarianteProducto,
  Repositorios,
} from "../interfaces";

type Db = PrismaClient | Prisma.TransactionClient;

function esViolacionUnique(error: unknown): error is { code: string; message: string; meta?: unknown } {
  return typeof error === "object" && error !== null && (error as { code?: unknown }).code === "P2002";
}

export class RepositorioProductosPrisma implements RepositorioProductos {
  constructor(private readonly db: Db) {}

  async buscarVariante(v: VarianteProducto): Promise<ProductoExistente | null> {
    // Misma expresión que el índice único productos_variante_unica.
    const filas = await this.db.$queryRaw<ProductoExistente[]>`
      SELECT codigo, nombre, existencia
      FROM productos
      WHERE lower(nombre) = lower(${v.nombre})
        AND lower(categoria) = lower(${v.categoria})
        AND coalesce(lower(talla), '') = lower(${v.talla ?? ""})
        AND coalesce(lower(color), '') = lower(${v.color ?? ""})
      LIMIT 1`;
    return filas[0] ?? null;
  }

  async crear(producto: Producto): Promise<void> {
    try {
      await this.db.producto.create({
        data: {
          codigo: producto.codigo,
          nombre: producto.nombre,
          categoria: producto.categoria,
          talla: producto.talla,
          color: producto.color,
          precio: producto.precio,
          existencia: producto.existencia,
          stockMinimo: producto.stockMinimo,
          activo: producto.activo,
        },
      });
    } catch (error) {
      if (esViolacionUnique(error)) {
        const detalle = `${error.message} ${JSON.stringify(error.meta ?? {})}`;
        throw detalle.includes("variante_unica") ? new VarianteDuplicada(detalle) : new CodigoDuplicado(detalle);
      }
      throw error;
    }
  }
}

export class RepositorioBitacoraPrisma implements RepositorioBitacora {
  constructor(private readonly db: Db) {}

  async registrar(evento: EventoBitacora): Promise<void> {
    await this.db.bitacora.create({ data: evento });
  }
}

export class RepositorioUsuariosPrisma implements RepositorioUsuarios {
  constructor(private readonly db: Db) {}

  async buscarActivoPorUsuario(usuario: string): Promise<UsuarioActual | null> {
    const fila = await this.db.usuario.findFirst({
      where: { usuario, activo: true },
      select: { id: true, nombre: true, rol: true },
    });
    return fila;
  }
}

export class UnidadDeTrabajoPrisma implements UnidadDeTrabajo {
  constructor(private readonly prisma: PrismaClient) {}

  ejecutar<T>(trabajo: (repositorios: Repositorios) => Promise<T>): Promise<T> {
    return this.prisma.$transaction((tx) =>
      trabajo({
        productos: new RepositorioProductosPrisma(tx),
        bitacora: new RepositorioBitacoraPrisma(tx),
      }),
    );
  }
}
