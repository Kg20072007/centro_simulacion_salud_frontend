import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Abrimos o cerramos el menú cuando estamos en celular
  const cambiarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Cerramos el menú cuando entramos a una sección
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Aquí hacemos la búsqueda de los módulos principales
  const realizarBusqueda = (e) => {
    e.preventDefault();

    if (!busqueda.trim()) return;

    navigate(`/dashboard?buscar=${encodeURIComponent(busqueda)}`);
    setBusqueda("");
    cerrarMenu();
  };

  // Cerramos la sesión desde el Navbar
  const cerrarSesion = () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres cerrar sesión?"
    );

    if (confirmar) {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      <header className="navbar-principal">

        {/* Logo del Centro de Simulación */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={cerrarMenu}
        >
          <img
            src="/img/logo1.png"
            alt="Logo Centro de Simulación de Enfermería"
          />

          <div className="logo-texto">
            <strong>Centro de Simulación</strong>
            <span>SENA</span>
          </div>
        </Link>

        {/* Botón para celulares */}
        <button
          className="menu-mobile"
          onClick={cambiarMenu}
          aria-label="Abrir menú"
        >
          {menuAbierto ? "✕" : "☰"}
        </button>

        <div
          className={`navbar-contenido ${
            menuAbierto ? "navbar-visible" : ""
          }`}
        >

          {/* Menú principal */}
          <nav className="navbar-menu">

            <Link
              to="/"
              onClick={cerrarMenu}
            >
              Inicio
            </Link>

            <Link
              to="/acerca"
              onClick={cerrarMenu}
            >
              Acerca de nosotros
            </Link>

            <Link
              to="/servicios"
              onClick={cerrarMenu}
            >
              Servicios
            </Link>

            <Link
              to="/simulaciones"
              onClick={cerrarMenu}
            >
              Simulaciones
            </Link>

            <Link
              to="/contacto"
              onClick={cerrarMenu}
            >
              Contacto
            </Link>

          </nav>

          {/* Opciones de la derecha */}
          <div className="navbar-derecha">

            <form
              className="navbar-busqueda"
              onSubmit={realizarBusqueda}
            >
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button type="submit" title="Buscar">
                🔍
              </button>
            </form>

            <button
              className="navbar-icono"
              title="Notificaciones"
              onClick={() => {
                navigate("/notificaciones");
                cerrarMenu();
              }}
            >
              🔔
              <span className="notificacion-numero">
                1
              </span>
            </button>

            <Link
              to="/perfil"
              className="navbar-perfil"
              onClick={cerrarMenu}
            >
              <span className="avatar">
                {usuario?.nombre
                  ? usuario.nombre.charAt(0).toUpperCase()
                  : "U"}
              </span>

              <span className="nombre-usuario">
                {usuario?.nombre || "Mi perfil"}
              </span>
            </Link>

            <Link
              to="/ajustes"
              className="navbar-ajustes"
              onClick={cerrarMenu}
            >
              ⚙️
            </Link>

            {usuario && (
              <button
                className="navbar-salir"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            )}

          </div>
        </div>
      </header>

      {/* Todos los estilos quedan aquí para evitar problemas con archivos CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .navbar-principal {
          width: 100%;
          min-height: 76px;
          padding: 10px 4%;
          background: #ffffff;
          border-bottom: 1px solid #e3e8e5;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.07);

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;

          position: sticky;
          top: 0;
          z-index: 1000;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;

          text-decoration: none;
          color: #006b3c;

          flex-shrink: 0;
        }

        .navbar-logo img {
          width: 58px;
          height: 58px;
          object-fit: contain;
          display: block;
        }

        .logo-texto {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .logo-texto strong {
          font-size: 17px;
          color: #006b3c;
        }

        .logo-texto span {
          margin-top: 3px;
          font-size: 11px;
          color: #6b7772;
          letter-spacing: 1px;
          font-weight: bold;
        }

        /* Parte que contiene menú y acciones */
        .navbar-contenido {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 25px;
          flex: 1;
        }

        /* Menú principal */
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .navbar-menu a {
          position: relative;

          text-decoration: none;
          color: #263238;
          font-size: 14px;
          font-weight: 600;

          padding: 10px 12px;
          border-radius: 7px;

          transition: 0.25s ease;
        }

        .navbar-menu a:hover {
          color: #006b3c;
          background: #eaf6ef;
        }

        .navbar-menu a::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 5px;

          height: 2px;
          background: #39a900;

          transform: scaleX(0);
          transition: 0.25s;
        }

        .navbar-menu a:hover::after {
          transform: scaleX(1);
        }

        /* Opciones de la derecha */
        .navbar-derecha {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Buscador */
        .navbar-busqueda {
          height: 38px;
          display: flex;
          align-items: center;

          background: #f7f9f8;
          border: 1px solid #d9dfdc;
          border-radius: 20px;

          padding: 0 6px 0 14px;

          transition: 0.25s;
        }

        .navbar-busqueda:focus-within {
          border-color: #39a900;
          box-shadow: 0 0 0 3px rgba(57, 169, 0, 0.12);
        }

        .navbar-busqueda input {
          width: 105px;

          border: none;
          outline: none;
          background: transparent;

          font-size: 13px;
          color: #263238;
        }

        .navbar-busqueda input::placeholder {
          color: #89938f;
        }

        .navbar-busqueda button {
          width: 28px;
          height: 28px;

          border: none;
          border-radius: 50%;
          background: transparent;

          cursor: pointer;
          font-size: 14px;
        }

        .navbar-busqueda button:hover {
          background: #eaf6ef;
        }

        /* Campana */
        .navbar-icono {
          position: relative;

          width: 38px;
          height: 38px;

          border: none;
          border-radius: 50%;
          background: transparent;

          cursor: pointer;
          font-size: 17px;

          transition: 0.25s;
        }

        .navbar-icono:hover {
          background: #eaf6ef;
        }

        .notificacion-numero {
          position: absolute;
          top: 2px;
          right: 0;

          width: 16px;
          height: 16px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          background: #d32f2f;
          color: white;

          font-size: 9px;
          font-weight: bold;
        }

        /* Perfil */
        .navbar-perfil {
          display: flex;
          align-items: center;
          gap: 7px;

          text-decoration: none;
          color: #263238;

          padding: 5px 8px;
          border-radius: 8px;

          transition: 0.25s;
        }

        .navbar-perfil:hover {
          background: #eaf6ef;
          color: #006b3c;
        }

        .avatar {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          background: #006b3c;
          color: white;

          font-size: 14px;
          font-weight: bold;
        }

        .nombre-usuario {
          max-width: 100px;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          font-size: 13px;
          font-weight: 600;
        }

        /* Ajustes */
        .navbar-ajustes {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          text-decoration: none;

          font-size: 16px;

          transition: 0.25s;
        }

        .navbar-ajustes:hover {
          background: #eaf6ef;
          transform: rotate(15deg);
        }

        /* Cerrar sesión */
        .navbar-salir {
          border: none;
          background: #c62828;
          color: white;

          padding: 9px 13px;
          border-radius: 7px;

          font-size: 12px;
          font-weight: bold;

          cursor: pointer;
          transition: 0.25s;
        }

        .navbar-salir:hover {
          background: #a91f1f;
          transform: translateY(-1px);
        }

        /* Botón del menú móvil */
        .menu-mobile {
          display: none;

          width: 42px;
          height: 42px;

          border: none;
          border-radius: 8px;

          background: #006b3c;
          color: white;

          font-size: 22px;
          cursor: pointer;
        }

        /* Tablet */
        @media (max-width: 1100px) {

          .navbar-principal {
            padding: 10px 20px;
          }

          .navbar-contenido {
            gap: 10px;
          }

          .navbar-menu {
            gap: 0;
          }

          .navbar-menu a {
            padding: 9px 7px;
            font-size: 13px;
          }

          .navbar-busqueda {
            width: 100px;
          }

          .navbar-busqueda input {
            width: 65px;
          }

          .nombre-usuario {
            display: none;
          }
        }

        /* Celulares */
        @media (max-width: 850px) {

          .navbar-principal {
            min-height: 68px;
            padding: 8px 15px;
            flex-wrap: wrap;
          }

          .navbar-logo img {
            width: 50px;
            height: 50px;
          }

          .logo-texto strong {
            font-size: 15px;
          }

          .menu-mobile {
            display: block;
            margin-left: auto;
          }

          .navbar-contenido {
            display: none;

            width: 100%;
            flex-direction: column;
            align-items: stretch;

            padding: 15px 0 10px;
            border-top: 1px solid #edf0ee;
          }

          .navbar-contenido.navbar-visible {
            display: flex;
          }

          .navbar-menu {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }

          .navbar-menu a {
            width: 100%;
            padding: 12px 15px;
          }

          .navbar-menu a::after {
            display: none;
          }

          .navbar-derecha {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            padding-top: 8px;
          }

          .navbar-busqueda {
            flex: 1;
            min-width: 180px;
          }

          .navbar-busqueda input {
            width: 100%;
          }

          .nombre-usuario {
            display: inline;
          }

          .navbar-salir {
            padding: 9px 16px;
          }
        }

        @media (max-width: 450px) {

          .logo-texto span {
            display: none;
          }

          .navbar-logo img {
            width: 45px;
            height: 45px;
          }

          .logo-texto strong {
            font-size: 14px;
          }

          .navbar-derecha {
            justify-content: space-between;
          }

          .navbar-busqueda {
            width: 100%;
            flex-basis: 100%;
          }

          .navbar-perfil {
            flex: 1;
          }
        }

      `}</style>
    </>
  );
}