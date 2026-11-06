
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Clave donde se guardarán los datos en el navegador.
const CLAVE_GUARDADO = "sena_practica_signos_vitales";

// Elementos necesarios para preparar la práctica.
const EQUIPOS = [
  "Fonendoscopio",
  "Tensiómetro",
  "Termómetro",
  "Oxímetro",
  "Guantes",
  "Formato de registro",
];

// Valores iniciales para una práctica nueva.
const DATOS_INICIALES = {
  temperatura: "",
  presion: "",
  frecuenciaCardiaca: "",
  frecuenciaRespiratoria: "",
  saturacion: "",
};

// Casillas iniciales de preparación.
const CHECKS_INICIALES = {
  lavado: false,
  identificacion: false,
  explicacion: false,
  equipos: [],
};

// Recuperamos una práctica guardada, si existe.
// Si el navegador no permite acceder al almacenamiento,
// empezamos con una práctica nueva.
function cargarPractica() {
  try {
    const guardado = localStorage.getItem(CLAVE_GUARDADO);

    if (guardado) {
      const datosGuardados = JSON.parse(guardado);

      return {
        pasoActual:
          Number.isInteger(datosGuardados.pasoActual) &&
          datosGuardados.pasoActual >= 1 &&
          datosGuardados.pasoActual <= 6
            ? datosGuardados.pasoActual
            : 1,
        datos: {
          ...DATOS_INICIALES,
          ...(datosGuardados.datos || {}),
        },
        checks: {
          ...CHECKS_INICIALES,
          ...(datosGuardados.checks || {}),
          equipos: Array.isArray(datosGuardados.checks?.equipos)
            ? datosGuardados.checks.equipos
            : [],
        },
        completada: Boolean(datosGuardados.completada),
        fechaFinalizacion: datosGuardados.fechaFinalizacion || null,
      };
    }
  } catch (error) {
    console.error("No se pudo recuperar la práctica:", error);
  }

  return {
    pasoActual: 1,
    datos: { ...DATOS_INICIALES },
    checks: { ...CHECKS_INICIALES, equipos: [] },
    completada: false,
    fechaFinalizacion: null,
  };
}

