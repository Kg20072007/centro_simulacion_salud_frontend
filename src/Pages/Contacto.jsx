import Navbar from "../components/Navbar";

export default function Contacto() {
  return (
    <>
      <Navbar />

      <section className="page-section">

        <div className="section-title">
          <span>CONTACTO</span>
          <h1>Estamos para ayudarte</h1>
        </div>

        <div className="contact-grid">

          <div className="contact-info">

            <div>
              <span>📍</span>
              <h3>Ubicación</h3>
              <p>SENA Regional Cauca</p>
            </div>

            <div>
              <span>📧</span>
              <h3>Correo</h3>
              <p>centrosimulacion@sena.edu.co</p>
            </div>

            <div>
              <span>📞</span>
              <h3>Atención</h3>
              <p>Horario institucional SENA</p>
            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Mensaje enviado correctamente.");
              e.target.reset();
            }}
          >

            <input
              type="text"
              placeholder="Nombre completo"
              required
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              required
            />

            <textarea
              placeholder="Escribe tu mensaje..."
              required
            />

            <button className="primary-button">
              Enviar mensaje
            </button>

          </form>

        </div>

      </section>
    </>
  );
}