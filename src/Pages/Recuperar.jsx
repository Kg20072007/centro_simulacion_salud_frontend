import { useState } from "react";
import { Link } from "react-router-dom";

export default function Recuperar() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);

  // Aquí solamente simulamos el envío porque todavía no tenemos backend
  const enviarCorreo = (e) => {
    e.preventDefault();

    if (!correo) return;

    setEnviado(true);
  };

  return (
    <main className="recovery-page">

      <section className="content">

        {/* Botón para regresar al login */}
        <Link to="/login" className="back">
          <span>←</span>
          Volver al inicio de sesión
        </Link>

        {/* Logo del Centro de Simulación */}
        <img
          src="/img/logo1.png"
          alt="Simulación de Enfermería"
          className="logo"
        />

        {!enviado ? (
          <div className="recovery-form">

            {/* Icono de recuperación */}
            <div className="recovery-icon">
              🔑
            </div>

            {/* Título */}
            <div className="title">
              <h1>¿Olvidaste tu contraseña?</h1>

              <p>
                No te preocupes, podemos ayudarte a recuperar
                el acceso a tu cuenta.
              </p>
            </div>

            {/* Mensaje informativo */}
            <div className="info">
              <p>
                Ingresa el correo electrónico con el que estás
                registrado y te enviaremos las instrucciones
                para recuperar tu contraseña.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={enviarCorreo}>

              <label
                htmlFor="email"
                className="input-label"
              >
                Correo electrónico
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />

              </div>

              <button
                type="submit"
                className="send-button"
              >
                <span>➤</span>
                Enviar instrucciones
              </button>

            </form>

          </div>
        ) : (
          /* Este mensaje aparece después de enviar el correo */
          <div className="success">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              ¡Correo enviado!
            </h2>

            <p>
              Hemos enviado las instrucciones para recuperar
              tu contraseña a:
            </p>

            <p className="email">
              {correo}
            </p>

            <p className="success-detail">
              Revisa tu bandeja de entrada. Si no encuentras
              el correo, revisa también tu carpeta de spam.
            </p>

            <Link
              to="/login"
              className="login-link"
            >
              ← Volver al inicio de sesión
            </Link>

          </div>
        )}

      </section>

      {/* Parte inferior con las ondas de colores */}
      <footer className="footer">

        <div className="orange-wave"></div>

        <div className="green-wave"></div>

        <div className="security">

          <span className="security-icon">
            🛡️
          </span>

          <div>
            <strong>
              Tus datos están protegidos
            </strong>

            <p>
              Privacidad y seguridad garantizadas
            </p>
          </div>

        </div>

      </footer>

      <style>{`

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .recovery-page {
          width: 100%;
          max-width: 430px;
          min-height: 720px;
          margin: 25px auto;
          background: white;
          border-radius: 25px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, .15);
          font-family: Arial, Helvetica, sans-serif;
        }

        /* Fondo general de la pantalla */
        body {
          margin: 0;
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #eeeeee,
            #ffffff
          );
        }

        /* Espacio principal de la recuperación */
        .content {
          position: relative;
          z-index: 5;
          padding: 42px 35px 190px;
        }

        /* Enlace para regresar */
        .back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #006b3c;
          text-decoration: none;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 25px;
          transition: .2s;
        }

        .back span {
          font-size: 18px;
        }

        .back:hover {
          color: #f47721;
        }

        /* Logo */
        .logo {
          display: block;
          width: 230px;
          max-width: 85%;
          height: auto;
          margin: 0 auto 22px;
        }

        /* Icono de la llave */
        .recovery-icon {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(244, 119, 33, .12);
          color: #f47721;
          font-size: 30px;
          position: relative;
        }

        .recovery-icon::after {
          content: "";
          position: absolute;
          width: 88px;
          height: 88px;
          border: 1px solid rgba(244, 119, 33, .25);
          border-radius: 50%;
        }

        /* Título y descripción */
        .title {
          text-align: center;
          margin-bottom: 13px;
        }

        .title h1 {
          color: #006b3c;
          font-size: 25px;
          margin-bottom: 8px;
        }

        .title p {
          color: #777;
          font-size: 13px;
          line-height: 1.6;
        }

        /* Caja de información */
        .info {
          background: rgba(0, 107, 60, .06);
          border-left: 4px solid #006b3c;
          padding: 12px 14px;
          margin: 22px 0;
          border-radius: 7px;
        }

        .info p {
          color: #555;
          font-size: 11px;
          line-height: 1.5;
        }

        /* Texto encima del campo */
        .input-label {
          display: block;
          color: #444;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 7px;
        }

        /* Contenedor del input */
        .input-wrapper {
          height: 53px;
          position: relative;
          margin-bottom: 16px;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #f47721;
          font-size: 19px;
          z-index: 2;
        }

        .input-wrapper input {
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
          border-radius: 10px;
          outline: none;
          padding: 0 15px 0 45px;
          font-size: 13px;
          transition: .25s;
        }

        .input-wrapper input:focus {
          border-color: #006b3c;
          box-shadow: 0 0 0 3px rgba(0, 107, 60, .08);
        }

        /* Botón para enviar */
        .send-button {
          width: 100%;
          height: 53px;
          border: none;
          border-radius: 10px;
          background: #006b3c;
          color: white;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: .3s;
        }

        .send-button:hover {
          background: #00582f;
          transform: translateY(-2px);
          box-shadow: 0 7px 15px rgba(0, 107, 60, .18);
        }

        /* Mensaje después de enviar */
        .success {
          text-align: center;
          animation: aparecer .4s ease;
        }

        @keyframes aparecer {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          margin: 10px auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 107, 60, .1);
          color: #006b3c;
          font-size: 35px;
          font-weight: bold;
        }

        .success h2 {
          color: #006b3c;
          font-size: 23px;
          margin-bottom: 10px;
        }

        .success p {
          color: #666;
          font-size: 13px;
          line-height: 1.6;
        }

        .success .email {
          color: #f47721;
          font-weight: bold;
          margin-top: 7px;
        }

        .success-detail {
          margin-top: 12px;
        }

        /* Enlace para regresar al login */
        .login-link {
          display: block;
          text-align: center;
          margin-top: 22px;
          color: #006b3c;
          text-decoration: none;
          font-size: 13px;
          font-weight: bold;
        }

        .login-link:hover {
          color: #f47721;
        }

        /* Footer con las ondas */
        .footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 175px;
          overflow: hidden;
        }

        .orange-wave {
          position: absolute;
          bottom: 55px;
          left: -10%;
          width: 120%;
          height: 85px;
          background: #f47721;
          border-radius: 60% 40% 0 0;
          transform: rotate(4deg);
        }

        .green-wave {
          position: absolute;
          bottom: -40px;
          left: -10%;
          width: 120%;
          height: 115px;
          background: #006b3c;
          border-radius: 55% 45% 0 0;
          transform: rotate(-4deg);
        }

        /* Texto de seguridad */
        .security {
          position: absolute;
          z-index: 10;
          bottom: 23px;
          left: 35px;
          display: flex;
          align-items: center;
          gap: 13px;
          color: white;
        }

        .security-icon {
          font-size: 28px;
        }

        .security strong {
          display: block;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .security p {
          font-size: 10px;
        }

        /* Ajuste para celulares */
        @media (max-width: 500px) {

          .recovery-page {
            max-width: none;
            min-height: 100vh;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }

          .content {
            padding: 35px 25px 190px;
          }

          .logo {
            width: 210px;
          }
        }

        @media (max-width: 360px) {

          .content {
            padding: 28px 20px 180px;
          }

          .logo {
            width: 190px;
          }

          .title h1 {
            font-size: 22px;
          }
        }

      `}</style>
    </main>
  );
}