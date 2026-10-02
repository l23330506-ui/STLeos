"use client";

import { useState, type FormEvent } from "react";

interface Respuesta {
  error?: string;
  errores?: Record<string, string[]>;
  sugerencia?: string;
  existente?: { codigo: string; nombre: string; existencia: number };
  codigo?: string;
  nombre?: string;
}

const CAMPOS_VACIOS = {
  nombre: "",
  categoria: "",
  talla: "",
  color: "",
  precio: "",
  existencia: "0",
  stockMinimo: "0",
};

export default function FormularioProductoNuevo() {
  const [campos, setCampos] = useState(CAMPOS_VACIOS);
  // TEMPORAL: se reemplazará por el usuario de la sesión cuando exista el login.
  const [usuario, setUsuario] = useState("gerente");
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string[]>>({});
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error" | "aviso"; texto: string } | null>(
    null,
  );

  function cambiar(nombre: keyof typeof CAMPOS_VACIOS, valor: string) {
    setCampos((anterior) => ({ ...anterior, [nombre]: valor }));
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);
    setErrores({});
    setMensaje(null);

    const cuerpo = {
      nombre: campos.nombre,
      categoria: campos.categoria,
      talla: campos.talla || null,
      color: campos.color || null,
      precio: campos.precio === "" ? undefined : Number(campos.precio),
      existencia: campos.existencia === "" ? undefined : Number(campos.existencia),
      stockMinimo: campos.stockMinimo === "" ? undefined : Number(campos.stockMinimo),
    };

    try {
      const respuesta = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-usuario": usuario },
        body: JSON.stringify(cuerpo),
      });
      const datos: Respuesta = await respuesta.json();

      if (respuesta.status === 201) {
        setMensaje({
          tipo: "ok",
          texto: `Producto registrado: ${datos.nombre}. Código de barras: ${datos.codigo}. Ya está disponible en el inventario.`,
        });
        setCampos(CAMPOS_VACIOS);
      } else if (respuesta.status === 400) {
        setErrores(datos.errores ?? {});
        setMensaje({ tipo: "aviso", texto: datos.error ?? "Revisa los datos del formulario." });
      } else if (respuesta.status === 409 && datos.existente) {
        setMensaje({
          tipo: "aviso",
          texto: `${datos.error} Existencia actual: ${datos.existente.existencia}.`,
        });
      } else {
        setMensaje({ tipo: "error", texto: datos.error ?? "No se pudo registrar el producto." });
      }
    } catch {
      setMensaje({ tipo: "error", texto: "No se pudo conectar con el servidor." });
    } finally {
      setEnviando(false);
    }
  }

  const error = (campo: string) =>
    errores[campo]?.[0] ? <span className="error-campo">{errores[campo][0]}</span> : null;

  return (
    <form onSubmit={enviar} noValidate>
      <label>
        Usuario <span className="nota">(temporal, hasta que exista el login)</span>
        <select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
          <option value="gerente">Gerente</option>
          <option value="encargado">Encargado</option>
          <option value="cajero">Cajero</option>
        </select>
      </label>

      <label>
        Nombre *
        <input value={campos.nombre} onChange={(e) => cambiar("nombre", e.target.value)} />
        {error("nombre")}
      </label>

      <label>
        Categoría *
        <input value={campos.categoria} onChange={(e) => cambiar("categoria", e.target.value)} />
        {error("categoria")}
      </label>

      <div className="fila">
        <label>
          Talla
          <input value={campos.talla} onChange={(e) => cambiar("talla", e.target.value)} />
          {error("talla")}
        </label>
        <label>
          Color
          <input value={campos.color} onChange={(e) => cambiar("color", e.target.value)} />
          {error("color")}
        </label>
      </div>

      <label>
        Precio *
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          value={campos.precio}
          onChange={(e) => cambiar("precio", e.target.value)}
        />
        {error("precio")}
      </label>

      <div className="fila">
        <label>
          Existencia inicial
          <input
            type="number"
            step="1"
            value={campos.existencia}
            onChange={(e) => cambiar("existencia", e.target.value)}
          />
          {error("existencia")}
        </label>
        <label>
          Stock mínimo
          <input
            type="number"
            step="1"
            value={campos.stockMinimo}
            onChange={(e) => cambiar("stockMinimo", e.target.value)}
          />
          {error("stockMinimo")}
        </label>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.tipo}`} role="status">
          {mensaje.texto}
        </div>
      )}

      <button type="submit" disabled={enviando}>
        {enviando ? "Registrando..." : "Registrar producto"}
      </button>
    </form>
  );
}
