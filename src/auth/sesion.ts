import type { RepositorioUsuarios, UsuarioActual } from "../repositories/interfaces";

/** Cabecera TEMPORAL con el nombre de usuario. Se reemplazará por sesión con login (Sprint 2). */
export const CABECERA_USUARIO = "x-usuario";

export async function identificarUsuario(
  request: Request,
  usuarios: RepositorioUsuarios,
): Promise<UsuarioActual | null> {
  const nombre = request.headers.get(CABECERA_USUARIO)?.trim();
  if (!nombre) return null;
  return usuarios.buscarActivoPorUsuario(nombre);
}
