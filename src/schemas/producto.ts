import { z } from "zod";

const textoObligatorio = (etiqueta: string, obligatorio: string, max: number) =>
  z
    .string({ error: `${etiqueta} ${obligatorio}.` })
    .trim()
    .min(1, `${etiqueta} ${obligatorio}.`)
    .max(max, `${etiqueta} admite máximo ${max} caracteres.`);

const textoOpcional = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Admite máximo ${max} caracteres.`)
    .optional()
    .nullable()
    .transform((v) => (v ? v : null));

/** Frontera del servicio: DTO de entrada de POST /api/productos. */
export const ProductoNuevoSchema = z.object({
  nombre: textoObligatorio("El nombre", "es obligatorio", 120),
  categoria: textoObligatorio("La categoría", "es obligatoria", 60),
  talla: textoOpcional(20),
  color: textoOpcional(40),
  precio: z
    .number({ error: "El precio es obligatorio y debe ser un número." })
    .gt(0, "El precio debe ser mayor a 0.")
    .max(99999999.99, "El precio es demasiado alto.")
    .refine(
      (n) => Math.abs(n * 100 - Math.round(n * 100)) < 1e-6,
      "El precio admite máximo 2 decimales.",
    ),
  existencia: z
    .number({ error: "La existencia debe ser un número." })
    .int("La existencia debe ser un entero.")
    .min(0, "La existencia no puede ser negativa.")
    .default(0),
  stockMinimo: z
    .number({ error: "El stock mínimo debe ser un número." })
    .int("El stock mínimo debe ser un entero.")
    .min(0, "El stock mínimo no puede ser negativo.")
    .default(0),
});

export type ProductoNuevoDTO = z.infer<typeof ProductoNuevoSchema>;

/** DTO de salida (201). */
export interface ProductoDTO {
  codigo: string;
  nombre: string;
  categoria: string;
  talla: string | null;
  color: string | null;
  precio: number;
  existencia: number;
  stockMinimo: number;
  activo: boolean;
}
