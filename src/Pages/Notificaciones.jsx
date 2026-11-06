
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "notificacionesSENA";

const INICIALES = [
  {
    id: 1,
    icono: "📅",
    titulo: "Nueva actividad programada",
    texto: "Se programó una simulación de signos vitales.",
    tiempo: "Hace 10 minutos",
    tipo: "Actividad",
    leida: false,
  },
  {
    id: 2,
    icono: "📝",
    titulo: "Evaluación disponible",
    texto: "Tienes una nueva evaluación pendiente.",
    tiempo: "Hace 1 hora",
    tipo: "Evaluación",
    leida: false,
  },
  {
    id: 3,
    icono: "📚",
    titulo: "Nueva guía educativa",
    texto: "Se publicó una nueva guía educativa.",
    tiempo: "Ayer",
    tipo: "Material",
    leida: true,
  },
  {
    id: 4,
    icono: "🩺",
    titulo: "Recordatorio de simulación",
    texto: "Recuerda verificar los equipos antes de iniciar la práctica.",
    tiempo: "Hace 2 horas",
    tipo: "Recordatorio",
    leida: false,
  },
];

const cargarNotificaciones = () => {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);
    if (!datos) return INICIALES;

    const parsed = JSON.parse(datos);
    return Array.isArray(parsed) ? parsed : INICIALES;
  } catch {
    return INICIALES;
  }
};

