import { productosController } from "@/lib/composicion";

export const runtime = "nodejs";

/** POST /api/productos: Registrar producto nuevo (solo Gerente). */
export async function POST(request: Request): Promise<Response> {
  return productosController.registrar(request);
}
