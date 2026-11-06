import { useState } from "react";

export default function Simulaciones() {

  // Aquí guardamos si el usuario está viendo información de una simulación
  const [simulacionSeleccionada, setSimulacionSeleccionada] = useState(null);

  const escenarios = [
    {
      id: 1,
      nombre: "Atención de Urgencias",
      nivel: "Alta Fidelidad",
      icono: "🚑",
      imagen: "/img/g1.jpeg",
      descripcion:
        "Simulación de manejo de trauma y reanimación avanzada con simuladores de respuesta fisiológica real.",
      duracion: "45 min",
      participantes: "Hasta 8",
      ambiente: "Urgencias",
      estado: "Disponible",
      objetivo:
        "Fortalecer las competencias para la atención inicial de pacientes en situaciones de urgencia."
    },
    {
      id: 2,
      nombre: "Cuidados Intensivos (UCI)",
      nivel: "Alta Fidelidad",
      icono: "❤️",
      imagen: "/img/uci.jpg",
      descripcion:
        "Monitoreo invasivo y manejo de ventilación mecánica en pacientes en estado crítico.",
      duracion: "60 min",
      participantes: "Hasta 6",
      ambiente: "UCI",
      estado: "Disponible",
      objetivo:
        "Desarrollar habilidades para el cuidado y monitoreo de pacientes en estado crítico."
    },
    {
      id: 3,
      nombre: "Ginecobstetricia",
      nivel: "Media Fidelidad",
      icono: "👶",
      imagen: "/img/g5.jpeg",
      descripcion:
        "Prácticas de atención de parto normal y manejo de complicaciones neonatales inmediatas.",
      duracion: "50 min",
      participantes: "Hasta 8",
      ambiente: "Ginecobstétrico",
      estado: "Disponible",
      objetivo:
        "Fortalecer las habilidades de atención materno-infantil y respuesta ante situaciones obstétricas."
    }
  ];

  return (
    <section className="simulaciones-page">

      {/* Encabezado de la página.
          El navbar de arriba NO se coloca aquí porque ya lo trae DashboardLayout. */}
      <div className="simulaciones-header">

        <div>
          <span className="seccion">FORMACIÓN</span>

          <h1>Simulaciones Clínicas</h1>

          <p>
            Fortalecimiento de competencias en entornos de alta fidelidad.
          </p>
        </div>

      </div>

      {/* Resumen de simulaciones */}
      <div className="resumen-simulaciones">

        <div className="resumen-card">
          <div className="resumen-icono">🏥</div>

          <div>
            <span>Total de escenarios</span>
            <strong>3</strong>
          </div>
        </div>

        <div className="resumen-card">
          <div className="resumen-icono azul">⭐</div>

          <div>
            <span>Alta fidelidad</span>
            <strong>2</strong>
          </div>
        </div>

        <div className="resumen-card">
          <div className="resumen-icono morado">👥</div>

          <div>
            <span>Media fidelidad</span>
            <strong>1</strong>
          </div>
        </div>

        <div className="resumen-card">
          <div className="resumen-icono verde">◷</div>

          <div>
            <span>Tiempo promedio</span>
            <strong>50 min</strong>
          </div>
        </div>

      </div>

      {/* Título de los escenarios */}
      <div className="escenarios-contenedor">

        <div className="escenarios-titulo">

          <div>
            <div className="titulo-icono">📖</div>

            <div>
              <h2>Escenarios disponibles</h2>

              <p>
                Selecciona un escenario para ver su información detallada.
              </p>
            </div>
          </div>

          <div className="filtros">
            <input
              type="text"
              placeholder="🔍 Buscar escenario..."
            />

            <select defaultValue="Todos">
              <option value="Todos">Todos los niveles</option>
              <option value="Alta Fidelidad">Alta Fidelidad</option>
              <option value="Media Fidelidad">Media Fidelidad</option>
            </select>
          </div>

        </div>

        {/* Tarjetas */}
        <div className="escenarios-grid">

          {escenarios.map((escenario) => (

            <article
              className="escenario-card"
              key={escenario.id}
            >

              <div className="imagen-escenario">

                <img
                  src={escenario.imagen}
                  alt={escenario.nombre}
                />

                <span className="nivel">
                  {escenario.nivel}
                </span>

                <span className="estado">
                  ● {escenario.estado}
                </span>

              </div>

              <div className="contenido-escenario">

                <div className="nombre-escenario">
                  <span>{escenario.icono}</span>

                  <h3>{escenario.nombre}</h3>
                </div>

                <p className="descripcion">
                  {escenario.descripcion}
                </p>

                <div className="datos-escenario">

                  <div>
                    <span>◷</span>
                    <small>Duración</small>
                    <strong>{escenario.duracion}</strong>
                  </div>

                  <div>
                    <span>👥</span>
                    <small>Participantes</small>
                    <strong>{escenario.participantes}</strong>
                  </div>

                  <div>
                    <span>⌖</span>
                    <small>Ambiente</small>
                    <strong>{escenario.ambiente}</strong>
                  </div>

                </div>

                <button
                  className="boton-informacion"
                  onClick={() =>
                    setSimulacionSeleccionada(escenario)
                  }
                >
                  Ver información →
                </button>

              </div>

            </article>

          ))}

        </div>

      </div>

      {/* Ventana de información */}
      {simulacionSeleccionada && (

        <div
          className="modal-fondo"
          onClick={() => setSimulacionSeleccionada(null)}
        >

          <div
            className="modal-simulacion"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="cerrar-modal"
              onClick={() => setSimulacionSeleccionada(null)}
            >
              ×
            </button>

            <img
              src={simulacionSeleccionada.imagen}
              alt={simulacionSeleccionada.nombre}
            />

            <div className="modal-contenido">

              <span className="modal-nivel">
                {simulacionSeleccionada.nivel}
              </span>

              <h2>
                {simulacionSeleccionada.icono}{" "}
                {simulacionSeleccionada.nombre}
              </h2>

              <p>
                {simulacionSeleccionada.descripcion}
              </p>

              <h3>Objetivo de la simulación</h3>

              <p>
                {simulacionSeleccionada.objetivo}
              </p>

              <div className="modal-datos">

                <span>
                  ⏱️ {simulacionSeleccionada.duracion}
                </span>

                <span>
                  👥 {simulacionSeleccionada.participantes}
                </span>

                <span>
                  🏥 {simulacionSeleccionada.ambiente}
                </span>

              </div>

              <button
                className="boton-protocolo"
                onClick={() =>
                  alert(
                    `Protocolo de ${simulacionSeleccionada.nombre}`
                  )
                }
              >
                📄 Ver protocolo
              </button>

            </div>

          </div>

        </div>

      )}

      <style>{`

        .simulaciones-page {
          min-height: calc(100vh - 76px);
          padding: 30px;
          background: #f5f7f6;
          color: #20332c;
        }

        .simulaciones-header {
          margin-bottom: 22px;
        }

        .seccion {
          color: #006b3c;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .5px;
        }

        .simulaciones-header h1 {
          margin: 5px 0;
          font-size: 32px;
          color: #172b24;
        }

        .simulaciones-header p {
          margin: 0;
          color: #65756e;
          font-size: 16px;
        }

        /* Tarjetas del resumen */

        .resumen-simulaciones {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 22px;
        }

        .resumen-card {
          background: white;
          border: 1px solid #e1e8e4;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 3px 12px rgba(0,0,0,.04);
        }

        .resumen-icono {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #dff4e8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }

        .resumen-icono.azul {
          background: #e2efff;
        }

        .resumen-icono.morado {
          background: #eee5ff;
        }

        .resumen-icono.verde {
          background: #dff5f1;
        }

        .resumen-card span {
          display: block;
          color: #63736c;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .resumen-card strong {
          font-size: 25px;
          color: #172b24;
        }

        /* Contenedor de escenarios */

        .escenarios-contenedor {
          background: white;
          border-radius: 15px;
          padding: 20px;
          border: 1px solid #e1e8e4;
        }

        .escenarios-titulo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .escenarios-titulo > div:first-child {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .titulo-icono {
          font-size: 30px;
        }

        .escenarios-titulo h2 {
          margin: 0;
          font-size: 20px;
        }

        .escenarios-titulo p {
          margin: 4px 0 0;
          color: #718078;
          font-size: 14px;
        }

        .filtros {
          display: flex;
          gap: 12px;
        }

        .filtros input,
        .filtros select {
          height: 44px;
          border: 1px solid #d8e2dd;
          border-radius: 10px;
          padding: 0 14px;
          background: white;
          font-size: 14px;
          outline: none;
        }

        .filtros input {
          width: 260px;
        }

        .filtros select {
          width: 190px;
        }

        .filtros input:focus,
        .filtros select:focus {
          border-color: #39a900;
        }

        /* Tarjetas de simulación */

        .escenarios-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .escenario-card {
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid #dde6e1;
          background: white;
          box-shadow: 0 4px 14px rgba(0,0,0,.06);
          transition: .25s;
        }

        .escenario-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,.10);
        }

        .imagen-escenario {
          height: 190px;
          position: relative;
          overflow: hidden;
        }

        .imagen-escenario img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nivel,
        .estado {
          position: absolute;
          top: 12px;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .nivel {
          left: 12px;
          background: #087653;
          color: white;
        }

        .estado {
          right: 12px;
          background: #a8ef70;
          color: #155b2d;
        }

        .contenido-escenario {
          padding: 18px;
        }

        .nombre-escenario {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nombre-escenario span {
          font-size: 24px;
        }

        .nombre-escenario h3 {
          margin: 0;
          font-size: 18px;
          color: #172b24;
        }

        .descripcion {
          color: #6b7b74;
          line-height: 1.5;
          font-size: 14px;
          min-height: 63px;
        }

        .datos-escenario {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 18px 0;
        }

        .datos-escenario div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .datos-escenario span {
          color: #087653;
        }

        .datos-escenario small {
          color: #75827d;
          font-size: 11px;
        }

        .datos-escenario strong {
          font-size: 13px;
          color: #263832;
        }

        .boton-informacion,
        .boton-protocolo {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 12px;
          background: #087653;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .boton-informacion:hover,
        .boton-protocolo:hover {
          background: #006b3c;
        }

        /* Ventana emergente */

        .modal-fondo {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.55);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
          padding: 20px;
        }

        .modal-simulacion {
          width: min(650px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
        }

        .modal-simulacion > img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .cerrar-modal {
          position: absolute;
          right: 15px;
          top: 15px;
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 50%;
          background: white;
          font-size: 25px;
          cursor: pointer;
          z-index: 2;
        }

        .modal-contenido {
          padding: 25px;
        }

        .modal-nivel {
          background: #e5f5eb;
          color: #006b3c;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .modal-contenido h2 {
          margin: 15px 0 8px;
        }

        .modal-contenido p {
          color: #66766f;
          line-height: 1.6;
        }

        .modal-datos {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 0;
        }

        .modal-datos span {
          background: #eaf6ef;
          padding: 9px 12px;
          border-radius: 8px;
          color: #006b3c;
          font-size: 13px;
        }

        /* En celular las tarjetas se acomodan */

        @media (max-width: 1000px) {

          .resumen-simulaciones {
            grid-template-columns: repeat(2, 1fr);
          }

          .escenarios-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .escenarios-titulo {
            flex-direction: column;
            align-items: stretch;
          }

        }

        @media (max-width: 650px) {

          .simulaciones-page {
            padding: 18px;
          }

          .simulaciones-header h1 {
            font-size: 26px;
          }

          .resumen-simulaciones,
          .escenarios-grid {
            grid-template-columns: 1fr;
          }

          .filtros {
            flex-direction: column;
          }

          .filtros input,
          .filtros select {
            width: 100%;
          }

        }

      `}</style>

    </section>
  );
}