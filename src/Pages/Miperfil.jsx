
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Organizamos los datos del usuario para mostrarlos en el perfil.
// Si falta algún dato, dejamos el campo vacío y no inventamos información.
const obtenerDatosUsuario = (usuario) => ({
  nombre: usuario?.nombre || usuario?.nombres || "",
  apellido: usuario?.apellido || usuario?.apellidos || "",
  documento:
    usuario?.documento ||
    usuario?.numero_documento ||
    usuario?.identificacion ||
    "",
  telefono: usuario?.telefono || "",
  correo: usuario?.correo || usuario?.email || "",
});

// Convertimos el rol a un nombre fácil de leer.
const mostrarRol = (rol) => {
  const valor = String(rol || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const roles = {
    admin: "Administrador",
    administrador: "Administrador",
    instructor: "Instructor",
    aprendiz: "Aprendiz",
    estudiante: "Aprendiz",
  };

  return roles[valor] || (rol ? String(rol) : "No asignado");
};

export default function Miperfil() {
  // Obtenemos el usuario que inició sesión desde el contexto de autenticación.
  const { usuario, login } = useAuth();

  // Guardamos los datos personales que aparecen en el formulario.
  const [datos, setDatos] = useState(() =>
    obtenerDatosUsuario(usuario)
  );

  // Controlamos si el formulario está en modo de edición.
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("exito");

  // Cuando cambia el usuario de la sesión, actualizamos la información visible.
  useEffect(() => {
    setDatos(obtenerDatosUsuario(usuario));
  }, [usuario]);

  // Guardamos en el estado el valor que se escribe en cada campo.
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setDatos((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));
  };

  // Mostramos un mensaje temporal en la página.
  const mostrarMensaje = (texto, tipo = "exito") => {
    setMensaje(texto);
    setTipoMensaje(tipo);
  };

  // Guardamos los datos personales sin permitir cambiar el rol desde el perfil.
  const guardarCambios = (evento) => {
    evento.preventDefault();

    if (!usuario) {
      mostrarMensaje(
        "No se encontró una sesión activa. Inicia sesión nuevamente.",
        "error"
      );
      return;
    }

    if (!datos.nombre.trim()) {
      mostrarMensaje("Por favor, escribe tus nombres.", "error");
      return;
    }

    if (!datos.correo.trim()) {
      mostrarMensaje("Por favor, escribe tu correo electrónico.", "error");
      return;
    }

    // Conservamos los datos originales y modificamos únicamente los campos personales.
    const usuarioActualizado = {
      ...usuario,
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      documento: datos.documento.trim(),
      telefono: datos.telefono.trim(),
      correo: datos.correo.trim(),
    };

    // Actualizamos el usuario mediante la función disponible en AuthContext.
    if (typeof login !== "function") {
      mostrarMensaje(
        "No se encontró la función para actualizar la sesión. Revisa AuthContext.jsx.",
        "error"
      );
      return;
    }

    try {
      login(usuarioActualizado);
      setDatos(obtenerDatosUsuario(usuarioActualizado));
      setEditando(false);

      mostrarMensaje(
        "Los datos del perfil se actualizaron correctamente."
      );
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      mostrarMensaje(
        "No fue posible actualizar los datos del perfil.",
        "error"
      );
    }
  };

  // Si cancelamos la edición, recuperamos los datos del usuario actual.
  const cancelarEdicion = () => {
    setDatos(obtenerDatosUsuario(usuario));
    setEditando(false);
    setMensaje("");
  };

  // Preparamos el nombre y la inicial que aparecen en la tarjeta principal.
  const nombreCompleto =
    `${datos.nombre} ${datos.apellido}`.trim() || "Usuario";

  const inicial = datos.nombre
    ? datos.nombre.charAt(0).toUpperCase()
    : "U";

  // Leemos el rol original de la sesión para no confundirlo con otro usuario.
  const rolOriginal =
    usuario?.rol ||
    usuario?.tipo_usuario ||
    usuario?.tipo ||
    "";

  const rolVisible = mostrarRol(rolOriginal);

  // Si no hay usuario, evitamos mostrar información de otra cuenta.
  if (!usuario) {
    return (
      <div className="perfil-page">
        <section className="perfil-card">
          <h1>Mi perfil</h1>
          <p>
            No se encontró la información de la sesión.
            Por favor, inicia sesión nuevamente.
          </p>
          <Link to="/login" className="perfil-enlace">
            Ir al inicio de sesión
          </Link>
        </section>

        <style>{estilosPerfil}</style>
      </div>
    );
  }

  return (
    <div className="perfil-page">
      {/* Encabezado de la página y botón para editar la información. */}
      <div className="perfil-encabezado">
        <div>
          <span className="perfil-etiqueta">MI CUENTA</span>
          <h1>Mi perfil</h1>
          <p>
            Consulta y administra tu información personal.
          </p>
        </div>

        {!editando && (
          <button
            type="button"
            className="btn-editar"
            onClick={() => {
              setDatos(obtenerDatosUsuario(usuario));
              setMensaje("");
              setEditando(true);
            }}
          >
            ✏️ Editar perfil
          </button>
        )}
      </div>

      {/* Tarjeta con el nombre, la inicial, el rol y el correo del usuario. */}
      <section className="perfil-presentacion">
        <div className="perfil-avatar">{inicial}</div>

        <div className="perfil-identidad">
          <h2>{nombreCompleto}</h2>

          <div className="perfil-datos-rapidos">
            <span>👤 {rolVisible}</span>
            <span>
              ✉️ {datos.correo || "Correo no registrado"}
            </span>
          </div>
        </div>

        <div className="estado-cuenta">
          <span className="punto-activo"></span>
          Sesión activa
        </div>
      </section>

      {/* Aquí aparecen los mensajes de confirmación o de error. */}
      {mensaje && (
        <div
          className={
            tipoMensaje === "error"
              ? "mensaje-perfil mensaje-error"
              : "mensaje-perfil mensaje-exito"
          }
          role="status"
        >
          {tipoMensaje === "error" ? "⚠️ " : "✓ "}
          {mensaje}
        </div>
      )}

      <div className="perfil-contenido">
        {/* Formulario para consultar y editar los datos personales. */}
        <section className="perfil-card">
          <div className="card-titulo">
            <div className="icono-titulo">👤</div>

            <div>
              <h2>Información personal</h2>
              <p>
                Mantén actualizados tus datos de contacto.
              </p>
            </div>
          </div>

          <form onSubmit={guardarCambios}>
            <div className="form-grid">
              <div className="campo">
                <label htmlFor="nombre">Nombres</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={datos.nombre}
                  onChange={manejarCambio}
                  disabled={!editando}
                  autoComplete="given-name"
                />
              </div>

              <div className="campo">
                <label htmlFor="apellido">Apellidos</label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={datos.apellido}
                  onChange={manejarCambio}
                  disabled={!editando}
                  autoComplete="family-name"
                />
              </div>

              <div className="campo">
                <label htmlFor="documento">
                  Número de documento
                </label>
                <input
                  id="documento"
                  name="documento"
                  type="text"
                  placeholder="Número de documento"
                  value={datos.documento}
                  onChange={manejarCambio}
                  disabled={!editando}
                />
              </div>

              <div className="campo">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Número de teléfono"
                  value={datos.telefono}
                  onChange={manejarCambio}
                  disabled={!editando}
                  autoComplete="tel"
                />
              </div>

              <div className="campo campo-completo">
                <label htmlFor="correo">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={datos.correo}
                  onChange={manejarCambio}
                  disabled={!editando}
                  autoComplete="email"
                />
              </div>

              <div className="campo campo-completo">
                <label htmlFor="rol">
                  Rol dentro del sistema
                </label>
                <input
                  id="rol"
                  type="text"
                  value={rolVisible}
                  disabled
                  readOnly
                />
                <small>
                  El rol es asignado por el administrador y no se
                  puede cambiar desde esta sección.
                </small>
              </div>
            </div>

            {/* Los botones solo aparecen cuando se está editando. */}
            {editando && (
              <div className="acciones-formulario">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-guardar"
                >
                  ✓ Guardar cambios
                </button>
              </div>
            )}
          </form>
        </section>

        {/* Opciones de seguridad informativas. */}
        <section className="seguridad-card">
          <div className="seguridad-icono">🔐</div>

          <div className="seguridad-info">
            <h2>Seguridad de la cuenta</h2>
            <p>
              Mantén segura tu cuenta del Centro de Simulación
              de Enfermería.
            </p>

            <div className="seguridad-opciones">
              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "La opción para cambiar la contraseña estará disponible próximamente."
                  )
                }
              >
                🔑 Cambiar contraseña
              </button>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Las opciones de seguridad adicionales estarán disponibles próximamente."
                  )
                }
              >
                🛡️ Configuración de seguridad
              </button>
            </div>
          </div>
        </section>

        {/* Enlaces para llegar rápidamente a otras secciones. */}
        <section className="acciones-card">
          <div>
            <h2>Acciones rápidas</h2>
            <p>
              Accede rápidamente a otras opciones de tu cuenta.
            </p>
          </div>

          <div className="acciones-rapidas">
            <Link to="/ajustes">
              <span className="accion-icono">⚙️</span>
              <span>
                Ajustes
                <small>Configurar sistema</small>
              </span>
            </Link>

            <Link to="/notificaciones">
              <span className="accion-icono">🔔</span>
              <span>
                Notificaciones
                <small>Ver avisos</small>
              </span>
            </Link>

            <Link to="/dashboard">
              <span className="accion-icono">🏠</span>
              <span>
                Panel principal
                <small>Volver al inicio</small>
              </span>
            </Link>
          </div>
        </section>
      </div>

      {/* Los estilos mantienen el diseño y adaptan la página a celulares. */}
      <style>{estilosPerfil}</style>
    </div>
  );
}

