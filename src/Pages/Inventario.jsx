import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DATOS_CATEGORIAS = {
  guantes: ["Guantes Talla S", "Guantes Talla M", "Guantes Talla L"],
  jeringas: ["Jeringa 5ml", "Jeringa 10ml", "Jeringa 20ml"],
  gasas: ["Gasas estériles", "Venda elástica", "Esparadrapo"],
  soluciones: ["Suero", "Alcohol", "Yodo"],
  cateteres: ["Sonda vesical", "Catéter periférico"],
  curacion: ["Apósitos", "Algodón", "Tijeras"],
  ropa: ["Bata quirúrgica", "Gorro", "Tapabocas"],
  carro: ["Ambú", "Monitor signos", "Desfibrilador"],
};

const UBICACIONES = {
  "Guantes Talla S": "Estante A - Canto 1 (Insumos Protección)",
  "Guantes Talla M": "Estante A - Canto 1 (Insumos Protección)",
  "Guantes Talla L": "Estante A - Canto 1 (Insumos Protección)",
  "Jeringa 5ml": "Estante B - Cajón 3 (Inyectables)",
  "Jeringa 10ml": "Estante B - Cajón 3 (Inyectables)",
  "Jeringa 20ml": "Estante B - Cajón 3 (Inyectables)",
  "Gasas estériles": "Estante C - Gabinete Cura",
  "Venda elástica": "Estante C - Gabinete Cura",
  "Esparadrapo": "Estante C - Gabinete Cura",
  Suero: "Zona de Soluciones - Estante D",
  Alcohol: "Zona de Soluciones - Estante D",
  Yodo: "Zona de Soluciones - Estante D",
  "Sonda vesical": "Estante E - Material Procedimientos",
  "Catéter periférico": "Estante E - Material Procedimientos",
  Apósitos: "Estante C - Gabinete Cura",
  Algodón: "Estante C - Gabinete Cura",
  Tijeras: "Mesa de Instrumental quirúrgico",
  "Bata quirúrgica": "Armario Vestidor Esterilizado",
  Gorro: "Armario Vestidor Esterilizado",
  Tapabocas: "Armario Vestidor Esterilizado",
  Ambú: "Carro de Paro - Nivel 1 (Emergencias)",
  "Monitor signos": "Carro de Paro - Nivel Superior",
  Desfibrilador: "Carro de Paro - Nivel Superior",
};