export default function PracticaSignosVitales() {
  // Cargamos el último estado guardado al abrir la página.
  const [estadoInicial] = useState(cargarPractica);

  const [pasoActual, setPasoActual] = useState(
    estadoInicial.pasoActual
  );

  const [datos, setDatos] = useState(estadoInicial.datos);
  const [checks, setChecks] = useState(estadoInicial.checks);
  const [completada, setCompletada] = useState(
    estadoInicial.completada
  );
  const [fechaFinalizacion, setFechaFinalizacion] = useState(
    estadoInicial.fechaFinalizacion
  );

  const [mensaje, setMensaje] = useState("");

  // Guardamos automáticamente cada cambio en el navegador.
  useEffect(() => {
    try {
      localStorage.setItem(
        CLAVE_GUARDADO,
        JSON.stringify({
          pasoActual,
          datos,
          checks,
          completada,
          fechaFinalizacion,
        })
      );
    } catch (error) {
      console.error("No se pudo guardar la práctica:", error);
      setMensaje(
        "No fue posible guardar los cambios en este navegador."
      );
    }
  }, [pasoActual, datos, checks, completada, fechaFinalizacion]);

  // Actualizamos uno de los campos de signos vitales.
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
    }));

    setMensaje("");
  };

  // Cambiamos una casilla de verificación.
  const cambiarCheck = (nombre, marcado) => {
    setChecks((anteriores) => ({
      ...anteriores,
      [nombre]: marcado,
    }));

    setMensaje("");
  };

  // Marcamos o desmarcamos un equipo de la lista.
  const cambiarEquipo = (equipo, marcado) => {
    setChecks((anteriores) => ({
      ...anteriores,
      equipos: marcado
        ? [...new Set([...anteriores.equipos, equipo])]
        : anteriores.equipos.filter((item) => item !== equipo),
    }));

    setMensaje("");
  };

  // Validamos que los cinco signos vitales tengan valores
  // numéricos razonables para una simulación educativa.
  const validarSignos = () => {
    const temperatura = Number(datos.temperatura);
    const presion = datos.presion.trim().match(/^(\d{2,3})\s*\/\s*(\d{2,3})$/);
    const fc = Number(datos.frecuenciaCardiaca);
    const fr = Number(datos.frecuenciaRespiratoria);
    const spo2 = Number(datos.saturacion);

    if (
      datos.temperatura.trim() === "" ||
      !Number.isFinite(temperatura) ||
      temperatura < 25 ||
      temperatura > 45
    ) {
      return "Ingresa una temperatura entre 25 y 45 °C.";
    }

    if (!presion) {
      return "Ingresa la presión arterial en formato 120/80.";
    }

    const sistolica = Number(presion[1]);
    const diastolica = Number(presion[2]);

    if (
      sistolica < 50 ||
      sistolica > 260 ||
      diastolica < 30 ||
      diastolica > 160 ||
      sistolica <= diastolica
    ) {
      return "Revisa los valores de presión arterial ingresados.";
    }

    if (
      datos.frecuenciaCardiaca.trim() === "" ||
      !Number.isFinite(fc) ||
      fc < 1 ||
      fc > 300
    ) {
      return "Ingresa una frecuencia cardíaca válida.";
    }

    if (
      datos.frecuenciaRespiratoria.trim() === "" ||
      !Number.isFinite(fr) ||
      fr < 1 ||
      fr > 100
    ) {
      return "Ingresa una frecuencia respiratoria válida.";
    }

    if (
      datos.saturacion.trim() === "" ||
      !Number.isFinite(spo2) ||
      spo2 < 1 ||
      spo2 > 100
    ) {
      return "Ingresa una saturación entre 1 y 100 %.";
    }

    return "";
  };

  // Revisamos las condiciones necesarias para cada paso.
  const validarPaso = () => {
    if (pasoActual === 1 && !checks.lavado) {
      return "Confirma que realizaste el lavado de manos.";
    }

    if (pasoActual === 2) {
      if (!checks.identificacion) {
        return "Confirma la identificación del paciente.";
      }

      if (!checks.explicacion) {
        return "Confirma que explicaste el procedimiento.";
      }
    }

    if (
      pasoActual === 3 &&
      !EQUIPOS.every((equipo) => checks.equipos.includes(equipo))
    ) {
      return "Verifica todos los equipos antes de continuar.";
    }

    if (pasoActual === 4) {
      return validarSignos();
    }

    return "";
  };

  // Avanzamos solo cuando el paso actual está validado.
  const siguientePaso = () => {
    const error = validarPaso();

    if (error) {
      setMensaje(error);
      return;
    }

    setMensaje("");

    if (pasoActual < 6) {
      setPasoActual((paso) => paso + 1);
    }
  };

  // Permitimos regresar sin perder los datos.
  const pasoAnterior = () => {
    setMensaje("");

    if (pasoActual > 1 && !completada) {
      setPasoActual((paso) => paso - 1);
    }
  };

  // Confirmamos la finalización y guardamos la fecha.
  const finalizarPractica = () => {
    const confirmar = window.confirm(
      "¿Confirmas que revisaste los resultados y deseas finalizar la práctica?"
    );

    if (!confirmar) return;

    const fecha = new Date().toISOString();

    setCompletada(true);
    setFechaFinalizacion(fecha);
    setMensaje("¡Práctica finalizada y guardada en este navegador!");
  };

  // Iniciamos otra práctica eliminando el registro anterior.
  const nuevaPractica = () => {
    const confirmar = window.confirm(
      "¿Deseas iniciar una práctica nueva? Se borrará el progreso guardado de esta práctica en este navegador."
    );

    if (!confirmar) return;

    setPasoActual(1);
    setDatos({ ...DATOS_INICIALES });
    setChecks({ ...CHECKS_INICIALES, equipos: [] });
    setCompletada(false);
    setFechaFinalizacion(null);
    setMensaje("");

    try {
      localStorage.removeItem(CLAVE_GUARDADO);
    } catch (error) {
      console.error("No se pudo limpiar el guardado:", error);
    }
  };

  // Descargamos una copia de los resultados como archivo JSON.
  const descargarResultados = () => {
    const informe = {
      actividad: "Práctica de signos vitales",
      tipo: "Simulación educativa",
      resultados: datos,
      equiposVerificados: checks.equipos,
      completada,
      fechaFinalizacion,
    };

    const archivo = new Blob(
      [JSON.stringify(informe, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "resultados-signos-vitales.json";
    enlace.click();

    URL.revokeObjectURL(url);
  };

  const nombresPasos = [
    "Lavado de manos",
    "Identificación",
    "Preparación",
    "Medición",
    "Registro",
    "Finalización",
  ];

  return (
    <>
      <main className="practica-pagina">
        {/* Encabezado y acceso de regreso a las guías. */}
        <header className="practica-header">
          <div className="practica-header-contenido">
            <Link to="/guias" className="practica-logo">
              <img src="/img/logo1.png" alt="Logo SENA" />
              <div>
                <h2>Centro de Simulación</h2>
                <span>SENA - Enfermería</span>
              </div>
            </Link>

            <div className="estado-practica">
              {completada ? "✓ Práctica completada" : "🟢 Práctica activa"}
            </div>
          </div>
        </header>

        <div className="practica-contenedor">
          {/* Título y tarjeta del paciente ficticio. */}
          <section className="practica-titulo">
            <div>
              <span className="etiqueta-practica">
                SIMULACIÓN CLÍNICA
              </span>

              <h1>🩺 Práctica de Signos Vitales</h1>

              <p>
                Realiza el procedimiento paso a paso y registra los
                resultados obtenidos durante la simulación.
              </p>
            </div>

            <div className="paciente-card">
              <span>👤 Paciente simulado</span>
              <strong>Paciente de simulación</strong>
              <small>Edad: 35 años</small>
            </div>
          </section>

          {/* Barra de progreso de los seis pasos. */}
          <section className="progreso">
            <div className="progreso-arriba">
              <strong>Progreso de la práctica</strong>
              <span>Paso {pasoActual} de 6</span>
            </div>

            <div
              className="barra-progreso"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={pasoActual}
              aria-label="Progreso de la práctica"
            >
              <div
                className="barra-progreso-completa"
                style={{ width: `${(pasoActual / 6) * 100}%` }}
              />
            </div>
          </section>

          {/* Indicadores visuales de los pasos. */}
          <section className="pasos-indicadores">
            {nombresPasos.map((nombre, index) => (
              <div
                key={nombre}
                className={`indicador ${
                  pasoActual === index + 1 ? "activo" : ""
                } ${pasoActual > index + 1 ? "completado" : ""}`}
              >
                <span>
                  {pasoActual > index + 1 ? "✓" : index + 1}
                </span>
                <small>{nombre}</small>
              </div>
            ))}
          </section>

          <section className="practica-area">
            {/* El paso 1 exige confirmar el lavado de manos. */}
            {pasoActual === 1 && (
              <div className="paso-contenido">
                <div className="icono-paso">🧼</div>
                <span className="numero-paso">PASO 1</span>
                <h2>Lavado de manos</h2>

                <p>
                  Antes de comenzar la atención, realiza la higiene de
                  manos y prepara el espacio de simulación.
                </p>

                <div className="instrucciones">
                  <div><span>✓</span><p>Retira accesorios de manos y muñecas.</p></div>
                  <div><span>✓</span><p>Realiza la higiene de manos según el protocolo enseñado.</p></div>
                  <div><span>✓</span><p>Seca las manos y prepara el área de trabajo.</p></div>
                </div>

                <label className="check-principal">
                  <input
                    type="checkbox"
                    checked={checks.lavado}
                    onChange={(e) => cambiarCheck("lavado", e.target.checked)}
                    disabled={completada}
                  />
                  Confirmo que realicé la higiene de manos.
                </label>
              </div>
            )}

            {/* El paso 2 solicita confirmar identificación y explicación. */}
            {pasoActual === 2 && (
              <div className="paso-contenido">
                <div className="icono-paso">👤</div>
                <span className="numero-paso">PASO 2</span>
                <h2>Identificación del paciente</h2>

                <p>
                  En esta simulación, confirma la identificación del
                  paciente y explica qué procedimiento realizarás.
                </p>

                <div className="paciente-detalle">
                  <div><span>Nombre</span><strong>Paciente de simulación</strong></div>
                  <div><span>Edad</span><strong>35 años</strong></div>
                  <div><span>Actividad</span><strong>Toma de signos vitales</strong></div>
                </div>

                <label className="check-principal">
                  <input
                    type="checkbox"
                    checked={checks.identificacion}
                    onChange={(e) => cambiarCheck("identificacion", e.target.checked)}
                    disabled={completada}
                  />
                  Confirmo la identificación del paciente simulado.
                </label>

                <label className="check-principal">
                  <input
                    type="checkbox"
                    checked={checks.explicacion}
                    onChange={(e) => cambiarCheck("explicacion", e.target.checked)}
                    disabled={completada}
                  />
                  Confirmo que expliqué el procedimiento.
                </label>

                <div className="aviso">
                  💡 En una atención real, sigue el protocolo institucional
                  de identificación y consentimiento.
                </div>
              </div>
            )}

            {/* El paso 3 exige verificar todos los equipos de la lista. */}
            {pasoActual === 3 && (
              <div className="paso-contenido">
                <div className="icono-paso">🧰</div>
                <span className="numero-paso">PASO 3</span>
                <h2>Preparación del equipo</h2>

                <p>
                  Marca cada elemento después de comprobar que está
                  disponible y preparado para la simulación.
                </p>

                <div className="equipos-check">
                  {EQUIPOS.map((equipo) => (
                    <label key={equipo}>
                      <input
                        type="checkbox"
                        checked={checks.equipos.includes(equipo)}
                        onChange={(e) => cambiarEquipo(equipo, e.target.checked)}
                        disabled={completada}
                      />
                      {equipo}
                    </label>
                  ))}
                </div>

                <p className="texto-ayuda">
                  Verificados: {checks.equipos.length} de {EQUIPOS.length}
                </p>
              </div>
            )}

            {/* El paso 4 registra los cinco signos vitales. */}
            {pasoActual === 4 && (
              <div className="paso-contenido">
                <div className="icono-paso">❤️</div>
                <span className="numero-paso">PASO 4</span>
                <h2>Medición de signos vitales</h2>

                <p>
                  Introduce los valores obtenidos durante la simulación.
                  La aplicación verifica el formato, pero no determina
                  por sí sola si los valores son clínicamente normales.
                </p>

                <div className="signos-grid">
                  <div className="signo-input">
                    <label htmlFor="temperatura">🌡️ Temperatura</label>
                    <div>
                      <input
                        id="temperatura"
                        type="number"
                        name="temperatura"
                        value={datos.temperatura}
                        onChange={manejarCambio}
                        placeholder="Ej.: 36.5"
                        min="25"
                        max="45"
                        step="0.1"
                        disabled={completada}
                      />
                      <span>°C</span>
                    </div>
                  </div>

                  <div className="signo-input">
                    <label htmlFor="presion">🩸 Presión arterial</label>
                    <div>
                      <input
                        id="presion"
                        type="text"
                        name="presion"
                        value={datos.presion}
                        onChange={manejarCambio}
                        placeholder="Ej.: 120/80"
                        disabled={completada}
                      />
                      <span>mmHg</span>
                    </div>
                  </div>

                  <div className="signo-input">
                    <label htmlFor="frecuenciaCardiaca">❤️ Frecuencia cardíaca</label>
                    <div>
                      <input
                        id="frecuenciaCardiaca"
                        type="number"
                        name="frecuenciaCardiaca"
                        value={datos.frecuenciaCardiaca}
                        onChange={manejarCambio}
                        placeholder="Ej.: 75"
                        min="1"
                        max="300"
                        step="1"
                        disabled={completada}
                      />
                      <span>lpm</span>
                    </div>
                  </div>

                  <div className="signo-input">
                    <label htmlFor="frecuenciaRespiratoria">🫁 Frecuencia respiratoria</label>
                    <div>
                      <input
                        id="frecuenciaRespiratoria"
                        type="number"
                        name="frecuenciaRespiratoria"
                        value={datos.frecuenciaRespiratoria}
                        onChange={manejarCambio}
                        placeholder="Ej.: 18"
                        min="1"
                        max="100"
                        step="1"
                        disabled={completada}
                      />
                      <span>rpm</span>
                    </div>
                  </div>

                  <div className="signo-input">
                    <label htmlFor="saturacion">💙 Saturación de oxígeno</label>
                    <div>
                      <input
                        id="saturacion"
                        type="number"
                        name="saturacion"
                        value={datos.saturacion}
                        onChange={manejarCambio}
                        placeholder="Ej.: 98"
                        min="1"
                        max="100"
                        step="1"
                        disabled={completada}
                      />
                      <span>%</span>
                    </div>
                  </div>
                </div>

                <div className="aviso">
                  📝 Estos datos son de una simulación. No los utilices
                  como registro clínico de un paciente real.
                </div>
              </div>
            )}

            {/* El paso 5 permite revisar los datos antes de terminar. */}
            {pasoActual === 5 && (
              <div className="paso-contenido">
                <div className="icono-paso">📋</div>
                <span className="numero-paso">PASO 5</span>
                <h2>Registro de resultados</h2>

                <p>
                  Comprueba que los datos corresponden a lo que registraste
                  durante la práctica.
                </p>

                <div className="resultados">
                  <div><span>Temperatura</span><strong>{datos.temperatura} °C</strong></div>
                  <div><span>Presión arterial</span><strong>{datos.presion} mmHg</strong></div>
                  <div><span>Frecuencia cardíaca</span><strong>{datos.frecuenciaCardiaca} lpm</strong></div>
                  <div><span>Frecuencia respiratoria</span><strong>{datos.frecuenciaRespiratoria} rpm</strong></div>
                  <div><span>Saturación</span><strong>{datos.saturacion} %</strong></div>
                </div>

                <div className="aviso">
                  Verifica los valores antes de pasar a la pantalla final.
                </div>
              </div>
            )}

            {/* El paso 6 muestra el cierre de la actividad. */}
            {pasoActual === 6 && (
              <div className="paso-contenido final">
                <div className="icono-final">{completada ? "✅" : "🎉"}</div>
                <span className="numero-paso">PASO 6</span>

                <h2>
                  {completada ? "¡Práctica completada!" : "Revisión final"}
                </h2>

                <p>
                  {completada
                    ? "La práctica quedó marcada como completada en este navegador."
                    : "Revisa el resumen y confirma la finalización para guardar el estado completado."}
                </p>

                <div className="resumen-final">
                  <div><span>🌡️ Temperatura</span><strong>{datos.temperatura} °C</strong></div>
                  <div><span>🩸 Presión</span><strong>{datos.presion} mmHg</strong></div>
                  <div><span>❤️ Frecuencia cardíaca</span><strong>{datos.frecuenciaCardiaca} lpm</strong></div>
                  <div><span>🫁 Frecuencia respiratoria</span><strong>{datos.frecuenciaRespiratoria} rpm</strong></div>
                  <div><span>💙 Saturación</span><strong>{datos.saturacion} %</strong></div>
                </div>

                {fechaFinalizacion && (
                  <p className="texto-ayuda">
                    Finalizada: {new Date(fechaFinalizacion).toLocaleString()}
                  </p>
                )}

                {!completada ? (
                  <button className="btn-finalizar" onClick={finalizarPractica}>
                    ✓ Confirmar y finalizar
                  </button>
                ) : (
                  <div className="acciones-finales">
                    <button className="btn-finalizar" onClick={descargarResultados}>
                      Descargar resultados
                    </button>

                    <button className="btn-secundario" onClick={nuevaPractica}>
                      Iniciar nueva práctica
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Mensajes de validación y confirmación para el aprendiz. */}
          {mensaje && (
            <div className="mensaje-practica" role="status" aria-live="polite">
              {mensaje}
            </div>
          )}

          {/* Navegación entre los seis pasos. */}
          <section className="navegacion-practica">
            <button
              className="btn-anterior"
              onClick={pasoAnterior}
              disabled={pasoActual === 1 || completada}
            >
              ← Paso anterior
            </button>

            <span>{pasoActual} / 6</span>

            {pasoActual < 6 && (
              <button
                className="btn-siguiente"
                onClick={siguientePaso}
                disabled={completada}
              >
                Siguiente paso →
              </button>
            )}

            {pasoActual === 6 && completada && (
              <Link to="/guias" className="btn-siguiente">
                Volver a guías →
              </Link>
            )}
          </section>
        </div>
      </main>

      {/* Pie de página. */}
      <footer className="practica-footer">
        <p>© 2026 Centro de Simulación Clínica - SENA</p>
        <span>Práctica de Toma de Signos Vitales</span>
      </footer>

      {/* Estilos locales: conservamos la apariencia de la versión original. */}
      <style>{`
        * { box-sizing: border-box; }

        .practica-pagina {
          min-height: 100vh;
          background: #f5f7f6;
          color: #263238;
        }

        .practica-header {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .practica-header-contenido {
          width: min(1200px, 92%);
          min-height: 76px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .practica-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #263238;
          text-decoration: none;
        }

        .practica-logo img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .practica-logo h2 {
          margin: 0;
          font-size: 18px;
          color: #006b3c;
        }

        .practica-logo span {
          display: block;
          margin-top: 3px;
          color: #667085;
          font-size: 12px;
        }

        .estado-practica {
          background: #eaf6ef;
          color: #006b3c;
          padding: 10px 16px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
        }

        .practica-contenedor {
          width: min(1200px, 92%);
          margin: auto;
          padding: 35px 0 60px;
        }

        .practica-titulo {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 25px;
          align-items: center;
          margin-bottom: 25px;
        }

        .etiqueta-practica {
          display: inline-block;
          background: #eaf6ef;
          color: #006b3c;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .7px;
          margin-bottom: 12px;
        }

        .practica-titulo h1 {
          margin: 0 0 12px;
          font-size: clamp(30px, 4vw, 45px);
          color: #263238;
        }

        .practica-titulo p {
          margin: 0;
          color: #667085;
          line-height: 1.7;
          max-width: 700px;
        }

        .paciente-card {
          background: white;
          border: 1px solid #e2e7e4;
          border-radius: 18px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          box-shadow: 0 8px 25px rgba(0,0,0,.05);
        }

        .paciente-card span {
          color: #006b3c;
          font-size: 13px;
          font-weight: 700;
        }

        .paciente-card strong { font-size: 16px; }
        .paciente-card small { color: #667085; }

        .progreso {
          background: white;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          margin-bottom: 18px;
        }

        .progreso-arriba {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .progreso-arriba span {
          color: #006b3c;
          font-weight: 700;
        }

        .barra-progreso {
          height: 9px;
          background: #e8ecea;
          border-radius: 20px;
          overflow: hidden;
        }

        .barra-progreso-completa {
          height: 100%;
          background: linear-gradient(90deg, #006b3c, #39a900);
          border-radius: 20px;
          transition: width .3s ease;
        }

        .pasos-indicadores {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }

        .indicador {
          background: white;
          border: 1px solid #e5e7eb;
          padding: 12px 5px;
          border-radius: 12px;
          text-align: center;
          color: #98a2b3;
        }

        .indicador span {
          width: 30px;
          height: 30px;
          margin: auto auto 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #edf0ef;
          font-size: 12px;
          font-weight: 800;
        }

        .indicador small { display: block; font-size: 11px; }

        .indicador.activo {
          border-color: #39a900;
          color: #006b3c;
          background: #f4fbf6;
        }

        .indicador.activo span {
          background: #006b3c;
          color: white;
        }

        .indicador.completado { color: #006b3c; }

        .indicador.completado span {
          background: #39a900;
          color: white;
        }

        .practica-area {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 22px;
          min-height: 500px;
          padding: 45px;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
        }

        .paso-contenido { max-width: 900px; margin: auto; }

        .icono-paso {
          width: 70px;
          height: 70px;
          background: #eaf6ef;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          margin-bottom: 20px;
        }

        .numero-paso {
          color: #39a900;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .paso-contenido h2 {
          margin: 8px 0 12px;
          font-size: 30px;
          color: #263238;
        }

        .paso-contenido > p {
          color: #667085;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .instrucciones { display: flex; flex-direction: column; gap: 12px; }

        .instrucciones div {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 15px;
          border-radius: 12px;
          background: #f8faf9;
        }

        .instrucciones span {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          background: #39a900;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .instrucciones p { margin: 0; color: #4b5563; }

        .paciente-detalle {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .paciente-detalle div {
          background: #f8faf9;
          padding: 20px;
          border-radius: 14px;
        }

        .paciente-detalle span {
          display: block;
          font-size: 12px;
          color: #667085;
          margin-bottom: 7px;
        }

        .paciente-detalle strong { color: #263238; font-size: 14px; }

        .aviso {
          background: #fff8e7;
          border: 1px solid #f5d98b;
          padding: 15px;
          border-radius: 12px;
          color: #765b13;
          line-height: 1.5;
          margin-top: 20px;
        }

        .check-principal {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 15px;
          margin-top: 15px;
          border: 1px solid #e5e7eb;
          background: #f8faf9;
          border-radius: 12px;
          line-height: 1.5;
          cursor: pointer;
        }

        .check-principal input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: #39a900;
          flex-shrink: 0;
        }

        .equipos-check {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .equipos-check label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px;
          background: #f8faf9;
          border: 1px solid #e5e7eb;
          border-radius: 13px;
          cursor: pointer;
          color: #374151;
        }

        .equipos-check input {
          width: 18px;
          height: 18px;
          accent-color: #39a900;
        }

        .signos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-bottom: 20px;
        }

        .signo-input {
          background: #f8faf9;
          padding: 18px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        }

        .signo-input label {
          display: block;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .signo-input > div {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .signo-input input {
          width: 100%;
          min-width: 0;
          padding: 13px;
          border: 1px solid #d6dbd8;
          border-radius: 9px;
          outline: none;
          font-size: 15px;
          background: white;
        }

        .signo-input input:focus {
          border-color: #39a900;
          box-shadow: 0 0 0 3px rgba(57,169,0,.1);
        }

        .signo-input span {
          color: #667085;
          font-size: 13px;
          white-space: nowrap;
        }

        .resultados {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .resultados div {
          background: #f8faf9;
          padding: 18px;
          border-radius: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .resultados span { color: #667085; font-size: 14px; }
        .resultados strong { color: #006b3c; text-align: right; }

        .final { text-align: center; }
        .icono-final { font-size: 65px; margin-bottom: 15px; }
        .final .numero-paso { display: block; }
        .final h2 { color: #006b3c; }

        .resumen-final {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin: 30px 0;
        }

        .resumen-final div {
          background: #f8faf9;
          padding: 15px 10px;
          border-radius: 12px;
          overflow-wrap: anywhere;
        }

        .resumen-final span {
          display: block;
          font-size: 12px;
          color: #667085;
          margin-bottom: 7px;
        }

        .resumen-final strong { color: #006b3c; }

        .btn-finalizar {
          border: none;
          background: #39a900;
          color: white;
          padding: 14px 25px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s ease;
        }

        .btn-finalizar:hover {
          background: #2e8e00;
          transform: translateY(-2px);
        }

        .acciones-finales {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .btn-secundario {
          padding: 14px 20px;
          border: 1px solid #d9dfdc;
          border-radius: 10px;
          color: #006b3c;
          background: white;
          font-weight: 700;
          cursor: pointer;
        }

        .mensaje-practica {
          margin-top: 18px;
          border: 1px solid #f5d98b;
          background: #fff8e7;
          color: #765b13;
          padding: 15px 18px;
          border-radius: 12px;
          line-height: 1.5;
        }

        .texto-ayuda {
          color: #667085;
          font-size: 13px;
          margin-top: 15px;
        }

        .navegacion-practica {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .navegacion-practica > span {
          color: #667085;
          font-weight: 700;
        }

        .btn-anterior,
        .btn-siguiente {
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }

        .btn-anterior {
          background: white;
          border: 1px solid #d9dfdc;
          color: #4b5563;
        }

        .btn-anterior:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .btn-siguiente { background: #006b3c; color: white; border: none; }
        .btn-siguiente:hover { background: #00552f; }

        button:focus-visible,
        a:focus-visible,
        input:focus-visible {
          outline: 3px solid #83c94b;
          outline-offset: 3px;
        }

        .practica-footer {
          background: #263238;
          color: white;
          padding: 25px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          font-size: 13px;
        }

        .practica-footer p { margin: 0; }
        .practica-footer span { opacity: .7; }

        @media (max-width: 900px) {
          .practica-titulo { grid-template-columns: 1fr; }
          .pasos-indicadores { grid-template-columns: repeat(3, 1fr); }
          .paciente-detalle { grid-template-columns: 1fr; }
          .resumen-final { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 650px) {
          .practica-header-contenido { min-height: 65px; }
          .practica-logo h2 { font-size: 15px; }
          .practica-logo span { display: none; }
          .estado-practica { font-size: 11px; padding: 8px 10px; }
          .practica-contenedor { width: 94%; padding-top: 20px; }
          .practica-titulo h1 { font-size: 30px; }
          .pasos-indicadores { grid-template-columns: repeat(2, 1fr); }
          .practica-area { padding: 25px 18px; min-height: auto; }
          .signos-grid,
          .equipos-check,
          .resultados,
          .resumen-final { grid-template-columns: 1fr; }
          .navegacion-practica { flex-wrap: wrap; }
          .navegacion-practica > span {
            order: -1;
            width: 100%;
            text-align: center;
          }
          .btn-anterior,
          .btn-siguiente { flex: 1; text-align: center; }
          .practica-footer { flex-direction: column; text-align: center; }
        }
      `}</style>
    </>
  );
}