const iconosTipo = {
  Actividad: "📅",
  Evaluación: "📝",
  Material: "📚",
  Recordatorio: "🩺",
  Inventario: "📦",
  Sistema: "⚙️",
};

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState(cargarNotificaciones);
  const [filtro, setFiltro] = useState("Todas");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notificaciones)
      );
    } catch (error) {
      console.error("Error al guardar notificaciones:", error);
    }
  }, [notificaciones]);

  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => setMensaje(""), 2800);
    return () => clearTimeout(timer);
  }, [mensaje]);

  const pendientes = useMemo(
    () => notificaciones.filter((n) => !n.leida).length,
    [notificaciones]
  );

  const leidas = notificaciones.length - pendientes;

  const filtradas = useMemo(() => {
    if (filtro === "No leídas") {
      return notificaciones.filter((n) => !n.leida);
    }

    if (filtro === "Leídas") {
      return notificaciones.filter((n) => n.leida);
    }

    return notificaciones;
  }, [notificaciones, filtro]);

  const marcarLeida = (id) => {
    setNotificaciones((actuales) =>
      actuales.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      )
    );

    setMensaje("Notificación marcada como leída.");
  };

  const marcarTodas = () => {
    if (!pendientes) return;

    setNotificaciones((actuales) =>
      actuales.map((n) => ({ ...n, leida: true }))
    );

    setMensaje("Todas las notificaciones fueron marcadas como leídas.");
  };

  const eliminar = (id) => {
    setNotificaciones((actuales) =>
      actuales.filter((n) => n.id !== id)
    );

    setMensaje("Notificación eliminada correctamente.");
  };

  const restaurar = () => {
    setNotificaciones(INICIALES.map((n) => ({ ...n })));
    setFiltro("Todas");
    setMensaje("Notificaciones de ejemplo restauradas.");
  };

  return (
    <main className="noti-page">
      <style>{`
        .noti-page {
          --verde: #39a900;
          --verde-oscuro: #16753b;
          --texto: #172b3a;
          --gris: #718096;
          --borde: #e7edf0;
          min-height: 100%;
          padding: 30px;
          color: var(--texto);
          background: #f4f7f6;
          font-family: inherit;
        }

        .noti-page * {
          box-sizing: border-box;
        }

        .noti-container {
          max-width: 1250px;
          margin: auto;
        }

        /* ENCABEZADO */

        .noti-header {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
          padding: 30px;
          margin-bottom: 25px;
          border-radius: 18px;
          color: white;
          background: linear-gradient(115deg, #075b35, #168345 65%, #39a900);
          box-shadow: 0 10px 30px rgba(0, 90, 45, .14);
        }

        .noti-header::after {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          right: -75px;
          top: -130px;
          border: 35px solid rgba(255,255,255,.07);
          border-radius: 50%;
          pointer-events: none;
        }

        .noti-header-content {
          position: relative;
          z-index: 1;
        }

        .noti-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4f5df;
        }

        .noti-header h1 {
          margin: 10px 0;
          font-size: clamp(27px, 4vw, 38px);
          font-weight: 800;
          letter-spacing: -.8px;
        }

        .noti-header p {
          margin: 0;
          color: #e0f4e7;
          font-size: 14px;
          line-height: 1.6;
        }

        .noti-bell {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 76px;
          height: 76px;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 22px;
          background: rgba(255,255,255,.13);
          font-size: 34px;
          backdrop-filter: blur(8px);
        }

        /* ESTADÍSTICAS */

        .noti-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 17px;
          margin-bottom: 25px;
        }

        .noti-stat {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 21px;
          border: 1px solid var(--borde);
          border-radius: 15px;
          background: white;
          box-shadow: 0 4px 15px rgba(30,50,70,.025);
          transition: transform .2s, box-shadow .2s;
        }

        .noti-stat:hover {
          transform: translateY(-3px);
          box-shadow: 0 9px 22px rgba(30,50,70,.07);
        }

        .noti-stat-icon {
          display: grid;
          width: 49px;
          height: 49px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 13px;
          font-size: 23px;
        }

        .noti-stat-icon.green {
          background: #e9f8ed;
        }

        .noti-stat-icon.orange {
          background: #fff3e5;
        }

        .noti-stat-icon.blue {
          background: #eaf2ff;
        }

        .noti-stat small {
          display: block;
          margin-bottom: 5px;
          color: var(--gris);
          font-size: 12px;
          font-weight: 600;
        }

        .noti-stat strong {
          color: #243746;
          font-size: 27px;
          font-weight: 800;
        }

        /* CONTROLES */

        .noti-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          padding: 19px 22px;
          margin-bottom: 17px;
          border: 1px solid var(--borde);
          border-radius: 14px;
          background: white;
        }

        .noti-toolbar-title {
          font-size: 15px;
          font-weight: 750;
        }

        .noti-toolbar-subtitle {
          margin-top: 4px;
          color: var(--gris);
          font-size: 12px;
        }

        .noti-controls {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
        }

        .noti-btn {
          min-height: 39px;
          padding: 9px 14px;
          border: 1px solid #dce5e9;
          border-radius: 9px;
          background: white;
          color: #405364;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .noti-btn:hover:not(:disabled) {
          border-color: var(--verde);
          color: var(--verde-oscuro);
          background: #f3faf5;
        }

        .noti-btn.primary {
          border-color: var(--verde);
          color: white;
          background: var(--verde);
        }

        .noti-btn.primary:hover:not(:disabled) {
          background: #278b00;
          color: white;
        }

        .noti-btn:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        /* FILTROS */

        .noti-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .noti-filter {
          padding: 10px 17px;
          border: 1px solid #e1e8eb;
          border-radius: 9px;
          background: white;
          color: #697b89;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .noti-filter:hover {
          border-color: #a8d7b5;
          color: var(--verde-oscuro);
        }

        .noti-filter.active {
          border-color: #c9e9d2;
          background: #eaf7ee;
          color: #16753b;
        }

        /* LISTA */

        .noti-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .noti-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 17px;
          padding: 21px;
          border: 1px solid var(--borde);
          border-radius: 15px;
          background: white;
          box-shadow: 0 3px 12px rgba(30,50,70,.025);
          transition: transform .2s, box-shadow .2s, border-color .2s;
          animation: noti-enter .3s ease both;
        }

        .noti-card:hover {
          transform: translateY(-2px);
          border-color: #cbded1;
          box-shadow: 0 9px 24px rgba(30,50,70,.065);
        }

        .noti-card.unread {
          border-left: 4px solid var(--verde);
          background: linear-gradient(105deg, #f7fcf8, #fff 60%);
        }

        .noti-icon {
          display: grid;
          width: 53px;
          height: 53px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #e5eee8;
          border-radius: 14px;
          background: #f0f7f2;
          font-size: 25px;
        }

        .noti-content {
          min-width: 0;
          flex: 1;
        }

        .noti-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
        }

        .noti-title-row h3 {
          margin: 0;
          color: #203545;
          font-size: 15px;
          font-weight: 750;
        }

        .noti-new {
          padding: 4px 8px;
          border-radius: 5px;
          background: #e6f7eb;
          color: #16753b;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .7px;
        }

        .noti-description {
          margin: 9px 0 12px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .noti-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          color: #8995a1;
          font-size: 11px;
        }

        .noti-type {
          padding: 5px 9px;
          border-radius: 6px;
          background: #f0f3f5;
          color: #566979;
          font-weight: 700;
        }

        .noti-status {
          color: #168345;
          font-weight: 700;
        }

        .noti-card-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .noti-action {
          padding: 9px 11px;
          border: 1px solid #e0e7eb;
          border-radius: 8px;
          background: white;
          color: #536676;
          font: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .noti-action:hover {
          border-color: #a8d7b5;
          color: #16753b;
          background: #f3faf5;
        }

        .noti-action.delete:hover {
          border-color: #f0caca;
          color: #c53030;
          background: #fff5f5;
        }

        /* VACÍO Y MENSAJES */

        .noti-empty {
          padding: 65px 20px;
          border: 1px dashed #cbd8d0;
          border-radius: 16px;
          background: white;
          text-align: center;
        }

        .noti-empty-icon {
          display: grid;
          width: 70px;
          height: 70px;
          margin: auto auto 17px;
          place-items: center;
          border-radius: 20px;
          background: #edf7f0;
          font-size: 32px;
        }

        .noti-empty h3 {
          margin: 0 0 8px;
          font-size: 17px;
        }

        .noti-empty p {
          margin: 0 0 20px;
          color: var(--gris);
          font-size: 13px;
        }

        .noti-toast {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: calc(100vw - 35px);
          padding: 15px 20px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 12px;
          background: #174b31;
          color: white;
          box-shadow: 0 12px 35px rgba(0,0,0,.2);
          font-size: 13px;
          font-weight: 650;
          animation: noti-enter .25s ease;
        }

        @keyframes noti-enter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 850px) {
          .noti-page { padding: 20px; }
          .noti-stats { gap: 10px; }
          .noti-stat { padding: 15px; }
          .noti-card { flex-wrap: wrap; }
          .noti-card-actions { width: 100%; padding-left: 70px; }
        }

        @media (max-width: 600px) {
          .noti-page { padding: 13px; }
          .noti-header { padding: 23px 19px; }
          .noti-bell { width: 55px; height: 55px; font-size: 25px; }
          .noti-stats { grid-template-columns: 1fr; }
          .noti-stat { padding: 13px 16px; }
          .noti-stat strong { font-size: 23px; }
          .noti-toolbar { align-items: flex-start; }
          .noti-controls { width: 100%; }
          .noti-controls .noti-btn { flex: 1; }
          .noti-card { padding: 15px; gap: 12px; }
          .noti-icon { width: 45px; height: 45px; font-size: 21px; }
          .noti-content { width: calc(100% - 60px); }
          .noti-card-actions { padding-left: 57px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .noti-page *,
          .noti-page *::before,
          .noti-page *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="noti-container">

        <header className="noti-header">
          <div className="noti-header-content">
            <span className="noti-label">
              SENA · CENTRO DE SIMULACIÓN EN SALUD
            </span>

            <h1>Centro de notificaciones</h1>

            <p>
              Consulta las novedades, actividades y avisos importantes
              de tu centro de simulación.
            </p>
          </div>

          <div className="noti-bell" aria-hidden="true">
            🔔
          </div>
        </header>

        <section className="noti-stats">

          <div className="noti-stat">
            <div className="noti-stat-icon blue">📨</div>
            <div>
              <small>Total de notificaciones</small>
              <strong>{notificaciones.length}</strong>
            </div>
          </div>

          <div className="noti-stat">
            <div className="noti-stat-icon orange">🔔</div>
            <div>
              <small>Pendientes por revisar</small>
              <strong>{pendientes}</strong>
            </div>
          </div>

          <div className="noti-stat">
            <div className="noti-stat-icon green">✓</div>
            <div>
              <small>Notificaciones leídas</small>
              <strong>{leidas}</strong>
            </div>
          </div>

        </section>

        <section className="noti-toolbar">
          <div>
            <div className="noti-toolbar-title">
              Bandeja de notificaciones
            </div>
            <div className="noti-toolbar-subtitle">
              Administra y revisa tus avisos
            </div>
          </div>

          <div className="noti-controls">
            <button
              className="noti-btn"
              type="button"
              onClick={restaurar}
            >
              ↻ Restaurar
            </button>

            <button
              className="noti-btn primary"
              type="button"
              onClick={marcarTodas}
              disabled={pendientes === 0}
            >
              ✓ Marcar todas como leídas
            </button>
          </div>
        </section>

        <div className="noti-filters" role="group" aria-label="Filtros">
          {["Todas", "No leídas", "Leídas"].map((opcion) => (
            <button
              type="button"
              key={opcion}
              className={`noti-filter ${
                filtro === opcion ? "active" : ""
              }`}
              onClick={() => setFiltro(opcion)}
              aria-pressed={filtro === opcion}
            >
              {opcion}
              {opcion === "No leídas" && ` (${pendientes})`}
            </button>
          ))}
        </div>

        <section className="noti-list" aria-label="Listado de avisos">

          {filtradas.length > 0 ? (
            filtradas.map((n) => (
              <article
                key={n.id}
                className={`noti-card ${!n.leida ? "unread" : ""}`}
              >
                <div className="noti-icon" aria-hidden="true">
                  {n.icono || iconosTipo[n.tipo] || "🔔"}
                </div>

                <div className="noti-content">

                  <div className="noti-title-row">
                    <h3>{n.titulo}</h3>

                    {!n.leida && (
                      <span className="noti-new">
                        NUEVA
                      </span>
                    )}
                  </div>

                  <p className="noti-description">
                    {n.texto}
                  </p>

                  <div className="noti-meta">
                    <span>◷ {n.tiempo}</span>

                    <span className="noti-type">
                      {n.tipo}
                    </span>

                    <span className="noti-status">
                      {n.leida ? "✓ Leída" : "● Pendiente"}
                    </span>
                  </div>

                </div>

                <div className="noti-card-actions">

                  {!n.leida && (
                    <button
                      type="button"
                      className="noti-action"
                      onClick={() => marcarLeida(n.id)}
                    >
                      ✓ Marcar leída
                    </button>
                  )}

                  <button
                    type="button"
                    className="noti-action delete"
                    onClick={() => eliminar(n.id)}
                    aria-label={`Eliminar ${n.titulo}`}
                  >
                    🗑 Eliminar
                  </button>

                </div>
              </article>
            ))
          ) : (
            <div className="noti-empty">
              <div className="noti-empty-icon">🔔</div>

              <h3>
                {filtro === "No leídas"
                  ? "¡Excelente! Todo está al día"
                  : "No hay notificaciones"}
              </h3>

              <p>
                {filtro === "No leídas"
                  ? "No tienes avisos pendientes por revisar."
                  : "No hay avisos disponibles en esta categoría."}
              </p>

              {filtro !== "Todas" && (
                <button
                  className="noti-btn primary"
                  type="button"
                  onClick={() => setFiltro("Todas")}
                >
                  Ver todas las notificaciones
                </button>
              )}
            </div>
          )}

        </section>
      </div>

      {mensaje && (
        <div className="noti-toast" role="status" aria-live="polite">
          <span>✓</span>
          {mensaje}
        </div>
      )}

    </main>
  );
}
