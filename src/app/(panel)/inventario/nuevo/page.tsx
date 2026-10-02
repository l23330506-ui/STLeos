import Link from "next/link";
import FormularioProductoNuevo from "@/components/FormularioProductoNuevo";

export default function NuevoProductoPage() {
  return (
    <main>
      <h1>Registrar producto nuevo</h1>
      <p className="subtitulo">
        El sistema genera el código de barras al guardar. Los campos con * son obligatorios.{" "}
        <Link href="/inventario">Volver al inventario</Link>
      </p>
      <FormularioProductoNuevo />
    </main>
  );
}
