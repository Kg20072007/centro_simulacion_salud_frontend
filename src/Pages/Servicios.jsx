import { Link } from "react-router-dom";

export default function Servicios() {
  return (
    <div className="servicios-page">

      {/* Encabezado con el logo y las opciones principales */}
      <header>

        <div className="logo">

          <img
            src="/img/logo1.png"
            alt="Logo SENA"
          />

          <span>
            Centro de Simulación
          </span>

        </div>

        {/* Menú principal */}
        <nav>
          <ul>

            <li>
              <Link to="/">
                Inicio
              </Link>
            </li>

            <li>
              <Link to="/acerca">
                Nosotros
              </Link>
            </li>

            {/* Esta es la página en la que estamos */}
            <li>
              <Link
                to="/servicios"
                className="activo"
              >
                Servicios
              </Link>
            </li>

            <li>
              <Link to="/simulaciones">
                Simulaciones
              </Link>
            </li>

            <li>
              <Link to="/contacto">
                Contacto
              </Link>
            </li>

          </ul>
        </nav>

      </header>


      {/* Banner principal de servicios */}
      <section className="hero">

        <div>

          <h1>
            Servicios de Simulación Clínica
          </h1>

          <p>
            Fortaleciendo las competencias del talento
            humano en salud mediante escenarios de
            práctica seguros.
          </p>

        </div>

      </section>


      {/* Presentación de los servicios */}
      <section className="titulo">

        <h2>
          Nuestros Servicios
        </h2>

        <p>
          Seleccione una práctica para consultar el
          material de apoyo o iniciar la simulación.
        </p>

      </section>


      <div className="contenedor">


        {/* Servicio 1: ahora sí queda conectado con su guía y práctica */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/signos vitales.jpeg"
              alt="Toma de Signos Vitales"
            />

          </div>


          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              🩺 Toma de Signos Vitales
            </h3>

            <p>
              Fortalezca las competencias en la valoración
              inicial del paciente mediante la medición
              correcta de la presión arterial, frecuencia
              cardíaca, frecuencia respiratoria, temperatura
              corporal y saturación de oxígeno utilizando
              simuladores clínicos y equipos biomédicos.
            </p>


            <div className="detalles">

              <span>
                ⏱ 30 minutos
              </span>

              <span>
                👥 20 aprendices
              </span>

              <span>
                📄 Guía disponible
              </span>

              <span>
                🏥 Ambiente Clínico
              </span>

            </div>


            <div className="botones">

              {/* Aquí abrimos la guía específica de signos vitales */}
              <Link
                to="/guia/signos-vitales"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              {/* Y desde aquí comienza la práctica */}
              <Link
                to="/practica/signos-vitales"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 2: Desinfección y esterilización */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/desinfeccion.jpg"
              alt="Desinfección y Esterilización"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              🧼 Desinfección y Esterilización
            </h3>

            <p>
              Realice prácticas sobre limpieza, desinfección
              y esterilización del instrumental médico
              aplicando protocolos de bioseguridad y control
              de infecciones utilizados en los servicios de
              salud.
            </p>

            <div className="detalles">

              <span>⏱ 40 minutos</span>
              <span>👥 15 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>🧴 Bioseguridad</span>

            </div>

            <div className="botones">

              {/* Estas rutas las podemos conectar cuando creemos esta guía */}
              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 3: Laboratorio clínico */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/Laboratorio.jpeg"
              alt="Laboratorio Clínico"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              🧪 Laboratorio Clínico
            </h3>

            <p>
              Desarrolle habilidades relacionadas con la toma
              de muestras, manejo de reactivos, identificación
              de tubos y procesamiento básico de análisis
              clínicos.
            </p>

            <div className="detalles">

              <span>⏱ 50 minutos</span>
              <span>👥 18 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>🔬 Laboratorio</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 4: Atención prehospitalaria */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/atencion-prehospitalaria.jpg"
              alt="Atención Prehospitalaria"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              🚑 Atención Prehospitalaria
            </h3>

            <p>
              Simule la atención inicial de pacientes en
              situaciones de emergencia aplicando protocolos
              de evaluación primaria, inmovilización y
              traslado seguro.
            </p>

            <div className="detalles">

              <span>⏱ 60 minutos</span>
              <span>👥 20 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>🚨 Emergencias</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 5: Equipos biomédicos */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/equipos biomedicos.jpg"
              alt="Equipos Biomédicos"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              🏥 Atención con Equipos Biomédicos
            </h3>

            <p>
              Aprenda el funcionamiento y manejo seguro de
              equipos biomédicos como monitores
              multiparámetro, desfibriladores, bombas de
              infusión y ventiladores utilizados en la
              atención clínica.
            </p>

            <div className="detalles">

              <span>⏱ 45 minutos</span>
              <span>👥 15 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>💻 Equipos Clínicos</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 6: Farmacia */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/regencia farmacia.jpg"
              alt="Servicios Farmacéuticos"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              💊 Servicios Farmacéuticos y Regencia en Farmacia
            </h3>

            <p>
              Desarrolle competencias en la recepción,
              almacenamiento, dispensación y control de
              medicamentos, garantizando el cumplimiento
              de la normatividad vigente y la seguridad
              del paciente.
            </p>

            <div className="detalles">

              <span>⏱ 45 minutos</span>
              <span>👥 20 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>💊 Farmacia</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 7: Sistema de monitoreo */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/monitoreo.jpeg"
              alt="Sistema de Monitoreo"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              📊 Sistema de Monitoreo
            </h3>

            <p>
              Interprete los signos vitales obtenidos mediante
              monitores multiparámetro y fortalezca la toma
              de decisiones clínicas durante escenarios
              simulados.
            </p>

            <div className="detalles">

              <span>⏱ 35 minutos</span>
              <span>👥 20 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>📈 Monitoreo</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 8: Registro y retroalimentación */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/retroalimentacion.jpeg"
              alt="Registro y Retroalimentación"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              📝 Registro y Retroalimentación
            </h3>

            <p>
              Registre las actividades realizadas durante
              la práctica y reciba la evaluación y
              retroalimentación del instructor para
              fortalecer el proceso de aprendizaje.
            </p>

            <div className="detalles">

              <span>⏱ 20 minutos</span>
              <span>👥 25 aprendices</span>
              <span>📄 Formato digital</span>
              <span>📝 Evaluación</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 9: Reanimación */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/rcp.jpeg"
              alt="Reanimación Básica y Avanzada"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              ❤️ Reanimación Básica y Avanzada
            </h3>

            <p>
              Practique maniobras de soporte vital básico
              y avanzado mediante simuladores de alta
              fidelidad, fortaleciendo la respuesta ante
              emergencias cardiorrespiratorias.
            </p>

            <div className="detalles">

              <span>⏱ 60 minutos</span>
              <span>👥 16 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>❤️ RCP</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>


        {/* Servicio 10: Geriatría */}
        <div className="servicio">

          <div className="imagen">

            <img
              src="/img/geriatria.jpg"
              alt="Cuidados de Enfermería y Geriatría"
            />

          </div>

          <div className="info">

            <span className="estado">
              🟢 Disponible
            </span>

            <h3>
              👵 Cuidados de Enfermería y Geriatría
            </h3>

            <p>
              Desarrolle habilidades para la atención
              integral del adulto mayor, aplicando cuidados
              de enfermería enfocados en la seguridad,
              el bienestar y la calidad de vida.
            </p>

            <div className="detalles">

              <span>⏱ 50 minutos</span>
              <span>👥 18 aprendices</span>
              <span>📄 Guía disponible</span>
              <span>👵 Geriatría</span>

            </div>

            <div className="botones">

              <Link
                to="/guias"
                className="btn guia"
              >
                📄 Ver guía
              </Link>

              <Link
                to="/simulaciones"
                className="btn simulacion"
              >
                ▶ Iniciar práctica
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}