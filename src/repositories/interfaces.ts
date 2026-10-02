import type { Producto } from "../domain/Producto";
import type { Rol } from "../auth/permisos";

export interface VarianteProducto {
  nombre: string;
  categoria: string;
  talla: string | null;
  color: string | null;
}

export interface ProductoExistente {
  codigo: string;
  nombre: string;
  existencia: number;
}

export interface RepositorioProductos {
  /** Busca un producto con el mismo nombre, categoría, talla y color (sin distinguir mayúsculas). */
  buscarVariante(variante: VarianteProducto): Promise<ProductoExistente | null>;
  /** Guarda el producto. Lanza `CodigoDuplicado` o `VarianteDuplicada` si viola una restricción UNIQUE. */
  crear(producto: Producto): Promise<void>;
}

export interface EventoBitacora {
  usuarioId: number;
  accion: string;
  detalle: string;
}

/** La bitácora es solo de escritura: sus eventos no se modifican ni se eliminan. */
export interface RepositorioBitacora {
  registrar(evento: EventoBitacora): Promise<void>;
}

export interface UsuarioActual {
  id: number;
  nombre: string;
  rol: Rol;
}

export interface RepositorioUsuarios {
  buscarActivoPorUsuario(usuario: string): Promise<UsuarioActual | null>;
}

export interface Repositorios {
  productos: RepositorioProductos;
  bitacora: RepositorioBitacora;
}

/** Ejecuta varias operaciones en una sola transacción: si algo falla, no se guarda nada. */
export interface UnidadDeTrabajo {
  ejecutar<T>(trabajo: (repositorios: Repositorios) => Promise<T>): Promise<T>;
}
