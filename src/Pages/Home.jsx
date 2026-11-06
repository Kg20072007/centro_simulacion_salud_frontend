import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  // Aquí guardamos lo que el usuario escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Este estado nos dice qué categoría estamos mostrando
  const [categoria, setCategoria] = useState("todos");

  const modulos = [
    {
      id: 1,
      nombre: "Cronograma del Ambiente",
      categoria: "ambiente",
      imagen: "/img/simulacion.jpeg",
      ruta: "/cronograma",
    },
    {
      id: 2,
      nombre: "Uso de Equipos",
      categoria: "equipos",
      imagen: "/img/equipos.jpeg",
      ruta: "/equipos",
    },
    {
      id: 3,
      nombre: "Inventario de Insumos",
      categoria: "insumos",
      imagen: "/img/Inventario Insumos.png",
      ruta: "/inventario",
    },
    {
      id: 4,
      nombre: "Reportes",
      categoria: "reportes",
      imagen: "/img/reporte.jpeg",
      ruta: "/reportes",
    },
  ];

  // Filtramos los módulos según lo que escriba el usuario
  const modulosFiltrados = modulos.filter((modulo) => {
    const coincideTexto = modulo.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "todos" || modulo.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  // Cerramos la sesión y regresamos al login
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
    <div className="home-page">

      {/* Barra superior con las opciones principales */}
      <header className="header-home">

        <div className="logo-home">
          <img
            src="/img/logo1.png"
            alt="Logo SENA"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <span>Centro de Simulación</span>
        </div>

        <nav className="nav-home">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>

            <li>
              <Link to="/acerca">Acerca de nosotros</Link>
            </li>

            <li>
              <Link to="/servicios">Servicios</Link>
            </li>

            <li>
              <Link to="/simulaciones">Simulaciones</Link>
            </li>

            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </nav>

        {/* Parte derecha del menú */}
        <div className="right-home">

          <div className="search-home">
            <input
              type="text"
              placeholder="Buscar..."
            />

            <span>🔍</span>
          </div>

          <button
            className="icon-home"
            title="Favoritos"
            onClick={() => alert("Aquí aparecerán tus favoritos.")}
          >
            ❤️
          </button>

          <button
            className="icon-home badge-home"
            title="Notificaciones"
            onClick={() => navigate("/notificaciones")}
          >
            🔔
            <span>1</span>
          </button>

          <Link
            to="/perfil"
            className="btn-nav-action"
            title="Ver perfil"
          >
            👤 Perfil
          </Link>

          <Link
            to="/ajustes"
            className="btn-nav-action"
            title="Ajustes"
          >
            ⚙️ Ajustes
          </Link>

          <button
            className="btn-logout"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Si hay usuario mostramos su nombre */}
      {usuario && (
        <div className="usuario-barra">
          Bienvenido/a, <strong>{usuario.nombre || "Usuario"}</strong>
        </div>
      )}

      {/* Presentación principal */}
      <section className="hero-home">
        <h1>Centro Simulación</h1>

        <p>
          Sistema de gestión del ambiente, equipos e insumos
        </p>
      </section>

      {/* Buscador y filtros */}
      <section className="controls-home">

        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar módulo..."
          className="buscador-home"
        />

        <div className="filtros-home">

          <button
            className={categoria === "todos" ? "filtro-activo" : ""}
            onClick={() => setCategoria("todos")}
          >
            Todos
          </button>

          <button
            className={categoria === "ambiente" ? "filtro-activo" : ""}
            onClick={() => setCategoria("ambiente")}
          >
            Ambiente
          </button>

          <button
            className={categoria === "equipos" ? "filtro-activo" : ""}
            onClick={() => setCategoria("equipos")}
          >
            Equipos
          </button>

          <button
            className={categoria === "insumos" ? "filtro-activo" : ""}
            onClick={() => setCategoria("insumos")}
          >
            Insumos
          </button>

          <button
            className={categoria === "reportes" ? "filtro-activo" : ""}
            onClick={() => setCategoria("reportes")}
          >
            Reportes
          </button>
        </div>
      </section>

      {/* Aquí mostramos los módulos del sistema */}
      <section className="cards-home">

        {modulosFiltrados.length > 0 ? (
          modulosFiltrados.map((modulo) => (
            <div
              className="card-home"
              key={modulo.id}
            >
              <img
                src={modulo.imagen}
                alt={modulo.nombre}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x160?text=Centro+de+Simulacion";
                }}
              />

              <div className="contenido-card">
                <h2>{modulo.nombre}</h2>

                <Link to={modulo.ruta}>
                  Ingresar
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="sin-resultados">
            <div>🔎</div>

            <h2>No encontramos resultados</h2>

            <p>
              Intenta buscar otro módulo o cambia el filtro.
            </p>

            <button
              onClick={() => {
                setBusqueda("");
                setCategoria("todos");
              }}
            >
              Mostrar todos
            </button>
          </div>
        )}

      </section>

      {/* Pie de página del proyecto */}
      <footer className="footer-sena-home">

        <div className="footer-top-home">

          <div>
            <h3>
              SERVICIO NACIONAL DE APRENDIZAJE SENA
            </h3>

            <p>
              Dirección General: Calle 57 No. 8 - 69
              Bogotá D.C., Colombia
            </p>

            <p>
              Líneas de atención: Bogotá (+57) 601 736 60 60
            </p>

            <p>
              Línea gratuita 018000 910270
            </p>
          </div>

          <div className="logo-footer-home">
            <img
              src="/img/logo1.png"
              alt="Logo SENA"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="footer-bottom-home">
          <p>
            © 2026 Centro de Simulación Clínica -
            Proyecto Formativo SENA
          </p>
        </div>

      </footer>

      {/* Los estilos quedan dentro de este mismo archivo */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .home-page {
          min-height: 100vh;
          background: #f4f7f6;
          color: #222;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* Barra superior */
        .header-home {
          background: #ffffff;
          border-bottom: 1px solid #e0e0e0;
          padding: 10px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo-home {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
          font-size: 18px;
          color: #006b3c;
          white-space: nowrap;
        }

        .logo-home img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .nav-home ul {
          list-style: none;
          display: flex;
          gap: 18px;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-home a {
          text-decoration: none;
          color: #222;
          font-size: 14px;
          font-weight: 500;
          transition: 0.3s;
        }

        .nav-home a:hover {
          color: #006b3c;
        }

        /* Botones de la parte derecha */
        .right-home {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-home {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          padding: 5px 10px;
          border-radius: 20px;
          background: #fafafa;
        }

        .search-home input {
          border: none;
          outline: none;
          background: transparent;
          width: 100px;
          font-size: 13px;
        }

        .search-home span {
          font-size: 13px;
        }

        .icon-home {
          position: relative;
          border: none;
          background: transparent;
          font-size: 16px;
          cursor: pointer;
          padding: 7px;
        }

        .badge-home span {
          position: absolute;
          top: 0;
          right: -2px;
          background: #d32f2f;
          color: white;
          font-size: 10px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .btn-nav-action {
          background: transparent;
          border: none;
          color: #444;
          font-size: 13px;
          cursor: pointer;
          padding: 7px 9px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          transition: 0.2s;
        }

        .btn-nav-action:hover {
          background: #f0f0f0;
          color: #006b3c;
        }

        .btn-logout {
          padding: 7px 12px;
          background: #c62828;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
          transition: 0.3s;
        }

        .btn-logout:hover {
          background: #b71c1c;
        }

        /* Pequeña barra de bienvenida */
        .usuario-barra {
          background: #eaf6ef;
          color: #006b3c;
          padding: 8px 30px;
          font-size: 14px;
          text-align: right;
        }

        /* Parte principal */
        .hero-home {
          background: #1e5a38;
          color: white;
          text-align: center;
          padding: 60px 20px;
        }

        .hero-home h1 {
          font-size: 38px;
          margin: 0 0 10px;
          font-weight: bold;
        }

        .hero-home p {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
        }

        /* Buscador y filtros */
        .controls-home {
          max-width: 900px;
          margin: -20px auto 30px;
          text-align: center;
          padding: 0 20px;
          position: relative;
        }

        .buscador-home {
          width: 100%;
          padding: 12px 20px;
          border-radius: 25px;
          border: 1px solid #006b3c;
          outline: none;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 15px;
          background: white;
        }

        .buscador-home:focus {
          box-shadow: 0 0 0 3px rgba(0, 107, 60, 0.15);
        }

        .filtros-home {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filtros-home button {
          background: #006b3c;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 13px;
          transition: 0.3s;
        }

        .filtros-home button:hover {
          background: #004d2b;
          transform: translateY(-1px);
        }

        .filtros-home .filtro-activo {
          background: #39a900;
        }

        /* Tarjetas de los módulos */
        .cards-home {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto 50px;
          padding: 0 20px;
          min-height: 300px;
        }

        .card-home {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card-home:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
        }

        .card-home img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .contenido-card {
          padding: 0 15px;
        }

        .card-home h2 {
          font-size: 18px;
          color: #006b3c;
          margin: 15px 10px;
        }

        .card-home a {
          display: inline-block;
          background: #006b3c;
          color: white;
          text-decoration: none;
          padding: 8px 25px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          transition: 0.3s;
        }

        .card-home a:hover {
          background: #004d2b;
        }

        /* Mensaje cuando no encontramos módulos */
        .sin-resultados {
          grid-column: 1 / -1;
          background: white;
          border-radius: 15px;
          padding: 50px 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
        }

        .sin-resultados > div {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .sin-resultados h2 {
          color: #006b3c;
          margin-bottom: 8px;
        }

        .sin-resultados p {
          color: #666;
          margin-bottom: 20px;
        }

        .sin-resultados button {
          background: #006b3c;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: bold;
        }

        /* Footer */
        .footer-sena-home {
          background: #1e5a38;
          color: white;
          padding: 30px 20px 10px;
          font-size: 12px;
        }

        .footer-top-home {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto 20px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-top-home h3 {
          margin: 0 0 12px;
          font-size: 15px;
        }

        .footer-top-home p {
          margin: 5px 0;
        }

        .logo-footer-home img {
          width: 70px;
          height: 70px;
          object-fit: contain;
        }

        .footer-bottom-home {
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 15px;
        }

        /* En tablet organizamos mejor el encabezado */
        @media (max-width: 1100px) {
          .header-home {
            flex-wrap: wrap;
            justify-content: center;
          }

          .right-home {
            justify-content: center;
            flex-wrap: wrap;
          }
        }

        /* En celulares dejamos todo en una sola columna */
        @media (max-width: 700px) {
          .header-home {
            padding: 12px 15px;
          }

          .nav-home ul {
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }

          .nav-home a {
            font-size: 13px;
          }

          .right-home {
            width: 100%;
          }

          .search-home {
            flex: 1;
          }

          .search-home input {
            width: 100%;
          }

          .usuario-barra {
            text-align: center;
            padding: 8px 15px;
          }

          .hero-home {
            padding: 45px 20px;
          }

          .hero-home h1 {
            font-size: 30px;
          }

          .hero-home p {
            font-size: 14px;
          }

          .cards-home {
            grid-template-columns: 1fr;
          }

          .footer-top-home {
            flex-direction: column;
            text-align: center;
          }
        }

      `}</style>
    </div>
  );
}