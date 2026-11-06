
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Guias.css";

const practicas = [
  {
    id: 1,
    nombre: "Desinfección",
    icono: "🧼",
    categoria: "Bioseguridad",
    resumen: "Practica los principios de limpieza y desinfección.",
    ruta: "/practica/desinfeccion",
  },
  {
    id: 2,
    nombre: "Equipos biomédicos",
    icono: "🏥",
    categoria: "Equipos",
    resumen: "Reconoce los equipos y sus funciones principales.",
    ruta: "/practica/biomedicos",
  },
  {
    id: 3,
    nombre: "Farmacia",
    icono: "💊",
    categoria: "Medicamentos",
    resumen: "Refuerza los conocimientos sobre medicamentos.",
    ruta: "/practica/farmacia",
  },
  {
    id: 4,
    nombre: "Geriatría",
    icono: "👴",
    categoria: "Cuidado",
    resumen: "Practica conceptos de cuidado del adulto mayor.",
    ruta: "/practica/geriatria",
  },
  {
    id: 5,
    nombre: "Laboratorio",
    icono: "🔬",
    categoria: "Procedimientos",
    resumen: "Repasa el manejo de muestras y la bioseguridad.",
    ruta: "/practica/laboratorio",
  },
  {
    id: 6,
    nombre: "Sistema de monitoreo",
    icono: "📊",
    categoria: "Monitoreo",
    resumen: "Refuerza el reconocimiento y seguimiento de parámetros.",
    ruta: "/practica/monitoreo",
  },
  {
    id: 7,
    nombre: "Atención prehospitalaria",
    icono: "🚑",
    categoria: "Emergencias",
    resumen: "Repasa la atención inicial en situaciones de emergencia.",
    ruta: "/practica/prehospitalaria",
  },
  {
    id: 8,
    nombre: "Reanimación cardiopulmonar (RCP)",
    icono: "❤️",
    categoria: "Emergencias",
    resumen: "Refuerza los conceptos de respuesta ante una emergencia.",
    ruta: "/practica/rcp",
  },
  {
    id: 9,
    nombre: "Registro y retroalimentación",
    icono: "📝",
    categoria: "Evaluación",
    resumen: "Revisa los resultados y las oportunidades de mejora.",
    ruta: "/practica/retroalimentacion",
  },
  {
    id: 10,
    nombre: "Signos vitales",
    icono: "🌡️",
    categoria: "Valoración",
    resumen: "Practica el registro de los signos vitales.",
    ruta: "/practica/signos-vitales",
  },
];

export default function Evaluaciones() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const categorias = [
    "Todas",
    ...new Set(practicas.map((practica) => practica.categoria)),
  ];

  const filtradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return practicas.filter((practica) => {
      const coincideTexto =
        practica.nombre.toLowerCase().includes(texto) ||
        practica.resumen.toLowerCase().includes(texto);

      const coincideCategoria =
        categoria === "Todas" || practica.categoria === categoria;

      return coincideTexto && coincideCategoria;
    });
  }, [busqueda, categoria]);

  return (
    <section className="guias-page">
      <header className="guias-hero">
        <div>
          <span className="guias-eyebrow">
            CENTRO DE SIMULACIÓN · SENA
          </span>

          <h1>Prácticas y evaluaciones 🩺</h1>

          <p>
            Selecciona una práctica para fortalecer tus competencias
            y poner a prueba tus conocimientos.
          </p>
        </div>

        <div className="guias-hero-icon" aria-hidden="true">
          🎓
        </div>
      </header>

      <div className="guias-resumen">
        <div>
          <strong>{practicas.length}</strong>
          <span>Prácticas registradas</span>
        </div>

        <div>
          <strong>🧠</strong>
          <span>Aprendizaje práctico</span>
        </div>

        <div>
          <strong>📋</strong>
          <span>Refuerzo de competencias</span>
        </div>
      </div>

      <div className="guias-filtros">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔎 Buscar una práctica..."
          aria-label="Buscar prácticas"
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          {categorias.map((item) => (
            <option key={item} value={item}>
              {item === "Todas" ? "Todas las categorías" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="guias-grid">
        {filtradas.map((practica) => (
          <article className="guia-card" key={practica.id}>
            <div className="guia-card-top">
              <span className="guia-icon" aria-hidden="true">
                {practica.icono}
              </span>

              <span className="guia-categoria">
                {practica.categoria}
              </span>
            </div>

            <h2>{practica.nombre}</h2>
            <p>{practica.resumen}</p>

            <button
              type="button"
              className="guia-boton"
              onClick={() => navigate(practica.ruta)}
            >
              Iniciar práctica →
            </button>
          </article>
        ))}

        {filtradas.length === 0 && (
          <div className="guias-vacio">
            <span>🔍</span>
            <h3>No encontramos esa práctica</h3>
            <p>Prueba otro término o selecciona otra categoría.</p>

            <button
              type="button"
              className="guia-boton"
              onClick={() => {
                setBusqueda("");
                setCategoria("Todas");
              }}
            >
              Mostrar todas
            </button>
          </div>
        )}
      </div>

      <footer className="pie-listado">
        <button
          type="button"
          className="guia-secundario"
          onClick={() => navigate("/guias")}
        >
          ← Volver a las guías
        </button>
      </footer>
    </section>
  );
}
