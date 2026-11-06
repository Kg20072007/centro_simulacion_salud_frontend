
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import CrearCuenta from "./Pages/Crear_cuenta";
import Recuperar from "./Pages/Recuperar";
import Dashboard from "./Pages/Dashboard";
import Acerca from "./Pages/Acerca";
import Contacto from "./Pages/Contacto";
import Servicios from "./Pages/Servicios";
import Ambientes from "./Pages/Ambientes";
import Equipos from "./Pages/Equipos";
import Inventario from "./Pages/Inventario";
import EstadoInventario from "./Pages/Estado_Inventario";
import RegistroInventario from "./Pages/Registro_Inventario";
import Cronograma from "./Pages/Cronograma";
import Evaluaciones from "./Pages/Evaluaciones";
import Guias from "./Pages/Guias";
import Notificaciones from "./Pages/Notificaciones";
import MiPerfil from "./Pages/Miperfil";
import Reportes from "./Pages/Reportes";
import Ajustes from "./Pages/Ajustes";
import Simulaciones from "./Pages/Simulaciones";
import Usuarios from "./Pages/Usuarios";

import DashboardLayout from "./Layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/crear-cuenta" element={<CrearCuenta />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/acerca" element={<Acerca />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/servicios" element={<Servicios />} />

      {/* Panel */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ambientes" element={<Ambientes />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route
          path="/estado-inventario"
          element={<EstadoInventario />}
        />
        <Route
          path="/registro-inventario"
          element={<RegistroInventario />}
        />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/evaluaciones" element={<Evaluaciones />} />
        <Route path="/guias" element={<Guias />} />
        <Route
          path="/notificaciones"
          element={<Notificaciones />}
        />
        <Route path="/mi-perfil" element={<MiPerfil />} />
        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/simulaciones" element={<Simulaciones />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>

      {/* Rutas inexistentes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
