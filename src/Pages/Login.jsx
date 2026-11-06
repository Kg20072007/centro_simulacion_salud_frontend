import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");

  // Aquí revisamos los datos cuando el usuario intenta entrar
  const iniciarSesion = (e) => {
    e.preventDefault();
    setError("");

    if (!correo || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const usuarios = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );

    // Usuario administrador para poder probar el sistema
    if (
      correo === "admin@sena.com" &&
      password === "123456"
    ) {
      const administrador = {
        nombre: "Administrador",
        apellido: "SENA",
        correo: "admin@sena.com",
        rol: "Administrador",
      };

      login(administrador);
      navigate("/dashboard");
      return;
    }

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        (usuario.correo === correo ||
          usuario.email === correo) &&
        usuario.password === password
    );

    if (!usuarioEncontrado) {
      setError("El correo o la contraseña no son correctos.");
      return;
    }

    login(usuarioEncontrado);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-contenedor">

        {/* Parte izquierda con la imagen del Centro de Simulación */}
        <div className="login-presentacion">

          <div className="imagen-centro">
            <img
              src="/img/logo1.png"
              alt="Centro de Simulación de Enfermería SENA"
            />
          </div>

          <h1>
            Centro de Simulación
            <span>de Enfermería</span>
          </h1>

          <p>
            Aprende, practica y desarrolla tus competencias
            en ambientes de simulación clínica.
          </p>

          <div className="frase-sena">
            <span>APRENDER</span>
            <b>•</b>
            <span>PRACTICAR</span>
            <b>•</b>
            <span>CUIDAR</span>
          </div>

        </div>

        {/* Formulario de inicio de sesión */}
        <div className="login-formulario">

          <div className="login-titulo">

            <span>BIENVENIDO</span>

            <h2>Iniciar sesión</h2>

            <p>
              Ingresa tus datos para acceder al sistema.
            </p>

          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={iniciarSesion}>

            <div className="campo-login">

              <label htmlFor="correo">
                Correo electrónico
              </label>

              <div className="input-login">

                <span>✉️</span>

                <input
                  id="correo"
                  type="email"
                  placeholder="ejemplo@sena.com"
                  value={correo}
                  onChange={(e) =>
                    setCorreo(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="campo-login">

              <label htmlFor="password">
                Contraseña
              </label>

              <div className="input-login">

                <span>🔒</span>

                <input
                  id="password"
                  type={
                    mostrarPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="mostrar-password"
                  onClick={() =>
                    setMostrarPassword(
                      !mostrarPassword
                    )
                  }
                >
                  {mostrarPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            <div className="login-opciones">

              <label>
                <input type="checkbox" />
                Recordarme
              </label>

              <Link to="/recuperar">
                ¿Olvidaste tu contraseña?
              </Link>

            </div>

            <button
              type="submit"
              className="btn-login"
            >
              Iniciar sesión
              <span>→</span>
            </button>

          </form>

          <div className="registro-login">

            <span>
              ¿Aún no tienes una cuenta?
            </span>

            <Link to="/registro">
              Crear cuenta
            </Link>

          </div>

          <div className="login-footer">

            <span>
              Servicio Nacional de Aprendizaje
            </span>

            <strong>SENA</strong>

          </div>

        </div>

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;

          background:
            linear-gradient(
              135deg,
              #eef7f1,
              #f8faf9
            );

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 30px;
        }

        .login-contenedor {
          width: 100%;

          max-width: 1050px;

          min-height: 620px;

          display: grid;

          grid-template-columns:
            1.05fr
            0.95fr;

          background: white;

          border-radius: 24px;

          overflow: hidden;

          box-shadow:
            0 20px 60px
            rgba(0, 0, 0, 0.12);
        }

        /* Parte verde donde mostramos la imagen */
        .login-presentacion {
          background:
            linear-gradient(
              145deg,
              #005b35,
              #007a45
            );

          color: white;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;

          padding: 45px;
        }

        .imagen-centro {
          width: 260px;

          height: 260px;

          display: flex;

          align-items: center;

          justify-content: center;

          background: white;

          border-radius: 50%;

          padding: 20px;

          margin-bottom: 25px;

          box-shadow:
            0 15px 35px
            rgba(0, 0, 0, 0.18);
        }

        .imagen-centro img {
          width: 100%;

          height: 100%;

          object-fit: contain;
           border-radius: 50%; 
        }

        .login-presentacion h1 {
          margin: 0;

          font-size: 30px;

          font-weight: 800;
        }

        .login-presentacion h1 span {
          display: block;

          color: #b7e97c;
        }

        .login-presentacion p {
          max-width: 420px;

          margin:
            16px auto
            22px;

          color:
            rgba(255, 255, 255, 0.88);

          font-size: 14px;

          line-height: 1.7;
        }

        .frase-sena {
          display: flex;

          align-items: center;

          gap: 10px;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .frase-sena b {
          color: #f47721;

          font-size: 15px;
        }

        /* Parte derecha donde va el formulario */
        .login-formulario {
          padding: 55px;

          display: flex;

          flex-direction: column;

          justify-content: center;
        }

        .login-titulo span {
          color: #39a900;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .login-titulo h2 {
          margin:
            7px 0;

          color: #18251f;

          font-size: 32px;
        }

        .login-titulo p {
          margin:
            0 0 28px;

          color: #75817b;

          font-size: 14px;
        }

        .login-error {
          background: #fff0f0;

          border:
            1px solid #f0c4c4;

          color: #b32626;

          padding: 11px 13px;

          border-radius: 8px;

          margin-bottom: 18px;

          font-size: 13px;
        }

        .campo-login {
          margin-bottom: 18px;
        }

        .campo-login label {
          display: block;

          margin-bottom: 7px;

          color: #36433d;

          font-size: 13px;

          font-weight: 700;
        }

        .input-login {
          height: 48px;

          display: flex;

          align-items: center;

          gap: 9px;

          border:
            1px solid #d5ded9;

          border-radius: 9px;

          padding:
            0 13px;

          transition: 0.2s;
        }

        .input-login:focus-within {
          border-color: #39a900;

          box-shadow:
            0 0 0 3px
            rgba(57, 169, 0, 0.1);
        }

        .input-login span {
          font-size: 15px;
        }

        .input-login input {
          width: 100%;

          height: 100%;

          border: none;

          outline: none;

          font-size: 14px;

          color: #263238;
        }

        .input-login input::placeholder {
          color: #a0aaa5;
        }

        .mostrar-password {
          border: none;

          background: transparent;

          cursor: pointer;

          padding: 4px;

          font-size: 15px;
        }

        .login-opciones {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin:
            4px 0
            22px;

          font-size: 12px;
        }

        .login-opciones label {
          display: flex;

          align-items: center;

          gap: 6px;

          color: #68746e;
        }

        .login-opciones input {
          accent-color: #006b3c;
        }

        .login-opciones a {
          color: #006b3c;

          text-decoration: none;

          font-weight: 600;
        }

        .login-opciones a:hover {
          text-decoration: underline;
        }

        .btn-login {
          width: 100%;

          height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          border: none;

          border-radius: 9px;

          background: #006b3c;

          color: white;

          font-size: 14px;

          font-weight: 700;

          cursor: pointer;

          transition: 0.25s;
        }

        .btn-login:hover {
          background: #00522e;

          transform:
            translateY(-1px);
        }

        .btn-login span {
          font-size: 18px;
        }

        .registro-login {
          text-align: center;

          margin-top: 25px;

          font-size: 12px;

          color: #7b8580;
        }

        .registro-login a {
          margin-left: 5px;

          color: #006b3c;

          font-weight: 700;

          text-decoration: none;
        }

        .registro-login a:hover {
          text-decoration: underline;
        }

        .login-footer {
          display: flex;

          justify-content: center;

          align-items: center;

          gap: 7px;

          margin-top: 35px;

          padding-top: 18px;

          border-top:
            1px solid #edf0ee;

          color: #929b96;

          font-size: 10px;
        }

        .login-footer strong {
          color: #f47721;
        }

        /* En celulares ponemos las partes una debajo de otra */
        @media (max-width: 800px) {

          .login-page {
            padding: 15px;
          }

          .login-contenedor {
            grid-template-columns: 1fr;

            max-width: 500px;
          }

          .login-presentacion {
            padding: 35px 25px;
          }

          .imagen-centro {
            width: 180px;

            height: 180px;
          }

          .login-presentacion h1 {
            font-size: 25px;
          }

          .login-formulario {
            padding: 35px 30px;
          }
        }

        @media (max-width: 450px) {

          .login-page {
            padding: 0;
          }

          .login-contenedor {
            min-height: 100vh;

            border-radius: 0;
          }

          .imagen-centro {
            width: 145px;

            height: 145px;
          }

          .login-presentacion h1 {
            font-size: 22px;
          }

          .login-formulario {
            padding: 30px 22px;
          }

          .login-titulo h2 {
            font-size: 27px;
          }
        }

      `}</style>
    </div>
  );
}