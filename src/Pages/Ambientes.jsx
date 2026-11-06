
import { useEffect, useMemo, useRef, useState } from "react";

const AMBIENTES = [
  {
    id: 1,
    nombre: "Sala de Monitoreo Clínico",
    capacidad: 10,
    estado: "Disponible",
    ubicacion: "Bloque de simulación · Sala 101",
    imagen:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Espacio para practicar la valoración del paciente y el seguimiento de signos vitales.",
    equipos: ["Monitor de signos vitales", "Camilla clínica", "Tensiómetro"],
  },
  {
    id: 2,
    nombre: "Sala de Procedimientos",
    capacidad: 12,
    estado: "Disponible",
    ubicacion: "Bloque de simulación · Sala 102",
    imagen:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Ambiente para practicar procedimientos básicos y técnicas de enfermería.",
    equipos: ["Camilla", "Carro de curaciones", "Instrumental clínico"],
  },
  {
    id: 3,
    nombre: "Laboratorio de Enfermería",
    capacidad: 15,
    estado: "En uso",
    ubicacion: "Bloque de simulación · Sala 103",
    imagen:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Espacio de aprendizaje práctico para el desarrollo de competencias clínicas.",
    equipos: ["Maniquí de práctica", "Camillas", "Material de enfermería"],
  },
  {
    id: 4,
    nombre: "Sala de RCP",
    capacidad: 8,
    estado: "Disponible",
    ubicacion: "Bloque de simulación · Sala 104",
    imagen:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Ambiente para entrenamiento en reanimación cardiopulmonar y atención de emergencias.",
    equipos: ["Maniquí RCP", "Desfibrilador de entrenamiento", "Botiquín"],
  },
];

const CLAVE_RESERVAS = "reservasAmbiente";

const FORMULARIO_INICIAL = {
  instructor: "",
  correo: "",
  programa: "",
  ficha: "",
  ambiente: "",
  estudiantes: "",
  fecha: "",
  hora: "",
  horaFin: "",
  observaciones: "",
};

function leerReservas() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(CLAVE_RESERVAS) || "[]"
    );
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function horaAMinutos(hora) {
  if (!hora) return 0;
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
}

