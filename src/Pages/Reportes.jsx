
import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const CLAVES = {
  usuarios: "usuariosCentroSimulacion",
  inventario: "inventarioCentroSimulacion",
  prestamos: "prestamosCentroSimulacion",
  mantenimiento: "mantenimientosCentroSimulacion",
  reservas: "reservasAmbiente",
};

const MODULOS = [
  { value: "todos", label: "Todos los módulos" },
  { value: "usuarios", label: "Usuarios" },
  { value: "inventario", label: "Inventario" },
  { value: "prestamos", label: "Préstamos" },
  { value: "mantenimiento", label: "Mantenimiento" },
  { value: "reservas", label: "Reservas" },
];

function leerDatos(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error(`No se pudo leer ${clave}:`, error);
    return [];
  }
}

function obtenerFecha(registro) {
  const valor =
    registro?.fecha ||
    registro?.fechaSolicitud ||
    registro?.fechaPrestamo ||
    registro?.fechaMantenimiento ||
    registro?.fechaReserva ||
    registro?.createdAt ||
    registro?.created_at ||
    "";

  if (!valor) return "";

  const fecha = String(valor).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? fecha : "";
}

function obtenerNombre(registro, modulo) {
  const campos = {
    usuarios: ["nombre", "nombreCompleto", "usuario", "name"],
    inventario: ["nombre", "equipo", "nombreEquipo", "descripcion"],
    prestamos: ["equipo", "nombreEquipo", "elemento", "nombre"],
    mantenimiento: ["equipo", "nombreEquipo", "elemento", "nombre"],
    reservas: ["ambiente", "nombreAmbiente", "instructor", "nombre"],
  };

  for (const campo of campos[modulo] || []) {
    if (registro?.[campo] != null && String(registro[campo]).trim()) {
      return String(registro[campo]);
    }
  }

  return "Sin nombre registrado";
}

function obtenerEstado(registro) {
  return String(
    registro?.estado ||
      registro?.estadoPrestamo ||
      registro?.estadoMantenimiento ||
      registro?.estadoReserva ||
      "Sin estado"
  );
}

function obtenerCantidad(registro) {
  const valor =
    registro?.cantidad ??
    registro?.stock ??
    registro?.existencias ??
    registro?.unidades ??
    registro?.cantidadDisponible ??
    0;

  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : 0;
}

function obtenerValorInventario(registro) {
  const valorTotal =
    registro?.valorTotal ??
    registro?.valorInventario ??
    registro?.total ??
    registro?.subtotal;

  if (valorTotal != null && Number.isFinite(Number(valorTotal))) {
    return Number(valorTotal);
  }

  const cantidad = obtenerCantidad(registro);
  const precio = Number(
    registro?.precioUnitario ??
      registro?.precio ??
      registro?.valorUnitario ??
      registro?.costo ??
      0
  );

  return cantidad * (Number.isFinite(precio) ? precio : 0);
}

function formatoCOP(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(valor) || 0);
}

function descargarCSV(registros, nombreArchivo) {
  const encabezados = [
    "Módulo",
    "Registro",
    "Estado",
    "Fecha",
    "Responsable",
  ];

  const filas = registros.map((registro) => [
    registro.modulo,
    registro.nombre,
    registro.estado,
    registro.fecha || "Sin fecha",
    registro.responsable,
  ]);

  const escapar = (valor) =>
    `"${String(valor ?? "").replace(/"/g, '""')}"`;

  const contenido = [encabezados, ...filas]
    .map((fila) => fila.map(escapar).join(";"))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + contenido], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}

