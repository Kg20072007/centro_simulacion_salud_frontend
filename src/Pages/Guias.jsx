
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Guias.css";

const GUIAS = [
  {
    id: 1,
    titulo: "Guía de signos vitales",
    categoria: "Fundamentos clínicos",
    icono: "🩺",
    resumen: "Consulta los aspectos básicos para la valoración y el registro de los signos vitales.",
    objetivo: "Orientar la toma, interpretación inicial y registro de los signos vitales durante las prácticas de simulación.",
    temas: ["Presión arterial", "Frecuencia cardiaca", "Frecuencia respiratoria", "Temperatura", "Saturación de oxígeno"],
    ruta: "/guia/signos-vitales",
  },
  {
    id: 2,
    titulo: "Guía de equipos biomédicos",
    categoria: "Equipos y tecnología",
    icono: "🖥️",
    resumen: "Reconoce el uso responsable y los cuidados básicos de los equipos biomédicos.",
    objetivo: "Promover el reconocimiento, la operación segura y el cuidado de los equipos disponibles en los ambientes de simulación.",
    temas: ["Identificación del equipo", "Verificación previa", "Uso seguro", "Limpieza y cuidado", "Reporte de novedades"],
    ruta: "/guia/biomedicos",
  },
  {
    id: 3,
    titulo: "Guía de desinfección",
    categoria: "Bioseguridad",
    icono: "🧴",
    resumen: "Repasa las medidas generales de limpieza y desinfección de superficies y elementos.",
    objetivo: "Recordar las medidas de bioseguridad aplicables al acondicionamiento de los ambientes y materiales de simulación.",
    temas: ["Higiene de manos", "Limpieza de superficies", "Desinfección de elementos", "Elementos de protección", "Disposición de residuos"],
    ruta: "/guia/desinfeccion",
  },
  {
    id: 4,
    titulo: "Guía de farmacia",
    categoria: "Manejo de insumos",
    icono: "💊",
    resumen: "Consulta recomendaciones generales para organizar y controlar insumos del área de farmacia.",
    objetivo: "Apoyar la organización, identificación, almacenamiento y control de los insumos utilizados en las actividades formativas.",
    temas: ["Organización", "Identificación y rotulado", "Almacenamiento", "Fechas de vencimiento", "Control de existencias"],
    ruta: "/guia/farmacia",
  },
  {
    id: 5,
    titulo: "Guía de geriatría",
    categoria: "Atención al usuario",
    icono: "👵",
    resumen: "Identifica consideraciones generales para la atención simulada de personas mayores.",
    objetivo: "Fortalecer una atención respetuosa, segura y centrada en la persona mayor durante los escenarios de aprendizaje.",
    temas: ["Comunicación respetuosa", "Movilización segura", "Valoración básica", "Prevención de caídas", "Acompañamiento"],
    ruta: "/guia/geriatria",
  },
  {
    id: 6,
    titulo: "Guía de laboratorio",
    categoria: "Ambientes de aprendizaje",
    icono: "🧪",
    resumen: "Conoce pautas generales para el trabajo organizado y seguro en el laboratorio.",
    objetivo: "Orientar el comportamiento, la preparación del espacio y el manejo responsable de los materiales del laboratorio.",
    temas: ["Preparación del ambiente", "Elementos de protección", "Manejo de materiales", "Orden y limpieza", "Cierre de actividad"],
    ruta: "/guia/laboratorio",
  },
  {
    id: 7,
    titulo: "Guía de atención prehospitalaria",
    categoria: "Atención de emergencias",
    icono: "🚑",
    resumen: "Repasa conceptos de preparación y actuación en escenarios de atención prehospitalaria simulada.",
    objetivo: "Apoyar el desarrollo de escenarios formativos de atención inicial, comunicación y trabajo en equipo.",
    temas: ["Seguridad de la escena", "Valoración inicial", "Comunicación", "Priorización", "Trabajo en equipo"],
    ruta: "/guia/prehospitalaria",
  },
  {
    id: 8,
    titulo: "Guía de reanimación cardiopulmonar",
    categoria: "Atención de emergencias",
    icono: "❤️",
    resumen: "Accede a la guía de apoyo para las prácticas de RCP en el entorno de simulación.",
    objetivo: "Facilitar la preparación de las actividades de práctica de reanimación cardiopulmonar conforme al protocolo y nivel de formación definidos por el instructor.",
    temas: ["Preparación del escenario", "Activación de ayuda", "Compresiones", "Uso del simulador", "Debriefing"],
    ruta: "/guia/rcp",
  },
  {
    id: 9,
    titulo: "Guía del sistema de monitoreo",
    categoria: "Equipos y tecnología",
    icono: "📟",
    resumen: "Reconoce los componentes y las funciones generales del sistema de monitoreo.",
    objetivo: "Orientar el reconocimiento y uso formativo del sistema de monitoreo disponible en el ambiente.",
    temas: ["Componentes", "Conexión de sensores", "Visualización de parámetros", "Alarmas", "Cuidado del equipo"],
    ruta: "/guia/monitoreo",
  },
  {
    id: 10,
    titulo: "Guía de registro y retroalimentación",
    categoria: "Gestión del aprendizaje",
    icono: "📝",
    resumen: "Consulta pautas para documentar las actividades y realizar retroalimentación formativa.",
    objetivo: "Promover el registro claro de las actividades de simulación y una retroalimentación orientada al aprendizaje.",
    temas: ["Registro de la práctica", "Observaciones", "Fortalezas", "Oportunidades de mejora", "Compromisos"],
    ruta: "/guia/retroalimentacion",
  },
];

