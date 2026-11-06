import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  const { usuario } = useAuth();

  return (
    <div>

      <div className="welcome">

        <div>

          <span>Panel principal</span>

          <h1>
            Hola, {usuario?.nombres} 👋
          </h1>

          <p>
            Bienvenido al Centro de Simulación de
            Enfermería del SENA.
          </p>

        </div>

        <div className="role-badge">
          {usuario?.rol}
        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <span>🧪</span>
          <div>
            <strong>12</strong>
            <p>Simulaciones</p>
          </div>
        </div>

        <div className="stat-card">
          <span>🩺</span>
          <div>
            <strong>24</strong>
            <p>Equipos</p>
          </div>
        </div>

        <div className="stat-card">
          <span>📚</span>
          <div>
            <strong>18</strong>
            <p>Guías</p>
          </div>
        </div>

        <div className="stat-card">
          <span>📊</span>
          <div>
            <strong>8</strong>
            <p>Evaluaciones</p>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>Actividad reciente</h2>

          <div className="activity">
            <span>🧪</span>
            <div>
              <strong>Simulación completada</strong>
              <p>Sala de Monitoreo Clínico</p>
            </div>
          </div>

          <div className="activity">
            <span>📚</span>
            <div>
              <strong>Guía consultada</strong>
              <p>Signos vitales</p>
            </div>
          </div>

          <div className="activity">
            <span>📝</span>
            <div>
              <strong>Evaluación pendiente</strong>
              <p>Procedimientos básicos</p>
            </div>
          </div>

        </div>

        <div className="dashboard-card">

          <h2>Próximas actividades</h2>

          <div className="calendar-item">
            <strong>30</strong>
            <div>
              <b>Simulación clínica</b>
              <span>08:00 AM</span>
            </div>
          </div>

          <div className="calendar-item">
            <strong>02</strong>
            <div>
              <b>Evaluación práctica</b>
              <span>10:00 AM</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}