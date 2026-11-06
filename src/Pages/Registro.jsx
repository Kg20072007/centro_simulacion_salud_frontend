import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Registro() {

  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    correo: "",
    password: "",
    rol: "Aprendiz",
  });

  const cambiar = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registrar = (e) => {
    e.preventDefault();

    register(form);

    alert("Registro realizado correctamente.");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card register-card"
        onSubmit={registrar}
      >

        <div className="auth-icon">
          📝
        </div>

        <h2>Crear cuenta</h2>

        <p>
          Regístrate en el Centro de Simulación
        </p>

        <div className="form-row">

          <div>
            <label>Nombres</label>

            <input
              name="nombres"
              value={form.nombres}
              onChange={cambiar}
              required
            />
          </div>

          <div>
            <label>Apellidos</label>

            <input
              name="apellidos"
              value={form.apellidos}
              onChange={cambiar}
              required
            />
          </div>

        </div>

        <label>Identificación</label>

        <input
          name="identificacion"
          value={form.identificacion}
          onChange={cambiar}
          required
        />

        <label>Correo electrónico</label>

        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={cambiar}
          required
        />

        <label>Contraseña</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={cambiar}
          required
        />

        <label>Rol</label>

        <select
          name="rol"
          value={form.rol}
          onChange={cambiar}
        >
          <option>Aprendiz</option>
          <option>Instructor</option>
          <option>Administrador</option>
        </select>

        <button className="primary-button full">
          Crear cuenta
        </button>

        <p className="register-text">
          ¿Ya tienes cuenta?
          <Link to="/login">
            {" "}Iniciar sesión
          </Link>
        </p>

      </form>

    </div>
  );
}