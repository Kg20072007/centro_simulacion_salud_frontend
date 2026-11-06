import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function EstadoInventario() {
  const [inventario, setInventario] = useState({});
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = () => {
    try {
      const datos = localStorage.getItem("inventarioProductos");

      if (datos) {
        setInventario(JSON.parse(datos));
      }
    } catch (error) {
      console.error("Error cargando el estado del inventario:", error);
    }
  };

  // Esta función decide el color que tendrá cada producto.
  const obtenerEstado = (producto) => {
    const cantidad = Number(producto.cantidad || 0);
    const stockMinimo = Number(producto.stockMinimo || 0);

    if (cantidad <= 0) {
      return {
        id: "agotado",
        nombre: "Agotado",
        icono: "⚫",
      };
    }

    if (producto.fechaVencimiento) {
      const hoy = new Date();

      const vencimiento = new Date(
        `${producto.fechaVencimiento}T23:59:59`
      );

      if (vencimiento < hoy) {
        return {
          id: "vencido",
          nombre: "Vencido",
          icono: "🔴",
        };
      }

      const diasRestantes =
        (vencimiento - hoy) / (1000 * 60 * 60 * 24);

      if (diasRestantes <= 30) {
        return {
          id: "proximo",
          nombre: "Próximo a vencer",
          icono: "🟠",
        };
      }
    }

    if (cantidad <= stockMinimo) {
      return {
        id: "bajo",
        nombre: "Bajo stock",
        icono: "🟡",
      };
    }

    return {
      id: "disponible",
      nombre: "Disponible",
      icono: "🟢",
    };
  };

  const productos = Object.values(inventario);

  const resumen = useMemo(() => {
    return {
      total: productos.length,

      disponible: productos.filter(
        (p) => obtenerEstado(p).id === "disponible"
      ).length,

      bajo: productos.filter(
        (p) => obtenerEstado(p).id === "bajo"
      ).length,

      proximo: productos.filter(
        (p) => obtenerEstado(p).id === "proximo"
      ).length,

      vencido: productos.filter(
        (p) => obtenerEstado(p).id === "vencido"
      ).length,

      agotado: productos.filter(
        (p) => obtenerEstado(p).id === "agotado"
      ).length,
    };
  }, [inventario]);

  const productosFiltrados = productos.filter((producto) => {
    const estado = obtenerEstado(producto);

    const coincideEstado =
      filtro === "todos" || estado.id === filtro;

    const texto = busqueda.toLowerCase().trim();

    const coincideBusqueda =
      !texto ||
      producto.nombre.toLowerCase().includes(texto) ||
      String(producto.codigoBarras || "")
        .toLowerCase()
        .includes(texto) ||
      String(producto.lote || "")
        .toLowerCase()
        .includes(texto);

    return coincideEstado && coincideBusqueda;
  });

  const calcularDiasVencimiento = (fecha) => {
    if (!fecha) return null;

    const hoy = new Date();

    const vencimiento = new Date(
      `${fecha}T23:59:59`
    );

    return Math.ceil(
      (vencimiento - hoy) /
        (1000 * 60 * 60 * 24)
    );
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "No aplica";

    const partes = fecha.split("-");

    if (partes.length !== 3) return fecha;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  return (
    <div className="estado-inventario">
      <header className="estado-header">
        <div>
          <h1>Estado del Inventario</h1>
          <p>
            Consulta rápida del estado de los insumos del centro.
          </p>
        </div>

        <Link to="/inventario" className="volver">
          ⬅ Volver al inventario
        </Link>
      </header>

      <main className="estado-contenido">
        <div className="titulo">
          <span>📊 CONTROL DE EXISTENCIAS</span>
          <h2>Estado general</h2>
          <p>
            El semáforo se actualiza automáticamente según la
            cantidad y fecha de vencimiento.
          </p>
        </div>

        <section className="resumen">
          <button
            className={`resumen-card todos ${
              filtro === "todos" ? "seleccionado" : ""
            }`}
            onClick={() => setFiltro("todos")}
          >
            <span>📦</span>
            <strong>{resumen.total}</strong>
            <small>Total productos</small>
          </button>

          <button
            className={`resumen-card disponible ${
              filtro === "disponible" ? "seleccionado" : ""
            }`}
            onClick={() => setFiltro("disponible")}
          >
            <span>🟢</span>
            <strong>{resumen.disponible}</strong>
            <small>Disponibles</small>
          </button>

          <button
            className={`resumen-card bajo ${
              filtro === "bajo" ? "seleccionado" : ""
            }`}
            onClick={() => setFiltro("bajo")}
          >
            <span>🟡</span>
            <strong>{resumen.bajo}</strong>
            <small>Bajo stock</small>
          </button>

          <button
            className={`resumen-card proximo ${
              filtro === "proximo" ? "seleccionado" : ""
            }`}
            onClick={() => setFiltro("proximo")}
          >
            <span>🟠</span>
            <strong>{resumen.proximo}</strong>
            <small>Próximos a vencer</small>
          </button>

          <button
            className={`resumen-card vencido ${
              filtro === "vencido" ? "seleccionado" : ""
            }`}
            onClick={() => setFiltro("vencido")}
          >
            <span>🔴</span>
            <strong>{resumen.vencido}</strong>
            <small>Vencidos</small>
          </button>

          <button
            className={`resumen-card agotado ${
              filtro === "agotado" ? "seleccionado" : ""
            }`}
            onClick={() => setFiltro("agotado")}
          >
            <span>⚫</span>
            <strong>{resumen.agotado}</strong>
            <small>Agotados</small>
          </button>
        </section>

        <section className="controles">
          <div className="busqueda">
            <span>🔎</span>

            <input
              type="text"
              placeholder="Buscar por producto, código o lote..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />
          </div>

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">
              Todos los estados
            </option>
            <option value="disponible">
              🟢 Disponible
            </option>
            <option value="bajo">
              🟡 Bajo stock
            </option>
            <option value="proximo">
              🟠 Próximo a vencer
            </option>
            <option value="vencido">
              🔴 Vencido
            </option>
            <option value="agotado">
              ⚫ Agotado
            </option>
          </select>
        </section>

        <section className="tabla-contenedor">
          <div className="tabla-titulo">
            <div>
              <h3>Productos registrados</h3>
              <span>
                Mostrando {productosFiltrados.length} producto(s)
              </span>
            </div>

            <button
              className="actualizar"
              onClick={cargarInventario}
            >
              🔄 Actualizar
            </button>
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="sin-resultados">
              <div>📦</div>
              <h3>No hay productos para mostrar</h3>
              <p>
                Prueba con otro filtro o registra un nuevo
                producto.
              </p>

              <Link to="/registro-inventario">
                ➕ Registrar producto
              </Link>
            </div>
          ) : (
            <div className="tabla-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Código de barras</th>
                    <th>Lote</th>
                    <th>Stock</th>
                    <th>Stock mínimo</th>
                    <th>Vencimiento</th>
                    <th>Estado</th>
                    <th>Ubicación</th>
                  </tr>
                </thead>

                <tbody>
                  {productosFiltrados.map((producto) => {
                    const estado = obtenerEstado(producto);

                    const dias = calcularDiasVencimiento(
                      producto.fechaVencimiento
                    );

                    return (
                      <tr key={producto.nombre}>
                        <td>
                          <strong>{producto.nombre}</strong>
                        </td>

                        <td>
                          <span className="codigo">
                            {producto.codigoBarras ||
                              "Sin código"}
                          </span>
                        </td>

                        <td>
                          {producto.lote || "Sin lote"}
                        </td>

                        <td>
                          <strong
                            className={
                              producto.cantidad <=
                              producto.stockMinimo
                                ? "stock-alerta"
                                : "stock-normal"
                            }
                          >
                            {producto.cantidad}
                          </strong>
                        </td>

                        <td>
                          {producto.stockMinimo}
                        </td>

                        <td>
                          {producto.fechaVencimiento ? (
                            <div className="vencimiento">
                              <strong>
                                {formatearFecha(
                                  producto.fechaVencimiento
                                )}
                              </strong>

                              {dias !== null && (
                                <small
                                  className={
                                    dias < 0
                                      ? "dias-vencido"
                                      : dias <= 30
                                      ? "dias-proximo"
                                      : ""
                                  }
                                >
                                  {dias < 0
                                    ? `Vencido hace ${Math.abs(
                                        dias
                                      )} día(s)`
                                    : dias === 0
                                    ? "Vence hoy"
                                    : `${dias} día(s) restantes`}
                                </small>
                              )}
                            </div>
                          ) : (
                            <span className="no-aplica">
                              No aplica
                            </span>
                          )}
                        </td>

                        <td>
                          <span
                            className={`estado ${estado.id}`}
                          >
                            {estado.icono} {estado.nombre}
                          </span>
                        </td>

                        <td className="ubicacion">
                          📍{" "}
                          {producto.ubicacion ||
                            "Sin ubicación"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="alertas">
          <h3>🚨 Atención requerida</h3>

          <div className="alertas-grid">
            {resumen.vencido > 0 && (
              <div className="alerta alerta-roja">
                <span>🔴</span>
                <div>
                  <strong>
                    Productos vencidos
                  </strong>

                  <p>
                    Hay {resumen.vencido} producto(s) que ya
                    superaron su fecha de vencimiento.
                  </p>
                </div>
              </div>
            )}

            {resumen.proximo > 0 && (
              <div className="alerta alerta-naranja">
                <span>🟠</span>
                <div>
                  <strong>
                    Próximos a vencer
                  </strong>

                  <p>
                    Hay {resumen.proximo} producto(s) que
                    vencerán en 30 días o menos.
                  </p>
                </div>
              </div>
            )}

            {resumen.bajo > 0 && (
              <div className="alerta alerta-amarilla">
                <span>🟡</span>
                <div>
                  <strong>
                    Bajo stock
                  </strong>

                  <p>
                    Hay {resumen.bajo} producto(s) que
                    necesitan reposición.
                  </p>
                </div>
              </div>
            )}

            {resumen.agotado > 0 && (
              <div className="alerta alerta-gris">
                <span>⚫</span>
                <div>
                  <strong>
                    Productos agotados
                  </strong>

                  <p>
                    Hay {resumen.agotado} producto(s) sin
                    existencias.
                  </p>
                </div>
              </div>
            )}

            {resumen.vencido === 0 &&
              resumen.proximo === 0 &&
              resumen.bajo === 0 &&
              resumen.agotado === 0 && (
                <div className="alerta alerta-verde">
                  <span>✅</span>

                  <div>
                    <strong>
                      Inventario en buen estado
                    </strong>

                    <p>
                      No hay alertas que requieran atención.
                    </p>
                  </div>
                </div>
              )}
          </div>
        </section>

        <div className="leyenda">
          <strong>Semáforo:</strong>

          <span>🟢 Disponible</span>
          <span>🟡 Bajo stock</span>
          <span>🟠 Próximo a vencer</span>
          <span>🔴 Vencido</span>
          <span>⚫ Agotado</span>
        </div>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .estado-inventario {
          min-height: 100vh;
          background: #f3f7f5;
          font-family: "Segoe UI", sans-serif;
          color: #263238;
        }

        .estado-header {
          background: linear-gradient(90deg, #0a8f3c, #066b2d);
          color: white;
          padding: 24px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .estado-header h1 {
          margin: 0 0 5px;
          font-size: 28px;
        }

        .estado-header p {
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

        .estado-contenido {
          max-width: 1250px;
          margin: auto;
          padding: 35px 20px 50px;
        }

        .titulo {
          text-align: center;
          margin-bottom: 25px;
        }

        .titulo span {
          color: #0a8f3c;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .titulo h2 {
          margin: 7px 0;
          color: #066b2d;
          font-size: 30px;
        }

        .titulo p {
          color: #69766f;
        }

        .resumen {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .resumen-card {
          border: 2px solid transparent;
          background: white;
          border-radius: 13px;
          padding: 16px 10px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(0,0,0,.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: .2s;
        }

        .resumen-card:hover {
          transform: translateY(-2px);
        }

        .resumen-card.seleccionado {
          border-color: #066b2d;
        }

        .resumen-card span {
          font-size: 25px;
        }

        .resumen-card strong {
          font-size: 25px;
        }

        .resumen-card small {
          color: #69766f;
          font-size: 12px;
        }

        .controles {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
        }

        .busqueda {
          flex: 1;
          background: white;
          border: 1px solid #d5ddd8;
          border-radius: 9px;
          display: flex;
          align-items: center;
          padding: 0 12px;
        }

        .busqueda span {
          font-size: 18px;
        }

        .busqueda input {
          border: none;
          outline: none;
          width: 100%;
          padding: 12px;
          font-size: 14px;
        }

        .controles select {
          min-width: 210px;
          padding: 10px;
          border: 1px solid #d5ddd8;
          border-radius: 9px;
          background: white;
        }

        .tabla-contenedor {
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,.07);
          overflow: hidden;
        }

        .tabla-titulo {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid #e3e8e5;
        }

        .tabla-titulo h3 {
          margin: 0 0 4px;
          color: #066b2d;
        }

        .tabla-titulo span {
          color: #77817d;
          font-size: 13px;
        }

        .actualizar {
          border: none;
          background: #066b2d;
          color: white;
          padding: 9px 15px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: bold;
        }

        .tabla-scroll {
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 1100px;
          border-collapse: collapse;
        }

        th {
          background: #066b2d;
          color: white;
          padding: 13px 10px;
          font-size: 13px;
        }

        td {
          padding: 13px 10px;
          border-bottom: 1px solid #e5e9e7;
          text-align: center;
          font-size: 13px;
        }

        tbody tr:hover {
          background: #f5faf7;
        }

        .codigo {
          background: #f0f3f1;
          padding: 5px 7px;
          border-radius: 5px;
          font-size: 11px;
        }

        .estado {
          display: inline-block;
          padding: 6px 9px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
        }

        .estado.disponible {
          background: #d9f3df;
          color: #137333;
        }

        .estado.bajo {
          background: #fff3bd;
          color: #806000;
        }

        .estado.proximo {
          background: #ffe4bf;
          color: #a34c00;
        }

        .estado.vencido {
          background: #ffd6d6;
          color: #b42318;
        }

        .estado.agotado {
          background: #e5e5e5;
          color: #333;
        }

        .stock-normal {
          color: #137333;
          font-size: 17px;
        }

        .stock-alerta {
          color: #a66b00;
          font-size: 17px;
        }

        .vencimiento {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .vencimiento small {
          color: #69766f;
          font-size: 11px;
        }

        .dias-proximo {
          color: #a34c00 !important;
          font-weight: bold;
        }

        .dias-vencido {
          color: #b42318 !important;
          font-weight: bold;
        }

        .no-aplica {
          color: #89928e;
          font-size: 12px;
        }

        .ubicacion {
          color: #68746e;
          max-width: 190px;
        }

        .alertas {
          margin-top: 25px;
        }

        .alertas h3 {
          color: #066b2d;
        }

        .alertas-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .alerta {
          display: flex;
          gap: 12px;
          padding: 16px;
          border-radius: 10px;
          align-items: flex-start;
        }

        .alerta > span {
          font-size: 23px;
        }

        .alerta strong {
          display: block;
          margin-bottom: 5px;
        }

        .alerta p {
          margin: 0;
          font-size: 13px;
        }

        .alerta-roja {
          background: #ffe4e4;
          color: #9f2017;
        }

        .alerta-naranja {
          background: #fff0dd;
          color: #9a4a00;
        }

        .alerta-amarilla {
          background: #fff8d8;
          color: #765c00;
        }

        .alerta-gris {
          background: #ededed;
          color: #444;
        }

        .alerta-verde {
          background: #e0f5e5;
          color: #176b2d;
        }

        .sin-resultados {
          text-align: center;
          padding: 55px 20px;
        }

        .sin-resultados > div {
          font-size: 45px;
        }

        .sin-resultados h3 {
          color: #066b2d;
        }

        .sin-resultados p {
          color: #748078;
        }

        .sin-resultados a {
          display: inline-block;
          margin-top: 10px;
          background: #0a8f3c;
          color: white;
          text-decoration: none;
          padding: 10px 17px;
          border-radius: 8px;
          font-weight: bold;
        }

        .leyenda {
          margin-top: 20px;
          background: white;
          padding: 15px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          box-shadow: 0 3px 10px rgba(0,0,0,.05);
        }

        .leyenda span {
          padding: 6px 10px;
          border-radius: 15px;
          font-size: 13px;
          background: #f1f3f2;
        }

        @media(max-width: 1000px) {
          .resumen {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media(max-width: 700px) {
          .estado-header {
            flex-direction: column;
            text-align: center;
          }

          .resumen {
            grid-template-columns: repeat(2, 1fr);
          }

          .controles {
            flex-direction: column;
          }

          .controles select {
            width: 100%;
          }

          .alertas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}