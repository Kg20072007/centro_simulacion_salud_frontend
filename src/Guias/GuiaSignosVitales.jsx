import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GuiaSignosVitales() {
  const [tema, setTema] = useState(
    () => localStorage.getItem("tema-guia") || "claro"
  );

  useEffect(() => {
    localStorage.setItem("tema-guia", tema);
  }, [tema]);

  const cambiarTema = () => {
    setTema((actual) => actual === "claro" ? "oscuro" : "claro");
  };

  return (
    <div className={`guia-signos ${tema}`}>
      <header className="guia-header">
        <Link to="/guias" className="guia-logo">
          <img src="/img/logo1.png" alt="Logo SENA" />
          <div>
            <h2>Centro de Simulación</h2>
            <p>Servicio Nacional de Aprendizaje SENA</p>
          </div>
        </Link>

        <div className="guia-acciones">
          <span className="guia-usuario">
            👤 Estudiante/Angie Gomez
          </span>
          <button className="guia-tema" onClick={cambiarTema}>
            {tema === "claro" ? "🌙 Modo oscuro" : "☀️ Modo claro"}
          </button>
        </div>
      </header>

      <main>
        <section className="guia-banner">
          <div>
            <h1>🩺 Guía de Toma de Signos Vitales</h1>
            <p>
              Esta guía orienta al aprendiz en la correcta medición
              de los signos vitales, fortaleciendo las competencias
              clínicas mediante prácticas seguras y estandarizadas.
            </p>
            <div className="guia-datos">
              <span>⏱ 30 Minutos</span>
              <span>👥 20 Aprendices</span>
              <span>🏥 Ambiente Clínico</span>
              <span>⭐ Nivel Básico</span>
            </div>
          </div>
          <img
            src="/img/signos%20vitales.jpeg"
            alt="Elementos para tomar signos vitales"
          />
        </section>

        <section className="guia-tarjetas">
          {[
            ["🎯", "Objetivos", "Conozca las competencias y resultados de aprendizaje."],
            ["🧰", "Materiales", "Equipos e insumos necesarios para la práctica."],
            ["📋", "Procedimiento", "Consulte los pasos del procedimiento clínico."],
            ["⚠️", "Recomendaciones", "Buenas prácticas y normas de bioseguridad."]
          ].map(([icono, titulo, descripcion]) => (
            <article className="guia-card" key={titulo}>
              <div className="guia-icono">{icono}</div>
              <h3>{titulo}</h3>
              <p>{descripcion}</p>
            </article>
          ))}
        </section>

        <div className="guia-contenedor">
          <section className="guia-seccion" id="objetivos">
            <h2>🎯 Objetivos de la práctica</h2>
            <p>
              Fortalecer las habilidades del aprendiz en la valoración
              inicial del paciente, aplicando protocolos seguros y
              garantizando la calidad del proceso asistencial.
            </p>

            <div className="guia-cuadricula">
              <article className="guia-panel">
                <h3>✔ Objetivo general</h3>
                <p>
                  Desarrollar competencias para medir, interpretar
                  y registrar correctamente los signos vitales.
                </p>
              </article>

              <article className="guia-panel">
                <h3>📚 Competencias</h3>
                <ul>
                  <li>Aplicar protocolos clínicos.</li>
                  <li>Registrar información correctamente.</li>
                  <li>Garantizar la seguridad del paciente.</li>
                  <li>Utilizar los equipos biomédicos.</li>
                </ul>
              </article>

              <article className="guia-panel">
                <h3>🎓 Resultado esperado</h3>
                <p>
                  Medir los signos vitales, interpretar los resultados
                  y documentarlos según los protocolos institucionales.
                </p>
              </article>
            </div>
          </section>

          <section className="guia-seccion" id="materiales">
            <h2>🧰 Materiales e Insumos</h2>
            <div className="guia-cuadricula">
              {[
                ["🩺", "Fonendoscopio", "Permite auscultar sonidos corporales."],
                ["❤️", "Tensiómetro", "Mide la presión arterial."],
                ["🌡️", "Termómetro", "Determina la temperatura corporal."],
                ["📟", "Oxímetro", "Mide saturación de oxígeno y pulso."],
                ["🧤", "Guantes", "Elemento de protección personal."],
                ["📝", "Formato de registro", "Permite registrar los resultados."]
              ].map(([icono, nombre, descripcion]) => (
                <article className="guia-material" key={nombre}>
                  <div className="guia-icono">{icono}</div>
                  <h3>{nombre}</h3>
                  <p>{descripcion}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guia-seccion" id="procedimiento">
            <h2>📋 Procedimiento</h2>
            <div className="guia-procedimientos">
              {[
                ["① Lavado de manos", "Realizar la higiene de manos antes de comenzar."],
                ["② Identificación del paciente", "Verificar la identidad y explicar el procedimiento."],
                ["③ Preparación del equipo", "Comprobar que los equipos funcionen correctamente."],
                ["④ Medición de signos vitales", "Medir presión arterial, pulso, respiración, temperatura y saturación."],
                ["⑤ Registro de resultados", "Anotar los resultados en el formato correspondiente."],
                ["⑥ Finalización", "Desinfectar los equipos, organizar el área e higienizar las manos."]
              ].map(([titulo, descripcion]) => (
                <article className="guia-paso" key={titulo}>
                  <h3>{titulo}</h3>
                  <p>{descripcion}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guia-seccion guia-continuar">
            <h2>🚀 Continuar con la Simulación</h2>
            <p>
              Ha finalizado la lectura de la guía. Puede regresar a
              servicios o continuar con la práctica de simulación clínica.
            </p>
            <div className="guia-botones">
              <Link to="/servicios" className="guia-boton secundario">
                ⬅️ Volver a Servicios
              </Link>
              <Link
                to="/practica/signos-vitales"
                className="guia-boton principal"
              >
                ▶️ Iniciar Práctica
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="guia-footer">
        © 2026 Centro de Simulación Clínica - SENA |
        Guía de Toma de Signos Vitales
      </footer>
    </div>
  );
}
