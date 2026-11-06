
import React from "react";
import { Link } from "react-router-dom";

// Guía de aprendizaje para las prácticas básicas de laboratorio clínico.
// Organicé las secciones para que sea más fácil encontrar cada tema.
export default function GuiaLaboratorioClinico() {
  // Estas tarjetas permiten desplazarse directamente a cada sección.
  const accesos = [
    {
      icono: "🎯",
      titulo: "Objetivos",
      descripcion: "Conoce las competencias que desarrollarás.",
      destino: "#objetivos",
    },
    {
      icono: "🧰",
      titulo: "Materiales",
      descripcion: "Identifica los equipos e insumos necesarios.",
      destino: "#materiales",
    },
    {
      icono: "🧪",
      titulo: "Procedimiento",
      descripcion: "Consulta los pasos generales de la práctica.",
      destino: "#procedimiento",
    },
    {
      icono: "🛡️",
      titulo: "Bioseguridad",
      descripcion: "Repasa las medidas para trabajar de forma segura.",
      destino: "#bioseguridad",
    },
  ];

  // Materiales que pueden utilizarse en las actividades de simulación.
  const materiales = [
    {
      icono: "🧪",
      nombre: "Tubos de ensayo",
      descripcion:
        "Recipientes utilizados para actividades de laboratorio y simulación del manejo de muestras.",
    },
    {
      icono: "💉",
      nombre: "Jeringas",
      descripcion:
        "Material utilizado en determinados escenarios educativos bajo supervisión del instructor.",
    },
    {
      icono: "🧤",
      nombre: "Guantes",
      descripcion:
        "Elemento de protección personal seleccionado de acuerdo con los riesgos de la actividad.",
    },
    {
      icono: "🔬",
      nombre: "Microscopio",
      descripcion:
        "Equipo que permite observar muestras y desarrollar actividades de aprendizaje.",
    },
    {
      icono: "🧫",
      nombre: "Recipientes para muestras",
      descripcion:
        "Recipientes adecuados para identificar y contener las muestras del escenario de simulación.",
    },
    {
      icono: "📝",
      nombre: "Formato de registro",
      descripcion:
        "Documento para anotar los datos, las observaciones y los resultados de la actividad.",
    },
  ];

  // Recomendaciones básicas para reducir los riesgos durante la práctica.
  const normas = [
    {
      titulo: "Higiene de manos",
      descripcion:
        "Realiza la higiene de manos antes y después de la actividad, siguiendo la técnica indicada por el instructor.",
    },
    {
      titulo: "Elementos de protección personal",
      descripcion:
        "Utiliza bata, guantes, protección ocular u otros elementos cuando el riesgo y el protocolo de la actividad lo requieran.",
    },
    {
      titulo: "Manipulación segura",
      descripcion:
        "Manipula los materiales de acuerdo con las instrucciones recibidas. Evita tocarte la cara y no pipetees con la boca.",
    },
    {
      titulo: "Manejo de residuos",
      descripcion:
        "Deposita cada residuo en el recipiente correspondiente según su clasificación y el protocolo institucional.",
    },
    {
      titulo: "Prevención de accidentes",
      descripcion:
        "No comas ni bebas en el área de trabajo. Informa inmediatamente cualquier derrame, lesión o situación de riesgo.",
    },
    {
      titulo: "Orden del área",
      descripcion:
        "Mantén despejada la superficie de trabajo y limpia el área de acuerdo con las instrucciones del laboratorio.",
    },
  ];

  // Pasos generales para organizar una práctica educativa.
  const pasos = [
    {
      titulo: "Preparar el área",
      descripcion:
        "Verifica que el espacio esté limpio, organizado y habilitado para la actividad.",
    },
    {
      titulo: "Revisar los materiales",
      descripcion:
        "Comprueba que los elementos necesarios estén disponibles, íntegros e identificados.",
    },
    {
      titulo: "Realizar higiene de manos",
      descripcion:
        "Lávate o desinféctate las manos según las indicaciones institucionales y prepara los elementos de protección requeridos.",
    },
    {
      titulo: "Identificar los materiales",
      descripcion:
        "Reconoce el nombre, la función y las condiciones de uso de cada elemento antes de comenzar.",
    },
    {
      titulo: "Desarrollar la actividad",
      descripcion:
        "Sigue las instrucciones del instructor y el procedimiento definido para el escenario de simulación.",
    },
    {
      titulo: "Registrar observaciones",
      descripcion:
        "Anota los datos y resultados solicitados de forma clara, completa y sin inventar información.",
    },
    {
      titulo: "Disponer los residuos",
      descripcion:
        "Clasifica y deposita los residuos en los recipientes establecidos para cada tipo de material.",
    },
    {
      titulo: "Dejar el área organizada",
      descripcion:
        "Realiza la limpieza indicada, guarda los elementos autorizados y comunica cualquier novedad.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f7f4",
        color: "#26352c",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* ENCABEZADO: identidad institucional y perfil del estudiante. */}
      <header
        style={{
          background: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          padding: "18px 5%",
          boxShadow: "0 4px 15px rgba(0,0,0,.08)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src="/img/logo1.png"
            alt="Logo SENA"
            style={{
              width: "55px",
              height: "55px",
              objectFit: "contain",
            }}
          />

          <div>
            <h2
              style={{
                color: "#0b6b3a",
                fontSize: "clamp(18px, 2vw, 24px)",
                margin: 0,
              }}
            >
              Centro de Simulación
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "#666",
                margin: "5px 0 0",
              }}
            >
              Servicio Nacional de Aprendizaje SENA
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#eef8f1",
            padding: "10px 18px",
            borderRadius: "30px",
            fontWeight: 600,
            color: "#0b6b3a",
          }}
        >
          👤 Estudiante / Angie Gomez
        </div>
      </header>

      <main>
        {/* BANNER: presenta el tema y los datos generales de la práctica. */}
        <section
          style={{
            width: "90%",
            maxWidth: "1350px",
            margin: "35px auto",
            boxSizing: "border-box",
            background:
              "linear-gradient(110deg, rgba(7,76,40,.96), rgba(11,107,58,.83)), url('/img/laboratorio.jpg') center/cover",
            borderRadius: "22px",
            padding: "clamp(25px, 5vw, 65px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "35px",
            color: "#ffffff",
          }}
        >
          <div style={{ flex: "1 1 350px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 13px",
                borderRadius: "30px",
                background: "rgba(255,255,255,.16)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              GUÍA DE APRENDIZAJE
            </span>

            <h1
              style={{
                fontSize: "clamp(30px, 4vw, 48px)",
                lineHeight: 1.2,
                margin: "20px 0",
              }}
            >
              🧪 Guía de Laboratorio Clínico
            </h1>

            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.8,
                maxWidth: "650px",
                marginBottom: "25px",
              }}
            >
              Esta guía orienta al aprendiz en el desarrollo de prácticas
              básicas de laboratorio clínico, fortaleciendo el manejo
              responsable de materiales, equipos y muestras en el Centro
              de Simulación.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {[
                "⏱ 45 minutos",
                "👥 20 aprendices",
                "🧪 Ambiente de laboratorio",
                "⭐ Nivel básico",
              ].map((dato) => (
                <span
                  key={dato}
                  style={{
                    background: "rgba(255,255,255,.16)",
                    padding: "12px 15px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  {dato}
                </span>
              ))}
            </div>
          </div>

          <img
            src="/img/laboratorio.jpeg"
            alt="Ambiente de laboratorio clínico"
            onError={(e) => {
              // Si esta imagen no existe, oculto el espacio para evitar un cuadro vacío.
              e.currentTarget.style.display = "none";
            }}
            style={{
              width: "min(100%, 340px)",
              maxHeight: "280px",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,.25)",
            }}
          />
        </section>

        {/* ACCESOS RÁPIDOS: cada tarjeta lleva a una parte de esta guía. */}
        <nav
          aria-label="Navegación de la guía"
          style={{
            width: "90%",
            maxWidth: "1350px",
            margin: "0 auto 40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {accesos.map((acceso) => (
            <a
              key={acceso.destino}
              href={acceso.destino}
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "17px",
                textAlign: "center",
                boxShadow: "0 7px 22px rgba(0,0,0,.06)",
                textDecoration: "none",
                color: "inherit",
                borderBottom: "4px solid #39a900",
                transition: "transform .2s",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>
                {acceso.icono}
              </div>

              <h3 style={{ color: "#0b6b3a", margin: "0 0 10px" }}>
                {acceso.titulo}
              </h3>

              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {acceso.descripcion}
              </p>
            </a>
          ))}
        </nav>

        <div
          style={{
            width: "90%",
            maxWidth: "1350px",
            margin: "0 auto",
          }}
        >
          {/* OBJETIVOS: explica qué se espera aprender durante la práctica. */}
          <section
            id="objetivos"
            style={{
              background: "#ffffff",
              padding: "clamp(22px, 4vw, 40px)",
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,.06)",
              marginBottom: "30px",
              scrollMarginTop: "120px",
            }}
          >
            <h2 style={tituloSeccion}>
              🎯 Objetivos de la Práctica
            </h2>

            <p style={parrafo}>
              La práctica de laboratorio clínico busca fortalecer las
              competencias del aprendiz en el reconocimiento de materiales,
              equipos y muestras, aplicando medidas de bioseguridad y
              procedimientos definidos para el ambiente de simulación.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "20px",
              }}
            >
              <div style={tarjetaInterior}>
                <h3 style={tituloTarjeta}>✔ Objetivo general</h3>
                <p style={parrafo}>
                  Desarrollar habilidades básicas para participar en
                  actividades de laboratorio de forma segura, organizada
                  y responsable.
                </p>
              </div>

              <div style={tarjetaInterior}>
                <h3 style={tituloTarjeta}>📚 Competencias</h3>
                <ul style={lista}>
                  <li>Aplicar normas básicas de bioseguridad.</li>
                  <li>Identificar materiales y equipos.</li>
                  <li>Manipular materiales correctamente.</li>
                  <li>Mantener organizada el área de trabajo.</li>
                  <li>Registrar las observaciones de la actividad.</li>
                </ul>
              </div>

              <div style={tarjetaInterior}>
                <h3 style={tituloTarjeta}>🎓 Resultado esperado</h3>
                <p style={parrafo}>
                  Reconocer los elementos básicos del laboratorio y explicar
                  las medidas de seguridad necesarias para las actividades
                  de simulación.
                </p>
              </div>
            </div>
          </section>

          {/* MATERIALES: presenta los elementos de apoyo para la simulación. */}
          <section
            id="materiales"
            style={{
              ...seccion,
              scrollMarginTop: "120px",
            }}
          >
            <h2 style={tituloSeccion}>🧰 Materiales y Equipos</h2>

            <p style={parrafo}>
              Estos elementos pueden utilizarse durante las actividades
              de simulación. La selección depende del escenario, los
              materiales disponibles y las indicaciones del instructor.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {materiales.map((material) => (
                <article
                  key={material.nombre}
                  style={{
                    background: "#ffffff",
                    padding: "25px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,.06)",
                    textAlign: "center",
                    border: "1px solid #edf1ed",
                  }}
                >
                  <div style={{ fontSize: "43px" }}>
                    {material.icono}
                  </div>

                  <h3
                    style={{
                      color: "#0b6b3a",
                      margin: "15px 0",
                    }}
                  >
                    {material.nombre}
                  </h3>

                  <p style={parrafo}>{material.descripcion}</p>
                </article>
              ))}
            </div>

            <div
              style={{
                background: "#fff8e6",
                padding: "18px",
                borderRadius: "12px",
                marginTop: "22px",
                borderLeft: "5px solid #e5a000",
                lineHeight: 1.7,
              }}
            >
              <strong>⚠️ Recuerda:</strong> no todos los materiales se usan
              en todas las prácticas. Verifica cuáles necesitas y sigue
              las instrucciones de tu instructor.
            </div>
          </section>

          {/* BIOSEGURIDAD: recomendaciones para proteger al aprendiz y al entorno. */}
          <section
            id="bioseguridad"
            style={{
              ...seccion,
              scrollMarginTop: "120px",
            }}
          >
            <h2 style={tituloSeccion}>🛡️ Normas de Bioseguridad</h2>

            <p style={parrafo}>
              La bioseguridad ayuda a reducir los riesgos de exposición
              y contaminación durante las actividades de laboratorio.
              Aplica siempre los protocolos institucionales y las medidas
              específicas indicadas para cada escenario.
            </p>

            <div style={{ display: "grid", gap: "16px" }}>
              {normas.map((norma, indice) => (
                <article
                  key={norma.titulo}
                  style={{
                    background: "#f8fbf9",
                    padding: "22px",
                    borderLeft: "6px solid #39a900",
                    borderRadius: "12px",
                  }}
                >
                  <h3
                    style={{
                      color: "#0b6b3a",
                      margin: "0 0 10px",
                    }}
                  >
                    {indice + 1}. {norma.titulo}
                  </h3>

                  <p style={parrafo}>{norma.descripcion}</p>
                </article>
              ))}
            </div>
          </section>

          {/* PROCEDIMIENTO: organiza el trabajo en pasos generales de aprendizaje. */}
          <section
            id="procedimiento"
            style={{
              ...seccion,
              scrollMarginTop: "120px",
            }}
          >
            <h2 style={tituloSeccion}>
              🧪 Procedimiento General de la Práctica
            </h2>

            <p style={parrafo}>
              Los siguientes pasos sirven como orientación general para
              organizar una actividad de simulación. El procedimiento
              específico debe ajustarse a las instrucciones del instructor
              y al protocolo aplicable.
            </p>

            <div style={{ display: "grid", gap: "18px" }}>
              {pasos.map((paso, indice) => (
                <div
                  key={paso.titulo}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "18px",
                    padding: "20px",
                    border: "1px solid #e7eee8",
                    borderRadius: "14px",
                    background: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      minWidth: "42px",
                      height: "42px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      background: "#e7f5e8",
                      color: "#0b6b3a",
                      fontWeight: 700,
                    }}
                  >
                    {indice + 1}
                  </span>

                  <div>
                    <h3
                      style={{
                        color: "#0b6b3a",
                        margin: "0 0 8px",
                      }}
                    >
                      {paso.titulo}
                    </h3>

                    <p style={parrafo}>{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* REGISTRO: permite revisar los elementos de la práctica. */}
          <section style={seccion}>
            <h2 style={tituloSeccion}>
              📋 Lista de Verificación
            </h2>

            <p style={parrafo}>
              Marca cada punto cuando lo hayas comprobado durante la
              preparación o el cierre de la actividad. Esta lista es
              orientativa y no sustituye el formato oficial del laboratorio.
            </p>

            <div style={{ display: "grid", gap: "12px" }}>
              {[
                "El área está preparada para la actividad.",
                "Los materiales necesarios están disponibles.",
                "Se revisaron las medidas de bioseguridad.",
                "Se siguieron las instrucciones del instructor.",
                "Las observaciones se registraron correctamente.",
                "Los residuos se clasificaron según el protocolo.",
                "El área quedó organizada al finalizar.",
              ].map((item) => (
                <label
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "#f8fbf9",
                    padding: "15px",
                    borderRadius: "10px",
                    lineHeight: 1.6,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "18px",
                      height: "18px",
                      marginTop: "2px",
                      accentColor: "#0b6b3a",
                    }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* RECOMENDACIONES: refuerza hábitos responsables de trabajo. */}
          <section
            id="recomendaciones"
            style={{
              ...seccion,
              scrollMarginTop: "120px",
            }}
          >
            <h2 style={tituloSeccion}>
              💡 Recomendaciones Finales
            </h2>

            <ul style={lista}>
              <li>
                Llega preparado y revisa las indicaciones de la práctica.
              </li>
              <li>
                Pregunta al instructor si tienes dudas sobre un material
                o procedimiento.
              </li>
              <li>
                No manipules muestras ni equipos sin autorización.
              </li>
              <li>
                Identifica y comunica de inmediato cualquier incidente.
              </li>
              <li>
                Registra las observaciones de manera clara y honesta.
              </li>
              <li>
                Respeta la confidencialidad de la información que pueda
                relacionarse con pacientes o casos clínicos.
              </li>
            </ul>

            <div
              style={{
                marginTop: "25px",
                padding: "25px",
                background: "#eaf6ec",
                borderRadius: "15px",
                borderLeft: "6px solid #39a900",
              }}
            >
              <h3 style={tituloTarjeta}>
                🎓 Importancia de la práctica
              </h3>

              <p style={parrafo}>
                Las actividades de laboratorio permiten fortalecer el
                aprendizaje, familiarizarse con los materiales y desarrollar
                hábitos de organización, observación y bioseguridad que
                contribuyen a una formación responsable en el área de la salud.
              </p>
            </div>
          </section>

          {/* PIE DE PÁGINA: permite volver al listado de guías o ir a evaluaciones. */}
          <footer
            style={{
              textAlign: "center",
              padding: "30px 10px 40px",
              color: "#66736a",
            }}
          >
            <p style={{ marginBottom: "18px" }}>
              Centro de Simulación de Enfermería · SENA
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/guias"
                style={botonSecundario}
              >
                ← Volver a las guías
              </Link>

              <Link
                to="/evaluaciones"
                style={botonPrincipal}
              >
                Ir a prácticas y evaluaciones →
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

// Estilos compartidos para evitar repetir las mismas propiedades en cada sección.
const seccion = {
  background: "#ffffff",
  padding: "clamp(22px, 4vw, 40px)",
  borderRadius: "20px",
  boxShadow: "0 8px 24px rgba(0,0,0,.06)",
  marginBottom: "30px",
};

const tituloSeccion = {
  color: "#0b6b3a",
  margin: "0 0 25px",
  fontSize: "clamp(24px, 3vw, 30px)",
  borderLeft: "6px solid #39a900",
  paddingLeft: "15px",
  lineHeight: 1.3,
};

const tituloTarjeta = {
  color: "#0b6b3a",
  margin: "0 0 12px",
};

const parrafo = {
  color: "#58635b",
  fontSize: "15px",
  lineHeight: 1.8,
  margin: 0,
};

const tarjetaInterior = {
  background: "#f8fbf9",
  padding: "25px",
  borderLeft: "5px solid #39a900",
  borderRadius: "12px",
};

const lista = {
  paddingLeft: "22px",
  lineHeight: 2,
  color: "#58635b",
  margin: 0,
};

const botonPrincipal = {
  display: "inline-block",
  background: "#0b6b3a",
  color: "#ffffff",
  textDecoration: "none",
  padding: "13px 20px",
  borderRadius: "10px",
  fontWeight: 600,
};

const botonSecundario = {
  display: "inline-block",
  background: "#ffffff",
  color: "#0b6b3a",
  border: "1px solid #0b6b3a",
  textDecoration: "none",
  padding: "13px 20px",
  borderRadius: "10px",
  fontWeight: 600,
};
