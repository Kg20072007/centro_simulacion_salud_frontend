import Navbar from "../Components/Navbar";

export default function Acerca() {
  return (
    <div className="acerca-page">

      <Navbar />

      {/* Encabezado de la sección */}
      <section className="acerca-hero">
        <div className="acerca-hero-content">

          <span className="etiqueta-acerca">
            ACERCA DEL CENTRO
          </span>

          <h1>
            Centro de Simulación de Enfermería
          </h1>

          <p>
            Un espacio creado para fortalecer las competencias
            de los aprendices mediante experiencias prácticas,
            seguras y cercanas a situaciones reales de atención
            en salud.
          </p>

        </div>
      </section>

      {/* Aquí explicamos de manera sencilla qué hacemos */}
      <section className="acerca-contenido">

        <div className="titulo-acerca">
          <span>CONOCE NUESTRO CENTRO</span>

          <h2>
            Aprender haciendo también es cuidar
          </h2>

          <p>
            La simulación permite que los aprendices practiquen,
            se equivoquen, aprendan y mejoren sus habilidades
            antes de enfrentarse a situaciones reales.
          </p>
        </div>

        {/* Tarjetas principales */}
        <div className="about-grid">

          <div className="about-card">

            <div className="icono-card">
              🏥
            </div>

            <span className="numero-card">
              01
            </span>

            <h3>
              ¿Qué es?
            </h3>

            <p>
              El Centro de Simulación de Enfermería es un espacio
              de formación donde los aprendices pueden desarrollar
              y fortalecer habilidades relacionadas con la atención
              en salud mediante escenarios prácticos y simulados.
            </p>

          </div>

          <div className="about-card">

            <div className="icono-card">
              🎯
            </div>

            <span className="numero-card">
              02
            </span>

            <h3>
              ¿Para qué sirve?
            </h3>

            <p>
              Permite practicar procedimientos, utilizar equipos,
              desarrollar competencias y recibir retroalimentación
              antes de enfrentarse a situaciones reales.
            </p>

          </div>

          <div className="about-card">

            <div className="icono-card">
              🩺
            </div>

            <span className="numero-card">
              03
            </span>

            <h3>
              ¿Qué se puede practicar?
            </h3>

            <p>
              Los aprendices pueden fortalecer habilidades en
              procedimientos de enfermería, toma de signos vitales,
              manejo de equipos y diferentes escenarios de atención.
            </p>

          </div>

        </div>

        {/* Misión del centro */}
        <div className="mission">

          <div className="mission-icon">
            🎯
          </div>

          <div>
            <span className="mission-label">
              NUESTRO PROPÓSITO
            </span>

            <h2>
              Misión
            </h2>

            <p>
              Apoyar la formación integral de los aprendices
              mediante ambientes de simulación que promuevan
              la práctica segura, el aprendizaje activo y el
              desarrollo de competencias en enfermería.
            </p>
          </div>

        </div>

        {/* Valores que queremos transmitir */}
        <div className="valores-section">

          <div className="titulo-acerca">
            <span>LO QUE BUSCAMOS</span>

            <h2>
              Una formación más segura y práctica
            </h2>
          </div>

          <div className="valores-grid">

            <div className="valor">
              <div>🛡️</div>
              <h3>Seguridad</h3>
              <p>
                Practicar en un entorno controlado antes
                de enfrentarse a situaciones reales.
              </p>
            </div>

            <div className="valor">
              <div>🤝</div>
              <h3>Trabajo en equipo</h3>
              <p>
                Fortalecer la comunicación y colaboración
                entre los integrantes del equipo de salud.
              </p>
            </div>

            <div className="valor">
              <div>📚</div>
              <h3>Aprendizaje</h3>
              <p>
                Convertir cada práctica en una oportunidad
                para aprender y mejorar.
              </p>
            </div>

            <div className="valor">
              <div>💚</div>
              <h3>Calidad humana</h3>
              <p>
                Recordar que detrás de cada procedimiento
                existe una persona que necesita cuidado.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Pie de página */}
      <footer className="footer-acerca">

        <div className="footer-acerca-contenido">

          <div>
            <h3>
              SERVICIO NACIONAL DE APRENDIZAJE SENA
            </h3>

            <p>
              Centro de Simulación de Enfermería
            </p>

            <p>
              Bogotá D.C., Colombia
            </p>
          </div>

          <div className="footer-logo">
            <img
              src="/img/logo1.png"
              alt="Logo SENA"
            />
          </div>

        </div>

        <div className="footer-acerca-bottom">
          <p>
            © 2026 Centro de Simulación Clínica -
            Proyecto Formativo SENA
          </p>
        </div>

      </footer>

      {/* Los estilos quedan aquí para no depender de otro CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .acerca-page {
          min-height: 100vh;
          background: #f5f7f6;
          color: #263238;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* Presentación principal */
        .acerca-hero {
          background: linear-gradient(
            135deg,
            #006b3c,
            #1e5a38
          );
          color: white;
          padding: 75px 20px;
          text-align: center;
        }

        .acerca-hero-content {
          max-width: 850px;
          margin: 0 auto;
        }

        .etiqueta-acerca {
          display: inline-block;
          padding: 7px 16px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }

        .acerca-hero h1 {
          margin: 0 0 18px;
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.15;
        }

        .acerca-hero p {
          max-width: 720px;
          margin: 0 auto;
          font-size: 17px;
          line-height: 1.7;
          opacity: 0.94;
        }

        /* Contenido general */
        .acerca-contenido {
          width: min(1150px, 92%);
          margin: 0 auto;
          padding: 65px 0;
        }

        .titulo-acerca {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 40px;
        }

        .titulo-acerca > span {
          color: #39a900;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1.5px;
        }

        .titulo-acerca h2 {
          color: #006b3c;
          font-size: 32px;
          margin: 10px 0 12px;
        }

        .titulo-acerca p {
          color: #647176;
          line-height: 1.7;
          margin: 0;
        }

        /* Tarjetas informativas */
        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 55px;
        }

        .about-card {
          position: relative;
          background: white;
          padding: 30px 25px;
          border-radius: 16px;
          border: 1px solid #e2e9e5;
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.06);
          transition: 0.3s;
          overflow: hidden;
        }

        .about-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.11);
        }

        .icono-card {
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eaf6ef;
          border-radius: 15px;
          font-size: 30px;
          margin-bottom: 20px;
        }

        .numero-card {
          position: absolute;
          top: 20px;
          right: 20px;
          color: #b7c5bd;
          font-size: 14px;
          font-weight: bold;
        }

        .about-card h3 {
          color: #006b3c;
          font-size: 22px;
          margin: 0 0 12px;
        }

        .about-card p {
          color: #5f6d72;
          line-height: 1.7;
          margin: 0;
          font-size: 15px;
        }

        /* Bloque de misión */
        .mission {
          display: grid;
          grid-template-columns: 100px 1fr;
          align-items: center;
          gap: 30px;
          background: linear-gradient(
            135deg,
            #eaf6ef,
            #f7fbf8
          );
          border-left: 6px solid #39a900;
          border-radius: 16px;
          padding: 35px 40px;
          margin-bottom: 65px;
        }

        .mission-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .mission-label {
          color: #39a900;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1.5px;
        }

        .mission h2 {
          color: #006b3c;
          margin: 7px 0 10px;
          font-size: 28px;
        }

        .mission p {
          margin: 0;
          color: #526167;
          line-height: 1.8;
        }

        /* Valores */
        .valores-section {
          margin-top: 20px;
        }

        .valores-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .valor {
          background: white;
          border-radius: 14px;
          padding: 25px 20px;
          text-align: center;
          border: 1px solid #e5ebe7;
          transition: 0.3s;
        }

        .valor:hover {
          transform: translateY(-4px);
          border-color: #b8d8c5;
        }

        .valor > div {
          font-size: 30px;
          margin-bottom: 12px;
        }

        .valor h3 {
          color: #006b3c;
          margin: 0 0 8px;
          font-size: 18px;
        }

        .valor p {
          color: #69767a;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        /* Pie de página */
        .footer-acerca {
          background: #1e5a38;
          color: white;
        }

        .footer-acerca-contenido {
          width: min(1100px, 92%);
          margin: 0 auto;
          padding: 35px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .footer-acerca h3 {
          font-size: 15px;
          margin: 0 0 10px;
        }

        .footer-acerca p {
          margin: 5px 0;
          font-size: 13px;
        }

        .footer-logo img {
          width: 70px;
          height: 70px;
          object-fit: contain;
        }

        .footer-acerca-bottom {
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 17px;
        }

        .footer-acerca-bottom p {
          margin: 0;
        }

        /* En tablets reducimos las columnas */
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
          }

          .about-card:last-child {
            grid-column: 1 / -1;
          }

          .valores-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* En celulares dejamos todo más sencillo */
        @media (max-width: 600px) {
          .acerca-hero {
            padding: 55px 20px;
          }

          .acerca-hero h1 {
            font-size: 32px;
          }

          .acerca-hero p {
            font-size: 15px;
          }

          .acerca-contenido {
            padding: 45px 0;
          }

          .titulo-acerca h2 {
            font-size: 26px;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }

          .about-card:last-child {
            grid-column: auto;
          }

          .mission {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 30px 22px;
          }

          .mission-icon {
            margin: 0 auto;
          }

          .valores-grid {
            grid-template-columns: 1fr;
          }

          .footer-acerca-contenido {
            flex-direction: column;
            text-align: center;
          }
        }

      `}</style>

    </div>
  );
}