const MESES = [
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function Inventario() {
  const [categoriaSel, setCategoriaSel] = useState(null);
  const [mes, setMes] = useState("Abril");

  const [inventario, setInventario] = useState({});
  const [formularios, setFormularios] = useState({});

  const [codigoEscaner, setCodigoEscaner] = useState("");
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  const inputEscanerRef = useRef(null);

  // Cargamos los productos que ya estén guardados.
  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = () => {
    try {
      const data = localStorage.getItem("inventarioProductos");

      if (data) {
        setInventario(JSON.parse(data));
        return;
      }

      // Si es la primera vez que se abre el inventario,
      // dejamos algunos productos de ejemplo.
      const productosIniciales = {};

      Object.values(DATOS_CATEGORIAS)
        .flat()
        .forEach((insumo, index) => {
          productosIniciales[insumo] = {
            nombre: insumo,
            cantidad: 100,
            stockMinimo: 20,
            categoria: encontrarCategoria(insumo),
            codigoBarras: `770000000${index + 1}`,
            fechaVencimiento: tieneVencimiento(insumo)
              ? "2027-12-31"
              : "",
            lote: "LOTE-INICIAL",
            ubicacion: UBICACIONES[insumo] || "Sin ubicación",
          };
        });

      setInventario(productosIniciales);

      localStorage.setItem(
        "inventarioProductos",
        JSON.stringify(productosIniciales)
      );
    } catch (error) {
      console.error("Error cargando inventario:", error);
    }
  };

  // Buscamos a qué categoría pertenece un producto.
  const encontrarCategoria = (insumo) => {
    for (const [categoria, productos] of Object.entries(DATOS_CATEGORIAS)) {
      if (productos.includes(insumo)) {
        return categoria;
      }
    }

    return "";
  };

  // Algunos productos pueden tener fecha de vencimiento y otros no.
  const tieneVencimiento = (insumo) => {
    const productosConVencimiento = [
      "Suero",
      "Alcohol",
      "Yodo",
      "Jeringa 5ml",
      "Jeringa 10ml",
      "Jeringa 20ml",
      "Gasas estériles",
      "Sonda vesical",
      "Catéter periférico",
      "Apósitos",
    ];

    return productosConVencimiento.includes(insumo);
  };

  const todosLosInsumos = Object.values(inventario);

  const insumosCategoria = categoriaSel
    ? todosLosInsumos.filter(
        (producto) => producto.categoria === categoriaSel
      )
    : todosLosInsumos;

  const resultadosEscaneo = insumosCategoria.filter((producto) => {
    const texto = codigoEscaner.trim().toLowerCase();

    if (!texto) return true;

    return (
      producto.nombre.toLowerCase().includes(texto) ||
      String(producto.codigoBarras || "")
        .toLowerCase()
        .includes(texto)
    );
  });

  // Calculamos el estado visual del producto.
  const obtenerEstado = (producto) => {
    const cantidad = Number(producto.cantidad || 0);
    const minimo = Number(producto.stockMinimo || 0);

    if (cantidad <= 0) {
      return {
        nombre: "Agotado",
        clase: "agotado",
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
          nombre: "Vencido",
          clase: "vencido",
          icono: "🔴",
        };
      }

      const diferencia =
        (vencimiento - hoy) / (1000 * 60 * 60 * 24);

      if (diferencia <= 30) {
        return {
          nombre: "Próximo a vencer",
          clase: "proximo",
          icono: "🟠",
        };
      }
    }

    if (cantidad <= minimo) {
      return {
        nombre: "Bajo stock",
        clase: "bajo",
        icono: "🟡",
      };
    }

    return {
      nombre: "Disponible",
      clase: "disponible",
      icono: "🟢",
    };
  };

  const manejarInput = (insumo, campo, valor) => {
    setFormularios((prev) => ({
      ...prev,
      [insumo]: {
        ...prev[insumo],
        [campo]: valor,
      },
    }));
  };

  // El lector de código de barras normalmente termina enviando Enter.
  const manejarEscaneo = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const codigo = codigoEscaner.trim().toLowerCase();

    if (!codigo) return;

    const encontrado = todosLosInsumos.find(
      (producto) =>
        String(producto.codigoBarras || "").toLowerCase() === codigo
    );

    if (!encontrado) {
      alert("No encontramos ningún producto con ese código de barras.");
      setProductoEncontrado(null);
      return;
    }

    setProductoEncontrado(encontrado);

    // Mostramos solamente el producto encontrado.
    setCodigoEscaner(encontrado.codigoBarras);

    alert(
      `Producto encontrado:\n\n${encontrado.nombre}\nCódigo: ${encontrado.codigoBarras}\nCantidad: ${encontrado.cantidad}`
    );
  };

  const prepararEscaner = () => {
    setCodigoEscaner("");
    setProductoEncontrado(null);
    inputEscanerRef.current?.focus();
  };

  const registrarEntrega = (insumo) => {
    const producto = inventario[insumo];

    if (!producto) return;

    const formulario = formularios[insumo] || {};

    const cantidad = parseInt(formulario.cantidad, 10);
    const ficha = (formulario.ficha || "").trim();
    const programa = (formulario.programa || "").trim();

    const disponible = Number(producto.cantidad || 0);

    if (!cantidad || cantidad <= 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    if (cantidad > disponible) {
      alert("No puedes entregar más unidades de las disponibles.");
      return;
    }

    if (!ficha) {
      alert("Ingresa el número de ficha.");
      return;
    }

    if (!programa) {
      alert("Ingresa el programa.");
      return;
    }

    const nuevaCantidad = disponible - cantidad;

    const nuevoInventario = {
      ...inventario,
      [insumo]: {
        ...producto,
        cantidad: nuevaCantidad,
      },
    };

    setInventario(nuevoInventario);

    localStorage.setItem(
      "inventarioProductos",
      JSON.stringify(nuevoInventario)
    );

    // Guardamos también el movimiento para poder consultarlo después.
    const movimientos = JSON.parse(
      localStorage.getItem("movimientosInventario") || "[]"
    );

    movimientos.push({
      id: Date.now(),
      fecha: new Date().toLocaleDateString("es-CO"),
      hora: new Date().toLocaleTimeString("es-CO"),
      mes,
      tipo: "Salida",
      insumo,
      cantidad,
      ficha,
      programa,
      codigoBarras: producto.codigoBarras || "",
    });

    localStorage.setItem(
      "movimientosInventario",
      JSON.stringify(movimientos)
    );

    setFormularios((prev) => ({
      ...prev,
      [insumo]: {
        cantidad: "",
        ficha: "",
        programa: "",
      },
    }));

    alert(
      `¡Entrega registrada correctamente!\n\nProducto: ${insumo}\nCantidad entregada: ${cantidad}\nCantidad restante: ${nuevaCantidad}\nFicha: ${ficha}\nPrograma: ${programa}`
    );
  };

  const nombreCategoria = categoriaSel
    ? categoriaSel.charAt(0).toUpperCase() + categoriaSel.slice(1)
    : "Todas las categorías";

  // Estos datos sirven para mostrar un pequeño resumen arriba de la tabla.
  const resumen = useMemo(() => {
    return {
      disponibles: todosLosInsumos.filter(
        (producto) => obtenerEstado(producto).clase === "disponible"
      ).length,

      bajoStock: todosLosInsumos.filter(
        (producto) => obtenerEstado(producto).clase === "bajo"
      ).length,

      vencidos: todosLosInsumos.filter(
        (producto) => obtenerEstado(producto).clase === "vencido"
      ).length,

      agotados: todosLosInsumos.filter(
        (producto) => obtenerEstado(producto).clase === "agotado"
      ).length,

      proximoVencer: todosLosInsumos.filter(
        (producto) => obtenerEstado(producto).clase === "proximo"
      ).length,
    };
  }, [inventario]);

  return (
    <div className="inventario">
      <header className="inventario-header">
        <div>
          <h1>Inventario de Insumos de Enfermería</h1>
          <p>Control de existencias, vencimientos y entregas</p>
        </div>

        <Link to="/dashboard" className="volver">
          ⬅ Volver al panel
        </Link>
      </header>

      <div className="contenedor">
        <aside className="menu">
          <h3>Categorías</h3>

          <button
            className={categoriaSel === null ? "activo" : ""}
            onClick={() => {
              setCategoriaSel(null);
              setProductoEncontrado(null);
            }}
          >
            Todos los insumos
          </button>

          {Object.keys(DATOS_CATEGORIAS).map((categoria) => (
            <button
              key={categoria}
              className={
                categoriaSel === categoria ? "activo" : ""
              }
              onClick={() => {
                setCategoriaSel(categoria);
                setCodigoEscaner("");
                setProductoEncontrado(null);
              }}
            >
              {categoria.charAt(0).toUpperCase() +
                categoria.slice(1)}
            </button>
          ))}

          <hr />

          <div className="navegacion">
            <Link
              to="/registro-inventario"
              className="btn-registro"
            >
              ➕ Registrar inventario
            </Link>

            <Link
              to="/estado-inventario"
              className="btn-estado"
            >
              📊 Estado del inventario
            </Link>
          </div>
        </aside>

        <main className="tabla-zona">
          <h2>Control de Inventario</h2>

          {/* Resumen rápido del inventario */}
          <div className="resumen">
            <div className="resumen-card verde">
              <span>🟢</span>
              <strong>{resumen.disponibles}</strong>
              <small>Disponibles</small>
            </div>

            <div className="resumen-card amarillo">
              <span>🟡</span>
              <strong>{resumen.bajoStock}</strong>
              <small>Bajo stock</small>
            </div>

            <div className="resumen-card naranja">
              <span>🟠</span>
              <strong>{resumen.proximoVencer}</strong>
              <small>Próximos a vencer</small>
            </div>

            <div className="resumen-card rojo">
              <span>🔴</span>
              <strong>{resumen.vencidos}</strong>
              <small>Vencidos</small>
            </div>

            <div className="resumen-card negro">
              <span>⚫</span>
              <strong>{resumen.agotados}</strong>
              <small>Agotados</small>
            </div>
          </div>

          <div className="mes">
            <label>Seleccionar mes:</label>

            <select
              value={mes}
              onChange={(e) => setMes(e.target.value)}
            >
              {MESES.map((mesActual) => (
                <option key={mesActual} value={mesActual}>
                  {mesActual}
                </option>
              ))}
            </select>
          </div>

          {/* Buscador que también sirve para lector de código de barras */}
          <div className="buscador">
            <input
              ref={inputEscanerRef}
              type="text"
              value={codigoEscaner}
              onChange={(e) => {
                setCodigoEscaner(e.target.value);
                setProductoEncontrado(null);
              }}
              onKeyDown={manejarEscaneo}
              placeholder="🔎 Buscar producto o escanear código de barras..."
              autoComplete="off"
            />

            <button
              type="button"
              onClick={prepararEscaner}
            >
              📷 Escanear
            </button>
          </div>

          {productoEncontrado && (
            <div className="producto-encontrado">
              <div>
                <strong>Producto encontrado</strong>
                <span>{productoEncontrado.nombre}</span>
              </div>

              <div>
                <strong>Código</strong>
                <span>{productoEncontrado.codigoBarras}</span>
              </div>

              <div>
                <strong>Stock</strong>
                <span>{productoEncontrado.cantidad}</span>
              </div>

              <button
                onClick={() => {
                  setCodigoEscaner("");
                  setProductoEncontrado(null);
                  inputEscanerRef.current?.focus();
                }}
              >
                ✕ Cerrar
              </button>
            </div>
          )}

          <div className="informacion">
            <span>
              Categoría: <strong>{nombreCategoria}</strong>
            </span>

            <span>
              Resultados: <strong>{resultadosEscaneo.length}</strong>
            </span>
          </div>

          <div className="tabla">
            <table>
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>Código</th>
                  <th>Estado</th>
                  <th>Disponible</th>
                  <th>Vencimiento</th>
                  <th>Ubicación</th>
                  <th>Entregar</th>
                  <th>Ficha</th>
                  <th>Programa</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {resultadosEscaneo.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="mensaje">
                      No se encontraron insumos.
                    </td>
                  </tr>
                ) : (
                  resultadosEscaneo.map((producto) => {
                    const formulario =
                      formularios[producto.nombre] || {};

                    const estado = obtenerEstado(producto);

                    return (
                      <tr key={producto.nombre}>
                        <td>
                          <strong>{producto.nombre}</strong>
                        </td>

                        <td>
                          <span className="codigo">
                            {producto.codigoBarras || "Sin código"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`estado ${estado.clase}`}
                          >
                            {estado.icono} {estado.nombre}
                          </span>
                        </td>

                        <td>
                          <span className="cantidad">
                            {producto.cantidad}
                          </span>
                        </td>

                        <td>
                          {producto.fechaVencimiento ? (
                            <span
                              className={
                                estado.clase === "vencido"
                                  ? "fecha-vencida"
                                  : ""
                              }
                            >
                              📅 {producto.fechaVencimiento}
                            </span>
                          ) : (
                            <span className="sin-vencimiento">
                              No aplica
                            </span>
                          )}
                        </td>

                        <td className="ubicacion">
                          📍{" "}
                          {producto.ubicacion ||
                            UBICACIONES[producto.nombre] ||
                            "Sin ubicación"}
                        </td>

                        <td>
                          <input
                            type="number"
                            min="1"
                            placeholder="Cant."
                            value={formulario.cantidad || ""}
                            disabled={producto.cantidad <= 0}
                            onChange={(e) =>
                              manejarInput(
                                producto.nombre,
                                "cantidad",
                                e.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            placeholder="Nº Ficha"
                            value={formulario.ficha || ""}
                            onChange={(e) =>
                              manejarInput(
                                producto.nombre,
                                "ficha",
                                e.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            placeholder="Programa"
                            value={formulario.programa || ""}
                            onChange={(e) =>
                              manejarInput(
                                producto.nombre,
                                "programa",
                                e.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          <button
                            className="entregar"
                            disabled={producto.cantidad <= 0}
                            onClick={() =>
                              registrarEntrega(producto.nombre)
                            }
                          >
                            Registrar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="leyenda">
            <strong>Semáforo del inventario</strong>

            <span className="leyenda-verde">
              🟢 Disponible
            </span>

            <span className="leyenda-amarillo">
              🟡 Bajo stock
            </span>

            <span className="leyenda-naranja">
              🟠 Próximo a vencer
            </span>

            <span className="leyenda-rojo">
              🔴 Vencido
            </span>

            <span className="leyenda-negro">
              ⚫ Agotado
            </span>
          </div>
        </main>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .inventario {
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
          background: #f2f7f4;
          color: #263238;
        }

        .inventario-header {
          background: linear-gradient(90deg, #0a8f3c, #066b2d);
          color: white;
          padding: 22px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .inventario-header h1 {
          margin: 0 0 5px;
          font-size: 27px;
        }

        .inventario-header p {
          margin: 0;
          opacity: .9;
        }

        .volver {
          background: #39a935;
          color: white;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 20px;
          font-weight: bold;
          white-space: nowrap;
        }

        .volver:hover {
          background: #2d8b2a;
        }

        .contenedor {
          display: flex;
          min-height: calc(100vh - 120px);
        }

        .menu {
          width: 260px;
          background: #e6f3ea;
          padding: 18px;
          border-right: 4px solid #0a8f3c;
        }

        .menu h3 {
          color: #066b2d;
          text-align: center;
          margin-top: 5px;
        }

        .menu button {
          display: block;
          width: 100%;
          margin: 8px 0;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #0a8f3c;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
        }

        .menu button:hover,
        .menu button.activo {
          background: #066b2d;
        }

        .menu hr {
          border: none;
          border-top: 2px solid #b8d9c2;
          margin: 20px 0;
        }

        .navegacion a {
          display: block;
          width: 100%;
          margin: 10px 0;
          padding: 11px;
          text-align: center;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          color: white;
        }

        .btn-registro {
          background: #39a935;
        }

        .btn-estado {
          background: #066b2d;
        }

        .tabla-zona {
          flex: 1;
          padding: 25px;
          overflow: auto;
        }

        .tabla-zona h2 {
          color: #066b2d;
          margin-top: 0;
        }

        .resumen {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .resumen-card {
          background: white;
          padding: 14px;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(0,0,0,.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .resumen-card span {
          font-size: 24px;
        }

        .resumen-card strong {
          font-size: 24px;
        }

        .resumen-card small {
          color: #68747d;
        }

        .mes {
          margin-bottom: 15px;
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,.08);
        }

        .mes label {
          color: #066b2d;
          font-weight: bold;
        }

        .mes select {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin-left: 10px;
        }

        .buscador {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .buscador input {
          flex: 1;
          padding: 13px;
          border: 2px solid #d5ded9;
          border-radius: 8px;
          font-size: 15px;
        }

        .buscador input:focus {
          outline: none;
          border-color: #0a8f3c;
        }

        .buscador button {
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          background: #066b2d;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .producto-encontrado {
          background: #eaf6ef;
          border: 2px solid #39a935;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .producto-encontrado div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .producto-encontrado button {
          margin-left: auto;
          border: none;
          background: #777;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        .informacion {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }

        .informacion span {
          background: white;
          padding: 8px 12px;
          border-radius: 20px;
          color: #526174;
          font-size: 14px;
        }

        .tabla {
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 1350px;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,.1);
        }

        th {
          background: #066b2d;
          color: white;
          padding: 12px 8px;
          font-size: 13px;
        }

        td {
          padding: 10px 7px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }

        tr:hover {
          background: #f5faf7;
        }

        td input {
          width: 90px;
          padding: 7px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .cantidad {
          font-size: 18px;
          font-weight: bold;
          color: #066b2d;
        }

        .codigo {
          background: #f1f3f2;
          padding: 5px 7px;
          border-radius: 5px;
          font-size: 12px;
        }

        .ubicacion {
          min-width: 190px;
          font-size: 13px;
          color: #66758a;
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
          color: #8a6800;
        }

        .estado.proximo {
          background: #ffe3bd;
          color: #a95200;
        }

        .estado.vencido {
          background: #ffd6d6;
          color: #b42318;
        }

        .estado.agotado {
          background: #e4e4e4;
          color: #333;
        }

        .fecha-vencida {
          color: #c62828;
          font-weight: bold;
        }

        .sin-vencimiento {
          color: #7b858b;
          font-size: 12px;
        }

        .entregar {
          background: #0a8f3c;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .entregar:hover {
          background: #066b2d;
        }

        .entregar:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        .mensaje {
          text-align: center;
          padding: 30px;
          color: #666;
        }

        .leyenda {
          margin-top: 20px;
          padding: 15px;
          background: white;
          border-radius: 10px;
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
          box-shadow: 0 3px 10px rgba(0,0,0,.06);
        }

        .leyenda span {
          padding: 6px 10px;
          border-radius: 15px;
          font-size: 13px;
        }

        .leyenda-verde {
          background: #d9f3df;
        }

        .leyenda-amarillo {
          background: #fff3bd;
        }

        .leyenda-naranja {
          background: #ffe3bd;
        }

        .leyenda-rojo {
          background: #ffd6d6;
        }

        .leyenda-negro {
          background: #e4e4e4;
        }

        @media(max-width: 1000px) {
          .resumen {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media(max-width: 800px) {
          .inventario-header {
            flex-direction: column;
            text-align: center;
          }

          .contenedor {
            flex-direction: column;
          }

          .menu {
            width: 100%;
            border-right: none;
            border-bottom: 4px solid #0a8f3c;
          }

          .resumen {
            grid-template-columns: repeat(2, 1fr);
          }

          .buscador {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}