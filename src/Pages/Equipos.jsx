
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const municipiosCauca = [
  "Almaguer",
  "Argelia",
  "Balboa",
  "Bolívar",
  "Buenos Aires",
  "Cajibío",
  "Caldono",
  "Caloto",
  "Corinto",
  "El Tambo",
  "Florencia",
  "Guachené",
  "Guapi",
  "Inzá",
  "Jambaló",
  "La Sierra",
  "La Vega",
  "López de Micay",
  "Mercaderes",
  "Miranda",
  "Morales",
  "Padilla",
  "Páez",
  "Patía",
  "Piamonte",
  "Piendamó - Tunía",
  "Popayán",
  "Puerto Tejada",
  "Puracé",
  "Rosas",
  "San Sebastián",
  "Santa Rosa",
  "Santander de Quilichao",
  "Silvia",
  "Sotará",
  "Suárez",
  "Sucre",
  "Timbío",
  "Timbiquí",
  "Toribío",
  "Totoró",
  "Villa Rica",
];

const tiposEquipos = [
  "Camilla",
  "Monitor multiparámetro",
  "Desfibrilador",
  "Bomba de infusión",
  "Aspirador de secreciones",
  "Mesa instrumental",
];

export default function RegistroEquipos() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    municipio: "Popayán",
    instructor: "",
    ficha: "",
    programa: "",
    fechaSalida: "",
    fechaDevolucion: "",
  });

  const [equipoSeleccionado, setEquipoSeleccionado] =
    useState("Camilla");
  const [placa, setPlaca] = useState("");
  const [precio, setPrecio] = useState("");
  const [equiposSeleccionados, setEquiposSeleccionados] =
    useState([]);
  const [equiposPrestados, setEquiposPrestados] =
    useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = () => {
    try {
      const datos = JSON.parse(
        localStorage.getItem("usosEquipos") || "[]"
      );

      setEquiposPrestados(
        datos.filter((registro) =>
          registro.equipos?.some(
            (equipo) => equipo.estado === "Prestado"
          )
        )
      );
    } catch (error) {
      console.error("Error al cargar los préstamos:", error);
      setEquiposPrestados([]);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [id]: value,
    }));
  };

  const formatoCOP = (valor) =>
    Number(valor || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const totalSeleccionado = equiposSeleccionados.reduce(
    (total, equipo) => total + Number(equipo.precio || 0),
    0
  );

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "";

    const partes = fecha.split("-");

    if (partes.length !== 3) return fecha;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const esPopayan = (municipio) =>
    String(municipio || "")
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase() === "popayan";

  const agregarEquipo = () => {
    const placaLimpia = placa.trim().toUpperCase();

    if (!placaLimpia) {
      alert("Escribe la placa del equipo.");
      return;
    }

    if (
      precio.trim() === "" ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) < 0
    ) {
      alert("Ingresa un precio unitario válido.");
      return;
    }

    const yaAgregado = equiposSeleccionados.some(
      (equipo) => equipo.placa === placaLimpia
    );

    if (yaAgregado) {
      alert("Ese equipo ya está agregado al préstamo.");
      return;
    }

    let datos = [];

    try {
      datos = JSON.parse(
        localStorage.getItem("usosEquipos") || "[]"
      );
    } catch {
      alert("No se pudieron leer los préstamos guardados.");
      return;
    }

    const yaPrestado = datos.some(
      (registro) =>
        registro.equipos?.some(
          (equipo) =>
            String(equipo.placa || "").toUpperCase() === placaLimpia &&
            equipo.estado === "Prestado"
        )
    );

    if (yaPrestado) {
      alert(
        `El equipo con placa ${placaLimpia} ya se encuentra prestado.`
      );
      cargarEquipos();
      return;
    }

    const nuevoEquipo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nombre: equipoSeleccionado,
      placa: placaLimpia,
      precio: Number(precio),
    };

    setEquiposSeleccionados((anteriores) => [
      ...anteriores,
      nuevoEquipo,
    ]);

    setPlaca("");
    setPrecio("");
  };

  const quitarEquipo = (id) => {
    setEquiposSeleccionados((anteriores) =>
      anteriores.filter((equipo) => equipo.id !== id)
    );
  };

  // Generar el documento PDF correspondiente al municipio.
  const generarPDF = (prestamo) => {
    const doc = new jsPDF();
    const autorizacion = esPopayan(prestamo.municipio);

    const titulo = autorizacion
      ? "AUTORIZACIÓN PARA PRÉSTAMO DE EQUIPOS"
      : "DOCUMENTO DE PRÉSTAMO DE EQUIPOS";

    const total = prestamo.equipos.reduce(
      (suma, equipo) => suma + Number(equipo.precio || 0),
      0
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(
      "SENA - CENTRO DE SIMULACIÓN EN SALUD",
      105,
      20,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.text(titulo, 105, 31, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(`Municipio: ${prestamo.municipio}`, 14, 44);
    doc.text(
      `Fecha de elaboración: ${formatearFecha(obtenerFechaActual())}`,
      14,
      51
    );

    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL RESPONSABLE", 14, 63);

    doc.setFont("helvetica", "normal");
    doc.text(`Instructor: ${prestamo.instructor}`, 14, 71);
    doc.text(`Ficha: ${prestamo.ficha}`, 14, 78);
    doc.text(`Programa: ${prestamo.programa}`, 14, 85);
    doc.text(
      `Fecha de salida: ${formatearFecha(prestamo.fechaSalida)}`,
      14,
      92
    );
    doc.text(
      `Fecha de devolución: ${formatearFecha(prestamo.fechaDevolucion)}`,
      14,
      99
    );

    autoTable(doc, {
      startY: 108,
      head: [[
        "Equipo",
        "Placa",
        "Precio unitario (COP)",
      ]],
      body: prestamo.equipos.map((equipo) => [
        equipo.nombre,
        equipo.placa,
        formatoCOP(equipo.precio),
      ]),
      foot: [[
        "",
        "VALOR TOTAL",
        formatoCOP(total),
      ]],
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [6, 107, 45],
      },
      footStyles: {
        fontStyle: "bold",
        textColor: [0, 0, 0],
      },
      margin: { left: 14, right: 14 },
    });

    let y = doc.lastAutoTable.finalY + 14;

    const texto = autorizacion
      ? "Por medio del presente documento se deja constancia de la autorización para el préstamo de los equipos relacionados. El responsable se compromete a hacer uso adecuado de ellos, conservarlos en buen estado y devolverlos en la fecha acordada."
      : "Por medio del presente documento se deja constancia de la entrega en préstamo de los equipos relacionados. Las partes firman como constancia de entrega, recibido y compromiso de devolución en la fecha acordada.";

    const lineas = doc.splitTextToSize(texto, 180);

    if (y + lineas.length * 5 + 40 > 275) {
      doc.addPage();
      y = 25;
    }

    doc.text(lineas, 14, y);
    y += lineas.length * 5 + 23;

    if (y + 35 > 280) {
      doc.addPage();
      y = 35;
    }

    doc.line(14, y, 90, y);
    doc.line(115, y, 191, y);

    doc.setFontSize(9);
    doc.text("Firma del instructor responsable", 14, y + 7);
    doc.text("Firma de quien entrega los equipos", 115, y + 7);

    doc.text(`Nombre: ${prestamo.instructor}`, 14, y + 15);
    doc.text("Nombre: ______________________", 115, y + 15);

    doc.text("Documento: ___________________", 14, y + 23);
    doc.text("Documento: ___________________", 115, y + 23);

    const nombreArchivo = autorizacion
      ? `Autorizacion_Prestamo_${prestamo.id}.pdf`
      : `Documento_Prestamo_${prestamo.id}.pdf`;

    doc.save(nombreArchivo);
  };

  const guardar = () => {
    if (
      !form.municipio ||
      !form.instructor.trim() ||
      !form.ficha.trim() ||
      !form.programa.trim() ||
      !form.fechaSalida ||
      !form.fechaDevolucion
    ) {
      alert("Por favor completa todos los datos del préstamo.");
      return;
    }

    if (equiposSeleccionados.length === 0) {
      alert("Debes agregar por lo menos un equipo.");
      return;
    }

    if (form.fechaDevolucion < form.fechaSalida) {
      alert(
        "La fecha de devolución no puede ser anterior a la fecha de salida."
      );
      return;
    }

    let datos = [];

    try {
      datos = JSON.parse(
        localStorage.getItem("usosEquipos") || "[]"
      );
    } catch {
      alert("No se pudieron leer los préstamos guardados.");
      return;
    }

    const placaOcupada = equiposSeleccionados.find((equipo) =>
      datos.some((registro) =>
        registro.equipos?.some(
          (item) =>
            String(item.placa || "").toUpperCase() ===
              equipo.placa.toUpperCase() &&
            item.estado === "Prestado"
        )
      )
    );

    if (placaOcupada) {
      alert(
        `El equipo con placa ${placaOcupada.placa} ya está prestado.`
      );
      cargarEquipos();
      return;
    }

    const inicio = new Date(`${form.fechaSalida}T00:00:00`);
    const fin = new Date(`${form.fechaDevolucion}T00:00:00`);

    const diasPrestamo = Math.max(
      1,
      Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24))
    );

    const nuevoPrestamo = {
      id: Date.now(),
      municipio: form.municipio,
      instructor: form.instructor.trim(),
      ficha: form.ficha.trim(),
      programa: form.programa.trim(),
      fechaSalida: form.fechaSalida,
      fechaDevolucion: form.fechaDevolucion,
      diasPrestamo,
      equipos: equiposSeleccionados.map((equipo) => ({
        nombre: equipo.nombre,
        placa: equipo.placa,
        precio: Number(equipo.precio),
        estado: "Prestado",
      })),
      estado: "Prestado",
    };

    try {
      const nuevosDatos = [...datos, nuevoPrestamo];

      localStorage.setItem(
        "usosEquipos",
        JSON.stringify(nuevosDatos)
      );

      cargarEquipos();
      generarPDF(nuevoPrestamo);

      setMostrarMensaje(true);

      setForm({
        municipio: "Popayán",
        instructor: "",
        ficha: "",
        programa: "",
        fechaSalida: "",
        fechaDevolucion: "",
      });

      setEquiposSeleccionados([]);
      setPlaca("");
      setPrecio("");

      window.setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
    } catch (error) {
      console.error("Error al guardar el préstamo:", error);
      alert(
        "No fue posible guardar el préstamo o generar el PDF. Revisa la consola del navegador."
      );
    }
  };

  const devolverEquipo = (idPrestamo, placaEquipo) => {
    const confirmar = window.confirm(
      `¿Confirmas que el equipo con placa ${placaEquipo} fue devuelto?`
    );

    if (!confirmar) return;

    let datos = [];

    try {
      datos = JSON.parse(
        localStorage.getItem("usosEquipos") || "[]"
      );
    } catch {
      alert("No se pudieron leer los préstamos guardados.");
      return;
    }

    const actualizados = datos.map((prestamo) => {
      if (prestamo.id !== idPrestamo) return prestamo;

      const equiposActualizados = prestamo.equipos.map((equipo) => {
        if (
          String(equipo.placa || "").toUpperCase() ===
          String(placaEquipo || "").toUpperCase()
        ) {
          return {
            ...equipo,
            estado: "Disponible",
            fechaRealDevolucion: obtenerFechaActual(),
          };
        }

        return equipo;
      });

      const quedanPrestados = equiposActualizados.some(
        (equipo) => equipo.estado === "Prestado"
      );

      return {
        ...prestamo,
        equipos: equiposActualizados,
        estado: quedanPrestados ? "Prestado" : "Finalizado",
      };
    });

    try {
      localStorage.setItem(
        "usosEquipos",
        JSON.stringify(actualizados)
      );

      cargarEquipos();
      alert(`El equipo ${placaEquipo} fue registrado como devuelto.`);
    } catch (error) {
      console.error("Error al registrar la devolución:", error);
      alert("No se pudo guardar la devolución.");
    }
  };

  const estaVencido = (fecha) => {
    if (!fecha) return false;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaDevolucion = new Date(`${fecha}T00:00:00`);

    return fechaDevolucion < hoy;
  };

  const irCalendario = () => {
    navigate("/calendario-equipos");
  };

  return (
    <div className="registro-equipos">
      <header className="encabezado">
        <div className="contenido-encabezado">
          <div>
            <h1>Control de equipos</h1>
            <p>
              Registro y seguimiento de los equipos del Centro de Simulación
            </p>
          </div>

          <Link to="/dashboard" className="btn-volver">
            ← Regresar
          </Link>
        </div>
      </header>

      <main className="contenedor">
        <div className="titulo-seccion">
          <h2>Registrar préstamo de equipos</h2>
          <p>
            Registra el responsable, las fechas y los equipos que se llevarán.
          </p>
        </div>

        <section className="tarjeta">
          <div className="tarjeta-header">
            <h3>Información del préstamo</h3>
            <p>Completa los datos antes de agregar los equipos.</p>
          </div>

          <div className="formulario">
            <div className="campo">
              <label htmlFor="municipio">Municipio</label>
              <select
                id="municipio"
                value={form.municipio}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un municipio</option>
                {municipiosCauca.map((nombreMunicipio) => (
                  <option
                    key={nombreMunicipio}
                    value={nombreMunicipio}
                  >
                    {nombreMunicipio}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="instructor">Instructor responsable</label>
              <input
                id="instructor"
                type="text"
                placeholder="Nombre del instructor"
                value={form.instructor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="ficha">Ficha de formación</label>
              <input
                id="ficha"
                type="text"
                placeholder="Ejemplo: 3142101"
                value={form.ficha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="programa">Programa de formación</label>
              <input
                id="programa"
                type="text"
                placeholder="Ejemplo: Enfermería"
                value={form.programa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="fechaSalida">Fecha de salida</label>
              <input
                id="fechaSalida"
                type="date"
                value={form.fechaSalida}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="fechaDevolucion">Fecha de devolución</label>
              <input
                id="fechaDevolucion"
                type="date"
                min={form.fechaSalida || undefined}
                value={form.fechaDevolucion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <section className="tarjeta">
          <div className="tarjeta-header">
            <h3>Seleccionar equipos</h3>
            <p>
              Ingresa la placa y el precio real de cada equipo.
            </p>
          </div>

          <div className="agregar-equipo">
            <div className="campo">
              <label htmlFor="equipoSeleccionado">Tipo de equipo</label>
              <select
                id="equipoSeleccionado"
                value={equipoSeleccionado}
                onChange={(e) => setEquipoSeleccionado(e.target.value)}
              >
                {tiposEquipos.map((equipo) => (
                  <option key={equipo} value={equipo}>
                    {equipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="placa">Placa</label>
              <input
                id="placa"
                type="text"
                placeholder="Ejemplo: EQ-024"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="precio">Precio unitario (COP)</label>
              <input
                id="precio"
                type="number"
                min="0"
                step="1"
                placeholder="Precio real"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn-agregar"
              onClick={agregarEquipo}
            >
              + Agregar equipo
            </button>
          </div>

          <div className="lista-equipos">
            <div className="lista-titulo">
              <h3>Equipos seleccionados</h3>
              <span>{equiposSeleccionados.length}</span>
            </div>

            {equiposSeleccionados.length === 0 ? (
              <div className="sin-equipos">
                <div className="icono-caja">📦</div>
                <p>Todavía no has agregado equipos.</p>
              </div>
            ) : (
              <div className="equipos-grid">
                {equiposSeleccionados.map((equipo) => (
                  <div className="equipo-item" key={equipo.id}>
                    <div className="equipo-icono">🩺</div>

                    <div className="equipo-info">
                      <strong>{equipo.nombre}</strong>
                      <span>
                        Placa: <b>{equipo.placa}</b>
                      </span>
                      <span>
                        Precio: <b>{formatoCOP(equipo.precio)}</b>
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-quitar"
                      onClick={() => quitarEquipo(equipo.id)}
                      title="Quitar equipo"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="total-seleccionado">
              <strong>Total del préstamo:</strong>
              <strong>{formatoCOP(totalSeleccionado)}</strong>
            </div>
          </div>

          <div className="informacion">
            <strong>Importante:</strong> el precio corresponde al valor
            registrado por el usuario. Verifica que sea correcto antes de
            generar el documento.
          </div>

          <div className="acciones">
            <button
              type="button"
              className="btn-calendario"
              onClick={irCalendario}
            >
              📅 Ver calendario
            </button>

            <button
              type="button"
              className="btn-registrar"
              onClick={guardar}
            >
              ✓ Registrar préstamo y generar PDF
            </button>
          </div>

          {mostrarMensaje && (
            <div className="mensaje">
              ✓ Préstamo registrado correctamente.
            </div>
          )}
        </section>

        <section className="prestamos">
          <div className="prestamos-header">
            <div>
              <h2>Equipos actualmente prestados</h2>
              <p>Puedes devolver cada equipo individualmente.</p>
            </div>

            <span className="contador">
              {equiposPrestados.reduce(
                (total, prestamo) =>
                  total +
                  (prestamo.equipos?.filter(
                    (equipo) => equipo.estado === "Prestado"
                  ).length || 0),
                0
              )}{" "}
              equipo(s)
            </span>
          </div>

          {equiposPrestados.length === 0 ? (
            <div className="sin-prestamos">
              <div className="sin-icono">✓</div>
              <h3>No hay equipos prestados</h3>
              <p>Todos los equipos están disponibles.</p>
            </div>
          ) : (
            <div className="prestamos-lista">
              {equiposPrestados.map((prestamo) => {
                const equiposActivos =
                  prestamo.equipos?.filter(
                    (equipo) => equipo.estado === "Prestado"
                  ) || [];

                if (equiposActivos.length === 0) return null;

                const vencido = estaVencido(prestamo.fechaDevolucion);

                return (
                  <div className="prestamo-card" key={prestamo.id}>
                    <div className="prestamo-top">
                      <div>
                        <h3>{prestamo.instructor}</h3>
                        <p>
                          Ficha {prestamo.ficha} · {prestamo.programa}
                        </p>
                        <p>
                          Municipio: {prestamo.municipio || "No registrado"}
                        </p>
                      </div>

                      <span
                        className={`estado ${
                          vencido ? "vencido" : "prestado"
                        }`}
                      >
                        {vencido ? "🔴 Vencido" : "🟠 Prestado"}
                      </span>
                    </div>

                    <div className="datos-fecha">
                      <div>
                        <span>Salida</span>
                        <strong>
                          {formatearFecha(prestamo.fechaSalida)}
                        </strong>
                      </div>

                      <div>
                        <span>Devolución</span>
                        <strong>
                          {formatearFecha(prestamo.fechaDevolucion)}
                        </strong>
                      </div>

                      <div>
                        <span>Tiempo</span>
                        <strong>
                          {prestamo.diasPrestamo ?? "—"} día(s)
                        </strong>
                      </div>
                    </div>

                    <div className="equipos-prestamo">
                      <h4>Equipos de este préstamo</h4>

                      {equiposActivos.map((equipo) => (
                        <div
                          className="fila-equipo"
                          key={`${prestamo.id}-${equipo.placa}`}
                        >
                          <div>
                            <strong>{equipo.nombre}</strong>
                            <span className="placa">{equipo.placa}</span>
                            <span>{formatoCOP(equipo.precio)}</span>
                          </div>

                          <button
                            type="button"
                            className="btn-devolver"
                            onClick={() =>
                              devolverEquipo(prestamo.id, equipo.placa)
                            }
                          >
                            ↩ Devolver
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .registro-equipos {
          min-height: 100vh;
          padding-bottom: 50px;
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f2f7f4;
          color: #333;
        }

        .encabezado {
          background: linear-gradient(135deg, #066b2d, #0a8f3c, #39a935);
          color: white;
          padding: 30px 5%;
          box-shadow: 0 4px 12px rgba(0,0,0,.12);
        }

        .contenido-encabezado {
          max-width: 1200px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .encabezado h1 {
          margin: 0;
          font-size: 30px;
        }

        .encabezado p {
          margin: 8px 0 0;
        }

        .btn-volver {
          text-decoration: none;
          color: #066b2d;
          background: white;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: bold;
          white-space: nowrap;
        }

        .contenedor {
          width: 90%;
          max-width: 1200px;
          margin: 30px auto;
        }

        .titulo-seccion {
          margin-bottom: 25px;
        }

        .titulo-seccion h2 {
          margin: 0;
          color: #066b2d;
        }

        .titulo-seccion p {
          color: #666;
        }

        .tarjeta, .prestamos {
          background: white;
          border-radius: 14px;
          box-shadow: 0 5px 18px rgba(0,0,0,.07);
          overflow: hidden;
          margin-bottom: 28px;
        }

        .tarjeta-header {
          background: #e6f3ea;
          padding: 20px 25px;
          border-bottom: 1px solid #d2e6d7;
        }

        .tarjeta-header h3 {
          margin: 0;
          color: #066b2d;
        }

        .tarjeta-header p {
          margin: 7px 0 0;
          color: #666;
        }

        .formulario {
          padding: 25px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .campo {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .campo label {
          margin-bottom: 7px;
          color: #066b2d;
          font-weight: 600;
        }

        .campo input, .campo select {
          width: 100%;
          padding: 11px;
          border: 1px solid #ccc;
          border-radius: 7px;
          font: inherit;
          background: white;
        }

        .campo input:focus, .campo select:focus {
          outline: none;
          border-color: #0a8f3c;
          box-shadow: 0 0 0 3px rgba(10,143,60,.1);
        }

        .agregar-equipo {
          padding: 25px;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr auto;
          gap: 15px;
          align-items: end;
        }

        button {
          padding: 10px 15px;
          border-radius: 7px;
          font-family: inherit;
          font-weight: bold;
          cursor: pointer;
          transition: .2s;
        }

        .btn-agregar {
          background: #e6f3ea;
          color: #066b2d;
          border: 1px solid #0a8f3c;
          white-space: nowrap;
        }

        .btn-agregar:hover, .btn-calendario:hover,
        .btn-devolver:hover {
          background: #d3ebda;
        }

        .lista-equipos {
          margin: 0 25px 25px;
          border: 1px solid #e1e8e3;
          border-radius: 10px;
          overflow: hidden;
        }

        .lista-titulo {
          background: #f7faf8;
          padding: 15px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lista-titulo h3 {
          margin: 0;
          color: #066b2d;
          font-size: 16px;
        }

        .lista-titulo span {
          background: #0a8f3c;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .equipos-grid {
          padding: 15px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .equipo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: #f8fbf9;
          border: 1px solid #dce8df;
          border-radius: 9px;
          min-width: 0;
        }

        .equipo-icono {
          width: 42px;
          height: 42px;
          border-radius: 9px;
          background: #e3f2e8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .equipo-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
          overflow-wrap: anywhere;
        }

        .equipo-info strong, .equipo-info b {
          color: #066b2d;
        }

        .equipo-info span {
          color: #666;
          font-size: 12px;
        }

        .btn-quitar {
          border: none;
          background: #fdeaea;
          color: #c62828;
          padding: 7px 9px;
        }

        .sin-equipos {
          padding: 30px;
          text-align: center;
          color: #777;
        }

        .icono-caja {
          font-size: 30px;
          margin-bottom: 8px;
        }

        .sin-equipos p {
          margin: 0;
        }

        .total-seleccionado {
          padding: 16px 18px;
          background: #f0f8f2;
          border-top: 1px solid #dce8df;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #066b2d;
        }

        .informacion {
          margin: 0 25px 25px;
          padding: 15px;
          background: #f4faf5;
          border-left: 4px solid #0a8f3c;
          border-radius: 7px;
          color: #555;
          line-height: 1.5;
        }

        .acciones {
          padding: 0 25px 25px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .btn-calendario {
          background: white;
          color: #066b2d;
          border: 1px solid #0a8f3c;
        }

        .btn-registrar {
          background: #0a8f3c;
          color: white;
          border: 1px solid #0a8f3c;
        }

        .btn-registrar:hover {
          background: #066b2d;
        }

        .mensaje {
          margin: 0 25px 25px;
          padding: 13px;
          background: #d8f3df;
          color: #167333;
          border-radius: 7px;
          text-align: center;
          font-weight: bold;
        }

        .prestamos-header {
          padding: 22px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #e1e8e3;
        }

        .prestamos-header h2 {
          margin: 0;
          color: #066b2d;
          font-size: 22px;
        }

        .prestamos-header p {
          margin: 6px 0 0;
          color: #666;
          font-size: 14px;
        }

        .contador {
          background: #fff1df;
          color: #c65d00;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          white-space: nowrap;
        }

        .sin-prestamos {
          padding: 40px 20px;
          text-align: center;
        }

        .sin-icono {
          width: 55px;
          height: 55px;
          margin: auto;
          border-radius: 50%;
          background: #d8f3df;
          color: #16813b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }

        .sin-prestamos h3 {
          margin: 15px 0 5px;
        }

        .sin-prestamos p {
          margin: 0;
          color: #777;
        }

        .prestamos-lista {
          padding: 20px;
          display: grid;
          gap: 18px;
        }

        .prestamo-card {
          border: 1px solid #dfe8e2;
          border-radius: 11px;
          overflow: hidden;
        }

        .prestamo-top {
          padding: 17px 20px;
          background: #f7faf8;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .prestamo-top h3 {
          margin: 0;
        }

        .prestamo-top p {
          margin: 5px 0 0;
          color: #777;
          font-size: 13px;
        }

        .estado {
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
        }

        .estado.prestado {
          background: #fff1df;
          color: #c65d00;
        }

        .estado.vencido {
          background: #fde5e5;
          color: #c62828;
        }

        .datos-fecha {
          padding: 16px 20px;
          display: flex;
          gap: 45px;
          border-bottom: 1px solid #edf0ee;
          flex-wrap: wrap;
        }

        .datos-fecha div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .datos-fecha span {
          color: #888;
          font-size: 12px;
        }

        .datos-fecha strong {
          font-size: 14px;
        }

        .equipos-prestamo {
          padding: 18px 20px;
        }

        .equipos-prestamo h4 {
          margin: 0 0 12px;
          color: #066b2d;
        }

        .fila-equipo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 11px 0;
          border-bottom: 1px solid #edf0ee;
        }

        .fila-equipo:last-child {
          border-bottom: none;
        }

        .fila-equipo > div {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .placa {
          background: #edf2ef;
          color: #066b2d;
          padding: 5px 9px;
          border-radius: 5px;
          font-family: monospace;
          font-weight: bold;
        }

        .btn-devolver {
          background: #e6f3ea;
          color: #066b2d;
          border: 1px solid #b9d9c2;
          padding: 8px 12px;
          font-size: 12px;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .agregar-equipo {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .equipos-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .encabezado {
            padding: 24px 20px;
          }

          .contenido-encabezado {
            flex-direction: column;
            align-items: flex-start;
          }

          .contenedor {
            width: 94%;
          }

          .formulario, .agregar-equipo {
            grid-template-columns: 1fr;
            padding: 20px;
          }

          .lista-equipos {
            margin: 0 15px 20px;
          }

          .informacion {
            margin: 0 15px 20px;
          }

          .acciones {
            flex-direction: column;
            padding: 0 20px 20px;
          }

          .acciones button {
            width: 100%;
          }

          .prestamos-header, .prestamo-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .datos-fecha {
            flex-direction: column;
            gap: 12px;
          }

          .fila-equipo {
            align-items: flex-start;
            flex-direction: column;
          }

          .btn-devolver {
            width: 100%;
          }

          .total-seleccionado {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
