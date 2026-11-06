
import React, { useState } from "react";

export default function CrearCuenta() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    documento: "",
    rol: "instructor",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
    setMensaje("");
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (formulario.password.length < 8) {
      setMensaje("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    // Este formulario aún no crea usuarios en la base de datos.
    // La creación real debe hacerse mediante la API PHP.
    setMensaje(
      "Formulario validado. Conecta la API PHP para registrar la cuenta."
    );
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .crear-cuenta-pagina {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background:
            radial-gradient(circle at top left, #dcfce7, transparent 45%),
            linear-gradient(135deg, #f0fdf4, #eff6ff);
          font-family: Arial, Helvetica, sans-serif;
        }

        .crear-cuenta-tarjeta {
          width: 100%;
          max-width: 520px;
          padding: 36px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          box-shadow: 0 15px 45px rgba(15, 23, 42, 0.10);
        }

        .crear-cuenta-icono {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          border-radius: 18px;
          background: #dcfce7;
          font-size: 32px;
        }

        .crear-cuenta-tarjeta h1 {
          margin: 0 0 10px;
          color: #14532d;
          font-size: 28px;
          text-align: center;
        }

        .crear-cuenta-descripcion {
          margin: 0 0 28px;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
          text-align: center;
        }

        .crear-cuenta-formulario {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .crear-cuenta-campo {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .crear-cuenta-campo label {
          color: #334155;
          font-size: 14px;
          font-weight: 600;
        }

        .crear-cuenta-campo input,
        .crear-cuenta-campo select {
          width: 100%;
          min-height: 45px;
          padding: 11px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #ffffff;
          color: #0f172a;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .crear-cuenta-campo input:focus,
        .crear-cuenta-campo select:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12);
        }

        .crear-cuenta-boton {
          width: 100%;
          min-height: 48px;
          margin-top: 5px;
          border: none;
          border-radius: 10px;
          background: #15803d;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .crear-cuenta-boton:hover {
          background: #166534;
          transform: translateY(-1px);
        }

        .crear-cuenta-mensaje {
          margin: 0;
          padding: 12px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #334155;
          font-size: 14px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .crear-cuenta-pie {
          margin: 22px 0 0;
          color: #64748b;
          font-size: 13px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .crear-cuenta-tarjeta {
            padding: 25px 20px;
          }

          .crear-cuenta-tarjeta h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <main className="crear-cuenta-pagina">
        <section className="crear-cuenta-tarjeta">
          <div className="crear-cuenta-icono" aria-hidden="true">
            🩺
          </div>

          <h1>Crear cuenta</h1>

          <p className="crear-cuenta-descripcion">
            Centro de Simulación en Salud SENA
            <br />
            Completa tus datos para solicitar el registro.
          </p>

          <form
            className="crear-cuenta-formulario"
            onSubmit={manejarEnvio}
          >
            <div className="crear-cuenta-campo">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                placeholder="Ingresa tu nombre completo"
                value={formulario.nombre}
                onChange={manejarCambio}
                maxLength={140}
                required
              />
            </div>

            <div className="crear-cuenta-campo">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                placeholder="nombre@correo.com"
                value={formulario.correo}
                onChange={manejarCambio}
                maxLength={190}
                required
              />
            </div>

            <div className="crear-cuenta-campo">
              <label htmlFor="documento">Documento de identidad</label>
              <input
                id="documento"
                name="documento"
                type="text"
                placeholder="Número de documento"
                value={formulario.documento}
                onChange={manejarCambio}
                maxLength={30}
                required
              />
            </div>

            <div className="crear-cuenta-campo">
              <label htmlFor="rol">Tipo de usuario</label>
              <select
                id="rol"
                name="rol"
                value={formulario.rol}
                onChange={manejarCambio}
                required
              >
                <option value="instructor">Instructor</option>
                <option value="aprendiz">Aprendiz</option>
              </select>
            </div>

            <div className="crear-cuenta-campo">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={formulario.password}
                onChange={manejarCambio}
                minLength={8}
                required
              />
            </div>

            <div className="crear-cuenta-campo">
              <label htmlFor="confirmarPassword">
                Confirmar contraseña
              </label>
              <input
                id="confirmarPassword"
                name="confirmarPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Escribe nuevamente la contraseña"
                value={formulario.confirmarPassword}
                onChange={manejarCambio}
                minLength={8}
                required
              />
            </div>

            <button className="crear-cuenta-boton" type="submit">
              Validar formulario
            </button>

            {mensaje && (
              <p className="crear-cuenta-mensaje" role="status">
                {mensaje}
              </p>
            )}
          </form>

          <p className="crear-cuenta-pie">
            Sistema de gestión del Centro de Simulación en Salud
          </p>
        </section>
      </main>
    </>
  );
}
