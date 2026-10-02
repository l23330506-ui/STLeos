/**
 * Código de barras EAN-13 de los productos.
 * Prefijo 750 = GS1 México. Estructura: 750 + 9 dígitos de producto + 1 dígito verificador.
 */
export const PREFIJO_EAN13 = "750";

/** Calcula el dígito verificador de los primeros 12 dígitos de un EAN-13. */
export function digitoVerificadorEan13(primeros12: string): number {
  if (!/^\d{12}$/.test(primeros12)) {
    throw new Error("Se requieren exactamente 12 dígitos.");
  }
  const suma = [...primeros12].reduce(
    (acc, d, i) => acc + Number(d) * (i % 2 === 0 ? 1 : 3),
    0,
  );
  return (10 - (suma % 10)) % 10;
}

export function esEan13Valido(codigo: string): boolean {
  return (
    /^\d{13}$/.test(codigo) &&
    digitoVerificadorEan13(codigo.slice(0, 12)) === Number(codigo[12])
  );
}

/** Genera un EAN-13 con 9 dígitos de producto aleatorios. La unicidad la garantiza la BD (UNIQUE). */
export function generarCodigoEan13(aleatorio: () => number = Math.random): string {
  let cuerpo = "";
  for (let i = 0; i < 9; i++) {
    cuerpo += Math.floor(aleatorio() * 10);
  }
  const base = PREFIJO_EAN13 + cuerpo;
  return base + digitoVerificadorEan13(base);
}