// Dejamos los estilos en el mismo archivo para no depender de otro CSS.
const estilosPerfil = `
  .perfil-page {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 35px 45px 60px;
    color: #263238;
    box-sizing: border-box;
  }

  .perfil-page * {
    box-sizing: border-box;
  }

  .perfil-encabezado {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
  }

  .perfil-etiqueta {
    color: #39a900;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;
  }

  .perfil-encabezado h1 {
    margin: 5px 0 3px;
    font-size: 32px;
    color: #18251f;
  }

  .perfil-encabezado p {
    margin: 0;
    color: #68756f;
    font-size: 15px;
  }

  .btn-editar,
  .btn-guardar {
    border: none;
    background: #006b3c;
    color: white;
    padding: 11px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-editar:hover,
  .btn-guardar:hover {
    background: #00522e;
  }

  .perfil-presentacion {
    min-height: 145px;
    background: white;
    border: 1px solid #dce5e0;
    border-radius: 16px;
    padding: 25px 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
  }

  .perfil-avatar {
    width: 92px;
    height: 92px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #006b3c, #39a900);
    color: white;
    border-radius: 50%;
    font-size: 38px;
    font-weight: 800;
  }

  .perfil-identidad {
    flex: 1;
    min-width: 0;
  }

  .perfil-identidad h2 {
    margin: 0 0 10px;
    font-size: 23px;
    color: #18251f;
    overflow-wrap: anywhere;
  }

  .perfil-datos-rapidos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .perfil-datos-rapidos span {
    padding: 7px 12px;
    border-radius: 20px;
    background: #f0f7f3;
    color: #416052;
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .estado-cuenta {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 13px;
    border-radius: 20px;
    background: #eaf7ee;
    color: #18713f;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
  }

  .punto-activo {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #39a900;
  }

  .mensaje-perfil {
    padding: 13px 18px;
    margin-bottom: 20px;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 600;
  }

  .mensaje-exito {
    border: 1px solid #b9e2c7;
    background: #edf9f1;
    color: #176b3d;
  }

  .mensaje-error {
    border: 1px solid #efc5c5;
    background: #fff0f0;
    color: #a12626;
  }

  .perfil-contenido {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .perfil-card,
  .acciones-card {
    background: white;
    border: 1px solid #dce5e0;
    border-radius: 16px;
    padding: 28px 32px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  }

  .card-titulo {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 25px;
  }

  .icono-titulo {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 11px;
    background: #eaf6ef;
    font-size: 20px;
  }

  .card-titulo h2 {
    margin: 0 0 3px;
    color: #263238;
    font-size: 19px;
  }

  .card-titulo p {
    margin: 0;
    color: #78847f;
    font-size: 13px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .campo {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
  }

  .campo-completo {
    grid-column: 1 / -1;
  }

  .campo label {
    color: #45534c;
    font-size: 13px;
    font-weight: 700;
  }

  .campo input {
    width: 100%;
    min-height: 43px;
    padding: 10px 13px;
    border: 1px solid #d3ddd8;
    border-radius: 8px;
    background: #fff;
    color: #263238;
    font-size: 14px;
    outline: none;
  }

  .campo input:focus {
    border-color: #39a900;
    box-shadow: 0 0 0 3px rgba(57, 169, 0, 0.10);
  }

  .campo input:disabled {
    background: #f5f7f6;
    color: #52615a;
    cursor: not-allowed;
  }

  .campo small {
    color: #8a9691;
    font-size: 11px;
    line-height: 1.5;
  }

  .acciones-formulario {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid #edf0ee;
  }

  .btn-cancelar {
    border: none;
    padding: 11px 18px;
    border-radius: 8px;
    background: #eef1ef;
    color: #4d5a54;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }

  .btn-cancelar:hover {
    background: #e1e6e3;
  }

  .seguridad-card {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    background: linear-gradient(135deg, #f0f8f3, #fff);
    border: 1px solid #cfe2d7;
    border-radius: 16px;
    padding: 25px 30px;
  }

  .seguridad-icono {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: #e1f2e7;
    font-size: 23px;
  }

  .seguridad-info {
    min-width: 0;
  }

  .seguridad-info h2,
  .acciones-card h2 {
    margin: 0 0 5px;
    font-size: 18px;
    color: #263238;
  }

  .seguridad-info p,
  .acciones-card > div:first-child p {
    margin: 0 0 15px;
    color: #66736d;
    font-size: 13px;
    line-height: 1.6;
  }

  .seguridad-opciones {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .seguridad-opciones button {
    border: 1px solid #c8d8cf;
    background: white;
    color: #006b3c;
    padding: 9px 13px;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .seguridad-opciones button:hover {
    background: #eaf6ef;
    border-color: #39a900;
  }

  .acciones-card {
    padding: 25px 30px;
  }

  .acciones-rapidas {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 13px;
    margin-top: 20px;
  }

  .acciones-rapidas a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #e0e7e3;
    border-radius: 10px;
    color: #263238;
    text-decoration: none;
    transition: 0.2s;
    min-width: 0;
  }

  .acciones-rapidas a:hover {
    border-color: #39a900;
    background: #f4faf6;
    transform: translateY(-2px);
  }

  .accion-icono {
    font-size: 21px;
  }

  .acciones-rapidas a span:last-child {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 13px;
    font-weight: 700;
    min-width: 0;
  }

  .acciones-rapidas small {
    color: #84908b;
    font-size: 10px;
    font-weight: 400;
  }

  .perfil-enlace {
    color: #006b3c;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    .perfil-page {
      padding: 25px 20px 45px;
    }

    .perfil-presentacion {
      flex-wrap: wrap;
    }

    .acciones-rapidas {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 650px) {
    .perfil-page {
      padding: 20px 14px 40px;
    }

    .perfil-encabezado {
      align-items: flex-start;
      flex-direction: column;
    }

    .perfil-encabezado h1 {
      font-size: 27px;
    }

    .btn-editar {
      width: 100%;
    }

    .perfil-presentacion {
      padding: 22px;
      text-align: center;
      justify-content: center;
    }

    .perfil-identidad {
      width: 100%;
      flex: auto;
    }

    .perfil-datos-rapidos {
      justify-content: center;
    }

    .estado-cuenta {
      white-space: normal;
    }

    .perfil-card,
    .seguridad-card,
    .acciones-card {
      padding: 20px;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .campo-completo {
      grid-column: auto;
    }

    .acciones-formulario {
      flex-direction: column-reverse;
    }

    .btn-cancelar,
    .btn-guardar {
      width: 100%;
    }

    .seguridad-card {
      flex-direction: column;
    }

    .seguridad-opciones {
      flex-direction: column;
    }

    .seguridad-opciones button {
      width: 100%;
    }
  }
`;
