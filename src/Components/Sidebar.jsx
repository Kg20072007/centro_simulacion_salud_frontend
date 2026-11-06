import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ abierto, cerrar }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    cerrar();
    navigate("/login");
  };

  const rol = usuario?.rol || "Aprendiz";

  return (
    <>
      {abierto && (
        <div
          className="sidebar-overlay"
          onClick={cerrar}
        ></div>
      )}

      <aside
        className={`sidebar ${
          abierto ? "sidebar-open" : ""
        }`}
      >

        {/* PERFIL DEL USUARIO */}
        <div className="sidebar-header">

          <div className="user-avatar">
            {usuario?.nombres
              ? usuario.nombres.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <strong>
              {usuario?.nombres || "Usuario"}{" "}
              {usuario?.apellidos || ""}
            </strong>

            <small>{rol}</small>
          </div>

        </div>

        {/* MENÚ */}
        <div className="sidebar-menu">

          <Link to="/dashboard" onClick={cerrar}>
            🏠 Dashboard
          </Link>

          {/* ADMINISTRADOR E INSTRUCTOR */}
          {(rol === "Administrador" ||
            rol === "Instructor") && (
            <>
              <Link to="/cronograma" onClick={cerrar}>
                📅 Cronograma
              </Link>

              <Link to="/ambientes" onClick={cerrar}>
                🏥 Ambientes
              </Link>

              <Link to="/equipos" onClick={cerrar}>
                🩺 Equipos
              </Link>
            </>
          )}

          {/* SOLO ADMINISTRADOR */}
          {rol === "Administrador" && (
            <>
              <Link to="/usuarios" onClick={cerrar}>
                👥 Usuarios
              </Link>

              <Link to="/reportes" onClick={cerrar}>
                📊 Reportes
              </Link>
            </>
          )}

          {/* ADMINISTRADOR E INSTRUCTOR */}
          {(rol === "Administrador" ||
            rol === "Instructor") && (
            <Link to="/inventario" onClick={cerrar}>
              📦 Inventario
            </Link>
          )}

          {/* TODOS */}
          <Link to="/simulaciones" onClick={cerrar}>
            🧪 Simulaciones
          </Link>

          <Link to="/evaluaciones" onClick={cerrar}>
            📝 Evaluaciones
          </Link>

          <Link to="/guias" onClick={cerrar}>
            📚 Guías
          </Link>

          <Link to="/notificaciones" onClick={cerrar}>
            🔔 Notificaciones
          </Link>

        </div>

        {/* PARTE INFERIOR */}
        <div className="sidebar-bottom">

          <Link to="/perfil" onClick={cerrar}>
            👤 Mi perfil
          </Link>

          <Link to="/ajustes" onClick={cerrar}>
            ⚙️ Ajustes
          </Link>

          <button onClick={salir}>
            🚪 Cerrar sesión
          </button>

        </div>

      </aside>
    </>
  );
}