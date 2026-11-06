import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIAS = {
  guantes: "Guantes",
  jeringas: "Jeringas",
  gasas: "Gasas y curación",
  soluciones: "Soluciones",
  cateteres: "Catéteres",
  curacion: "Curación",
  ropa: "Ropa clínica",
  carro: "Carro de paro",
};

export default function RegistroInventario() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState({});

  const [form, setForm] = useState({
    nombre: "",
    categoria: "guantes",
    codigoBarras: "",
    cantidad: "",
    stockMinimo: "",
    lote: "",
    tieneVencimiento: true,
    fechaVencimiento: "",
    ubicacion: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Cargamos lo que ya existe para no sobrescribir el inventario.
  useEffect(() => {
    try {
      const guardado = localStorage.getItem("inventarioProductos");

      if (guardado) {
        setProductos(JSON.parse(guardado));
      }
    } catch (error) {
      console.error("Error cargando inventario:", error);
    }
  }, []);

  const cambiarCampo = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      categoria: "guantes",
      codigoBarras: "",
      cantidad: "",
      stockMinimo: "",
      lote: "",
      tieneVencimiento: true,
      fechaVencimiento: "",
      ubicacion: "",
    });
  };

  const registrarProducto = (e) => {
    e.preventDefault();

    const nombre = form.nombre.trim();
    const codigo = form.codigoBarras.trim();
    const lote = form.lote.trim();
    const ubicacion = form.ubicacion.trim();

    const cantidad = Number(form.cantidad);
    const stockMinimo = Number(form.stockMinimo);

    if (!nombre) {
      alert("Ingresa el nombre del producto.");
      return;
    }

    if (!codigo) {
      alert("Ingresa el código de barras.");
      return;
    }

    if (!cantidad || cantidad < 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    if (stockMinimo < 0 || Number.isNaN(stockMinimo)) {
      alert("Ingresa un stock mínimo válido.");
      return;
    }

    if (!lote) {
      alert("Ingresa el número de lote.");
      return;
    }

    if (!ubicacion) {
      alert("Ingresa la ubicación del producto.");
      return;
    }

    if (form.tieneVencimiento && !form.fechaVencimiento) {
      alert("Selecciona la fecha de vencimiento.");
      return;
    }

    // Revisamos que no exista otro producto con el mismo código.
    const codigoExiste = Object.values(productos).some(
      (producto) =>
        String(producto.codigoBarras || "").trim() === codigo
    );

    if (codigoExiste) {
      alert(
        "Ya existe un producto registrado con ese código de barras."
      );
      return;
    }

    const nuevoProducto = {
      nombre,
      categoria: form.categoria,
      codigoBarras: codigo,
      cantidad,
      stockMinimo,
      lote,
      fechaVencimiento: form.tieneVencimiento
        ? form.fechaVencimiento
        : "",
      ubicacion,
      creadoEn: new Date().toISOString(),
    };

    const nuevoInventario = {
      ...productos,
      [nombre]: nuevoProducto,
    };

    setProductos(nuevoInventario);

    localStorage.setItem(
      "inventarioProductos",
      JSON.stringify(nuevoInventario)
    );

    // También dejamos registrado el ingreso del producto.
    const movimientos = JSON.parse(
      localStorage.getItem("movimientosInventario") || "[]"
    );

    movimientos.push({
      id: Date.now(),
      fecha: new Date().toLocaleDateString("es-CO"),
      hora: new Date().toLocaleTimeString("es-CO"),
      tipo: "Entrada",
      insumo: nombre,
      cantidad,
      codigoBarras: codigo,
      lote,
      fechaVencimiento: nuevoProducto.fechaVencimiento,
      ubicacion,
    });

    localStorage.setItem(
      "movimientosInventario",
      JSON.stringify(movimientos)
    );

    setMensaje(
      `Producto "${nombre}" registrado correctamente.`
    );

    limpiarFormulario();

    setTimeout(() => {
      setMensaje("");
    }, 4000);
  };

  return (
    <div className="registro-inventario">
      <header className="registro-header">
        <div>
          <h1>Registro de Inventario</h1>
          <p>
            Registra los insumos y productos que ingresan al centro.
          </p>
        </div>

        <Link to="/inventario" className="volver">
          ⬅ Volver al inventario
        </Link>
      </header>

      <main className="registro-contenido">
        <div className="titulo-seccion">
          <span>📦 NUEVO PRODUCTO</span>
          <h2>Registrar insumo</h2>
          <p>
            Completa la información del producto para agregarlo al
            inventario.
          </p>
        </div>

        {mensaje && (
          <div className="mensaje-exito">
            ✅ {mensaje}
          </div>
        )}

        <form
          className="formulario-inventario"
          onSubmit={registrarProducto}
        >
          <section className="form-card">
            <div className="card-titulo">
              <span>🩺</span>
              <div>
                <h3>Información del producto</h3>
                <p>Datos básicos del insumo.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="campo campo-grande">
                <label htmlFor="nombre">
                  Nombre del producto *
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={cambiarCampo}
                  placeholder="Ej: Guantes Talla M"
                />
              </div>

              <div className="campo">
                <label htmlFor="categoria">
                  Categoría *
                </label>

                <select
                  id="categoria"
                  name="categoria"
                  value={form.categoria}
                  onChange={cambiarCampo}
                >
                  {Object.entries(CATEGORIAS).map(
                    ([valor, nombre]) => (
                      <option key={valor} value={valor}>
                        {nombre}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="campo">
                <label htmlFor="codigoBarras">
                  Código de barras *
                </label>

                <input
                  id="codigoBarras"
                  name="codigoBarras"
                  type="text"
                  value={form.codigoBarras}
                  onChange={cambiarCampo}
                  placeholder="Ej: 7701234567890"
                />

                <small>
                  Puedes escribirlo o usar un lector de código de
                  barras.
                </small>
              </div>

              <div className="campo">
                <label htmlFor="lote">
                  Número de lote *
                </label>

                <input
                  id="lote"
                  name="lote"
                  type="text"
                  value={form.lote}
                  onChange={cambiarCampo}
                  placeholder="Ej: LT-2026-001"
                />
              </div>
            </div>
          </section>

          <section className="form-card">
            <div className="card-titulo">
              <span>📊</span>

              <div>
                <h3>Control de existencias</h3>
                <p>
                  Define cuánto producto hay disponible y cuándo
                  debe generar alerta.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="campo">
                <label htmlFor="cantidad">
                  Cantidad inicial *
                </label>

                <input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min="0"
                  value={form.cantidad}
                  onChange={cambiarCampo}
                  placeholder="Ej: 100"
                />
              </div>

              <div className="campo">
                <label htmlFor="stockMinimo">
                  Stock mínimo *
                </label>

                <input
                  id="stockMinimo"
                  name="stockMinimo"
                  type="number"
                  min="0"
                  value={form.stockMinimo}
                  onChange={cambiarCampo}
                  placeholder="Ej: 20"
                />

                <small>
                  Cuando llegue a este número aparecerá 🟡 Bajo
                  stock.
                </small>
              </div>

              <div className="campo campo-grande">
                <label htmlFor="ubicacion">
                  Ubicación *
                </label>

                <input
                  id="ubicacion"
                  name="ubicacion"
                  type="text"
                  value={form.ubicacion}
                  onChange={cambiarCampo}
                  placeholder="Ej: Estante A - Canto 1"
                />
              </div>
            </div>
          </section>

          <section className="form-card">
            <div className="card-titulo">
              <span>📅</span>

              <div>
                <h3>Fecha de vencimiento</h3>
                <p>
                  Algunos productos requieren control de
                  vencimiento.
                </p>
              </div>
            </div>

            <label className="check-vencimiento">
              <input
                type="checkbox"
                name="tieneVencimiento"
                checked={form.tieneVencimiento}
                onChange={cambiarCampo}
              />

              <span>
                Este producto tiene fecha de vencimiento
              </span>
            </label>

            {form.tieneVencimiento && (
              <div className="vencimiento-box">
                <label htmlFor="fechaVencimiento">
                  Fecha de vencimiento *
                </label>

                <input
                  id="fechaVencimiento"
                  name="fechaVencimiento"
                  type="date"
                  value={form.fechaVencimiento}
                  onChange={cambiarCampo}
                />

                <p>
                  El sistema mostrará automáticamente una alerta
                  🟠 cuando falten 30 días o menos para vencer y
                  🔴 cuando el producto esté vencido.
                </p>
              </div>
            )}

            {!form.tieneVencimiento && (
              <div className="sin-vencimiento">
                ℹ️ Este producto será registrado sin fecha de
                vencimiento.
              </div>
            )}
          </section>

          <div className="acciones">
            <button
              type="button"
              className="btn-limpiar"
              onClick={limpiarFormulario}
            >
              🗑️ Limpiar
            </button>

            <button
              type="submit"
              className="btn-guardar"
            >
              💾 Registrar producto
            </button>
          </div>
        </form>

        <div className="ayuda">
          <h3>💡 ¿Cómo funciona?</h3>

          <div className="ayuda-grid">
            <div>
              <strong>1. Registrar</strong>
              <p>
                Ingresa el producto, código de barras, lote y
                cantidad.
              </p>
            </div>

            <div>
              <strong>2. Controlar</strong>
              <p>
                El sistema calcula automáticamente el estado del
                inventario.
              </p>
            </div>

            <div>
              <strong>3. Escanear</strong>
              <p>
                Puedes buscar rápidamente un producto utilizando
                su código de barras.
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .registro-inventario {
          min-height: 100vh;
          background: #f3f7f5;
          font-family: "Segoe UI", sans-serif;
          color: #263238;
        }

        .registro-header {
          background: linear-gradient(90deg, #0a8f3c, #066b2d);
          color: white;
          padding: 24px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .registro-header h1 {
          margin: 0 0 5px;
          font-size: 28px;
        }

        .registro-header p {
          margin: 0;
          opacity: .9;
        }

        .volver {
          background: #39a935;
          color: white;
          padding: 11px 18px;
          border-radius: 22px;
          text-decoration: none;
          font-weight: bold;
          white-space: nowrap;
        }

        .volver:hover {
          background: #2d8b2a;
        }

        .registro-contenido {
          max-width: 1050px;
          margin: auto;
          padding: 35px 20px 50px;
        }

        .titulo-seccion {
          text-align: center;
          margin-bottom: 25px;
        }

        .titulo-seccion span {
          color: #0a8f3c;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .titulo-seccion h2 {
          color: #066b2d;
          margin: 7px 0;
          font-size: 30px;
        }

        .titulo-seccion p {
          color: #68747d;
        }

        .mensaje-exito {
          background: #dff5e5;
          color: #137333;
          border: 1px solid #8bd19a;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
        }

        .formulario-inventario {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 16px rgba(0,0,0,.08);
        }

        .card-titulo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          border-bottom: 1px solid #e2e8e4;
          padding-bottom: 15px;
        }

        .card-titulo > span {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e7f5eb;
          border-radius: 10px;
          font-size: 22px;
        }

        .card-titulo h3 {
          margin: 0 0 3px;
          color: #066b2d;
        }

        .card-titulo p {
          margin: 0;
          color: #748078;
          font-size: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .campo {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .campo-grande {
          grid-column: span 2;
        }

        .campo label,
        .vencimiento-box label {
          font-weight: bold;
          color: #34433b;
        }

        .campo input,
        .campo select,
        .vencimiento-box input {
          width: 100%;
          padding: 12px;
          border: 1px solid #cfd8d3;
          border-radius: 8px;
          font-size: 15px;
          background: white;
        }

        .campo input:focus,
        .campo select:focus,
        .vencimiento-box input:focus {
          outline: none;
          border-color: #0a8f3c;
          box-shadow: 0 0 0 3px rgba(10,143,60,.1);
        }

        .campo small {
          color: #7a8580;
          font-size: 12px;
        }

        .check-vencimiento {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: #f1f8f3;
          border-radius: 9px;
          cursor: pointer;
          font-weight: bold;
        }

        .check-vencimiento input {
          width: 18px;
          height: 18px;
          accent-color: #0a8f3c;
        }

        .vencimiento-box {
          margin-top: 18px;
          padding: 18px;
          background: #fff9e8;
          border: 1px solid #f1d77b;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .vencimiento-box p {
          margin: 5px 0 0;
          color: #806c20;
          font-size: 13px;
        }

        .sin-vencimiento {
          margin-top: 18px;
          padding: 14px;
          border-radius: 8px;
          background: #eef3f1;
          color: #596660;
        }

        .acciones {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .acciones button {
          border: none;
          padding: 13px 22px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 15px;
        }

        .btn-limpiar {
          background: #e2e7e4;
          color: #46534c;
        }

        .btn-guardar {
          background: #0a8f3c;
          color: white;
        }

        .btn-guardar:hover {
          background: #066b2d;
        }

        .ayuda {
          margin-top: 25px;
          padding: 22px;
          background: #e8f5ec;
          border-radius: 12px;
        }

        .ayuda h3 {
          margin-top: 0;
          color: #066b2d;
        }

        .ayuda-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .ayuda-grid div {
          background: white;
          padding: 15px;
          border-radius: 9px;
        }

        .ayuda-grid strong {
          color: #066b2d;
        }

        .ayuda-grid p {
          color: #69766f;
          font-size: 14px;
          line-height: 1.5;
        }

        @media(max-width: 700px) {
          .registro-header {
            flex-direction: column;
            text-align: center;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .campo-grande {
            grid-column: span 1;
          }

          .ayuda-grid {
            grid-template-columns: 1fr;
          }

          .acciones {
            flex-direction: column;
          }

          .acciones button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}