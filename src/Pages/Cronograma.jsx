import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cronograma() {
  // =========================
  // ESTADOS
  // =========================
  const [reservas, setReservas] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null);

  const [form, setForm] = useState({
    instructor: "",
    programa: "",
    ficha: "",
    ambiente: "",
    fecha: "",
    hora: "",
    observaciones: "",
  });

  // =========================
  // CARGAR RESERVAS
  // =========================
  useEffect(() => {
    const dataGuardada = localStorage.getItem("reservasAmbiente");
    if (dataGuardada) {
      setReservas(JSON.parse(dataGuardada));
    }
  }, []);

  // =========================
  // MANEJO DEL FORMULARIO
  // =========================
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const registrarReserva = () => {
    // Validar campos vacíos
    if (
      !form.instructor ||
      !form.programa ||
      !form.ficha ||
      !form.ambiente ||
      !form.fecha ||
      !form.hora
    ) {
      alert("Complete todos los campos obligatorios.");
      return;
    }

    const nuevaReserva = {
      ...form,
      estado: "Reservado",
    };

    let nuevasReservas = [...reservas];

    if (editandoIndex !== null) {
      // Actualizar reserva existente
      nuevasReservas[editandoIndex] = nuevaReserva;
      setEditandoIndex(null);
      alert("Reserva actualizada correctamente.");
    } else {
      // Agregar nueva reserva
      nuevasReservas.push(nuevaReserva);
      alert("Reserva registrada correctamente.");
    }

    setReservas(nuevasReservas);
    localStorage.setItem("reservasAmbiente", JSON.stringify(nuevasReservas));
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setForm({
      instructor: "",
      programa: "",
      ficha: "",
      ambiente: "",
      fecha: "",
      hora: "",
      observaciones: "",
    });
    setEditandoIndex(null);
  };

  // =========================
  // ACCIONES DE TABLA
  // =========================
  const verReserva = (reserva) => {
    alert(
      `Instructor: ${reserva.instructor}\nPrograma: ${reserva.programa}\nFicha: ${reserva.ficha}\nAmbiente: ${reserva.ambiente}\nFecha: ${reserva.fecha}\nHora: ${reserva.hora}\nEstado: ${reserva.estado}\nObservaciones: ${reserva.observaciones}`
    );
  };

  const editarReserva = (index) => {
    setForm(reservas[index]);
    setEditandoIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sube la pantalla al formulario
  };

  const eliminarReserva = (index) => {
    if (window.confirm("¿Está seguro de eliminar esta reserva?")) {
      const nuevasReservas = reservas.filter((_, i) => i !== index);
      setReservas(nuevasReservas);
      localStorage.setItem("reservasAmbiente", JSON.stringify(nuevasReservas));
    }
  };

  // =========================
  // FILTRADO
  // =========================
  const reservasFiltradas = reservas.filter((r) => {
    const textoBuscado = buscar.toLowerCase();
    return (
      r.instructor.toLowerCase().includes(textoBuscado) ||
      r.programa.toLowerCase().includes(textoBuscado) ||
      r.ambiente.toLowerCase().includes(textoBuscado) ||
      r.ficha.toLowerCase().includes(textoBuscado)
    );
  });

  return (
    <div className="cronograma-container">
      {/* ================= HEADER ================= */}
      <header>
        <h1>📅 Cronograma del Ambiente de Simulación</h1>
        <p>
          Gestione las reservas y programación de los ambientes del Centro de
          Simulación de Enfermería.
        </p>
        <Link to="/" className="volver">
          ⬅ Volver al inicio
        </Link>
      </header>

      {/* ================= CONTENEDOR ================= */}
      <div className="contenedor">
        {/* ================= TARJETAS ================= */}
        <div className="tarjetas">
          <div className="tarjeta">
            <div className="icono">📅</div>
            <h2>
              {reservas.length < 10 ? `0${reservas.length}` : reservas.length}
            </h2>
            <p>Reservas totales</p>
          </div>

          <div className="tarjeta">
            <div className="icono">🏥</div>
            <h2>06</h2>
            <p>Ambientes disponibles</p>
          </div>

          <div className="tarjeta">
            <div className="icono">👨‍🏫</div>
            <h2>15</h2>
            <p>Instructores</p>
          </div>

          <div className="tarjeta">
            <div className="icono">🩺</div>
            <h2>04</h2>
            <p>Simulaciones activas</p>
          </div>
        </div>

        {/* ================= FORMULARIO ================= */}
        <div className="formulario">
          <h2>
            {editandoIndex !== null ? "Editar Reserva" : "Registrar Reserva"}
          </h2>

          <div className="grid">
            <div className="grupo">
              <label>👨‍🏫 Instructor</label>
              <input
                id="instructor"
                type="text"
                placeholder="Nombre del instructor"
                value={form.instructor}
                onChange={handleChange}
              />
            </div>

            <div className="grupo">
              <label>📚 Programa</label>
              <input
                id="programa"
                type="text"
                placeholder="Ej. Enfermería"
                value={form.programa}
                onChange={handleChange}
              />
            </div>

            <div className="grupo">
              <label>🎓 Ficha</label>
              <input
                id="ficha"
                type="text"
                placeholder="Número de ficha"
                value={form.ficha}
                onChange={handleChange}
              />
            </div>

            <div className="grupo">
              <label>🏥 Ambiente</label>
              <select
                id="ambiente"
                value={form.ambiente}
                onChange={handleChange}
              >
                <option value="">Seleccione un ambiente</option>
                <option value="Laboratorio de Simulación 1">
                  Laboratorio de Simulación 1
                </option>
                <option value="Laboratorio de Simulación 2">
                  Laboratorio de Simulación 2
                </option>
                <option value="Unidad de Urgencias">Unidad de Urgencias</option>
                <option value="UCI">UCI</option>
                <option value="Sala de Hospitalización">
                  Sala de Hospitalización
                </option>
                <option value="Sala Materno Infantil">
                  Sala Materno Infantil
                </option>
              </select>
            </div>

            <div className="grupo">
              <label>📅 Fecha</label>
              <input
                id="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="grupo">
              <label>🕒 Hora</label>
              <input
                id="hora"
                type="time"
                value={form.hora}
                onChange={handleChange}
              />
            </div>

            <div className="grupo observaciones">
              <label>📝 Observaciones</label>
              <textarea
                id="observaciones"
                placeholder="Ingrese información adicional de la reserva..."
                value={form.observaciones}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="botones">
            <button onClick={registrarReserva}>
              {editandoIndex !== null ? "💾 Actualizar Reserva" : "💾 Registrar Reserva"}
            </button>
            {editandoIndex !== null && (
              <button
                className="cancelar-btn"
                onClick={limpiarFormulario}
                style={{ marginLeft: "10px", background: "#888" }}
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </div>

        {/* ================= BUSCADOR ================= */}
        <div className="buscador">
          <input
            type="text"
            placeholder="🔍 Buscar por instructor, programa o ambiente..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>

        {/* ================= TABLA DE RESERVAS ================= */}
        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Instructor</th>
                <th>Programa</th>
                <th>Ficha</th>
                <th>Ambiente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: "25px", color: "#777" }}>
                    No se encontraron reservas.
                  </td>
                </tr>
              ) : (
                reservasFiltradas.map((r, index) => (
                  <tr key={index}>
                    <td>{r.instructor}</td>
                    <td>{r.programa}</td>
                    <td>{r.ficha}</td>
                    <td>{r.ambiente}</td>
                    <td>{r.fecha}</td>
                    <td>{r.hora}</td>
                    <td>
                      <span className="estado reservado">{r.estado}</span>
                    </td>
                    <td>
                      <button className="ver" onClick={() => verReserva(r)}>
                        Ver
                      </button>
                      <button
                        className="editar"
                        onClick={() => editarReserva(index)}
                      >
                        Editar
                      </button>
                      <button
                        className="eliminar"
                        onClick={() => eliminarReserva(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        .cronograma-container {
          background: #f3f7f4;
          min-height: 100vh;
          padding-bottom: 50px;
        }

        /* HEADER */
        header {
          background: linear-gradient(135deg, #066b2d, #0a8f3c, #39a935);
          color: white;
          padding: 35px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,.18);
        }
        header h1 {
          font-size: 38px;
          margin-bottom: 10px;
        }
        header p {
          font-size: 17px;
          opacity: .95;
        }
        .volver {
          display: inline-block;
          margin-top: 22px;
          background: white;
          color: #0a8f3c;
          text-decoration: none;
          padding: 10px 22px;
          border-radius: 30px;
          font-weight: bold;
          transition: .3s;
        }
        .volver:hover {
          transform: translateY(-3px);
        }

        /* CONTENEDOR */
        .contenedor {
          width: 95%;
          margin: auto;
          padding: 30px 0;
        }

        /* TARJETAS */
        .tarjetas {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 35px;
        }
        .tarjeta {
          background: white;
          border-radius: 18px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 10px 20px rgba(0,0,0,.08);
          transition: .3s;
        }
        .tarjeta:hover {
          transform: translateY(-5px);
        }
        .tarjeta .icono {
          font-size: 38px;
          margin-bottom: 10px;
        }
        .tarjeta h2 {
          color: #0a8f3c;
          font-size: 32px;
        }
        .tarjeta p {
          color: #555;
          margin-top: 8px;
        }

        /* FORMULARIO */
        .formulario {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0,0,0,.12);
        }
        .formulario h2 {
          text-align: center;
          color: #0a8f3c;
          margin-bottom: 30px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .grupo {
          display: flex;
          flex-direction: column;
        }
        .grupo label {
          color: #066b2d;
          font-weight: bold;
          margin-bottom: 8px;
        }
        input, select, textarea {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          transition: .3s;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #0a8f3c;
          box-shadow: 0 0 8px rgba(10,143,60,.25);
        }
        textarea {
          resize: none;
          height: 90px;
        }
        .observaciones {
          grid-column: 1/3;
        }
        .botones {
          margin-top: 25px;
          text-align: center;
        }
        .botones button {
          background: #0a8f3c;
          color: white;
          border: none;
          padding: 14px 30px;
          border-radius: 30px;
          font-size: 16px;
          cursor: pointer;
          transition: .3s;
        }
        .botones button:hover {
          background: #066b2d;
          transform: scale(1.05);
        }

        /* BUSCADOR */
        .buscador {
          margin: 35px 0;
          text-align: center;
        }
        .buscador input {
          width: 45%;
          padding: 13px;
          border-radius: 30px;
          border: 1px solid #ccc;
        }

        /* TABLA */
        .tabla-contenedor {
          margin-top: 35px;
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,.12);
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          background: #0a8f3c;
          color: white;
          padding: 15px;
          font-size: 15px;
        }
        td {
          padding: 14px;
          text-align: center;
          border-bottom: 1px solid #eee;
        }
        .estado {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          color: white;
        }
        .reservado {
          background: #28a745;
        }
        .finalizado {
          background: #ffc107;
          color: #222;
        }

        button.editar {
          background: #2196f3;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          margin: 2px;
        }
        button.eliminar {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          margin: 2px;
        }
        button.ver {
          background: #0a8f3c;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          margin: 2px;
        }

        /* RESPONSIVE */
        @media(max-width: 900px) {
          .tarjetas {
            grid-template-columns: 1fr 1fr;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .observaciones {
            grid-column: auto;
          }
          .buscador input {
            width: 100%;
          }
        }
        @media(max-width: 500px) {
          .tarjetas {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}