export default function Guias() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [guiaSeleccionada, setGuiaSeleccionada] = useState(null);
  const [aviso, setAviso] = useState("");

  const categorias = useMemo(
    () => ["Todas", ...new Set(GUIAS.map((guia) => guia.categoria))],
    []
  );

  const guiasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return GUIAS.filter((guia) => {
      const coincideCategoria =
        categoria === "Todas" || guia.categoria === categoria;

      const contenido = [
        guia.titulo,
        guia.categoria,
        guia.resumen,
        guia.objetivo,
        ...guia.temas,
      ].join(" ").toLowerCase();

      return coincideCategoria && contenido.includes(termino);
    });
  }, [busqueda, categoria]);

  // Cerrar ventana con Escape.
  useEffect(() => {
    if (!guiaSeleccionada) return;

    const manejarEscape = (e) => {
      if (e.key === "Escape") setGuiaSeleccionada(null);
    };

    window.addEventListener("keydown", manejarEscape);

    return () => window.removeEventListener("keydown", manejarEscape);
  }, [guiaSeleccionada]);

  // Ocultar aviso automáticamente.
  useEffect(() => {
    if (!aviso) return;

    const temporizador = setTimeout(() => setAviso(""), 3000);

    return () => clearTimeout(temporizador);
  }, [aviso]);

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria("Todas");
    setAviso("Se limpiaron los filtros.");
  };

  const abrirGuia = (guia) => {
    // Verifica que la ruta esté registrada en App.jsx.
    const rutaExiste = GUIAS.some((item) => item.ruta === guia.ruta);

    if (rutaExiste) {
      setGuiaSeleccionada(null);
      navigate(guia.ruta);
    }
  };

  return (
    <div className="guias-page">
      <div className="guias-container">

        {/* ENCABEZADO */}
        <header className="guias-hero">
          <div className="guias-hero-content">
            <span className="guias-eyebrow">
              ✚ CENTRO DE SIMULACIÓN EN SALUD · SENA
            </span>

            <h1>Biblioteca de guías</h1>

            <p>
              Encuentra material de consulta para orientar tus prácticas,
              reconocer los equipos y fortalecer el aprendizaje en los
              ambientes de simulación.
            </p>
          </div>

          <div className="guias-hero-icon">✚</div>
        </header>

        {/* BUSCADOR */}
        <section className="guias-search-panel">
          <div className="guias-panel-heading">
            <div>
              <h2>Explorar guías</h2>
              <p>Busca por nombre, tema o categoría.</p>
            </div>

            <span className="guias-counter">
              {guiasFiltradas.length} de {GUIAS.length} guías
            </span>
          </div>

          <label className="guias-label" htmlFor="busqueda-guias">
            BUSCAR CONTENIDO
          </label>

          <div className="guias-search-box">
            <span>⌕</span>
            <input
              id="busqueda-guias"
              type="search"
              placeholder="Ej. signos vitales, bioseguridad, equipos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>

          {/* FILTROS */}
          <div className="guias-filter-area">
            <span className="guias-label">CATEGORÍAS</span>

            <div className="guias-filter-list">
              {categorias.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`guias-filter ${
                    categoria === item ? "active" : ""
                  }`}
                  aria-pressed={categoria === item}
                  onClick={() => setCategoria(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {(busqueda || categoria !== "Todas") && (
              <button
                type="button"
                className="guias-clear"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </section>

        {/* RESULTADOS */}
        {guiasFiltradas.length > 0 ? (
          <section className="guias-grid">
            {guiasFiltradas.map((guia) => (
              <article className="guia-card" key={guia.id}>
                <div className="guia-card-top">
                  <div className="guia-icon">
                    {guia.icono}
                  </div>

                  <span className="guia-category">
                    {guia.categoria}
                  </span>
                </div>

                <h3>{guia.titulo}</h3>

                <p className="guia-description">
                  {guia.resumen}
                </p>

                <div className="guia-card-actions">
                  <button
                    type="button"
                    className="guia-open-button"
                    onClick={() => abrirGuia(guia)}
                  >
                    Abrir guía completa <span>→</span>
                  </button>

                  <button
                    type="button"
                    className="guia-info-button"
                    title="Ver información"
                    aria-label={`Ver información de ${guia.titulo}`}
                    onClick={() => setGuiaSeleccionada(guia)}
                  >
                    i
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="guias-empty">
            <div>🔎</div>
            <h3>No encontramos resultados</h3>
            <p>
              Intenta con otra palabra o selecciona una categoría diferente.
            </p>

            <button
              type="button"
              className="guias-primary-button"
              onClick={limpiarFiltros}
            >
              Ver todas las guías
            </button>
          </section>
        )}

        {/* PIE DE PÁGINA */}
        <footer className="guias-footer">
          <strong>Centro de Simulación en Salud · SENA</strong>
          <p>Material de apoyo para actividades de formación y simulación.</p>
        </footer>
      </div>

      {/* VENTANA DE INFORMACIÓN */}
      {guiaSeleccionada && (
        <div
          className="guia-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setGuiaSeleccionada(null);
            }
          }}
        >
          <section
            className="guia-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guia-modal-title"
          >
            <div className="guia-modal-header">
              <div>
                <span className="guia-modal-category">
                  {guiaSeleccionada.categoria}
                </span>

                <h2 id="guia-modal-title">
                  {guiaSeleccionada.icono} {guiaSeleccionada.titulo}
                </h2>
              </div>

              <button
                type="button"
                className="guia-modal-close"
                aria-label="Cerrar ventana"
                onClick={() => setGuiaSeleccionada(null)}
              >
                ×
              </button>
            </div>

            <div className="guia-modal-divider" />

            <h3>Descripción</h3>
            <p>{guiaSeleccionada.resumen}</p>

            <h3>Objetivo</h3>
            <p>{guiaSeleccionada.objetivo}</p>

            <h3>Temas relacionados</h3>

            <div className="guia-topics">
              {guiaSeleccionada.temas.map((tema) => (
                <span key={tema}>{tema}</span>
              ))}
            </div>

            <div className="guia-modal-actions">
              <button
                type="button"
                className="guia-secondary-button"
                onClick={() => setGuiaSeleccionada(null)}
              >
                Cerrar
              </button>

              <button
                type="button"
                className="guias-primary-button"
                onClick={() => abrirGuia(guiaSeleccionada)}
              >
                Abrir guía completa →
              </button>
            </div>
          </section>
        </div>
      )}

      {/* AVISO */}
      {aviso && (
        <div className="guias-toast" role="status">
          ✓ {aviso}
        </div>
      )}
    </div>
  );
}
