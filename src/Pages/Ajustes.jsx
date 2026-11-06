
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PREFERENCIAS_INICIALES = {
  modoOscuro: false,
  notificaciones: true,
  sonidos: false,
};

export default function Ajustes() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const [busqueda, setBusqueda] = useState("");
  const [aviso, setAviso] = useState("");

  const [preferencias, setPreferencias] = useState(() => {
    try {
      const guardadas = localStorage.getItem("preferenciasAjustesSENA");

      return guardadas
        ? {
            ...PREFERENCIAS_INICIALES,
            ...JSON.parse(guardadas),
          }
        : PREFERENCIAS_INICIALES;
    } catch {
      return PREFERENCIAS_INICIALES;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "preferenciasAjustesSENA",
      JSON.stringify(preferencias)
    );
  }, [preferencias]);

  useEffect(() => {
    document.documentElement.dataset.theme = preferencias.modoOscuro
      ? "dark"
      : "light";

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [preferencias.modoOscuro]);

  const nombre = usuario?.nombres || "Usuario";
  const rol = usuario?.rol || "Aprendiz";
  const correo = usuario?.correo || "Correo no registrado";

  useEffect(() => {
    if (!aviso) return undefined;
    const temporizador = window.setTimeout(() => setAviso(""), 3200);
    return () => window.clearTimeout(temporizador);
  }, [aviso]);

  const mostrarAviso = (mensaje) => setAviso(mensaje);

  const cambiarPreferencia = (clave) => {
    setPreferencias((actuales) => ({
      ...actuales,
      [clave]: !actuales[clave],
    }));
  };

  const cerrarSesion = () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?"
    );

    if (confirmar) {
      logout();
      navigate("/login", { replace: true });
    }
  };

  const grupos = [
    {
      titulo: "Cuenta",
      icono: "👤",
      opciones: [
        {
          icono: "🪪",
          titulo: "Información personal",
          descripcion: "Consulta y actualiza tus datos personales.",
          ruta: "/perfil",
        },
        {
          icono: "✉️",
          titulo: "Correo electrónico",
          descripcion: correo,
          ruta: "/perfil",
        },
        {
          icono: "🔐",
          titulo: "Cambiar contraseña",
          descripcion: "Gestiona la seguridad de tu cuenta.",
          accion: () =>
            mostrarAviso(
              "La función de cambio de contraseña estará disponible cuando se implemente el servicio de autenticación."
            ),
        },
      ],
    },
    {
      titulo: "Sistema",
      icono: "⚙️",
      opciones: [
        {
          icono: "🔔",
          titulo: "Notificaciones",
          descripcion: "Consulta tus avisos y recordatorios.",
          ruta: "/notificaciones",
        },
        {
          icono: "🎧",
          titulo: "Ayuda y soporte",
          descripcion: "Comunícate con el Centro de Simulación.",
          ruta: "/contacto",
        },
      ],
    },
    {
      titulo: "Información",
      icono: "ℹ️",
      opciones: [
        {
          icono: "💻",
          titulo: "Versión del sistema",
          descripcion: "Centro de Simulación SENA · 2026",
          accion: () =>
            mostrarAviso(
              "Centro de Simulación SENA · Versión 2026."
            ),
        },
        {
          icono: "🛡️",
          titulo: "Privacidad",
          descripcion: "Información sobre seguridad y datos.",
          accion: () =>
            mostrarAviso(
              "La política de privacidad debe configurarse según las normas de tu institución."
            ),
        },
      ],
    },
  ];

  const gruposFiltrados = grupos
    .map((grupo) => ({
      ...grupo,
      opciones: grupo.opciones.filter((opcion) =>
        `${opcion.titulo} ${opcion.descripcion}`
          .toLowerCase()
          .includes(busqueda.toLowerCase().trim())
      ),
    }))
    .filter((grupo) => grupo.opciones.length > 0);

  return (
    <div
      className={`settings-page ${
        preferencias.modoOscuro ? "settings-dark" : ""
      }`}
    >
      <style>{`
        .settings-page {
          --aj-bg: #f4f7fa;
          --aj-card: #ffffff;
          --aj-text: #243447;
          --aj-muted: #718096;
          --aj-border: #e2e8f0;
          --aj-primary: #16833b;

          min-height: 100vh;
          background: var(--aj-bg);
          color: var(--aj-text);
          transition: background .25s, color .25s;
        }

        .settings-page.settings-dark {
          --aj-bg: #111827;
          --aj-card: #1f2937;
          --aj-text: #f3f4f6;
          --aj-muted: #c0cad7;
          --aj-border: #374151;
          --aj-primary: #55c878;
        }

        .settings-page *,
        .settings-page *::before,
        .settings-page *::after {
          box-sizing: border-box;
        }

        .settings-page .settings-main {
          width: min(1160px, 94%);
          margin: 0 auto;
          padding: 34px 0 54px;
        }

        .settings-page .settings-heading {
          margin-bottom: 26px;
          animation: settings-appear .4s ease both;
        }

        .settings-page .settings-eyebrow {
          display: inline-block;
          color: var(--aj-primary);
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 800;
        }

        .settings-page .settings-heading h1 {
          margin: 9px 0;
          font-size: clamp(28px, 4vw, 38px);
        }

        .settings-page .settings-heading p {
          max-width: 650px;
          margin: 0;
          color: var(--aj-muted);
          line-height: 1.7;
        }

        .settings-page .settings-profile {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 24px;
          margin-bottom: 25px;
          background: linear-gradient(
            120deg,
            color-mix(in srgb, var(--aj-primary) 15%, var(--aj-card)),
            var(--aj-card)
          );
          border: 1px solid var(--aj-border);
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(20, 60, 35, .06);
          animation: settings-appear .45s ease both;
        }

        .settings-page .settings-avatar {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 66px;
          height: 66px;
          border-radius: 19px;
          background: var(--aj-primary);
          color: white;
          font-size: 28px;
          font-weight: 800;
        }

        .settings-page .settings-profile h2 {
          margin: 0 0 7px;
          font-size: 20px;
          overflow-wrap: anywhere;
        }

        .settings-page .settings-profile p {
          margin: 4px 0;
          color: var(--aj-muted);
          font-size: 13px;
          overflow-wrap: anywhere;
        }

        .settings-page .settings-search-wrap {
          position: relative;
          margin-bottom: 30px;
        }

        .settings-page .settings-search-icon {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .settings-page .settings-search {
          display: block;
          width: 100%;
          padding: 15px 16px 15px 45px;
          border: 1px solid var(--aj-border);
          border-radius: 12px;
          background: var(--aj-card);
          color: var(--aj-text);
          font: inherit;
          outline: none;
          transition: border .2s, box-shadow .2s;
        }

        .settings-page .settings-search:focus {
          border-color: var(--aj-primary);
          box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--aj-primary) 15%, transparent);
        }

        .settings-page .settings-group {
          margin-bottom: 30px;
          animation: settings-appear .4s ease both;
        }

        .settings-page .settings-group-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 14px;
          font-size: 19px;
        }

        .settings-page .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .settings-page .settings-option {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-width: 0;
          padding: 18px;
          text-align: left;
          text-decoration: none;
          color: var(--aj-text);
          background: var(--aj-card);
          border: 1px solid var(--aj-border);
          border-radius: 15px;
          cursor: pointer;
          font: inherit;
          transition: transform .2s, border-color .2s, box-shadow .2s;
        }

        .settings-page .settings-option:hover {
          transform: translateY(-3px);
          border-color: var(--aj-primary);
          box-shadow: 0 12px 26px rgba(18, 65, 37, .09);
        }

        .settings-page .settings-option:focus-visible {
          outline: 3px solid
            color-mix(in srgb, var(--aj-primary) 40%, transparent);
          outline-offset: 3px;
        }

        .settings-page .settings-option-icon {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border-radius: 13px;
          background: color-mix(in srgb, var(--aj-primary) 12%, transparent);
          font-size: 22px;
        }

        .settings-page .settings-option-info {
          flex: 1;
          min-width: 0;
        }

        .settings-page .settings-option-info strong {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .settings-page .settings-option-info span {
          display: block;
          color: var(--aj-muted);
          font-size: 12px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .settings-page .settings-arrow {
          color: var(--aj-muted);
          font-size: 24px;
          flex-shrink: 0;
        }

        .settings-page .settings-preferences {
          padding: 23px;
          margin-bottom: 28px;
          background: var(--aj-card);
          border: 1px solid var(--aj-border);
          border-radius: 16px;
        }

        .settings-page .settings-preferences h2 {
          margin: 0 0 7px;
          font-size: 19px;
        }

        .settings-page .settings-preferences > p {
          margin: 0 0 12px;
          color: var(--aj-muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .settings-page .settings-preference-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--aj-border);
        }

        .settings-page .settings-preference-row:last-child {
          border-bottom: 0;
        }

        .settings-page .settings-preference-row strong {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .settings-page .settings-preference-row span {
          color: var(--aj-muted);
          font-size: 12px;
          line-height: 1.5;
        }

        .settings-page .settings-switch {
          width: 48px;
          height: 28px;
          flex-shrink: 0;
          padding: 3px;
          border: none;
          border-radius: 30px;
          background: #9ca3af;
          cursor: pointer;
          transition: background .2s;
        }

        .settings-page .settings-switch.on {
          background: var(--aj-primary);
        }

        .settings-page .settings-switch span {
          display: block;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          transition: transform .2s;
        }

        .settings-page .settings-switch.on span {
          transform: translateX(20px);
        }

        .settings-page .settings-switch:focus-visible {
          outline: 3px solid
            color-mix(in srgb, var(--aj-primary) 40%, transparent);
          outline-offset: 3px;
        }

        .settings-page .settings-logout {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          padding: 22px;
          background: var(--aj-card);
          border: 1px solid #efb8b8;
          border-radius: 15px;
        }

        .settings-page .settings-logout h3 {
          margin: 0 0 6px;
          font-size: 16px;
        }

        .settings-page .settings-logout p {
          margin: 0;
          color: var(--aj-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .settings-page .settings-logout button {
          flex-shrink: 0;
          padding: 12px 16px;
          border: none;
          border-radius: 9px;
          background: #c53030;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s, transform .2s;
        }

        .settings-page .settings-logout button:hover {
          background: #9b2525;
          transform: translateY(-1px);
        }

        .settings-page .settings-empty {
          padding: 35px 20px;
          margin-bottom: 25px;
          border: 1px dashed var(--aj-border);
          border-radius: 14px;
          text-align: center;
          color: var(--aj-muted);
          line-height: 1.7;
        }

        .settings-page .settings-footer {
          padding: 20px;
          border-top: 1px solid var(--aj-border);
          text-align: center;
          color: var(--aj-muted);
          font-size: 12px;
        }

        .settings-page .settings-toast {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 1000;
          max-width: calc(100vw - 40px);
          padding: 14px 18px;
          border-radius: 10px;
          background: #174b2e;
          color: white;
          box-shadow: 0 8px 25px #0002;
          animation: settings-appear .2s ease both;
        }

        @keyframes settings-appear {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 700px) {
          .settings-page .settings-main {
            width: 92%;
            padding-top: 25px;
          }

          .settings-page .settings-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .settings-page .settings-profile {
            align-items: flex-start;
            padding: 16px;
            gap: 13px;
          }

          .settings-page .settings-avatar {
            width: 52px;
            height: 52px;
            border-radius: 14px;
          }

          .settings-page .settings-option {
            padding: 14px;
            gap: 11px;
          }

          .settings-page .settings-option-icon {
            width: 40px;
            height: 40px;
          }

          .settings-page .settings-preferences {
            padding: 17px;
          }

          .settings-page .settings-logout {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .settings-page *,
          .settings-page *::before,
          .settings-page *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <main className="settings-main">
        <section className="settings-heading">
          <span className="settings-eyebrow">CONFIGURACIÓN</span>
          <h1>Ajustes de la cuenta</h1>
          <p>
            Administra tu información personal y personaliza
            tu experiencia en el Centro de Simulación SENA.
          </p>
        </section>

        <section className="settings-profile">
          <div className="settings-avatar">
            {nombre.trim().charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2>{nombre}</h2>
            <p>{rol} · Centro de Simulación SENA</p>
            <p>{correo}</p>
          </div>
        </section>

        <div className="settings-search-wrap">
          <span className="settings-search-icon" aria-hidden="true">
            🔎
          </span>

          <input
            className="settings-search"
            type="search"
            placeholder="Buscar ajustes, cuenta, notificaciones..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            aria-label="Buscar ajustes"
          />
        </div>

        {gruposFiltrados.map((grupo) => (
          <section className="settings-group" key={grupo.titulo}>
            <h2 className="settings-group-title">
              <span>{grupo.icono}</span>
              {grupo.titulo}
            </h2>

            <div className="settings-grid">
              {grupo.opciones.map((opcion) => {
                const contenido = (
                  <>
                    <span className="settings-option-icon">
                      {opcion.icono}
                    </span>

                    <span className="settings-option-info">
                      <strong>{opcion.titulo}</strong>
                      <span>{opcion.descripcion}</span>
                    </span>

                    <span className="settings-arrow" aria-hidden="true">
                      ›
                    </span>
                  </>
                );

                if (opcion.ruta) {
                  return (
                    <Link
                      className="settings-option"
                      to={opcion.ruta}
                      key={opcion.titulo}
                    >
                      {contenido}
                    </Link>
                  );
                }

                return (
                  <button
                    className="settings-option"
                    type="button"
                    key={opcion.titulo}
                    onClick={opcion.accion}
                  >
                    {contenido}
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {gruposFiltrados.length === 0 && (
          <div className="settings-empty">
            <div style={{ fontSize: 32 }}>🔍</div>
            <strong>No encontramos ajustes</strong>
            <p>
              No hay resultados para “{busqueda}”. Intenta con
              otra palabra.
            </p>
            <button
              type="button"
              className="settings-logout-button"
              onClick={() => setBusqueda("")}
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        <section className="settings-preferences">
          <h2>Preferencias rápidas</h2>
          <p>
            Personaliza algunos aspectos de la interfaz.
            Tus preferencias se guardan en este navegador.
          </p>

          <div className="settings-preference-row">
            <div>
              <strong>🌙 Modo oscuro</strong>
              <span>Utiliza colores oscuros en esta pantalla.</span>
            </div>

            <button
              type="button"
              className={`settings-switch ${
                preferencias.modoOscuro ? "on" : ""
              }`}
              role="switch"
              aria-checked={preferencias.modoOscuro}
              aria-label="Activar modo oscuro"
              onClick={() => cambiarPreferencia("modoOscuro")}
            >
              <span />
            </button>
          </div>

          <div className="settings-preference-row">
            <div>
              <strong>🔔 Notificaciones</strong>
              <span>
                Guarda tu preferencia para recibir avisos.
              </span>
            </div>

            <button
              type="button"
              className={`settings-switch ${
                preferencias.notificaciones ? "on" : ""
              }`}
              role="switch"
              aria-checked={preferencias.notificaciones}
              aria-label="Activar preferencia de notificaciones"
              onClick={() => cambiarPreferencia("notificaciones")}
            >
              <span />
            </button>
          </div>

          <div className="settings-preference-row">
            <div>
              <strong>🔊 Efectos de sonido</strong>
              <span>
                Guarda tu preferencia para los sonidos del sistema.
              </span>
            </div>

            <button
              type="button"
              className={`settings-switch ${
                preferencias.sonidos ? "on" : ""
              }`}
              role="switch"
              aria-checked={preferencias.sonidos}
              aria-label="Activar preferencia de sonidos"
              onClick={() => cambiarPreferencia("sonidos")}
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-logout">
          <div>
            <h3>🚪 Cerrar sesión</h3>
            <p>
              Al salir tendrás que iniciar sesión nuevamente
              para acceder al Centro de Simulación.
            </p>
          </div>

          <button type="button" onClick={cerrarSesion}>
            Cerrar sesión ↗
          </button>
        </section>
      </main>

      <footer className="settings-footer">
        © 2026 Centro de Simulación Clínica - SENA · Ajustes
      </footer>

      {aviso && (
        <div className="settings-toast" role="status">
          ✓ {aviso}
        </div>
      )}
    </div>
  );
}
