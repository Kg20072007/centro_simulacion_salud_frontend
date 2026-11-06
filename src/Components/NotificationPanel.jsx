// Usamos useState para controlar las notificaciones
// y saber si el panel está abierto o cerrado.
import { useState } from "react";


// Algunas notificaciones de ejemplo para mostrar
// cómo funcionará el panel dentro de la plataforma.
const notificacionesIniciales = [
  {
    id: 1,
    titulo: "Nueva evaluación disponible",
    mensaje:
      "Ya puedes consultar la evaluación de la próxima simulación.",
    tiempo: "Hace 10 minutos",
    icono: "📝",
    leida: false,
  },
  {
    id: 2,
    titulo: "Nueva guía publicada",
    mensaje:
      "Se publicó una nueva guía para la práctica de enfermería.",
    tiempo: "Hace 1 hora",
    icono: "📚",
    leida: false,
  },
  {
    id: 3,
    titulo: "Simulación programada",
    mensaje:
      "Recuerda que tienes una simulación programada para mañana.",
    tiempo: "Hace 3 horas",
    icono: "🏥",
    leida: true,
  },
  {
    id: 4,
    titulo: "Bienvenido al Centro de Simulación",
    mensaje:
      "Tu cuenta fue creada correctamente.",
    tiempo: "Ayer",
    icono: "👋",
    leida: true,
  },
];


export default function NotificationPanel({
  abierto,
  cerrar,
}) {

  // Aquí guardamos las notificaciones que aparecen
  // actualmente dentro del panel.
  const [notificaciones, setNotificaciones] = useState(
    notificacionesIniciales
  );


  // Contamos cuántas notificaciones todavía no han sido leídas.
  const pendientes = notificaciones.filter(
    (notificacion) => !notificacion.leida
  ).length;


  // Cuando el usuario selecciona una notificación,
  // la marcamos como leída.
  const marcarComoLeida = (id) => {

    setNotificaciones((anteriores) =>
      anteriores.map((notificacion) =>
        notificacion.id === id
          ? {
              ...notificacion,
              leida: true,
            }
          : notificacion
      )
    );
  };


  // Esta función permite marcar todas las notificaciones
  // como leídas de una sola vez.
  const marcarTodasComoLeidas = () => {

    setNotificaciones((anteriores) =>
      anteriores.map((notificacion) => ({
        ...notificacion,
        leida: true,
      }))
    );
  };


  // Si el panel no está abierto, no mostramos nada.
  if (!abierto) {
    return null;
  }


  return (

    <div className="notification-panel">


      {/* Encabezado del panel de notificaciones */}
      <div className="notification-header">

        <div>

          <h3>
            Notificaciones
          </h3>

          <span>
            {pendientes > 0
              ? `${pendientes} sin leer`
              : "Todo está al día"}
          </span>

        </div>


        {/* Botón para cerrar el panel */}
        <button
          type="button"
          className="notification-close"
          onClick={cerrar}
          aria-label="Cerrar notificaciones"
        >
          ×
        </button>

      </div>


      {/* Si tenemos notificaciones pendientes,
          mostramos la opción para marcarlas todas como leídas. */}
      {pendientes > 0 && (

        <div className="notification-actions">

          <button
            type="button"
            onClick={marcarTodasComoLeidas}
          >
            Marcar todas como leídas
          </button>

        </div>

      )}


      {/* Lista donde mostramos cada notificación */}
      <div className="notification-list">

        {notificaciones.length === 0 ? (

          // Este mensaje aparece si no hay ninguna notificación.
          <div className="notification-empty">

            <div className="notification-empty-icon">
              🔔
            </div>

            <p>
              No tienes notificaciones.
            </p>

          </div>

        ) : (

          notificaciones.map((notificacion) => (

            <button
              type="button"
              key={notificacion.id}
              className={`notification-item ${
                !notificacion.leida
                  ? "unread"
                  : ""
              }`}
              onClick={() =>
                marcarComoLeida(notificacion.id)
              }
            >

              {/* Icono de la notificación */}
              <div className="notification-icon">

                {notificacion.icono}

              </div>


              {/* Información de la notificación */}
              <div className="notification-content">

                <strong>
                  {notificacion.titulo}
                </strong>

                <p>
                  {notificacion.mensaje}
                </p>

                <small>
                  {notificacion.tiempo}
                </small>

              </div>


              {/* El punto verde nos indica que todavía
                  no hemos leído esa notificación. */}
              {!notificacion.leida && (

                <span
                  className="notification-dot"
                  aria-label="No leída"
                ></span>

              )}

            </button>

          ))

        )}

      </div>


      {/* Parte inferior del panel */}
      <div className="notification-footer">

        <button
          type="button"
          onClick={cerrar}
        >
          Ver todas las notificaciones
        </button>

      </div>

    </div>
  );
}