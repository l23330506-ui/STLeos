-- Un producto "ya existe" cuando coinciden nombre, categoría, talla y color
-- (sin distinguir mayúsculas). Es la tercera capa de validación del caso de uso
-- "Registrar productos nuevos": evita duplicados incluso con peticiones simultáneas.
CREATE UNIQUE INDEX "productos_variante_unica"
ON "productos" (lower("nombre"), lower("categoria"), coalesce(lower("talla"), ''), coalesce(lower("color"), ''));
