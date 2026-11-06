import React from 'react';

// Componente principal de la vista de Guía de Equipos Biomédicos
export default function GuiaEquiposBiomedicos() {
  return (
    <>
      {/* 
        -------------------------------------------------------------
        HEADER DE LA PÁGINA
        Aquí va el logo del SENA, el título del centro de simulación
        y la tarjeta del usuario logueado.
        -------------------------------------------------------------
      */}
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
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="../img/logo1.png" alt="Logo SENA" style={{ width: '55px' }} />
          <div>
            <h2 style={{ color: '#0b6b3a', fontSize: '24px' }}>Centro de Simulación</h2>
            <p style={{ fontSize: '13px', color: '#666' }}>Servicio Nacional de Aprendizaje SENA</p>
          </div>
        </div>

        {/* Info del usuario actual */}
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

      {/* 
        -------------------------------------------------------------
        SECCIÓN BANNER PRINCIPAL
        Aviso destacado de bienvenida con datos clave (duración, cupos, etc.)
        y la imagen representativa del módulo.
        -------------------------------------------------------------
      */}
      <section className="banner" style={{
        width: '92%',
        maxWidth: '1350px',
        margin: '35px auto',
        background: 'linear-gradient(rgba(11,107,58,.88),rgba(11,107,58,.88)), url("../img/biomedicos.jpg")',
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
        <div className="banner-texto" style={{ flex: 1 }}>
          <h1 style={{ fontSize: '48px', marginBottom: '18px' }}>🩺 Guía de Equipos Biomédicos</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.8, maxWidth: '650px', marginBottom: '25px' }}>
            Esta guía orienta al aprendiz en el reconocimiento, uso adecuado,
            cuidado y verificación de los equipos biomédicos utilizados en
            las prácticas de simulación clínica del Centro de Simulación.
          </p>

          {/* Badges de información rápida sobre la práctica */}
          <div className="info-banner" style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>⏱ 30 Minutos</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>👥 20 Aprendices</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>🏥 Ambiente Clínico</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>⭐ Nivel Básico</div>
          </div>
        </div>

        <img src="../img/equipos biomedicos.jpg" alt="Equipos Biomédicos" style={{ width: '360px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.25)' }} />
      </section>

      {/* 
        -------------------------------------------------------------
        ACCESOS RÁPIDOS / TARJETAS
        Puntos clave para la navegación directa de los contenidos.
        -------------------------------------------------------------
      */}
      <section className="tarjetas" style={{
        width: '92%',
        maxWidth: '1350px',
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>🎯</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Objetivos</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Conozca las competencias y resultados de aprendizaje
            relacionados con el manejo de equipos biomédicos.
          </p>
        </div>

        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>🩺</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Equipos</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Identifique los principales equipos biomédicos disponibles
            en el Centro de Simulación.
          </p>
        </div>

        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>📋</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Procedimiento</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Consulte las recomendaciones para utilizar correctamente
            los equipos durante las prácticas.
          </p>
        </div>

        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>⚠️</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Recomendaciones</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Conozca las normas de seguridad, limpieza y cuidado
            de los equipos biomédicos.
          </p>
        </div>
      </section>

      {/* 
        -------------------------------------------------------------
        CONTENEDOR DE SECCIONES DETALLADAS
        Agrupa el resto del contenido teórico y práctico del módulo.
        -------------------------------------------------------------
      */}
      <div className="contenedor" style={{ width: '92%', maxWidth: '1350px', margin: 'auto' }}>
        
        {/* Bloque: Objetivos, Competencias y Resultados */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🎯 Objetivos de la Guía</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La guía de equipos biomédicos tiene como propósito fortalecer los conocimientos
            del aprendiz sobre la identificación, funcionamiento, manejo, limpieza y cuidado
            de los equipos utilizados durante las prácticas de simulación clínica.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>✔ Objetivo General</h3>
              <p>
                Desarrollar las competencias necesarias para utilizar correctamente los equipos
                biomédicos del Centro de Simulación, aplicando normas de seguridad y protocolos
                establecidos.
              </p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>📚 Competencias</h3>
              <ul style={{ paddingLeft: '18px', lineHeight: 2, color: '#555' }}>
                <li>Identificar los equipos biomédicos.</li>
                <li>Conocer su funcionamiento básico.</li>
                <li>Utilizar correctamente cada equipo.</li>
                <li>Aplicar normas de bioseguridad.</li>
                <li>Realizar limpieza y desinfección.</li>
              </ul>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>🎓 Resultado Esperado</h3>
              <p>
                Al finalizar la guía, el aprendiz podrá reconocer los principales equipos
                biomédicos, utilizarlos de manera adecuada y reportar cualquier anomalía
                detectada durante la práctica.
              </p>
            </div>
          </div>
        </section>

        {/* Bloque: Catálogo de Equipos Biomédicos Disponibles */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🩺 Principales Equipos Biomédicos</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
            {/* Monitor de signos vitales */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>❤️</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Monitor de Signos Vitales</h3>
              <p>Equipo utilizado para realizar el seguimiento de parámetros como presión arterial, frecuencia cardíaca, temperatura y saturación de oxígeno.</p>
            </div>

            {/* Desfibrilador */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>⚡</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Desfibrilador</h3>
              <p>Equipo utilizado en situaciones de emergencia para administrar una descarga eléctrica controlada cuando está indicado.</p>
            </div>

            {/* Ventilador Mecánico */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🫁</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Ventilador Mecánico</h3>
              <p>Equipo que proporciona soporte respiratorio mediante la administración controlada de aire y oxígeno.</p>
            </div>

            {/* Bomba de Infusión */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>💉</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Bomba de Infusión</h3>
              <p>Permite administrar líquidos o medicamentos de forma controlada mediante parámetros previamente establecidos.</p>
            </div>

            {/* Oxímetro */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>📟</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Oxímetro de Pulso</h3>
              <p>Dispositivo utilizado para medir la saturación de oxígeno en la sangre y la frecuencia del pulso.</p>
            </div>

            {/* Electrocardiógrafo */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>📈</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Electrocardiógrafo</h3>
              <p>Equipo utilizado para registrar la actividad eléctrica del corazón mediante electrodos colocados sobre el paciente.</p>
            </div>

            {/* Tensiómetro */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🩸</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Tensiómetro</h3>
              <p>Instrumento utilizado para medir la presión arterial del paciente durante la valoración clínica.</p>
            </div>

            {/* Termómetro */}
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🌡️</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Termómetro</h3>
              <p>Dispositivo utilizado para determinar la temperatura corporal del paciente.</p>
            </div>
          </div>
        </section>

        {/* Bloque: Bioseguridad y elementos de protección EPP */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🧤 Elementos de Protección y Seguridad</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Antes de utilizar cualquier equipo biomédico, el aprendiz debe cumplir
            las medidas de bioseguridad establecidas para proteger al paciente simulado,
            al personal y los equipos utilizados durante la práctica.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧤</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Guantes</h3>
              <p>Utilizar cuando el procedimiento o protocolo lo requiera.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>😷</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Tapabocas</h3>
              <p>Utilizar de acuerdo con las condiciones y protocolos de la práctica.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧼</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Higiene de Manos</h3>
              <p>Realizar higiene de manos antes y después del contacto con los equipos.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧴</div>
              <h3 style={{ color: '#0b6b3a', margin: '15px 0' }}>Desinfección</h3>
              <p>Limpiar y desinfectar los equipos siguiendo las indicaciones institucionales.</p>
            </div>
          </div>
        </section>

        {/* Bloque: Paso a paso para operar los equipos */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>📋 Procedimiento para el Uso de Equipos Biomédicos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Higiene de manos</h3>
              <p style={{ marginTop: '10px' }}>Realizar la higiene de manos antes de manipular los equipos biomédicos, siguiendo las medidas de bioseguridad establecidas para la práctica.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Identificación del equipo</h3>
              <p style={{ marginTop: '10px' }}>Identificar el equipo que será utilizado y verificar que corresponda con el procedimiento que se va a realizar.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Inspección visual</h3>
              <p style={{ marginTop: '10px' }}>Revisar que el equipo no presente golpes, cables deteriorados, conectores dañados, piezas faltantes u otras condiciones que puedan afectar su funcionamiento.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Verificación del funcionamiento</h3>
              <p style={{ marginTop: '10px' }}>Encender el equipo cuando corresponda y comprobar que la pantalla, indicadores, sensores, alarmas y demás componentes funcionen correctamente.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑤ Preparación para la práctica</h3>
              <p style={{ marginTop: '10px' }}>Ubicar el equipo en un lugar seguro y preparar los accesorios necesarios para desarrollar la práctica de simulación.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑥ Uso adecuado</h3>
              <p style={{ marginTop: '10px' }}>Utilizar el equipo de acuerdo con las instrucciones del fabricante, los protocolos institucionales y las indicaciones del instructor.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑦ Limpieza y desinfección</h3>
              <p style={{ marginTop: '10px' }}>Después de finalizar la práctica, realizar la limpieza y desinfección del equipo utilizando los productos y procedimientos establecidos.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑧ Registro y reporte</h3>
              <p style={{ marginTop: '10px' }}>Registrar el uso del equipo y reportar inmediatamente cualquier daño, falla o anomalía encontrada durante la práctica.</p>
            </div>
          </div>
        </section>

        {/* Bloque: Tabla resumen con checklist del estado de los equipos */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>✅ Lista de Verificación de Equipos</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Antes de iniciar una práctica, verifique cada uno de los siguientes
            aspectos y registre las novedades encontradas.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '750px' }}>
              <tbody>
                <tr style={{ background: '#0b6b3a', color: 'white' }}>
                  <th style={{ padding: '15px' }}>Equipo</th>
                  <th style={{ padding: '15px' }}>Estado físico</th>
                  <th style={{ padding: '15px' }}>Funcionamiento</th>
                  <th style={{ padding: '15px' }}>Accesorios</th>
                  <th style={{ padding: '15px' }}>Observaciones</th>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Monitor de Signos Vitales</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Completo</td>
                  <td>Sin novedades.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Desfibrilador</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Completo</td>
                  <td>Batería disponible.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Ventilador Mecánico</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Completo</td>
                  <td>Sin novedades.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Bomba de Infusión</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Completo</td>
                  <td>Lista para práctica.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Oxímetro de Pulso</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Completo</td>
                  <td>Lectura disponible.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Electrocardiógrafo</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Correcto</td>
                  <td style={{ textAlign: 'center' }}>☑ Completo</td>
                  <td>Electrodos disponibles.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bloque: Recomendaciones generales y buenas prácticas */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>⚠️ Recomendaciones</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🧼 Limpieza</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Mantenga los equipos limpios y desinfectados después de cada práctica, siguiendo las indicaciones institucionales.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⚡ Seguridad</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>No utilice equipos que presenten daños visibles, cables deteriorados o fallas en su funcionamiento. Informe inmediatamente al instructor.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🔌 Conexiones</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Revise las conexiones eléctricas y accesorios antes de utilizar cualquier equipo.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>📦 Almacenamiento</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Después de utilizar los equipos, guárdelos en el lugar asignado para evitar daños o pérdidas.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>📝 Registro</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Registre el uso, estado y cualquier novedad relacionada con los equipos biomédicos.</p>
            </div>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>👨‍🏫 Supervisión</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Siga siempre las instrucciones del instructor durante las prácticas de simulación clínica.</p>
            </div>
          </div>
        </section>

        {/* Bloque: Nota de recordatorio sobre la responsabilidad */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>💚 Importancia del Cuidado de los Equipos</h2>
          <p style={{ lineHeight: 1.8, color: '#555', marginBottom: '20px' }}>
            El correcto cuidado de los equipos biomédicos permite conservar su
            funcionalidad, prolongar su vida útil y garantizar que se encuentren
            disponibles para las actividades de formación del Centro de Simulación.
          </p>
          <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
            <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>📌 Recuerde</h3>
            <p style={{ lineHeight: 1.8 }}>
              Cada equipo debe ser utilizado de manera responsable. Si identifica
              una falla, daño o comportamiento inusual, suspenda su utilización
              y comuníquelo al instructor o responsable del Centro de Simulación.
            </p>
          </div>
        </section>

        {/* 
          -------------------------------------------------------------
          LLAMADO A LA ACCIÓN / NAVEGACIÓN DE SALIDA
          Botones finales para redirigir o iniciar la simulación.
          -------------------------------------------------------------
        */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🚀 Continuar con la Simulación</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Ha finalizado la lectura de la guía de equipos biomédicos.
            Ahora puede regresar al módulo de servicios o continuar con la
            práctica de reconocimiento y manejo de equipos.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
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

            <a href="../Practicas/equipos_biomedicos.html" style={{ textDecoration: 'none' }}>
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

      {/* 
        -------------------------------------------------------------
        FOOTER
        Pie de página estándar institucional.
        -------------------------------------------------------------
      */}
      <footer style={{
        background: '#0b6b3a',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px'
      }}>
        © 2026 Centro de Simulación Clínica - SENA |
        Guía de Equipos Biomédicos
      </footer>
    </>
  );
}