function fechaLocal(fecha) {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

function fechaHoy() {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function fechaLegible(fecha) {
  if (!fecha) return "";
  return fechaLocal(fecha).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Ambientes() {
  const [reservas, setReservas] = useState(() => leerReservas());
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState(
    AMBIENTES[0]
  );
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("exito");

  const [form, setForm] = useState(FORMULARIO_INICIAL);
  const formularioRef = useRef(null);

  useEffect(() => {
    const actualizarReservas = () => setReservas(leerReservas());

    window.addEventListener("storage", actualizarReservas);
    return () => window.removeEventListener("storage", actualizarReservas);
  }, []);

  const ambientesFiltrados = useMemo(() => {
    return AMBIENTES.filter((ambiente) => {
      const coincideNombre = ambiente.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideEstado =
        filtro === "Todos" || ambiente.estado === filtro;

      return coincideNombre && coincideEstado;
    });
  }, [busqueda, filtro]);

  const reservasFuturas = useMemo(() => {
    return reservas
      .filter(
        (reserva) =>
          reserva.fecha >= fechaHoy() &&
          reserva.estado !== "Cancelado" &&
          reserva.estado !== "Cancelada"
      )
      .sort((a, b) =>
        `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
      )
      .slice(0, 5);
  }, [reservas]);

  const disponibles = AMBIENTES.filter(
    (ambiente) => ambiente.estado === "Disponible"
  ).length;

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
    setMensaje("");
  }

  function seleccionarAmbiente(ambiente, bajarAlFormulario = false) {
    setAmbienteSeleccionado(ambiente);
    setForm((anterior) => ({
      ...anterior,
      ambiente: ambiente.nombre,
    }));

    setMensaje("");

    if (bajarAlFormulario) {
      setTimeout(() => {
        formularioRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  function mostrarMensaje(texto, tipo = "exito") {
    setMensaje(texto);
    setTipoMensaje(tipo);
  }

  function solicitarReserva(evento) {
    evento.preventDefault();

    const ambiente = AMBIENTES.find(
      (item) => item.nombre === form.ambiente
    );

    if (!ambiente) {
      mostrarMensaje("Selecciona un ambiente válido.", "error");
      return;
    }

    if (ambiente.estado !== "Disponible") {
      mostrarMensaje(
        "Este ambiente aparece como no disponible. Selecciona otro.",
        "error"
      );
      return;
    }

    if (
      !form.instructor.trim() ||
      !form.correo.trim() ||
      !form.programa.trim() ||
      !form.ficha.trim() ||
      !form.estudiantes ||
      !form.fecha ||
      !form.hora ||
      !form.horaFin
    ) {
      mostrarMensaje(
        "Completa todos los campos obligatorios.",
        "error"
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      mostrarMensaje("Ingresa un correo electrónico válido.", "error");
      return;
    }

    if (form.fecha < fechaHoy()) {
      mostrarMensaje("No puedes reservar en una fecha pasada.", "error");
      return;
    }

    const cantidad = Number(form.estudiantes);

    if (
      !Number.isInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > ambiente.capacidad
    ) {
      mostrarMensaje(
        `La capacidad máxima de este ambiente es de ${ambiente.capacidad} personas.`,
        "error"
      );
      return;
    }

    if (horaAMinutos(form.horaFin) <= horaAMinutos(form.hora)) {
      mostrarMensaje(
        "La hora de finalización debe ser posterior a la hora de inicio.",
        "error"
      );
      return;
    }

    const reservasActuales = leerReservas();

    const existeCruce = reservasActuales.some((reserva) => {
      const mismaFecha = reserva.fecha === form.fecha;
      const mismoAmbiente = reserva.ambiente === form.ambiente;
      const activa =
        reserva.estado !== "Cancelado" &&
        reserva.estado !== "Cancelada";

      if (!mismaFecha || !mismoAmbiente || !activa) return false;

      const inicioExistente = horaAMinutos(reserva.hora);
      const finExistente = horaAMinutos(
        reserva.horaFin || reserva.hora
      );
      const nuevoInicio = horaAMinutos(form.hora);
      const nuevoFin = horaAMinutos(form.horaFin);

      return nuevoInicio < finExistente && nuevoFin > inicioExistente;
    });

    if (existeCruce) {
      mostrarMensaje(
        "Ya existe una reserva para ese ambiente en ese horario.",
        "error"
      );
      return;
    }

    const nuevaReserva = {
      id: `${Date.now()}`,
      ...form,
      estudiantes: cantidad,
      estado: "Reservado",
      creadoEn: new Date().toISOString(),
    };

    try {
      const actualizadas = [...reservasActuales, nuevaReserva];

      localStorage.setItem(
        CLAVE_RESERVAS,
        JSON.stringify(actualizadas)
      );

      setReservas(actualizadas);
      setForm(FORMULARIO_INICIAL);
      mostrarMensaje(
        "¡Solicitud registrada correctamente! Puedes consultarla en próximas reservas."
      );
    } catch {
      mostrarMensaje(
        "No fue posible guardar la reserva en este navegador.",
        "error"
      );
    }
  }

  function cancelarReserva(id) {
    const confirmar = window.confirm(
      "¿Deseas cancelar esta reserva?"
    );

    if (!confirmar) return;

    const actualizadas = leerReservas().map((reserva) =>
      String(reserva.id) === String(id)
        ? { ...reserva, estado: "Cancelado" }
        : reserva
    );

    localStorage.setItem(
      CLAVE_RESERVAS,
      JSON.stringify(actualizadas)
    );

    setReservas(actualizadas);
  }

  return (
    <div className="ambientes-page">
      <style>{`
        .ambientes-page {
          --verde: #238447;
          --verde-oscuro: #176538;
          --verde-claro: #e9f6ed;
          --texto: #24332a;
          --gris: #718078;
          --borde: #e0e9e3;
          color: var(--texto);
          width: 100%;
        }

        .ambientes-page * { box-sizing: border-box; }

        .ambientes-page .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        .ambientes-page .eyebrow {
          color: var(--verde);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.8px;
          margin: 0 0 7px;
        }

        .ambientes-page h1 {
          margin: 0;
          font-size: clamp(25px, 3vw, 34px);
          letter-spacing: -1px;
        }

        .ambientes-page h2 {
          margin: 0;
          font-size: 20px;
        }

        .ambientes-page p { line-height: 1.6; }

        .ambientes-page .subtitulo {
          color: var(--gris);
          margin: 8px 0 0;
          font-size: 14px;
        }

        .ambientes-page .boton {
          border: 0;
          border-radius: 10px;
          padding: 11px 16px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: .2s;
        }

        .ambientes-page .boton:hover { transform: translateY(-1px); }

        .ambientes-page .boton-principal {
          background: var(--verde);
          color: white;
        }

        .ambientes-page .boton-principal:hover {
          background: var(--verde-oscuro);
        }

        .ambientes-page .boton-secundario {
          color: var(--verde-oscuro);
          background: var(--verde-claro);
        }

        .ambientes-page .metricas {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .ambientes-page .metrica {
          background: white;
          border: 1px solid var(--borde);
          border-radius: 15px;
          padding: 19px;
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .ambientes-page .metrica-icono {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--verde-claro);
          font-size: 22px;
          flex-shrink: 0;
        }

        .ambientes-page .metrica strong {
          display: block;
          font-size: 26px;
        }

        .ambientes-page .metrica span {
          color: var(--gris);
          font-size: 12px;
        }

        .ambientes-page .seccion { margin-top: 32px; }

        .ambientes-page .seccion-cabecera {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ambientes-page .herramientas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }

        .ambientes-page .campo-busqueda {
          flex: 1;
          min-width: 190px;
        }

        .ambientes-page input,
        .ambientes-page select,
        .ambientes-page textarea {
          width: 100%;
          border: 1px solid #dce6df;
          border-radius: 9px;
          padding: 11px 12px;
          background: white;
          color: var(--texto);
          font: inherit;
          font-size: 13px;
        }

        .ambientes-page input:focus,
        .ambientes-page select:focus,
        .ambientes-page textarea:focus {
          outline: 2px solid #b7e3c5;
          border-color: var(--verde);
        }

        .ambientes-page .herramientas select { width: 175px; }

        .ambientes-page .tarjetas-ambientes {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .ambientes-page .tarjeta-ambiente {
          border: 1px solid var(--borde);
          border-radius: 15px;
          overflow: hidden;
          background: white;
          min-width: 0;
          transition: .2s;
        }

        .ambientes-page .tarjeta-ambiente.seleccionada {
          border: 2px solid var(--verde);
          box-shadow: 0 4px 18px #17653815;
        }

        .ambientes-page .foto-ambiente {
          height: 145px;
          width: 100%;
          object-fit: cover;
          display: block;
          background: #edf3ef;
        }

        .ambientes-page .tarjeta-contenido { padding: 15px; }

        .ambientes-page .etiqueta {
          display: inline-flex;
          border-radius: 20px;
          padding: 5px 9px;
          font-size: 10px;
          font-weight: 800;
          background: var(--verde-claro);
          color: var(--verde-oscuro);
        }

        .ambientes-page .etiqueta.ocupado {
          color: #94601a;
          background: #fff3dc;
        }

        .ambientes-page .tarjeta-ambiente h3 {
          font-size: 15px;
          line-height: 1.4;
          margin: 12px 0 7px;
          min-height: 42px;
        }

        .ambientes-page .capacidad {
          color: var(--gris);
          font-size: 12px;
          margin: 0 0 14px;
        }

        .ambientes-page .acciones-tarjeta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .ambientes-page .acciones-tarjeta .boton {
          flex: 1;
          padding: 9px 8px;
          font-size: 11px;
        }

        .ambientes-page .panel {
          background: white;
          border: 1px solid var(--borde);
          border-radius: 15px;
          padding: 22px;
        }

        .ambientes-page .detalle-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 22px;
        }

        .ambientes-page .detalle-foto {
          width: 100%;
          height: 255px;
          object-fit: cover;
          border-radius: 12px;
        }

        .ambientes-page .ubicacion {
          color: var(--gris);
          font-size: 13px;
        }

        .ambientes-page .lista-equipos {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0;
          list-style: none;
        }

        .ambientes-page .lista-equipos li {
          border-radius: 8px;
          background: #f2f7f3;
          padding: 8px 10px;
          font-size: 12px;
        }

        .ambientes-page .reservas-lista {
          display: grid;
          gap: 10px;
        }

        .ambientes-page .reserva-fila {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px;
          border: 1px solid var(--borde);
          border-radius: 11px;
        }

        .ambientes-page .reserva-fila strong {
          display: block;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .ambientes-page .reserva-fila span {
          color: var(--gris);
          font-size: 12px;
        }

        .ambientes-page .reserva-derecha {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .ambientes-page .vacio {
          color: var(--gris);
          font-size: 13px;
          text-align: center;
          padding: 25px 12px;
          border: 1px dashed var(--borde);
          border-radius: 12px;
        }

        .ambientes-page .formulario-panel {
          scroll-margin-top: 24px;
          border: 1px solid #d4e8da;
          background: linear-gradient(180deg, #f8fcf9 0%, #fff 100%);
        }

        .ambientes-page .form-intro {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 22px;
        }

        .ambientes-page .form-icono {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: var(--verde-claro);
          font-size: 23px;
          flex-shrink: 0;
        }

        .ambientes-page .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
        }

        .ambientes-page .form-campo {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .ambientes-page .form-campo label {
          font-size: 12px;
          font-weight: 750;
        }

        .ambientes-page .ancho-completo { grid-column: 1 / -1; }

        .ambientes-page .form-pie {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid var(--borde);
        }

        .ambientes-page .nota {
          color: var(--gris);
          font-size: 11px;
          line-height: 1.5;
        }

        .ambientes-page .mensaje {
          padding: 12px 14px;
          margin: 0 0 18px;
          border-radius: 9px;
          font-size: 13px;
        }

        .ambientes-page .mensaje.exito {
          background: #e9f6ed;
          color: #176538;
        }

        .ambientes-page .mensaje.error {
          background: #fff0ee;
          color: #a22d23;
        }

        @media (max-width: 1100px) {
          .ambientes-page .tarjetas-ambientes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .ambientes-page .page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .ambientes-page .metricas {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .ambientes-page .detalle-grid,
          .ambientes-page .form-grid {
            grid-template-columns: 1fr;
          }

          .ambientes-page .ancho-completo { grid-column: auto; }

          .ambientes-page .tarjetas-ambientes {
            grid-template-columns: 1fr;
          }

          .ambientes-page .herramientas select {
            width: 100%;
          }

          .ambientes-page .reserva-fila,
          .ambientes-page .form-pie {
            align-items: flex-start;
            flex-direction: column;
          }

          .ambientes-page .reserva-derecha {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <header className="page-header">
        <div>
          <p className="eyebrow">GESTIÓN DE ESPACIOS</p>
          <h1>Ambientes de simulación</h1>
          <p className="subtitulo">
            Consulta los espacios disponibles y organiza tus prácticas.
          </p>
        </div>

        <button
          className="boton boton-principal"
          onClick={() => {
            formularioRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          + Solicitar una reserva
        </button>
      </header>

      {/* 1. Resumen */}
      <section className="metricas">
        <div className="metrica">
          <div className="metrica-icono">🏥</div>
          <div>
            <strong>{AMBIENTES.length}</strong>
            <span>Ambientes registrados</span>
          </div>
        </div>

        <div className="metrica">
          <div className="metrica-icono">✓</div>
          <div>
            <strong>{disponibles}</strong>
            <span>Ambientes disponibles</span>
          </div>
        </div>

        <div className="metrica">
          <div className="metrica-icono">📅</div>
          <div>
            <strong>{reservasFuturas.length}</strong>
            <span>Próximas reservas visibles</span>
          </div>
        </div>
      </section>

      {/* 2. Tarjetas de ambientes */}
      <section className="seccion">
        <div className="seccion-cabecera">
          <div>
            <h2>Explorar ambientes</h2>
            <p className="subtitulo">
              Selecciona un espacio para consultar sus características.
            </p>
          </div>
        </div>

        <div className="herramientas">
          <input
            className="campo-busqueda"
            type="search"
            placeholder="Buscar ambiente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar ambiente"
          />

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            aria-label="Filtrar por estado"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="En uso">En uso</option>
          </select>
        </div>

        {ambientesFiltrados.length > 0 ? (
          <div className="tarjetas-ambientes">
            {ambientesFiltrados.map((ambiente) => (
              <article
                className={`tarjeta-ambiente ${
                  ambienteSeleccionado.id === ambiente.id
                    ? "seleccionada"
                    : ""
                }`}
                key={ambiente.id}
              >
                <img
                  className="foto-ambiente"
                  src={ambiente.imagen}
                  alt={ambiente.nombre}
                  loading="lazy"
                />

                <div className="tarjeta-contenido">
                  <span
                    className={`etiqueta ${
                      ambiente.estado !== "Disponible" ? "ocupado" : ""
                    }`}
                  >
                    ● {ambiente.estado}
                  </span>

                  <h3>{ambiente.nombre}</h3>
                  <p className="capacidad">
                    👥 Capacidad: {ambiente.capacidad} personas
                  </p>

                  <div className="acciones-tarjeta">
                    <button
                      className="boton boton-secundario"
                      onClick={() =>
                        seleccionarAmbiente(ambiente, false)
                      }
                    >
                      Ver detalles
                    </button>

                    <button
                      className="boton boton-principal"
                      disabled={ambiente.estado !== "Disponible"}
                      onClick={() =>
                        seleccionarAmbiente(ambiente, true)
                      }
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="vacio">
            No se encontraron ambientes con esos criterios.
          </div>
        )}
      </section>

      {/* 3. Detalles del ambiente */}
      <section className="seccion">
        <div className="seccion-cabecera">
          <h2>Detalle del ambiente</h2>
        </div>

        <div className="panel detalle-grid">
          <div>
            <img
              className="detalle-foto"
              src={ambienteSeleccionado.imagen}
              alt={ambienteSeleccionado.nombre}
            />
          </div>

          <div>
            <span
              className={`etiqueta ${
                ambienteSeleccionado.estado !== "Disponible"
                  ? "ocupado"
                  : ""
              }`}
            >
              {ambienteSeleccionado.estado}
            </span>

            <h2 style={{ marginTop: 13 }}>
              {ambienteSeleccionado.nombre}
            </h2>

            <p className="ubicacion">
              📍 {ambienteSeleccionado.ubicacion}
            </p>

            <p>{ambienteSeleccionado.descripcion}</p>

            <strong>Equipos disponibles</strong>
            <ul className="lista-equipos">
              {ambienteSeleccionado.equipos.map((equipo) => (
                <li key={equipo}>✓ {equipo}</li>
              ))}
            </ul>

            <p className="subtitulo">
              Capacidad máxima: {ambienteSeleccionado.capacidad} personas.
            </p>

            <button
              className="boton boton-principal"
              disabled={ambienteSeleccionado.estado !== "Disponible"}
              onClick={() =>
                seleccionarAmbiente(ambienteSeleccionado, true)
              }
            >
              Reservar este ambiente
            </button>
          </div>
        </div>
      </section>

      {/* 4. Próximas reservas */}
      <section className="seccion">
        <div className="seccion-cabecera">
          <div>
            <h2>Próximas reservas</h2>
            <p className="subtitulo">
              Consulta las solicitudes guardadas en este navegador.
            </p>
          </div>
        </div>

        <div className="panel">
          {reservasFuturas.length > 0 ? (
            <div className="reservas-lista">
              {reservasFuturas.map((reserva) => (
                <div className="reserva-fila" key={reserva.id}>
                  <div>
                    <strong>{reserva.ambiente}</strong>
                    <span>
                      {reserva.instructor} · {fechaLegible(reserva.fecha)}
                      {" · "}
                      {reserva.hora}
                      {reserva.horaFin ? ` - ${reserva.horaFin}` : ""}
                    </span>
                  </div>

                  <div className="reserva-derecha">
                    <span className="etiqueta">
                      {reserva.estado || "Reservado"}
                    </span>
                    <button
                      className="boton boton-secundario"
                      onClick={() => cancelarReserva(reserva.id)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="vacio">
              Todavía no hay próximas reservas registradas.
            </div>
          )}
        </div>
      </section>

      {/* 5. FORMULARIO AL FINAL DE LA PÁGINA */}
      <section
        className="seccion"
        ref={formularioRef}
        id="solicitar-reserva"
      >
        <div className="seccion-cabecera">
          <div>
            <h2>Solicitar una reserva</h2>
            <p className="subtitulo">
              Completa los datos para registrar la solicitud del ambiente.
            </p>
          </div>
        </div>

        <div className="panel formulario-panel">
          <div className="form-intro">
            <div className="form-icono">📅</div>
            <div>
              <h2>Formulario de reserva</h2>
              <p className="subtitulo">
                Los campos marcados con * son obligatorios.
              </p>
            </div>
          </div>

          {mensaje && (
            <div
              className={`mensaje ${tipoMensaje}`}
              role="status"
              aria-live="polite"
            >
              {mensaje}
            </div>
          )}

          <form onSubmit={solicitarReserva}>
            <div className="form-grid">
              <div className="form-campo">
                <label htmlFor="instructor">Nombre del instructor *</label>
                <input
                  id="instructor"
                  name="instructor"
                  value={form.instructor}
                  onChange={cambiarCampo}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div className="form-campo">
                <label htmlFor="correo">Correo electrónico *</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={cambiarCampo}
                  placeholder="nombre@institucion.edu.co"
                  required
                />
              </div>

              <div className="form-campo">
                <label htmlFor="programa">Programa de formación *</label>
                <input
                  id="programa"
                  name="programa"
                  value={form.programa}
                  onChange={cambiarCampo}
                  placeholder="Ej. Enfermería"
                  required
                />
              </div>

              <div className="form-campo">
                <label htmlFor="ficha">Número de ficha *</label>
                <input
                  id="ficha"
                  name="ficha"
                  value={form.ficha}
                  onChange={cambiarCampo}
                  placeholder="Número de ficha"
                  required
                />
              </div>

              <div className="form-campo ancho-completo">
                <label htmlFor="ambiente">Ambiente solicitado *</label>
                <select
                  id="ambiente"
                  name="ambiente"
                  value={form.ambiente}
                  onChange={(e) => {
                    cambiarCampo(e);
                    const ambiente = AMBIENTES.find(
                      (item) => item.nombre === e.target.value
                    );
                    if (ambiente) setAmbienteSeleccionado(ambiente);
                  }}
                  required
                >
                  <option value="">Selecciona un ambiente</option>
                  {AMBIENTES.map((ambiente) => (
                    <option
                      key={ambiente.id}
                      value={ambiente.nombre}
                      disabled={ambiente.estado !== "Disponible"}
                    >
                      {ambiente.nombre} — {ambiente.estado}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-campo">
                <label htmlFor="estudiantes">
                  Cantidad de estudiantes *
                </label>
                <input
                  id="estudiantes"
                  name="estudiantes"
                  type="number"
                  min="1"
                  max={
                    AMBIENTES.find(
                      (item) => item.nombre === form.ambiente
                    )?.capacidad || 50
                  }
                  value={form.estudiantes}
                  onChange={cambiarCampo}
                  placeholder="Ej. 10"
                  required
                />
                {form.ambiente && (
                  <span className="nota">
                    Capacidad máxima:{" "}
                    {
                      AMBIENTES.find(
                        (item) => item.nombre === form.ambiente
                      )?.capacidad
                    }{" "}
                    personas.
                  </span>
                )}
              </div>

              <div className="form-campo">
                <label htmlFor="fecha">Fecha de la práctica *</label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  min={fechaHoy()}
                  value={form.fecha}
                  onChange={cambiarCampo}
                  required
                />
              </div>

              <div className="form-campo">
                <label htmlFor="hora">Hora de inicio *</label>
                <input
                  id="hora"
                  name="hora"
                  type="time"
                  value={form.hora}
                  onChange={cambiarCampo}
                  required
                />
              </div>

              <div className="form-campo">
                <label htmlFor="horaFin">Hora de finalización *</label>
                <input
                  id="horaFin"
                  name="horaFin"
                  type="time"
                  value={form.horaFin}
                  onChange={cambiarCampo}
                  required
                />
              </div>

              <div className="form-campo ancho-completo">
                <label htmlFor="observaciones">
                  Observaciones adicionales
                </label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  value={form.observaciones}
                  onChange={cambiarCampo}
                  placeholder="Describe los equipos o requerimientos especiales..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-pie">
              <span className="nota">
                La solicitud se guarda en este navegador y puede consultarse
                en próximas reservas.
              </span>

              <button
                className="boton boton-principal"
                type="submit"
              >
                Confirmar solicitud →
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
