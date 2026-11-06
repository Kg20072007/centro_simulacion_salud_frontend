import React from 'react';

/**
 * Componente principal: GuiaManejoMedicamentos
 * Renderiza la interfaz completa de la guía de manejo seguro de medicamentos
 * para el Centro de Simulación del SENA.
 */
export default function GuiaManejoMedicamentos() {
  return (
    <>
      {/* =========================================================
        1. HEADER / ENCABEZADO FIJO
        ========================================================= */}
      <header style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 50px',
        boxShadow: '0 4px 15px rgba(0,0,0,.08)',
        position: 'sticky',
        top: 0,
        zIndex: 999
      }}>
        {/* Contenedor del logotipo y títulos institucionales */}
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Logo oficial del SENA */}
          <img src="../img/logo1.png" alt="Logo SENA" style={{ width: '55px' }} />
          <div>
            <h2 style={{ color: '#0b6b3a', fontSize: '24px' }}>Centro de Simulación</h2>
            <p style={{ fontSize: '13px', color: '#666' }}>Servicio Nacional de Aprendizaje SENA</p>
          </div>
        </div>

        {/* Tarjeta de identificación del usuario / aprendiz en sesión */}
        <div className="usuario" style={{
          background: '#eef8f1',
          padding: '10px 18px',
          borderRadius: '30px',
          fontWeight: 600,
          color: '#0b6b3a'
        }}>
          👤 Estudiante / Angie Gomez
        </div>
      </header>

      {/* =========================================================
        2. BANNER PRINCIPAL DE LA GUÍA
        ========================================================= */}
      <section className="banner" style={{
        width: '92%',
        maxWidth: '1350px',
        margin: '35px auto',
        background: 'linear-gradient(rgba(11,107,58,.88),rgba(11,107,58,.88)), url("../img/farmacia.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '22px',
        padding: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        color: 'white'
      }}>
        {/* Columna de texto principal e información metadato */}
        <div className="banner-texto" style={{ flex: 1 }}>
          <h1 style={{ fontSize: '48px', marginBottom: '18px' }}>💊 Guía de Manejo Seguro de Medicamentos</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.8, maxWidth: '650px', marginBottom: '25px' }}>
            Esta guía orienta al aprendiz en los principios básicos para la
            recepción, almacenamiento, identificación, preparación y manejo
            seguro de medicamentos dentro de las actividades de simulación clínica.
          </p>

          {/* Insignias de información rápida (tiempo, aforo, entorno, nivel) */}
          <div className="info-banner" style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>⏱ 30 Minutos</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>👥 20 Aprendices</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>🏥 Ambiente Clínico</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>⭐ Nivel Básico</div>
          </div>
        </div>

        {/* Imagen ilustrativa lateral del banner */}
        <img src="../img/regencia farmacia.jpg" alt="Farmacia y medicamentos" style={{ width: '360px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.25)' }} />
      </section>

      {/* =========================================================
        3. TARJETAS DE ACCESO RÁPIDO (GRID DE NAVEGACIÓN)
        ========================================================= */}
      <section className="tarjetas" style={{
        width: '92%',
        maxWidth: '1350px',
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        {/* Tarjeta 1: Objetivos */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>🎯</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Objetivos</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Conozca los objetivos y competencias relacionadas con el manejo
            seguro de medicamentos.
          </p>
        </div>

        {/* Tarjeta 2: Medicamentos */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>💊</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Medicamentos</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Identifique los principales tipos y presentaciones de medicamentos
            utilizados durante la simulación.
          </p>
        </div>

        {/* Tarjeta 3: Almacenamiento */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>📦</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Almacenamiento</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Conozca las condiciones básicas para conservar adecuadamente
            los medicamentos.
          </p>
        </div>

        {/* Tarjeta 4: Seguridad */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>⚠️</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Seguridad</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Reconozca las recomendaciones de seguridad para prevenir errores
            durante el manejo de medicamentos.
          </p>
        </div>
      </section>

      {/* =========================================================
        4. CONTENEDOR PRINCIPAL DE SECCIONES EDUCATIVAS
        ========================================================= */}
      <div className="contenedor" style={{ width: '92%', maxWidth: '1350px', margin: 'auto' }}>
        
        {/* SECCIÓN: Objetivos y Competencias */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🎯 Objetivos del Manejo de Medicamentos</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La práctica de farmacia tiene como propósito fortalecer las competencias
            del aprendiz relacionadas con el manejo seguro de medicamentos, promoviendo
            la correcta identificación, organización, almacenamiento y preparación
            durante las actividades de simulación clínica.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            {/* Subbloque: Objetivo General */}
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>✔ Objetivo General</h3>
              <p>Desarrollar habilidades para realizar un manejo seguro y organizado de los medicamentos utilizados durante las prácticas de simulación.</p>
            </div>

            {/* Subbloque: Competencias */}
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>📚 Competencias</h3>
              <ul style={{ paddingLeft: '18px', lineHeight: 2, color: '#555' }}>
                <li>Identificar correctamente los medicamentos.</li>
                <li>Verificar la información de los productos.</li>
                <li>Organizar adecuadamente los medicamentos.</li>
                <li>Aplicar medidas de seguridad.</li>
                <li>Realizar registros correctamente.</li>
              </ul>
            </div>

            {/* Subbloque: Resultado Esperado */}
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>🎓 Resultado Esperado</h3>
              <p>Al finalizar la práctica, el aprendiz será capaz de reconocer, organizar y manipular medicamentos de manera segura, siguiendo las indicaciones del instructor y los protocolos institucionales.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Tipos de Medicamentos y Presentaciones */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>💊 Medicamentos y Presentaciones</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Los medicamentos pueden presentarse en diferentes formas farmacéuticas.
            Durante la simulación, el aprendiz debe reconocer sus características
            y verificar siempre la información correspondiente antes de utilizarlos.
          </p>

          {/* Cuadrícula de formas farmacéuticas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>💊</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Tabletas</h3>
              <p>Forma sólida de administración oral utilizada en diferentes tratamientos.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>💉</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Inyectables</h3>
              <p>Presentaciones líquidas destinadas a diferentes vías de administración según la indicación correspondiente.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧴</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Soluciones</h3>
              <p>Preparaciones líquidas que deben conservarse y utilizarse de acuerdo con las indicaciones establecidas.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧪</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Suspensiones</h3>
              <p>Preparaciones líquidas que requieren atención a las instrucciones de conservación y administración.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧴</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Cremas y Geles</h3>
              <p>Preparaciones destinadas principalmente para aplicación sobre la piel.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>💧</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Gotas</h3>
              <p>Presentaciones líquidas administradas mediante gotas según la indicación correspondiente.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Almacenamiento de Medicamentos */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>📦 Almacenamiento de Medicamentos</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            El almacenamiento adecuado permite conservar las condiciones
            establecidas para cada medicamento y facilita su identificación
            y control dentro del área de farmacia.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Organización</h3>
              <p style={{ marginTop: '10px' }}>Mantener los medicamentos organizados y ubicados en los espacios correspondientes para facilitar su identificación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Temperatura</h3>
              <p style={{ marginTop: '10px' }}>Conservar los medicamentos de acuerdo con las condiciones de temperatura indicadas en su etiqueta o ficha técnica.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Protección de la luz</h3>
              <p style={{ marginTop: '10px' }}>Proteger aquellos medicamentos que requieran condiciones específicas de iluminación según las indicaciones del fabricante.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Control de fechas</h3>
              <p style={{ marginTop: '10px' }}>Verificar periódicamente las fechas de vencimiento y separar los productos que no puedan utilizarse.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑤ Seguridad</h3>
              <p style={{ marginTop: '10px' }}>Mantener los medicamentos en lugares seguros y evitar el acceso de personas no autorizadas.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Verificación del Medicamento */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🔎 Verificación del Medicamento</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Antes de cualquier actividad de preparación o administración simulada,
            se debe verificar cuidadosamente la información del medicamento.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>💊 Nombre</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Confirmar el nombre del medicamento y evitar confundirlo con productos de nombres similares.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>📏 Concentración</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Verificar la concentración indicada en el empaque o etiqueta del medicamento.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>📅 Fecha de Vencimiento</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Comprobar que el medicamento se encuentre dentro de su fecha de vencimiento antes de utilizarlo.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>📦 Estado del Empaque</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Revisar que el empaque se encuentre íntegro, correctamente cerrado y sin señales de deterioro.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Elementos de Protección Personal (EPP) */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🧤 Elementos de Protección y Seguridad</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Utilice los elementos de protección personal establecidos por el
            protocolo institucional y de acuerdo con las características
            de la actividad que se esté realizando.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧤</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Guantes</h3>
              <p>Utilizarlos cuando el procedimiento o protocolo de bioseguridad lo requiera.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🥼</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Bata</h3>
              <p>Elemento de protección utilizado durante las actividades realizadas en ambientes de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>😷</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Tapabocas</h3>
              <p>Su utilización dependerá del protocolo institucional y de las condiciones de la práctica.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧼</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Higiene de Manos</h3>
              <p>Realizar higiene de manos antes y después de las actividades según las indicaciones institucionales.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Preparación Antes de la Práctica */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>📋 Preparación Antes de la Práctica</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Higiene de manos</h3>
              <p style={{ marginTop: '10px' }}>Realizar higiene de manos antes de iniciar la actividad.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Revisar el área</h3>
              <p style={{ marginTop: '10px' }}>Verificar que el espacio de trabajo se encuentre limpio, organizado y libre de elementos innecesarios.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Identificar los medicamentos</h3>
              <p style={{ marginTop: '10px' }}>Revisar nombre, presentación, concentración, fecha de vencimiento y estado del empaque.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Preparar los materiales</h3>
              <p style={{ marginTop: '10px' }}>Organizar los materiales necesarios para desarrollar la actividad de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑤ Seguir las instrucciones</h3>
              <p style={{ marginTop: '10px' }}>Escuchar las indicaciones del instructor antes de comenzar cualquier procedimiento con medicamentos.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Procedimiento Paso a Paso */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>📋 Procedimiento de Manejo Seguro de Medicamentos</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Higiene de manos</h3>
              <p style={{ marginTop: '10px' }}>Realizar higiene de manos antes de iniciar la actividad y seguir las medidas de bioseguridad establecidas para el ambiente de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Verificación de la orden</h3>
              <p style={{ marginTop: '10px' }}>En una actividad de simulación, verificar la información disponible y seguir las indicaciones proporcionadas por el instructor antes de realizar cualquier procedimiento.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Identificación del medicamento</h3>
              <p style={{ marginTop: '10px' }}>Comprobar el nombre del medicamento, presentación, concentración, fecha de vencimiento y estado del empaque.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Verificación del paciente simulado</h3>
              <p style={{ marginTop: '10px' }}>Confirmar la identidad del paciente simulado de acuerdo con las instrucciones de la práctica y los protocolos establecidos.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑤ Revisar la información del medicamento</h3>
              <p style={{ marginTop: '10px' }}>Comparar la información disponible del medicamento con la indicada en el escenario de simulación antes de continuar con la actividad.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑥ Preparar los materiales</h3>
              <p style={{ marginTop: '10px' }}>Organizar los materiales necesarios y mantener el área de trabajo limpia y ordenada durante todo el procedimiento.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑦ Realizar la simulación</h3>
              <p style={{ marginTop: '10px' }}>Desarrollar el procedimiento indicado por el instructor siguiendo las técnicas de seguridad y las normas establecidas para la práctica.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑧ Registrar la actividad</h3>
              <p style={{ marginTop: '10px' }}>Registrar los datos correspondientes a la práctica en el formato establecido por el Centro de Simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑨ Organizar los medicamentos</h3>
              <p style={{ marginTop: '10px' }}>Una vez finalizada la actividad, devolver los medicamentos y materiales al lugar asignado, manteniendo el área organizada.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑩ Finalizar la práctica</h3>
              <p style={{ marginTop: '10px' }}>Realizar higiene de manos, verificar el estado del área y comunicar al instructor cualquier novedad presentada durante la actividad.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Lista de Verificación / Checklist */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>✅ Lista de Verificación</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Utilice esta lista para comprobar que las actividades principales
            del manejo seguro de medicamentos fueron realizadas correctamente.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '750px' }}>
              <tbody>
                <tr style={{ background: '#0b6b3a', color: 'white' }}>
                  <th style={{ padding: '15px' }}>Actividad</th>
                  <th style={{ padding: '15px' }}>Realizado</th>
                  <th style={{ padding: '15px' }}>Pendiente</th>
                  <th style={{ padding: '15px' }}>Observaciones</th>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Higiene de manos</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Procedimiento realizado.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Área de trabajo preparada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Área limpia y organizada.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Medicamento identificado</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Información verificada.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Fecha de vencimiento verificada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Sin novedades.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Estado del empaque verificado</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Empaque en buen estado.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Materiales preparados</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Material disponible.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Actividad registrada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Registro realizado.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Área organizada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Sin novedades.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN: Recomendaciones de Seguridad */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>⚠️ Recomendaciones de Seguridad</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🔎 Verifique siempre</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Compruebe cuidadosamente la información del medicamento antes de realizar cualquier actividad de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>📅 Revise el vencimiento</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>No utilice medicamentos vencidos. En la simulación, reporte cualquier producto que presente una fecha no válida.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>📦 Revise el empaque</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Verifique que el empaque se encuentre íntegro y que la información pueda ser identificada correctamente.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🚫 No administre sin indicación</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>No realice actividades de administración de medicamentos fuera de las indicaciones del instructor y del escenario de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🧼 Higiene</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Mantenga una adecuada higiene de manos antes y después de las actividades realizadas.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>👨‍🏫 Consulte al instructor</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Ante cualquier duda relacionada con el medicamento o el procedimiento, consulte al instructor antes de continuar.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Importancia del Manejo Seguro */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>💚 Importancia del Manejo Seguro</h2>
          <p style={{ lineHeight: 1.8, color: '#555', marginBottom: '20px' }}>
            El manejo seguro de medicamentos es fundamental para reducir errores,
            mantener la organización del área de farmacia y fortalecer las
            competencias del aprendiz durante las actividades de simulación clínica.
          </p>

          <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
            <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>📌 Recuerde</h3>
            <p style={{ lineHeight: 1.8 }}>
              En el Centro de Simulación los medicamentos utilizados durante las
              prácticas deben manejarse de acuerdo con las instrucciones del
              instructor y los protocolos institucionales. No realice procedimientos
              clínicos reales fuera de su competencia o autorización.
            </p>
          </div>
        </section>

        {/* =========================================================
        5. LLAMADO A LA ACCIÓN / NAVEGACIÓN DE SALIDA
        ========================================================= */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🚀 Continuar con la Simulación</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Ha finalizado la lectura de la guía de farmacia.
            Ahora puede regresar al módulo de servicios o continuar con
            la práctica de manejo seguro de medicamentos.
          </p>

          {/* Botones de redirección */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Botón para volver a servicios */}
            <a href="../servicios.html" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#ffffff',
                color: '#0b6b3a',
                border: '2px solid #0b6b3a',
                padding: '16px 35px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                ⬅️ Volver a Servicios
              </button>
            </a>

            {/* Botón para iniciar la práctica */}
            <a href="../Practicas/farmacia.html" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(90deg,#0b6b3a,#39a900)',
                color: 'white',
                border: 'none',
                padding: '16px 35px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                ▶️ Iniciar Práctica
              </button>
            </a>
          </div>
        </section>
      </div>

      {/* =========================================================
        6. FOOTER / PIE DE PÁGINA
        ========================================================= */}
      <footer style={{
        background: '#0b6b3a',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px'
      }}>
        © 2026 Centro de Simulación Clínica - SENA |
        Guía de Manejo Seguro de Medicamentos
      </footer>
    </>
  );
}