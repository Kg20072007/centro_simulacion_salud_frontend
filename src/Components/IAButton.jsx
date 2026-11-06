import { useCallback, useEffect, useRef, useState } from "react";

const MENSAJE_BIENVENIDA =
  "¡Hola! 👋 Soy el asistente virtual del Centro de Simulación de Enfermería. Puedo orientarte sobre guías, prácticas, signos vitales e inventario.";

const PREGUNTAS_RAPIDAS = [
  { texto: "¿Cómo se toman los signos vitales?", etiqueta: "🩺 Signos vitales" },
  { texto: "¿Cómo funciona el inventario?", etiqueta: "📦 Inventario" },
  { texto: "¿Qué prácticas de simulación hay?", etiqueta: "🎯 Prácticas" },
];

function obtenerHora() {
  return new Date().toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Normaliza mayúsculas y tildes para que las preguntas sean más fáciles de reconocer.
function normalizarTexto(valor) {
  return valor
    .toLocaleLowerCase("es-CO")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function generarRespuesta(pregunta) {
  const texto = normalizarTexto(pregunta);

  if (/\b(hola|buenas|buenos dias|buenas tardes|buenas noches)\b/.test(texto)) {
    return "¡Hola! 👋 Qué bueno tenerte por aquí. Puedo orientarte sobre guías, prácticas, signos vitales, inventario y escenarios de simulación.";
  }

  if (/\b(gracias|muchas gracias)\b/.test(texto)) {
    return "😊 ¡Con mucho gusto! Si necesitas orientación sobre otra sección del Centro de Simulación, puedes preguntarme.";
  }

  if (/\b(ayuda|que puedes hacer|que sabes hacer|temas disponibles)\b/.test(texto)) {
    return "🤖 Puedo orientarte sobre estos temas:\n\n🩺 Signos vitales\n🌡️ Temperatura\n❤️ Presión arterial\n💓 Frecuencia cardíaca y pulso\n🫁 Frecuencia respiratoria y saturación de oxígeno\n🧼 Higiene de manos\n📚 Guías y prácticas de simulación\n🚑 Urgencias y UCI\n👶 Ginecobstetricia\n📦 Inventario e insumos.\n\nMis respuestas son orientativas; consulta siempre las guías institucionales y a tu instructor.";
  }

  if (/\b(signos vitales|signo vital)\b/.test(texto)) {
    return "🩺 Los signos vitales permiten valorar aspectos importantes del estado de una persona. Incluyen temperatura, presión arterial, frecuencia cardíaca, frecuencia respiratoria y saturación de oxígeno. En una práctica, sigue la guía institucional y registra las mediciones según las indicaciones de tu instructor.";
  }

  if (/\b(temperatura|fiebre)\b/.test(texto)) {
    return "🌡️ La temperatura corporal es uno de los signos vitales. Antes de medirla, prepara el equipo, verifica la identidad de la persona y sigue el procedimiento establecido. Registra el resultado con la unidad correspondiente y consulta al instructor si tienes dudas.";
  }

  if (/\b(presion arterial|tension arterial|tensiometro|tension)\b/.test(texto)) {
    return "❤️ Para medir la presión arterial, sigue el protocolo de la institución, prepara el tensiómetro y utiliza un brazalete apropiado. Registra el resultado correctamente. Esta orientación no reemplaza la demostración práctica ni las indicaciones del instructor.";
  }

  if (/\b(frecuencia cardiaca|pulso|latidos)\b/.test(texto)) {
    return "💓 La frecuencia cardíaca es el número de latidos del corazón por minuto. Durante la práctica, realiza la medición con la técnica enseñada, observa las condiciones indicadas por el protocolo y registra el resultado.";
  }

  if (/\b(frecuencia respiratoria|respiracion|respiraciones)\b/.test(texto)) {
    return "🫁 La frecuencia respiratoria es el número de respiraciones en un minuto. Sigue la técnica enseñada, observa el patrón respiratorio y registra el resultado conforme a la guía de práctica.";
  }

  if (/\b(saturacion|oximetro|oxigeno)\b/.test(texto)) {
    return "🫁 La saturación de oxígeno se puede estimar con un oxímetro de pulso. Verifica el estado del equipo, coloca el sensor según las instrucciones y registra el valor obtenido. Interpreta el resultado con el protocolo institucional y la orientación del instructor.";
  }

  if (/\b(lavado de manos|lavarme las manos|higiene de manos)\b/.test(texto)) {
    return "🧼 La higiene de manos ayuda a prevenir la transmisión de microorganismos. Realízala en los momentos indicados y siguiendo la técnica y el protocolo de la institución. En la simulación, consulta la guía correspondiente para revisar los pasos.";
  }

  if (/\b(inventario|insumos|stock|existencias|lotes|vencimiento)\b/.test(texto)) {
    return "📦 El módulo de inventario puede utilizarse para consultar la información de los elementos registrados. Según las funciones habilitadas, revisa los nombres, cantidades, códigos, lotes, vencimientos y ubicación. Si una opción no aparece en tu versión, consulta al responsable del sistema.";
  }

  if (/\b(simulacion|simulaciones|practica|practicas|guia|guias)\b/.test(texto)) {
    return "🎯 Las prácticas de simulación permiten entrenar procedimientos en un entorno educativo controlado. Consulta las guías disponibles, revisa los objetivos y sigue las instrucciones del instructor antes de comenzar. La disponibilidad de escenarios depende de la configuración de la plataforma.";
  }

  if (/\b(urgencias|emergencia|emergencias)\b/.test(texto)) {
    return "🚑 Para las prácticas de urgencias, revisa primero el escenario, los objetivos y el protocolo correspondiente. Sigue las indicaciones del instructor. Si se trata de una emergencia real, solicita de inmediato ayuda al personal de emergencias; este asistente no sustituye la atención profesional.";
  }

  if (/\b(uci|cuidados intensivos)\b/.test(texto)) {
    return "🏥 Las prácticas relacionadas con cuidados intensivos deben desarrollarse con la guía y supervisión correspondientes. Revisa los objetivos del escenario y el protocolo institucional antes de realizar los procedimientos.";
  }

  if (/\b(ginecobstetricia|parto|materno|materno infantil)\b/.test(texto)) {
    return "👶 Las prácticas de ginecobstetricia pueden abordar competencias de atención materna y neonatal. Consulta la guía del escenario y sigue las indicaciones del instructor y los protocolos institucionales.";
  }

  return "🤔 No encontré una respuesta específica para esa pregunta. Puedes probar con: “¿Qué son los signos vitales?”, “¿Cómo funciona el inventario?” o “¿Qué temas puedes explicar?”. Este asistente utiliza respuestas predefinidas y no consulta datos en tiempo real.";
}

export default function IAButton() {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const [mensajes, setMensajes] = useState(() => [
    { id: 1, tipo: "ia", texto: MENSAJE_BIENVENIDA, hora: obtenerHora() },
  ]);

  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const siguienteIdRef = useRef(2);
  const respuestaTimerRef = useRef(null);
  const focoTimerRef = useRef(null);
  // Ref para impedir dobles envíos antes de que React actualice el estado.
  const bloqueadoRef = useRef(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes, escribiendo, abierto]);

  useEffect(() => {
    if (!abierto) return undefined;

    focoTimerRef.current = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => {
      if (focoTimerRef.current !== null) {
        window.clearTimeout(focoTimerRef.current);
        focoTimerRef.current = null;
      }
    };
  }, [abierto]);

  useEffect(() => () => {
    if (respuestaTimerRef.current !== null) {
      window.clearTimeout(respuestaTimerRef.current);
    }
    if (focoTimerRef.current !== null) {
      window.clearTimeout(focoTimerRef.current);
    }
  }, []);

  const enviarPregunta = useCallback((pregunta) => {
    const texto = pregunta.trim();
    if (!texto || bloqueadoRef.current) return;

    bloqueadoRef.current = true;
    setEscribiendo(true);

    const idUsuario = siguienteIdRef.current++;
    setMensajes((actuales) => [
      ...actuales,
      { id: idUsuario, tipo: "usuario", texto, hora: obtenerHora() },
    ]);
    setMensaje("");

    respuestaTimerRef.current = window.setTimeout(() => {
      const respuesta = generarRespuesta(texto);
      setMensajes((actuales) => [
        ...actuales,
        {
          id: siguienteIdRef.current++,
          tipo: "ia",
          texto: respuesta,
          hora: obtenerHora(),
        },
      ]);
      setEscribiendo(false);
      bloqueadoRef.current = false;
      respuestaTimerRef.current = null;
    }, 500);
  }, []);

  const enviarMensaje = useCallback(() => {
    enviarPregunta(mensaje);
  }, [enviarPregunta, mensaje]);

  const manejarTecla = (evento) => {
    if (evento.key === "Enter" && !evento.shiftKey) {
      evento.preventDefault();
      enviarMensaje();
    }
  };

  const limpiarChat = () => {
    if (respuestaTimerRef.current !== null) {
      window.clearTimeout(respuestaTimerRef.current);
      respuestaTimerRef.current = null;
    }
    bloqueadoRef.current = false;
    setEscribiendo(false);
    setMensaje("");
    setMensajes([
      {
        id: siguienteIdRef.current++,
        tipo: "ia",
        texto: "¡Conversación reiniciada! 👋 ¿En qué puedo orientarte?",
        hora: obtenerHora(),
      },
    ]);
  };

  return (
    <>
      <button
        type="button"
        className={`ia-floating ${abierto ? "ia-activo" : ""}`}
        onClick={() => setAbierto((valor) => !valor)}
        aria-label={abierto ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
        aria-expanded={abierto}
        aria-controls="ia-chat-panel"
      >
        <span className="ia-icono" aria-hidden="true">🤖</span>
        <span className="ia-texto">{abierto ? "Cerrar" : "Asistente"}</span>
      </button>

      {abierto && (
        <section
          id="ia-chat-panel"
          className="ia-box"
          aria-label="Asistente virtual del Centro de Simulación"
        >
          <header className="ia-header">
            <div className="ia-identidad">
              <div className="ia-avatar" aria-hidden="true">
                🤖<span className="estado-online" />
              </div>
              <div>
                <strong>Asistente del Centro</strong>
                <small><span className="punto-estado" /> Orientación educativa</small>
              </div>
            </div>
            <div className="ia-header-actions">
              <button type="button" onClick={limpiarChat} aria-label="Reiniciar conversación" title="Reiniciar conversación">
                ↻
              </button>
              <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar chat" title="Cerrar">
                ×
              </button>
            </div>
          </header>

          <div className="ia-content" ref={chatRef} role="log" aria-live="polite" aria-relevant="additions text">
            <div className="ia-bienvenida">
              <span aria-hidden="true">💬</span>
              <div>
                <strong>¿En qué te puedo orientar?</strong>
                <p>Escribe una pregunta o selecciona una de las opciones rápidas.</p>
              </div>
            </div>

            {mensajes.map((item) => (
              <div
                key={item.id}
                className={`mensaje ${item.tipo === "usuario" ? "mensaje-usuario" : "mensaje-ia"}`}
              >
                {item.tipo === "ia" && <div className="mini-avatar" aria-hidden="true">🤖</div>}
                <div className="mensaje-contenido">
                  <div className="mensaje-texto">{item.texto}</div>
                  <small>{item.hora}</small>
                </div>
              </div>
            ))}

            {escribiendo && (
              <div className="mensaje mensaje-ia" aria-label="Preparando respuesta">
                <div className="mini-avatar" aria-hidden="true">🤖</div>
                <div className="mensaje-contenido">
                  <div className="escribiendo" aria-hidden="true"><span /><span /><span /></div>
                  <small>Preparando respuesta…</small>
                </div>
              </div>
            )}
          </div>

          <div className="preguntas-rapidas">
            <span>Preguntas rápidas</span>
            <div>
              {PREGUNTAS_RAPIDAS.map((pregunta) => (
                <button
                  type="button"
                  key={pregunta.texto}
                  onClick={() => enviarPregunta(pregunta.texto)}
                  disabled={escribiendo}
                >
                  {pregunta.etiqueta}
                </button>
              ))}
            </div>
          </div>

          <form
            className="ia-input-area"
            onSubmit={(evento) => {
              evento.preventDefault();
              enviarMensaje();
            }}
          >
            <textarea
              ref={inputRef}
              value={mensaje}
              onChange={(evento) => setMensaje(evento.target.value)}
              onKeyDown={manejarTecla}
              placeholder="Escribe tu pregunta…"
              aria-label="Escribe tu pregunta para el asistente"
              rows={2}
              maxLength={1000}
              disabled={escribiendo}
            />
            <button
              type="submit"
              className="enviar-ia"
              disabled={!mensaje.trim() || escribiendo}
              aria-label="Enviar pregunta"
              title="Enviar pregunta"
            >
              ➤
            </button>
          </form>

          <div className="ia-aviso">
            Orientación educativa con respuestas predefinidas. Para procedimientos clínicos, sigue las guías institucionales y las indicaciones de tu instructor. No ofrece atención médica ni consulta datos en tiempo real.
          </div>
        </section>
      )}

      <style>{`
        .ia-floating, .ia-box, .ia-box * { box-sizing: border-box; }
        .ia-floating {
          position: fixed; right: 24px; bottom: 24px; z-index: 9999;
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          min-height: 52px; padding: 12px 18px; border: 0; border-radius: 999px;
          color: #fff; background: linear-gradient(135deg, #006b3c, #39a900);
          font: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 107, 60, .28); transition: transform .2s ease, box-shadow .2s ease;
        }
        .ia-floating:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0, 107, 60, .34); }
        .ia-floating:focus-visible, .ia-box button:focus-visible, .ia-box textarea:focus-visible { outline: 3px solid #f2c94c; outline-offset: 3px; }
        .ia-floating.ia-activo { background: #26332e; }
        .ia-icono { font-size: 20px; }
        .ia-box {
          position: fixed; right: 24px; bottom: 88px; z-index: 9998;
          display: flex; flex-direction: column; width: min(400px, calc(100vw - 32px));
          height: min(610px, calc(100dvh - 120px)); min-height: 350px;
          overflow: hidden; color: #26332e; background: #fff; border: 1px solid #dfe7e2;
          border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, .2);
          animation: ia-aparecer .2s ease-out;
        }
        @keyframes ia-aparecer { from { opacity: 0; transform: translateY(8px) scale(.99); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .ia-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; color: #fff; background: linear-gradient(135deg, #006b3c, #39a900); }
        .ia-identidad { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .ia-avatar { position: relative; display: grid; place-items: center; flex: 0 0 40px; width: 40px; height: 40px; border-radius: 50%; color: #006b3c; background: #fff; font-size: 21px; }
        .estado-online { position: absolute; right: 0; bottom: 1px; width: 10px; height: 10px; border: 2px solid white; border-radius: 50%; background: #b7f36b; }
        .ia-identidad strong { display: block; font-size: 14px; }
        .ia-identidad small { display: block; margin-top: 4px; font-size: 11px; opacity: .95; }
        .punto-estado { display: inline-block; width: 6px; height: 6px; margin-right: 4px; border-radius: 50%; background: #d7ffb5; }
        .ia-header-actions { display: flex; gap: 6px; }
        .ia-header-actions button { display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: 8px; color: #fff; background: rgba(255,255,255,.15); font-size: 21px; cursor: pointer; }
        .ia-header-actions button:hover { background: rgba(255,255,255,.25); }
        .ia-content { flex: 1; min-height: 0; overflow-y: auto; padding: 14px; background: #f6f9f7; scroll-behavior: smooth; }
        .ia-bienvenida { display: flex; gap: 10px; padding: 12px; margin-bottom: 16px; border: 1px solid #d1ead8; border-radius: 12px; background: #e8f5ec; }
        .ia-bienvenida > span { font-size: 22px; }
        .ia-bienvenida strong { color: #006b3c; font-size: 13px; }
        .ia-bienvenida p { margin: 5px 0 0; color: #58665e; font-size: 12px; line-height: 1.45; }
        .mensaje { display: flex; gap: 7px; margin-bottom: 13px; animation: ia-mensaje .16s ease-out; }
        @keyframes ia-mensaje { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .mensaje-usuario { justify-content: flex-end; }
        .mini-avatar { display: grid; place-items: center; flex: 0 0 27px; width: 27px; height: 27px; border-radius: 50%; background: #dceee2; font-size: 14px; }
        .mensaje-contenido { max-width: 84%; min-width: 0; }
        .mensaje-texto { padding: 10px 12px; border: 1px solid #e1e8e4; border-radius: 12px; border-top-left-radius: 4px; color: #34423b; background: #fff; font-size: 13px; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
        .mensaje-usuario .mensaje-texto { border-color: #006b3c; border-radius: 12px 12px 4px 12px; color: #fff; background: #006b3c; }
        .mensaje-contenido small { display: block; margin: 4px 3px 0; color: #7d8982; font-size: 10px; }
        .mensaje-usuario .mensaje-contenido small { text-align: right; }
        .escribiendo { display: flex; gap: 4px; padding: 11px 13px; border: 1px solid #e1e8e4; border-radius: 12px 12px 12px 4px; background: #fff; }
        .escribiendo span { width: 6px; height: 6px; border-radius: 50%; background: #39a900; animation: ia-puntos 1.1s infinite; }
        .escribiendo span:nth-child(2) { animation-delay: .15s; }
        .escribiendo span:nth-child(3) { animation-delay: .3s; }
        @keyframes ia-puntos { 0%, 60%, 100% { opacity: .4; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-4px); } }
        .preguntas-rapidas { padding: 9px 12px; border-top: 1px solid #e5ebe7; background: #fff; }
        .preguntas-rapidas > span { display: block; margin-bottom: 7px; color: #6e7b73; font-size: 11px; font-weight: 600; }
        .preguntas-rapidas > div { display: flex; gap: 6px; overflow-x: auto; padding: 2px 2px 4px; }
        .preguntas-rapidas button { flex: 0 0 auto; padding: 7px 10px; border: 1px solid #cfe0d5; border-radius: 999px; color: #006b3c; background: #f5faf6; font-size: 11px; cursor: pointer; }
        .preguntas-rapidas button:hover:not(:disabled) { background: #e5f3e9; }
        .preguntas-rapidas button:disabled { cursor: not-allowed; opacity: .55; }
        .ia-input-area { display: flex; align-items: flex-end; gap: 8px; padding: 10px; border-top: 1px solid #e5ebe7; background: #fff; }
        .ia-input-area textarea { flex: 1; min-width: 0; min-height: 42px; max-height: 100px; resize: vertical; padding: 10px; border: 1px solid #d3ddd7; border-radius: 10px; outline: none; color: #26332e; background: #fff; font: inherit; font-size: 13px; line-height: 1.4; }
        .ia-input-area textarea:focus { border-color: #39a900; box-shadow: 0 0 0 2px rgba(57,169,0,.12); }
        .ia-input-area textarea:disabled { background: #f6f8f6; }
        .enviar-ia { display: grid; place-items: center; flex: 0 0 42px; width: 42px; height: 42px; border: 0; border-radius: 10px; color: #fff; background: #006b3c; font-size: 18px; cursor: pointer; transition: background .2s ease; }
        .enviar-ia:hover:not(:disabled) { background: #39a900; }
        .enviar-ia:disabled { cursor: not-allowed; opacity: .45; }
        .ia-aviso { padding: 8px 12px; border-top: 1px solid #eee2bd; color: #675b2c; background: #fff9e9; font-size: 10px; line-height: 1.4; text-align: center; }
        @media (max-width: 500px) {
          .ia-floating { right: 15px; bottom: 15px; min-width: 50px; width: 50px; height: 50px; padding: 0; }
          .ia-texto { display: none; }
          .ia-box { right: 8px; bottom: 76px; width: calc(100vw - 16px); height: calc(100dvh - 92px); min-height: 300px; max-height: none; border-radius: 16px; }
          .ia-content { padding: 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ia-floating, .ia-box, .ia-box * { animation: none !important; scroll-behavior: auto !important; transition: none !important; }
        }
      `}</style>
    </>
  );
}
