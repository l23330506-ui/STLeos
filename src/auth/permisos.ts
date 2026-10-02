import { NoAutenticado, PermisoDenegado } from "../domain/errores";

export type Rol = "CAJERO" | "ENCARGADO" | "GERENTE";

/** Jerarquía: Cajero ⊂ Encargado ⊂ Gerente (cada rol hereda los permisos del anterior). */
const NIVEL: Record<Rol, number> = { CAJERO: 1, ENCARGADO: 2, GERENTE: 3 };

export function tieneRol(rol: Rol, minimo: Rol): boolean {
  return NIVEL[rol] >= NIVEL[minimo];
}

/** Lanza `NoAutenticado` o `PermisoDenegado` si el usuario no cumple el rol mínimo. */
export function exigirRol(usuario: { rol: Rol } | null | undefined, minimo: Rol): void {
  if (!usuario) throw new NoAutenticado("Se requiere iniciar sesión.");
  if (!tieneRol(usuario.rol, minimo)) {
    throw new PermisoDenegado(`Esta acción requiere el rol ${minimo}.`);
  }
}
