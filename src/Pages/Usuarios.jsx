
import { useEffect, useMemo, useState } from "react";

const CLAVE_USUARIOS = "usuariosCentroSimulacion";

const ROLES = [
  "Administrador",
  "Instructor",
  "Aprendiz",
  "Invitado",
];

const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Angie Gomez",
    correo: "angie@sena.edu.co",
    rol: "Administrador",
    area: "Administración",
    institucion: "SENA",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    correo: "juan@sena.edu.co",
    rol: "Instructor",
    area: "Enfermería",
    institucion: "SENA",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "María López",
    correo: "maria@sena.edu.co",
    rol: "Invitado",
    area: "",
    institucion: "",
    estado: "Activo",
  },
];

const FORMULARIO_VACIO = {
  nombre: "",
  correo: "",
  rol: "Instructor",
  area: "",
  institucion: "SENA",
  estado: "Activo",
};

const obtenerIniciales = (nombre = "") =>
  nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() || "")
    .join("") || "US";

const crearId = () =>
  globalThis.crypto?.randomUUID?.() || Date.now();

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(() => {
    try {
      const guardados = localStorage.getItem(CLAVE_USUARIOS);

      if (guardados !== null) {
        const datos = JSON.parse(guardados);
        return Array.isArray(datos)
          ? datos
          : USUARIOS_INICIALES;
      }
    } catch {
      console.warn("No fue posible leer los usuarios guardados.");
    }

    return USUARIOS_INICIALES;
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroRol, setFiltroRol] = useState("Todos");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);

  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  // Guardar los usuarios en el navegador.
  useEffect(() => {
    try {
      localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(usuarios)
      );
    } catch {
      console.error("No se pudieron guardar los usuarios.");
    }
  }, [usuarios]);

  // Ocultar automáticamente los mensajes.
  useEffect(() => {
    if (!aviso) return undefined;

    const temporizador = window.setTimeout(
      () => setAviso(""),
      3000
    );

    return () => window.clearTimeout(temporizador);
  }, [aviso]);

  // Permitir cerrar el formulario con Escape.
  useEffect(() => {
    if (!modalAbierto) return undefined;

    const cerrarConEscape = (evento) => {
      if (evento.key === "Escape") cerrarModal();
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () =>
      window.removeEventListener("keydown", cerrarConEscape);
  }, [modalAbierto]);

  // Búsqueda y filtros.
  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return usuarios.filter((usuario) => {
      const coincideTexto = [
        usuario.nombre,
        usuario.correo,
        usuario.rol,
        usuario.area,
        usuario.institucion,
      ]
        .filter(Boolean)
        .some((valor) =>
          String(valor).toLowerCase().includes(texto)
        );

      const coincideEstado =
        filtroEstado === "Todos" ||
        usuario.estado === filtroEstado;

      const coincideRol =
        filtroRol === "Todos" ||
        usuario.rol === filtroRol;

      return coincideTexto && coincideEstado && coincideRol;
    });
  }, [usuarios, busqueda, filtroEstado, filtroRol]);

  // Estadísticas.
  const activos = usuarios.filter(
    (u) => u.estado === "Activo"
  ).length;

  const inactivos = usuarios.length - activos;

  const administradores = usuarios.filter(
    (u) => u.rol === "Administrador"
  ).length;

  // Abrir formulario para registrar.
  const abrirNuevo = () => {
    setUsuarioEditando(null);
    setFormulario(FORMULARIO_VACIO);
    setError("");
    setModalAbierto(true);
  };

  // Abrir formulario para editar.
  const abrirEdicion = (usuario) => {
    setUsuarioEditando(usuario.id);

    setFormulario({
      nombre: usuario.nombre || "",
      correo: usuario.correo || "",
      rol: ROLES.includes(usuario.rol)
        ? usuario.rol
        : "Invitado",
      area: usuario.area || "",
      institucion: usuario.institucion || "",
      estado:
        usuario.estado === "Inactivo"
          ? "Inactivo"
          : "Activo",
    });

    setError("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
    setFormulario(FORMULARIO_VACIO);
    setError("");
  };

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  // Validar y guardar usuario.
  const guardarUsuario = (evento) => {
    evento.preventDefault();
    setError("");

    const nombre = formulario.nombre
      .trim()
      .replace(/\s+/g, " ");

    const correo = formulario.correo
      .trim()
      .toLowerCase();

    if (!nombre || !correo) {
      setError(
        "Completa el nombre y el correo electrónico."
      );
      return;
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    const correoExiste = usuarios.some(
      (usuario) =>
        String(usuario.correo || "").toLowerCase() === correo &&
        String(usuario.id) !== String(usuarioEditando)
    );

    if (correoExiste) {
      setError(
        "Ya existe un usuario registrado con ese correo."
      );
      return;
    }

    if (usuarioEditando !== null) {
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.id === usuarioEditando
            ? {
                ...usuario,
                ...formulario,
                nombre,
                correo,
              }
            : usuario
        )
      );

      setAviso(
        "Los datos del usuario se actualizaron correctamente."
      );
    } else {
      const nuevoUsuario = {
        ...formulario,
        id: crearId(),
        nombre,
        correo,
      };

      setUsuarios((actuales) => [
        ...actuales,
        nuevoUsuario,
      ]);

      setAviso("El usuario se registró correctamente.");
    }

    cerrarModal();
  };

  // Eliminar usuario.
  const eliminarUsuario = (usuario) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar a ${usuario.nombre}? Esta acción no se puede deshacer.`
    );

    if (!confirmar) return;

    setUsuarios((actuales) =>
      actuales.filter((u) => u.id !== usuario.id)
    );

    setAviso("El usuario fue eliminado.");
  };

  // Activar o desactivar cuenta.
  const cambiarEstado = (usuario) => {
    const nuevoEstado =
      usuario.estado === "Activo"
        ? "Inactivo"
        : "Activo";

    setUsuarios((actuales) =>
      actuales.map((u) =>
        u.id === usuario.id
          ? { ...u, estado: nuevoEstado }
          : u
      )
    );

    setAviso(
      nuevoEstado === "Activo"
        ? "La cuenta fue activada."
        : "La cuenta fue desactivada."
    );
  };

  return (
    <section className="usuarios-page">
      <style>{estilos}</style>

      {/* ENCABEZADO */}
      <header className="usuarios-hero">
        <div>
          <div className="usuarios-eyebrow">
            <span className="eyebrow-dot" />
            CENTRO DE SIMULACIÓN EN SALUD · SENA
          </div>

          <h1>Gestión de usuarios</h1>

          <p>
            Administra las cuentas, consulta los perfiles y
            controla los permisos de acceso al centro.
          </p>
        </div>

        <button
          className="usuarios-primary"
          onClick={abrirNuevo}
        >
          <span aria-hidden="true">＋</span>
          Nuevo usuario
        </button>
      </header>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="usuarios-stats">
        <article className="usuarios-stat">
          <div className="stat-icon stat-icon-green">♙</div>
          <div>
            <span className="stat-label">
              Total de usuarios
            </span>
            <strong>{usuarios.length}</strong>
            <small>cuentas registradas</small>
          </div>
        </article>

        <article className="usuarios-stat">
          <div className="stat-icon stat-icon-blue">✓</div>
          <div>
            <span className="stat-label">
              Usuarios activos
            </span>
            <strong>{activos}</strong>
            <small>con acceso habilitado</small>
          </div>
        </article>

        <article className="usuarios-stat">
          <div className="stat-icon stat-icon-amber">Ⅱ</div>
          <div>
            <span className="stat-label">
              Usuarios inactivos
            </span>
            <strong>{inactivos}</strong>
            <small>con acceso suspendido</small>
          </div>
        </article>

        <article className="usuarios-stat">
          <div className="stat-icon stat-icon-purple">♙</div>
          <div>
            <span className="stat-label">
              Administradores
            </span>
            <strong>{administradores}</strong>
            <small>con rol administrativo</small>
          </div>
        </article>
      </div>

      {/* DIRECTORIO */}
      <div className="usuarios-panel">
        <div className="panel-heading">
          <div>
            <h2>Directorio de usuarios</h2>
            <p>
              Consulta y administra las cuentas registradas.
            </p>
          </div>

          <span className="results-count">
            {usuariosFiltrados.length}{" "}
            {usuariosFiltrados.length === 1
              ? "resultado"
              : "resultados"}
          </span>
        </div>

        {/* BUSCADOR Y FILTROS */}
        <div className="usuarios-toolbar">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              placeholder="Buscar nombre, correo, área o rol..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar usuarios"
            />
          </label>

          <div className="filter-group">
            <label>
              <span>Estado</span>

              <select
                value={filtroEstado}
                onChange={(e) =>
                  setFiltroEstado(e.target.value)
                }
              >
                <option>Todos</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </label>

            <label>
              <span>Rol</span>

              <select
                value={filtroRol}
                onChange={(e) =>
                  setFiltroRol(e.target.value)
                }
              >
                <option>Todos</option>

                {ROLES.map((rol) => (
                  <option key={rol}>{rol}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* TABLA */}
        <div className="usuarios-table-wrap">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Área e institución</th>
                <th>Rol asignado</th>
                <th>Estado</th>
                <th className="actions-heading">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <div className="user-cell">
                      <span className="user-avatar">
                        {obtenerIniciales(usuario.nombre)}
                      </span>

                      <span className="user-info">
                        <strong>{usuario.nombre}</strong>
                        <small>{usuario.correo}</small>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="area-main">
                      {usuario.area || "Sin área"}
                    </span>

                    <small className="area-sub">
                      {usuario.institucion || "Sin institución"}
                    </small>
                  </td>

                  <td>
                    <span
                      className={`role-tag role-${slug(
                        usuario.rol
                      )}`}
                    >
                      {usuario.rol}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`state-tag ${
                        usuario.estado === "Activo"
                          ? "state-active"
                          : "state-inactive"
                      }`}
                    >
                      <span />
                      {usuario.estado}
                    </span>
                  </td>

                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="icon-action"
                        title="Editar usuario"
                        aria-label={`Editar ${usuario.nombre}`}
                        onClick={() => abrirEdicion(usuario)}
                      >
                        ✎
                      </button>

                      <button
                        type="button"
                        className="icon-action"
                        title={
                          usuario.estado === "Activo"
                            ? "Desactivar usuario"
                            : "Activar usuario"
                        }
                        aria-label={
                          usuario.estado === "Activo"
                            ? `Desactivar ${usuario.nombre}`
                            : `Activar ${usuario.nombre}`
                        }
                        onClick={() => cambiarEstado(usuario)}
                      >
                        {usuario.estado === "Activo"
                          ? "Ⅱ"
                          : "▶"}
                      </button>

                      <button
                        type="button"
                        className="icon-action icon-action-danger"
                        title="Eliminar usuario"
                        aria-label={`Eliminar ${usuario.nombre}`}
                        onClick={() => eliminarUsuario(usuario)}
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <span>⌕</span>
                      <strong>No encontramos usuarios</strong>
                      <p>
                        Prueba con otro término o cambia los filtros.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setBusqueda("");
                          setFiltroEstado("Todos");
                          setFiltroRol("Todos");
                        }}
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="panel-footnote">
          <span>ⓘ</span>
          Los cambios se guardan en el almacenamiento local
          de este navegador.
        </div>
      </div>

      {/* MODAL DE REGISTRO Y EDICIÓN */}
      {modalAbierto && (
        <div
          className="usuarios-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarModal();
          }}
        >
          <div
            className="usuarios-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-formulario-usuario"
          >
            <div className="modal-top">
              <div className="modal-symbol">♙</div>

              <button
                type="button"
                className="modal-close"
                onClick={cerrarModal}
                aria-label="Cerrar ventana"
              >
                ×
              </button>
            </div>

            <div className="modal-heading">
              <span className="usuarios-eyebrow">
                GESTIÓN DE CUENTAS
              </span>

              <h2 id="titulo-formulario-usuario">
                {usuarioEditando !== null
                  ? "Editar usuario"
                  : "Registrar usuario"}
              </h2>

              <p>
                {usuarioEditando !== null
                  ? "Actualiza la información del perfil seleccionado."
                  : "Ingresa los datos para crear una nueva cuenta en el centro."}
              </p>
            </div>

            <form onSubmit={guardarUsuario}>
              <div className="form-grid">
                <label className="form-field form-field-full">
                  <span>
                    Nombre completo <b>*</b>
                  </span>

                  <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={cambiarCampo}
                    placeholder="Ej. Andrea Rodríguez"
                    required
                    maxLength={100}
                    autoFocus
                  />
                </label>

                <label className="form-field form-field-full">
                  <span>
                    Correo electrónico <b>*</b>
                  </span>

                  <input
                    type="email"
                    name="correo"
                    value={formulario.correo}
                    onChange={cambiarCampo}
                    placeholder="nombre@correo.com"
                    required
                    maxLength={150}
                  />
                </label>

                <label className="form-field">
                  <span>
                    Rol <b>*</b>
                  </span>

                  <select
                    name="rol"
                    value={formulario.rol}
                    onChange={cambiarCampo}
                    required
                  >
                    {ROLES.map((rol) => (
                      <option key={rol}>{rol}</option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span>Estado de la cuenta</span>

                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={cambiarCampo}
                  >
                    <option>Activo</option>
                    <option>Inactivo</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>Área o programa</span>

                  <input
                    name="area"
                    value={formulario.area}
                    onChange={cambiarCampo}
                    placeholder="Ej. Enfermería"
                    maxLength={100}
                  />
                </label>

                <label className="form-field">
                  <span>Institución</span>

                  <input
                    name="institucion"
                    value={formulario.institucion}
                    onChange={cambiarCampo}
                    placeholder="Ej. SENA"
                    maxLength={150}
                  />
                </label>
              </div>

              {error && (
                <p className="form-error" role="alert">
                  ⚠ {error}
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="button-quiet"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="usuarios-primary"
                >
                  {usuarioEditando !== null
                    ? "Guardar cambios"
                    : "Crear usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {aviso && (
        <div className="usuarios-toast" role="status">
          {aviso}
        </div>
      )}
    </section>
  );
}

function slug(texto = "") {
  return texto
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

const estilos = `
.usuarios-page {
  --u-green: #16833b;
  --u-green-dark: #11652e;
  --u-ink: #172b21;
  --u-muted: #718078;
  --u-line: #e7ede8;
  color: var(--u-ink);
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px clamp(16px, 3vw, 38px) 48px;
  box-sizing: border-box;
  font-family: Inter, "Segoe UI", Arial, sans-serif;
}
.usuarios-page * { box-sizing: border-box; }
.usuarios-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 26px;
}
.usuarios-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--u-green);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.25px;
}
.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #28a653;
}
.usuarios-hero h1 {
  margin: 10px 0 7px;
  color: #183b27;
  font-size: clamp(27px, 3vw, 35px);
  line-height: 1.15;
  letter-spacing: -.8px;
  font-weight: 800;
}
.usuarios-hero p {
  margin: 0;
  color: var(--u-muted);
  font-size: 14px;
  line-height: 1.6;
}
.usuarios-primary {
  border: 0;
  border-radius: 10px;
  background: var(--u-green);
  color: #fff;
  padding: 12px 18px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 5px 13px rgba(22,131,59,.16);
  transition: background .18s ease, transform .18s ease;
}
.usuarios-primary:hover {
  background: var(--u-green-dark);
  transform: translateY(-1px);
}
.usuarios-primary:focus-visible,
.icon-action:focus-visible,
.button-quiet:focus-visible {
  outline: 3px solid rgba(22,131,59,.25);
  outline-offset: 2px;
}
.usuarios-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 22px;
}
.usuarios-stat {
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1px solid var(--u-line);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 3px 12px rgba(24,55,35,.035);
}
.stat-icon {
  flex: 0 0 43px;
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
}
.stat-icon-green { color: #16833b; background: #e9f5ec; }
.stat-icon-blue { color: #2872a8; background: #eaf3fa; }
.stat-icon-amber { color: #a96c12; background: #fff5e5; }
.stat-icon-purple { color: #7652a7; background: #f2edfa; }
.stat-label {
  display: block;
  color: #718078;
  font-size: 11px;
  font-weight: 650;
  margin-bottom: 4px;
}
.usuarios-stat strong {
  display: block;
  color: #193b28;
  font-size: 25px;
  line-height: 1.1;
}
.usuarios-stat small {
  display: block;
  color: #9aa59e;
  font-size: 10px;
  margin-top: 4px;
}
.usuarios-panel {
  background: #fff;
  border: 1px solid var(--u-line);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(24,55,35,.045);
}
.panel-heading {
  padding: 22px 23px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.panel-heading h2 {
  margin: 0 0 5px;
  font-size: 17px;
  color: #203d2b;
  font-weight: 800;
}
.panel-heading p {
  margin: 0;
  color: #89958e;
  font-size: 12px;
}
.results-count {
  white-space: nowrap;
  background: #f1f6f2;
  color: #487455;
  border-radius: 20px;
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 700;
}
.usuarios-toolbar {
  margin: 0 23px 17px;
  padding: 13px;
  border: 1px solid #edf1ed;
  border-radius: 11px;
  background: #fbfcfb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}
.search-box {
  min-width: 220px;
  max-width: 430px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  height: 39px;
  border: 1px solid #e3eae4;
  border-radius: 8px;
  background: #fff;
  color: #829188;
}
.search-box > span { font-size: 23px; line-height: 1; }
.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  color: #263b2e;
  background: transparent;
  font-size: 12px;
}
.search-box:focus-within {
  border-color: #8cc99e;
  box-shadow: 0 0 0 3px rgba(22,131,59,.08);
}
.filter-group { display: flex; gap: 10px; }
.filter-group label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #77847b;
  font-size: 11px;
}
.filter-group select {
  min-width: 105px;
  border: 1px solid #e3eae4;
  background: #fff;
  color: #35483b;
  border-radius: 8px;
  padding: 9px 25px 9px 10px;
  font-size: 11px;
}
.usuarios-table-wrap { width: 100%; overflow-x: auto; }
.usuarios-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 760px;
}
.usuarios-table thead { background: #f7faf7; }
.usuarios-table th {
  padding: 12px 18px;
  color: #829087;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .65px;
  border-top: 1px solid #edf1ed;
  border-bottom: 1px solid #edf1ed;
}
.usuarios-table td {
  padding: 14px 18px;
  border-bottom: 1px solid #f0f3f0;
  font-size: 12px;
  vertical-align: middle;
}
.usuarios-table tbody tr { transition: background .15s ease; }
.usuarios-table tbody tr:hover { background: #fbfdfb; }
.user-cell {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 210px;
}
.user-avatar {
  flex: 0 0 37px;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eaf5ed;
  color: #19743a;
  font-size: 11px;
  font-weight: 800;
}
.user-info strong {
  display: block;
  color: #294333;
  font-size: 12px;
  font-weight: 750;
}
.user-info small, .area-sub {
  display: block;
  color: #929d95;
  font-size: 10px;
  margin-top: 4px;
}
.area-main {
  display: block;
  color: #405448;
  font-size: 11px;
}
.role-tag {
  display: inline-block;
  padding: 6px 9px;
  border-radius: 6px;
  background: #edf5ef;
  color: #347349;
  font-size: 10px;
  font-weight: 750;
}
.role-administrador { background: #f1edfa; color: #7456a1; }
.role-instructor { background: #eaf3fa; color: #3475a4; }
.role-aprendiz { background: #fff5e5; color: #9a6b20; }
.role-invitado, .role-usuario-invitado {
  background: #f0f2f1;
  color: #68756d;
}
.state-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 750;
}
.state-tag > span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.state-active { color: #27814a; }
.state-active > span {
  background: #32a65a;
  box-shadow: 0 0 0 3px #e9f6ed;
}
.state-inactive { color: #9a6b35; }
.state-inactive > span {
  background: #d69a48;
  box-shadow: 0 0 0 3px #fff4e5;
}
.actions-heading { text-align: center; }
.row-actions {
  display: flex;
  justify-content: center;
  gap: 6px;
}
.icon-action {
  width: 30px;
  height: 30px;
  border: 1px solid #e8eee9;
  border-radius: 8px;
  background: #fff;
  color: #607267;
  cursor: pointer;
  font-size: 15px;
  display: grid;
  place-items: center;
  transition: .15s ease;
}
.icon-action:hover {
  color: var(--u-green);
  border-color: #b8d9c1;
  background: #f2faf4;
}
.icon-action-danger:hover {
  color: #c34c4c;
  border-color: #f0caca;
  background: #fff6f6;
}
.panel-footnote {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 13px 22px;
  color: #94a098;
  background: #fcfdfc;
  font-size: 10px;
}
.panel-footnote span { color: #6a9c78; font-size: 14px; }
.empty-state {
  text-align: center;
  padding: 42px 15px;
  color: #829087;
}
.empty-state > span {
  display: block;
  font-size: 30px;
  color: #a9b8ad;
}
.empty-state strong {
  display: block;
  color: #405448;
  font-size: 14px;
  margin-top: 7px;
}
.empty-state p { font-size: 11px; margin: 6px 0 13px; }
.empty-state button {
  border: 0;
  background: transparent;
  color: var(--u-green);
  font-weight: 750;
  cursor: pointer;
  font-size: 11px;
}
.usuarios-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(14,31,20,.55);
  backdrop-filter: blur(3px);
}
.usuarios-modal {
  width: min(100%, 590px);
  max-height: min(92vh, 760px);
  overflow-y: auto;
  background: #fff;
  border-radius: 18px;
  padding: 25px 28px 26px;
  box-shadow: 0 24px 80px rgba(0,0,0,.23);
  animation: usuarios-appear .18s ease-out;
}
@keyframes usuarios-appear {
  from { opacity: 0; transform: translateY(8px) scale(.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-symbol {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #eaf5ed;
  color: #16833b;
  font-size: 20px;
}
.modal-close {
  border: 0;
  background: #f3f6f3;
  color: #65746a;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
}
.modal-heading { margin: 16px 0 21px; }
.modal-heading h2 {
  margin: 7px 0 5px;
  color: #1c3b28;
  font-size: 23px;
  letter-spacing: -.4px;
}
.modal-heading p {
  margin: 0;
  color: #829087;
  font-size: 12px;
  line-height: 1.5;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 13px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #405448;
  font-size: 11px;
  font-weight: 700;
}
.form-field-full { grid-column: 1 / -1; }
.form-field b { color: #d35d5d; }
.form-field input, .form-field select {
  width: 100%;
  min-height: 41px;
  padding: 10px 11px;
  border: 1px solid #dfe7e0;
  border-radius: 8px;
  outline: none;
  background: #fff;
  color: #263b2e;
  font: inherit;
  font-size: 12px;
  font-weight: 400;
  transition: .15s ease;
}
.form-field input::placeholder { color: #b0bab3; }
.form-field input:focus, .form-field select:focus {
  border-color: #72b987;
  box-shadow: 0 0 0 3px rgba(22,131,59,.09);
}
.form-error {
  padding: 10px 12px;
  border-radius: 8px;
  color: #a53636;
  background: #fff1f1;
  font-size: 11px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 24px;
  padding-top: 17px;
  border-top: 1px solid #edf1ed;
}
.button-quiet {
  border: 1px solid #dfe7e0;
  border-radius: 9px;
  background: #fff;
  color: #5c6b61;
  padding: 11px 16px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.usuarios-toast {
  position: fixed;
  z-index: 1200;
  right: 24px;
  bottom: 24px;
  max-width: min(420px, calc(100vw - 32px));
  padding: 13px 17px;
  border-radius: 10px;
  background: #173f28;
  color: #fff;
  box-shadow: 0 8px 25px rgba(0,0,0,.18);
  font-size: 12px;
  animation: usuarios-appear .18s ease-out;
}
@media (max-width: 1050px) {
  .usuarios-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 700px) {
  .usuarios-page { padding: 22px 14px 35px; }
  .usuarios-hero {
    align-items: flex-start;
    flex-direction: column;
  }
  .usuarios-hero .usuarios-primary { width: 100%; }
  .usuarios-stats { gap: 9px; }
  .usuarios-stat { min-height: 94px; padding: 12px; gap: 9px; }
  .stat-icon {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
    font-size: 17px;
  }
  .usuarios-stat strong { font-size: 21px; }
  .usuarios-toolbar {
    margin: 0 13px 14px;
    align-items: stretch;
    flex-direction: column;
  }
  .search-box { max-width: none; }
  .filter-group { display: grid; grid-template-columns: 1fr 1fr; }
  .filter-group label {
    align-items: flex-start;
    flex-direction: column;
  }
  .filter-group select { width: 100%; }
  .panel-heading { padding: 18px 14px 14px; }
  .usuarios-table th, .usuarios-table td {
    padding-left: 13px;
    padding-right: 13px;
  }
  .usuarios-modal { padding: 21px 18px; }
}
@media (max-width: 430px) {
  .usuarios-stats { grid-template-columns: 1fr 1fr; }
  .usuarios-stat {
    align-items: flex-start;
    flex-direction: column;
  }
  .form-grid { grid-template-columns: 1fr; }
  .form-field-full { grid-column: auto; }
  .modal-actions { flex-direction: column-reverse; }
  .modal-actions button { width: 100%; }
}
`;
