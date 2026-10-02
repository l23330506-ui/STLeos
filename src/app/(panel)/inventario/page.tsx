import Link from "next/link";

export default function InventarioPage() {
  return (
    <main>
      <h1>Inventario</h1>
      <p className="subtitulo">Gestión de productos y existencias.</p>
      <Link className="boton" href="/inventario/nuevo">
        Registrar producto nuevo
      </Link>
    </main>
  );
}
