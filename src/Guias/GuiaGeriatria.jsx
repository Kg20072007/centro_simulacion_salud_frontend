import React from 'react';

/**
 * Componente principal: GuiaAtencionAdultoMayor
 * Renderiza la interfaz de la guía de atención integral al adulto mayor
 * para el Centro de Simulación del SENA.
 */
export default function GuiaAtencionAdultoMayor() {
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

        {/* Tarjeta de identificación de la usuaria / aprendiz en sesión */}
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
        background: 'linear-gradient(rgba(11,107,58,.88),rgba(11,107,58,.88)), url("../img/geriatria.jpg")',
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
          <h1 style={{ fontSize: '48px', marginBottom: '18px' }}>👵 Guía de Atención al Adulto Mayor</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.8, maxWidth: '650px', marginBottom: '25px' }}>
            Esta guía orienta al aprendiz en el desarrollo de habilidades básicas
            para la atención integral del adulto mayor, promoviendo un trato digno,
            seguro, humanizado y respetuoso durante las actividades de simulación
            clínica.
          </p>

          {/* Insignias de información rápida (tiempo, aforo, entorno, nivel) */}
          <div className="info-banner" style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>⏱ 40 Minutos</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>👥 20 Aprendices</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>🏥 Ambiente Clínico</div>
            <div style={{ background: 'rgba(255,255,255,.18)', padding: '15px 20px', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 600 }}>⭐ Nivel Básico</div>
          </div>
        </div>

        {/* Imagen ilustrativa lateral del banner */}
        <img src="../img/geriatria.jpg" alt="Atención al adulto mayor" style={{ width: '360px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.25)' }} />
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
            Conozca las competencias necesarias para brindar una atención
            adecuada al adulto mayor.
          </p>
        </div>

        {/* Tarjeta 2: Valoración */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>👵</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Valoración</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Aprenda los aspectos básicos de la valoración integral
            del adulto mayor.
          </p>
        </div>

        {/* Tarjeta 3: Cuidados */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>🩺</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Cuidados</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Identifique los principales cuidados durante la atención
            y acompañamiento del adulto mayor.
          </p>
        </div>

        {/* Tarjeta 4: Humanización */}
        <div className="card" style={{ background: 'white', padding: '35px', borderRadius: '18px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.08)', cursor: 'pointer' }}>
          <div className="icono" style={{ fontSize: '45px', marginBottom: '20px' }}>❤️</div>
          <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>Humanización</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>
            Fortalezca una atención basada en el respeto, la empatía,
            la comunicación y la dignidad.
          </p>
        </div>
      </section>

      {/* =========================================================
        4. CONTENEDOR PRINCIPAL DE SECCIONES EDUCATIVAS
        ========================================================= */}
      <div className="contenedor" style={{ width: '92%', maxWidth: '1350px', margin: 'auto' }}>
        
        {/* SECCIÓN: Objetivos y Competencias */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🎯 Objetivos de la Atención al Adulto Mayor</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La práctica de geriatría tiene como propósito fortalecer las
            competencias del aprendiz para brindar una atención integral,
            segura, humanizada y respetuosa al adulto mayor durante las
            actividades de simulación clínica.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            {/* Subbloque: Objetivo General */}
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>✔ Objetivo General</h3>
              <p>Desarrollar habilidades básicas para realizar una valoración y atención integral del adulto mayor, teniendo en cuenta sus necesidades físicas, emocionales y sociales.</p>
            </div>

            {/* Subbloque: Competencias */}
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>📚 Competencias</h3>
              <ul style={{ paddingLeft: '18px', lineHeight: 2, color: '#555' }}>
                <li>Brindar un trato digno y respetuoso.</li>
                <li>Identificar necesidades básicas.</li>
                <li>Realizar una valoración inicial.</li>
                <li>Promover la seguridad del adulto mayor.</li>
                <li>Aplicar medidas de prevención de riesgos.</li>
              </ul>
            </div>

            {/* Subbloque: Resultado Esperado */}
            <div style={{ background: '#f8fbf9', padding: '25px', borderLeft: '6px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>🎓 Resultado Esperado</h3>
              <p>Al finalizar la práctica, el aprendiz será capaz de reconocer las principales necesidades del adulto mayor y desarrollar acciones básicas de cuidado de manera segura y humanizada.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Características del Adulto Mayor */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>👵 Características del Adulto Mayor</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Durante el proceso de envejecimiento pueden presentarse cambios
            físicos, funcionales, psicológicos y sociales. Es importante
            reconocer las características individuales de cada persona y
            brindar una atención centrada en sus necesidades.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧓</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Cambios Físicos</h3>
              <p>Pueden presentarse cambios relacionados con la movilidad, la fuerza, los sentidos y otras funciones del organismo.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>🧠</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Aspectos Cognitivos</h3>
              <p>Es importante observar la orientación, comunicación y estado cognitivo durante la valoración.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>❤️</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Aspectos Emocionales</h3>
              <p>La escucha activa, la empatía y el respeto favorecen una atención humanizada.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '45px' }}>👨‍👩‍👧</div>
              <h3 style={{ margin: '15px 0', color: '#0b6b3a' }}>Aspectos Sociales</h3>
              <p>Se deben considerar las relaciones familiares, sociales y el entorno en el que se desenvuelve la persona.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Valoración Integral */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🩺 Valoración Integral</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La valoración integral permite identificar necesidades y posibles
            factores de riesgo. Durante la simulación, el aprendiz debe seguir
            las indicaciones del instructor y utilizar los instrumentos
            establecidos para cada actividad.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Identificación</h3>
              <p style={{ marginTop: '10px' }}>Confirmar la identidad del paciente simulado y establecer una comunicación clara antes de iniciar la valoración.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Estado general</h3>
              <p style={{ marginTop: '10px' }}>Observar el estado general, postura, movilidad, apariencia, nivel de conciencia y respuesta a la comunicación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Signos vitales</h3>
              <p style={{ marginTop: '10px' }}>Realizar la medición de los signos vitales que correspondan al escenario de simulación y registrar los resultados.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Movilidad</h3>
              <p style={{ marginTop: '10px' }}>Observar la capacidad de movimiento y desplazamiento, identificando posibles riesgos durante la movilización.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑤ Comunicación</h3>
              <p style={{ marginTop: '10px' }}>Utilizar un lenguaje claro, respetuoso y adecuado, permitiendo que el adulto mayor exprese sus necesidades.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Movilidad y Prevención de Caídas */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🚶 Movilidad y Prevención de Caídas</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La prevención de caídas es un aspecto importante durante la atención
            del adulto mayor. Se debe mantener un entorno seguro y prestar
            atención a las condiciones que puedan aumentar el riesgo.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>🛏️ Entorno seguro</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Mantener el área libre de obstáculos y verificar que los elementos necesarios se encuentren ubicados de manera segura.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>👟 Calzado</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Verificar que el calzado sea adecuado y que proporcione estabilidad durante la movilización.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>🦯 Ayudas para caminar</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Utilizar las ayudas de movilidad indicadas y enseñar su uso de acuerdo con las instrucciones del instructor.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
              <h3 style={{ color: '#0b6b3a' }}>⚠️ Acompañamiento</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Acompañar al adulto mayor durante las actividades de movilidad cuando exista riesgo de pérdida del equilibrio.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Alimentación e Hidratación */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🥗 Alimentación e Hidratación</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La alimentación y la hidratación forman parte del bienestar integral
            del adulto mayor. Durante la simulación se deben observar las
            indicaciones establecidas para cada caso.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)' }}>
              <h3 style={{ color: '#0b6b3a' }}>🍎 Alimentación</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Promover hábitos de alimentación adecuados de acuerdo con las necesidades y recomendaciones establecidas para cada persona.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)' }}>
              <h3 style={{ color: '#0b6b3a' }}>💧 Hidratación</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Observar la ingesta de líquidos y seguir las recomendaciones establecidas por el equipo de atención.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,.08)' }}>
              <h3 style={{ color: '#0b6b3a' }}>👀 Observación</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Identificar cambios o dificultades que puedan afectar la alimentación o hidratación y comunicarlos oportunamente.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Aspectos Cognitivos y Emocionales */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🧠 Aspectos Cognitivos y Emocionales</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            La atención al adulto mayor debe considerar no solamente los aspectos
            físicos, sino también sus necesidades emocionales, cognitivas y sociales.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>💬 Comunicación</h3>
              <p style={{ marginTop: '10px' }}>Hablar de manera clara, respetuosa y pausada, verificando que la persona comprenda la información proporcionada.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>❤️ Empatía</h3>
              <p style={{ marginTop: '10px' }}>Escuchar las necesidades del adulto mayor y mostrar respeto por sus decisiones, preferencias y sentimientos.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🧠 Orientación</h3>
              <p style={{ marginTop: '10px' }}>Durante la valoración se pueden observar aspectos relacionados con orientación y comunicación, de acuerdo con el escenario de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🤝 Trato Digno</h3>
              <p style={{ marginTop: '10px' }}>Garantizar privacidad, respeto y un trato humanizado durante todas las actividades de atención.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Preparación Antes de la Práctica */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>📋 Preparación Antes de la Práctica</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Preparar el ambiente</h3>
              <p style={{ marginTop: '10px' }}>Verificar que el espacio de simulación se encuentre limpio, organizado y libre de obstáculos.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Preparar los materiales</h3>
              <p style={{ marginTop: '10px' }}>Organizar los equipos y materiales necesarios para realizar la valoración del adulto mayor.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Higiene de manos</h3>
              <p style={{ marginTop: '10px' }}>Realizar higiene de manos antes de iniciar la atención y seguir las medidas de bioseguridad correspondientes.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Identificar al paciente simulado</h3>
              <p style={{ marginTop: '10px' }}>Confirmar la identidad del paciente simulado y explicar de manera clara las actividades que se realizarán.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Procedimiento Paso a Paso */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>📋 Procedimiento de Atención al Adulto Mayor</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>① Recepción y saludo</h3>
              <p style={{ marginTop: '10px' }}>Recibir al adulto mayor de manera cordial, respetuosa y humanizada. Presentarse y explicar brevemente el procedimiento que se realizará durante la actividad de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>② Identificación</h3>
              <p style={{ marginTop: '10px' }}>Verificar la identidad del paciente simulado utilizando los datos establecidos para el escenario y mantener la privacidad de la información.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>③ Valoración inicial</h3>
              <p style={{ marginTop: '10px' }}>Observar el estado general del adulto mayor, su nivel de respuesta, movilidad, comunicación y condiciones visibles.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>④ Toma de signos vitales</h3>
              <p style={{ marginTop: '10px' }}>Realizar la medición de los signos vitales indicados para el escenario de simulación y registrar correctamente los resultados obtenidos.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑤ Evaluación de movilidad</h3>
              <p style={{ marginTop: '10px' }}>Observar la capacidad de desplazamiento y equilibrio del adulto mayor, identificando posibles factores de riesgo de caídas.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑥ Comunicación y escucha</h3>
              <p style={{ marginTop: '10px' }}>Mantener una comunicación clara y respetuosa, permitiendo que el adulto mayor exprese sus necesidades, inquietudes y sentimientos.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑦ Identificación de necesidades</h3>
              <p style={{ marginTop: '10px' }}>Reconocer las necesidades básicas relacionadas con movilidad, alimentación, hidratación, descanso, higiene, comunicación y seguridad.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑧ Aplicación de cuidados</h3>
              <p style={{ marginTop: '10px' }}>Realizar las actividades de cuidado indicadas por el instructor, respetando las capacidades y condiciones del paciente simulado.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑨ Registro de resultados</h3>
              <p style={{ marginTop: '10px' }}>Registrar los resultados de la valoración y las actividades realizadas en el formato establecido para la práctica.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '20px', borderLeft: '8px solid #39a900', borderRadius: '12px' }}>
              <h3 style={{ color: '#0b6b3a' }}>⑩ Finalización</h3>
              <p style={{ marginTop: '10px' }}>Informar al paciente simulado que la actividad ha finalizado, organizar el área y realizar higiene de manos.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Lista de Verificación / Checklist */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>✅ Lista de Verificación</h2>
          <p style={{ marginBottom: '25px', lineHeight: 1.8, color: '#555' }}>
            Utilice esta lista para comprobar que las actividades principales
            de la práctica de atención al adulto mayor fueron realizadas
            correctamente.
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
                  <td style={{ padding: '15px' }}>Paciente identificado</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Identidad verificada.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Ambiente preparado</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Área segura y organizada.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Higiene de manos realizada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Procedimiento realizado.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Valoración inicial realizada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Estado general observado.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Signos vitales registrados</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Resultados registrados.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Movilidad valorada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Riesgos identificados.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Comunicación adecuada</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Trato respetuoso.</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Necesidades identificadas</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Necesidades registradas.</td>
                </tr>
                <tr style={{ background: '#f8fbf9' }}>
                  <td style={{ padding: '15px' }}>Registro finalizado</td>
                  <td style={{ textAlign: 'center' }}>☑</td>
                  <td style={{ textAlign: 'center' }}>☐</td>
                  <td>Registro completo.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN: Recomendaciones de Atención */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>⚠️ Recomendaciones de Atención</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>❤️ Trato Humanizado</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Mantenga siempre un trato digno, respetuoso y empático, teniendo en cuenta las preferencias y necesidades del adulto mayor.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🚶 Prevención de Caídas</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Mantenga el entorno despejado y acompañe al adulto mayor cuando exista riesgo durante la movilización.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>💬 Comunicación</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Utilice un lenguaje claro y permita que la persona tenga el tiempo necesario para responder.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🔒 Privacidad</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Respete la privacidad y confidencialidad de la información durante todas las actividades de simulación.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>🩺 Observe Cambios</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Comunique oportunamente al instructor cualquier cambio observado durante la valoración.</p>
            </div>

            <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ color: '#0b6b3a' }}>👨‍🏫 Siga las Indicaciones</h3>
              <p style={{ marginTop: '10px', lineHeight: 1.7 }}>Realice las actividades de acuerdo con las instrucciones del instructor y los protocolos institucionales.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Importancia de la Atención Geriátrica */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>💚 Importancia de la Atención Geriátrica</h2>
          <p style={{ lineHeight: 1.8, color: '#555', marginBottom: '20px' }}>
            La atención integral del adulto mayor permite reconocer sus
            necesidades individuales y favorecer un cuidado seguro,
            humanizado y respetuoso. La simulación clínica brinda al
            aprendiz la oportunidad de fortalecer sus habilidades en un
            ambiente controlado antes de enfrentarse a situaciones reales.
          </p>

          <div style={{ background: '#f8fbf9', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #39a900' }}>
            <h3 style={{ color: '#0b6b3a', marginBottom: '12px' }}>📌 Recuerde</h3>
            <p style={{ lineHeight: 1.8 }}>
              Cada adulto mayor es una persona con necesidades, capacidades
              y experiencias diferentes. La atención debe realizarse con
              respeto, empatía, seguridad y siguiendo siempre las indicaciones
              del instructor y los protocolos institucionales.
            </p>
          </div>
        </section>

        {/* =========================================================
        5. LLAMADO A LA ACCIÓN / NAVEGACIÓN DE SALIDA
        ========================================================= */}
        <section className="seccion" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,.08)', marginBottom: '35px' }}>
          <h2 style={{ color: '#0b6b3a', marginBottom: '25px', fontSize: '30px', borderLeft: '6px solid #39a900', paddingLeft: '15px' }}>🚀 Continuar con la Simulación</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Ha finalizado la lectura de la guía de geriatría.
            Ahora puede regresar al módulo de servicios o continuar
            con la práctica de atención al adulto mayor.
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
            <a href="../Practicas/geriatria.html" style={{ textDecoration: 'none' }}>
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
        Guía de Atención al Adulto Mayor
      </footer>
    </>
  );
}