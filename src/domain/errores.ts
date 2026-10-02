/** Errores del negocio. Los controladores los traducen a respuestas HTTP. */
export class ErrorDeDominio extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = new.target.name;
  }
}

/** Datos del producto que no cumplen las precondiciones. */
export class DatosInvalidos extends ErrorDeDominio {
  constructor(
    mensaje: string,
    readonly campos: Record<string, string[]> = {},
  ) {
    super(mensaje);
  }
}

/** Restricción UNIQUE del código de barras (colisión poco probable: se genera otro y se reintenta). */
export class CodigoDuplicado extends ErrorDeDominio {}

/** Restricción UNIQUE de la variante (nombre, categoría, talla, color) violada por una petición simultánea. */
export class VarianteDuplicada extends ErrorDeDominio {}

/** No hay un usuario válido en la petición. */
export class NoAutenticado extends ErrorDeDominio {}

/** El usuario no tiene el rol necesario para la operación. */
export class PermisoDenegado extends ErrorDeDominio {}

/** El producto ya está registrado: se sugiere actualizar su stock. */
export class ProductoYaExiste extends ErrorDeDominio {
  constructor(
    readonly existente: { codigo: string; nombre: string; existencia: number },
  ) {
    super(
      `El producto ya existe (código ${existente.codigo}). Actualiza su stock en lugar de registrarlo de nuevo.`,
    );
  }
}
