import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/** Hash de contraseña con scrypt (sal aleatoria). Formato: `sal:hash` en hexadecimal. */
export function hashPassword(contrasena: string): string {
  const sal = randomBytes(16);
  const hash = scryptSync(contrasena, sal, 64);
  return `${sal.toString("hex")}:${hash.toString("hex")}`;
}

export function verificarPassword(contrasena: string, almacenado: string): boolean {
  const [salHex, hashHex] = almacenado.split(":");
  if (!salHex || !hashHex) return false;
  const esperado = Buffer.from(hashHex, "hex");
  const calculado = scryptSync(contrasena, Buffer.from(salHex, "hex"), esperado.length);
  return timingSafeEqual(esperado, calculado);
}