export default function Reportes() {
  const [datos, setDatos] = useState({
    usuarios: [],
    inventario: [],
    prestamos: [],
    mantenimiento: [],
    reservas: [],
  });

  const [busqueda, setBusqueda] = useState("");
  const [modulo, setModulo] = useState("todos");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  function cargarDatos() {
    setDatos({
      usuarios: leerDatos(CLAVES.usuarios),
      inventario: leerDatos(CLAVES.inventario),
      prestamos: leerDatos(CLAVES.prestamos),
      mantenimiento: leerDatos(CLAVES.mantenimiento),
      reservas: leerDatos(CLAVES.reservas),
    });
  }

  useEffect(() => {
    cargarDatos();

    const actualizar = () => cargarDatos();
    window.addEventListener("storage", actualizar);
    window.addEventListener("focus", actualizar);

    return () => {
      window.removeEventListener("storage", actualizar);
      window.removeEventListener("focus", actualizar);
    };
  }, []);

  const todosLosRegistros = useMemo(() => {
    return Object.entries(datos).flatMap(([nombreModulo, registros]) =>
      registros.map((registro, indice) => ({
        id: registro.id ?? registro._id ?? `${nombreModulo}-${indice}`,
        modulo: MODULOS.find((item) => item.value === nombreModulo)?.label ||
          nombreModulo,
        claveModulo: nombreModulo,
        nombre: obtenerNombre(registro, nombreModulo),
        estado: obtenerEstado(registro),
        fecha: obtenerFecha(registro),
        responsable:
          registro.instructor ||
          registro.responsable ||
          registro.usuario ||
          registro.nombreUsuario ||
          registro.aprendiz ||
          "No especificado",
        original: registro,
      }))
    );
  }, [datos]);

  const registrosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return todosLosRegistros.filter((registro) => {
      const coincideModulo =
        modulo === "todos" || registro.claveModulo === modulo;

      const coincideTexto =
        !texto ||
        [
          registro.nombre,
          registro.estado,
          registro.modulo,
          registro.responsable,
          registro.fecha,
        ].some((valor) => String(valor).toLowerCase().includes(texto));

      const coincideFechaInicio =
        !fechaInicio ||
        !registro.fecha ||
        registro.fecha >= fechaInicio;

      const coincideFechaFin =
        !fechaFin ||
        !registro.fecha ||
        registro.fecha <= fechaFin;

      return (
        coincideModulo &&
        coincideTexto &&
        coincideFechaInicio &&
        coincideFechaFin
      );
    });
  }, [
    todosLosRegistros,
    modulo,
    busqueda,
    fechaInicio,
    fechaFin,
  ]);

  const estadisticas = useMemo(() => {
    const totalInventario = datos.inventario.length;
    const unidadesInventario = datos.inventario.reduce(
      (total, item) => total + obtenerCantidad(item),
      0
    );

    const unidadesDisponibles = datos.inventario.reduce((total, item) => {
      const disponible = Number(
        item.cantidadDisponible ??
          item.disponibles ??
          item.stockDisponible ??
          item.disponible ??
          0
      );

      return total + (Number.isFinite(disponible) ? disponible : 0);
    }, 0);

    const valorInventario = datos.inventario.reduce(
      (total, item) => total + obtenerValorInventario(item),
      0
    );

    const prestamosActivos = datos.prestamos.filter((item) =>
      /activo|prestado|pendiente|aprobado|entregado/i.test(
        obtenerEstado(item)
      )
    ).length;

    const mantenimientosPendientes = datos.mantenimiento.filter((item) =>
      /pendiente|proceso|programado/i.test(obtenerEstado(item))
    ).length;

    const reservasActivas = datos.reservas.filter((item) =>
      /pendiente|reservado|confirmado/i.test(obtenerEstado(item))
    ).length;

    return {
      usuarios: datos.usuarios.length,
      equipos: totalInventario,
      unidadesInventario,
      unidadesDisponibles,
      valorInventario,
      prestamos: datos.prestamos.length,
      prestamosActivos,
      mantenimiento: datos.mantenimiento.length,
      mantenimientosPendientes,
      reservas: datos.reservas.length,
      reservasActivas,
    };
  }, [datos]);

  function generarPDF() {
    setMensaje("");

    if (registrosFiltrados.length === 0) {
      setMensaje("No hay registros para incluir en el PDF.");
      return;
    }

    setCargando(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Centro de Simulación en Salud - SENA", 14, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Reporte general de gestión", 14, 26);

      doc.setFontSize(9);
      doc.text(
        `Fecha de generación: ${new Date().toLocaleDateString("es-CO")}`,
        14,
        33
      );

      doc.text(
        `Módulo: ${
          MODULOS.find((item) => item.value === modulo)?.label || modulo
        }`,
        14,
        39
      );

      doc.text(
        `Registros incluidos: ${registrosFiltrados.length}`,
        14,
        45
      );

      doc.text(
        `Periodo: ${fechaInicio || "Inicio"} - ${fechaFin || "Actualidad"}`,
        14,
        51
      );

      autoTable(doc, {
        startY: 57,
        head: [
          ["Módulo", "Registro", "Estado", "Fecha", "Responsable"],
        ],
        body: registrosFiltrados.map((registro) => [
          registro.modulo,
          registro.nombre,
          registro.estado,
          registro.fecha || "Sin fecha",
          registro.responsable,
        ]),
        theme: "striped",
        styles: {
          font: "helvetica",
          fontSize: 8,
          cellPadding: 3,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [27, 83, 74],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [242, 247, 245],
        },
        margin: {
          top: 15,
          right: 14,
          bottom: 15,
          left: 14,
        },
        didDrawPage: () => {
          const alto = doc.internal.pageSize.getHeight();
          const ancho = doc.internal.pageSize.getWidth();

          doc.setFontSize(8);
          doc.setFont("helvetica", "normal");
          doc.text(
            "Centro de Simulación en Salud - SENA",
            14,
            alto - 7
          );
          doc.text(
            `Página ${doc.internal.getNumberOfPages()}`,
            ancho - 14,
            alto - 7,
            { align: "right" }
          );
        },
      });

      doc.save("reporte-centro-simulacion.pdf");
      setMensaje("El PDF se generó correctamente.");
    } catch (error) {
      console.error("Error real al generar el PDF:", error);
      setMensaje(
        `Error al generar el PDF: ${
          error?.message || "Error desconocido"
        }. Revisa la consola del navegador.`
      );
    } finally {
      setCargando(false);
    }
  }

  function exportarCSV() {
    setMensaje("");

    if (registrosFiltrados.length === 0) {
      setMensaje("No hay registros para exportar.");
      return;
    }

    try {
      descargarCSV(
        registrosFiltrados,
        "reporte-centro-simulacion.csv"
      );
      setMensaje("El archivo CSV se exportó correctamente.");
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      setMensaje("No fue posible exportar el archivo CSV.");
    }
  }

  const estilos = {
    pagina: {
      padding: "24px",
      color: "#20312e",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    encabezado: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    titulo: {
      margin: "0 0 8px",
      fontSize: "28px",
      color: "#006b3c",
    },
    subtitulo: {
      margin: 0,
      color: "#657570",
      fontSize: "14px",
    },
    tarjetas: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    tarjeta: {
      background: "#ffffff",
      border: "1px solid #e1eae6",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(25, 60, 48, 0.05)",
    },
    etiqueta: {
      margin: "0 0 10px",
      fontSize: "13px",
      color: "#657570",
    },
    numero: {
      margin: 0,
      fontSize: "28px",
      color: "#006b3c",
      fontWeight: "bold",
      overflowWrap: "anywhere",
    },
    panel: {
      background: "#ffffff",
      border: "1px solid #e1eae6",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "24px",
    },
    filtros: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
      gap: "14px",
      alignItems: "end",
    },
    campo: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      fontSize: "13px",
      color: "#455b54",
      fontWeight: "600",
    },
    entrada: {
      width: "100%",
      boxSizing: "border-box",
      padding: "10px 12px",
      border: "1px solid #ccd9d3",
      borderRadius: "7px",
      background: "#fff",
      color: "#20312e",
      fontSize: "14px",
    },
    boton: {
      padding: "11px 16px",
      border: "none",
      borderRadius: "7px",
      background: "#006b3c",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
    botonSecundario: {
      padding: "11px 16px",
      border: "1px solid #006b3c",
      borderRadius: "7px",
      background: "#fff",
      color: "#006b3c",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
    tablaContenedor: {
      width: "100%",
      overflowX: "auto",
    },
    tabla: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "13px",
      textAlign: "left",
    },
    th: {
      background: "#006b3c",
      color: "#fff",
      padding: "12px",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e6eeea",
      color: "#344740",
    },
    mensaje: {
      marginTop: "16px",
      padding: "12px 14px",
      background: "#eef6f1",
      color: "#006b3c",
      borderRadius: "8px",
      fontSize: "14px",
      overflowWrap: "anywhere",
    },
  };

  const tarjetas = [
    { titulo: "Usuarios registrados", valor: estadisticas.usuarios },
    { titulo: "Tipos de equipos", valor: estadisticas.equipos },
    {
      titulo: "Unidades en inventario",
      valor: estadisticas.unidadesInventario,
    },
    {
      titulo: "Préstamos registrados",
      valor: estadisticas.prestamos,
    },
    {
      titulo: "Mantenimientos registrados",
      valor: estadisticas.mantenimiento,
    },
    { titulo: "Reservas registradas", valor: estadisticas.reservas },
  ];

  return (
    <main style={estilos.pagina}>
      <header style={estilos.encabezado}>
        <div>
          <h1 style={estilos.titulo}>Reportes y estadísticas</h1>
          <p style={estilos.subtitulo}>
            Centro de Simulación en Salud - SENA
          </p>
        </div>

        <button
          type="button"
          style={estilos.botonSecundario}
          onClick={cargarDatos}
        >
          Actualizar datos
        </button>
      </header>

      <section style={estilos.tarjetas}>
        {tarjetas.map((tarjeta) => (
          <article key={tarjeta.titulo} style={estilos.tarjeta}>
            <p style={estilos.etiqueta}>{tarjeta.titulo}</p>
            <p style={estilos.numero}>
              {tarjeta.valor.toLocaleString("es-CO")}
            </p>
          </article>
        ))}
      </section>

      <section style={estilos.tarjetas}>
        <article style={estilos.tarjeta}>
          <p style={estilos.etiqueta}>Préstamos activos o pendientes</p>
          <p style={estilos.numero}>{estadisticas.prestamosActivos}</p>
        </article>

        <article style={estilos.tarjeta}>
          <p style={estilos.etiqueta}>Mantenimientos pendientes</p>
          <p style={estilos.numero}>
            {estadisticas.mantenimientosPendientes}
          </p>
        </article>

        <article style={estilos.tarjeta}>
          <p style={estilos.etiqueta}>Reservas activas o pendientes</p>
          <p style={estilos.numero}>{estadisticas.reservasActivas}</p>
        </article>

        <article style={estilos.tarjeta}>
          <p style={estilos.etiqueta}>Valor estimado del inventario</p>
          <p style={{ ...estilos.numero, fontSize: "22px" }}>
            {formatoCOP(estadisticas.valorInventario)}
          </p>
        </article>
      </section>

      <section style={estilos.panel}>
        <h2 style={{ marginTop: 0, color: "#205c50", fontSize: "19px" }}>
          Consultar y exportar registros
        </h2>

        <div style={estilos.filtros}>
          <label style={estilos.campo}>
            Buscar
            <input
              type="search"
              placeholder="Nombre, estado, responsable..."
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              style={estilos.entrada}
            />
          </label>

          <label style={estilos.campo}>
            Módulo
            <select
              value={modulo}
              onChange={(event) => setModulo(event.target.value)}
              style={estilos.entrada}
            >
              {MODULOS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label style={estilos.campo}>
            Desde
            <input
              type="date"
              value={fechaInicio}
              max={fechaFin || undefined}
              onChange={(event) => setFechaInicio(event.target.value)}
              style={estilos.entrada}
            />
          </label>

          <label style={estilos.campo}>
            Hasta
            <input
              type="date"
              value={fechaFin}
              min={fechaInicio || undefined}
              onChange={(event) => setFechaFin(event.target.value)}
              style={estilos.entrada}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            style={{
              ...estilos.boton,
              opacity: cargando ? 0.7 : 1,
            }}
            onClick={generarPDF}
            disabled={cargando}
          >
            {cargando ? "Generando PDF..." : "Descargar PDF"}
          </button>

          <button
            type="button"
            style={estilos.botonSecundario}
            onClick={exportarCSV}
          >
            Exportar CSV
          </button>

          <button
            type="button"
            style={estilos.botonSecundario}
            onClick={() => {
              setBusqueda("");
              setModulo("todos");
              setFechaInicio("");
              setFechaFin("");
              setMensaje("");
            }}
          >
            Limpiar filtros
          </button>
        </div>

        {mensaje && (
          <p role="status" style={estilos.mensaje}>
            {mensaje}
          </p>
        )}
      </section>

      <section style={estilos.panel}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ margin: 0, color: "#205c50", fontSize: "19px" }}>
            Detalle de registros
          </h2>

          <span style={{ color: "#657570", fontSize: "13px" }}>
            {registrosFiltrados.length} registro(s)
          </span>
        </div>

        <div style={estilos.tablaContenedor}>
          <table style={estilos.tabla}>
            <thead>
              <tr>
                {["Módulo", "Registro", "Estado", "Fecha", "Responsable"].map(
                  (titulo) => (
                    <th key={titulo} style={estilos.th}>
                      {titulo}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {registrosFiltrados.length > 0 ? (
                registrosFiltrados.map((registro) => (
                  <tr key={`${registro.claveModulo}-${registro.id}`}>
                    <td style={estilos.td}>{registro.modulo}</td>
                    <td style={estilos.td}>{registro.nombre}</td>
                    <td style={estilos.td}>{registro.estado}</td>
                    <td style={estilos.td}>
                      {registro.fecha || "Sin fecha"}
                    </td>
                    <td style={estilos.td}>{registro.responsable}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...estilos.td,
                      textAlign: "center",
                      padding: "28px 12px",
                      color: "#657570",
                    }}
                  >
                    No se encontraron registros con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
