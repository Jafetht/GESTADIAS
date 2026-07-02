import './App.css'
import { useState, useEffect } from 'react'
import logo from './assets/logo-gestadias.png'


function App() {
  const [pantalla, setPantalla] = useState('inicio')

const [estudiantes, setEstudiantes] = useState(() => {
  const data = localStorage.getItem('gestadias_estudiantes')
  return data ? JSON.parse(data) : []
})

const eliminarAlumno = (matricula) => {
  const confirmar = confirm('¿Seguro que deseas eliminar este alumno?')

  if (!confirmar) return

  setEstudiantes(
    estudiantes.filter((e) => e.matricula !== matricula)
  )
}

const editarAlumno = (alumno) => {
  setAlumnoEditando(alumno)
}

const guardarEdicion = () => {
  const actualizados = estudiantes.map((estudiante) =>
    estudiante.matricula === alumnoEditando.matricula
      ? alumnoEditando
      : estudiante
  )

  setEstudiantes(actualizados)
  setAlumnoEditando(null)
}

const [alumnoEditando, setAlumnoEditando] = useState(null)

  const [avisos, setAvisos] = useState([
    '📢 Bienvenido a GESTADIAS',
    '⚠ Los estudiantes deben subir primero su Carta de Presentación',
    '📄 El sistema controla el avance por fases'
  ])

  const [loginMatricula, setLoginMatricula] = useState('')
  const [matricula, setMatricula] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [carrera, setCarrera] = useState('')
  const [curp, setCurp] = useState('')
 const [alumnoActual, setAlumnoActual] = useState(() => {
  const data = localStorage.getItem('gestadias_alumno_actual')
  return data ? JSON.parse(data) : null
})

const [busqueda, setBusqueda] = useState('')

  const guardarEstudiante = () => {
    const nuevoEstudiante = {
      matricula,
      nombre,
      correo,
      carrera,
      curp,
      unidadEconomica: '',
      solicitudCambio: false,
      motivoCambio: '',
      fase: 1,
      estatus: 'Registro completado',
      documentos: {
        presentacion: false,
        aceptacion: false,
        compromiso: false
      }
    }

    setEstudiantes([...estudiantes, nuevoEstudiante])
    alert('Cuenta creada correctamente')
    setPantalla('inicio')
  }

const iniciarSesion = () => {
  const alumnoEncontrado = estudiantes.find(
    (estudiante) => estudiante.matricula === loginMatricula
  )

  if (alumnoEncontrado) {
    setAlumnoActual(alumnoEncontrado)
    setPantalla('alumno') // 👈 ESTE ES EL ARREGLO
  } else {
    alert('Matrícula no encontrada')
  }
}

const avisosAlumno = []

if (alumnoActual) {
  if (!alumnoActual.documentos.presentacion) {
    avisosAlumno.push('⚠ Debes subir la Carta de Presentación para continuar a la siguiente fase')
  }

  if (alumnoActual.documentos.presentacion && !alumnoActual.documentos.aceptacion) {
    avisosAlumno.push('📌 Sube la Carta de Aceptación para avanzar a la Fase 5')
  }

  if (alumnoActual.documentos.aceptacion && !alumnoActual.documentos.compromiso) {
    avisosAlumno.push('📄 Sube la Carta Compromiso para avanzar a la Fase 6')
  }
}

const cerrarSesion = () => {
  setAlumnoActual(null)
  localStorage.removeItem('gestadias_alumno_actual')
  setPantalla('inicio')
}

  const subirCartaPresentacion = () => {
    const actualizado = {
      ...alumnoActual,
      documentos: {
        ...alumnoActual.documentos,
        presentacion: true
      },
      fase: 3,
      estatus: 'Carta de Presentación subida'
    }

    setAlumnoActual(actualizado)

    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.matricula === actualizado.matricula
          ? actualizado
          : estudiante
      )
    )
  }

  const subirCartaAceptacion = () => {
    const actualizado = {
      ...alumnoActual,
      documentos: {
        ...alumnoActual.documentos,
        aceptacion: true
      },
      fase: 4,
      estatus: 'Carta de Aceptación subida'
    }

    setAlumnoActual(actualizado)

    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.matricula === actualizado.matricula
          ? actualizado
          : estudiante
      )
    )
  }

  const subirCartaCompromiso = () => {
    const actualizado = {
      ...alumnoActual,
      documentos: {
        ...alumnoActual.documentos,
        compromiso: true
      },
      fase: 5,
      estatus: 'Carta Compromiso subida'
    }

    setAlumnoActual(actualizado)

    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.matricula === actualizado.matricula
          ? actualizado
          : estudiante
      )
    )
  }

  const [unidadesEconomicas] = useState([
    {
      nombre: 'Universidad Tecnológica del Poniente',
      carreras: ['ADM', 'GAS', 'PAL', 'TIC', 'TUR']
    },
    {
      nombre: 'Hotel Hacienda',
      carreras: ['TUR']
    },
    {
      nombre: 'Bepensa',
      carreras: ['ADM']
    },
    {
      nombre: 'Empresa de Software',
      carreras: ['TIC']
    }
  ])


useEffect(() => {
  localStorage.setItem(
    'gestadias_estudiantes',
    JSON.stringify(estudiantes)
  )
}, [estudiantes])


useEffect(() => {
  if (pantalla === 'alumno' && alumnoActual) {
    localStorage.setItem(
      'gestadias_alumno_actual',
      JSON.stringify(alumnoActual)
    )
  } else {
    localStorage.removeItem('gestadias_alumno_actual')
  }
}, [alumnoActual])






  const unidadesFiltradas = alumnoActual
    ? unidadesEconomicas.filter((unidad) =>
        unidad.carreras.includes(alumnoActual.carrera)
      )
    : []

  const solicitudesCambio = estudiantes.filter(
    (estudiante) => estudiante.solicitudCambio
  )

  const estudiantesFiltrados = estudiantes.filter((estudiante) =>
  estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  String(estudiante.matricula).includes(busqueda)
)

  const seleccionarUnidadEconomica = (unidad) => {
    const actualizado = {
      ...alumnoActual,
      unidadEconomica: unidad.nombre,
      fase: 2,
      estatus: 'Unidad Económica seleccionada'
    }

    setAlumnoActual(actualizado)

    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.matricula === actualizado.matricula
          ? actualizado
          : estudiante
      )
    )
  }

  const aprobarCambio = (matriculaAlumno) => {
    const actualizados = estudiantes.map((estudiante) =>
      estudiante.matricula === matriculaAlumno
        ? {
            ...estudiante,
            unidadEconomica: '',
            solicitudCambio: false,
            motivoCambio: '',
            fase: 1,
            estatus: 'Cambio aprobado, seleccione nueva Unidad Económica'
          }
        : estudiante
    )

    setEstudiantes(actualizados)
  }

  const rechazarCambio = (matriculaAlumno) => {
    const actualizados = estudiantes.map((estudiante) =>
      estudiante.matricula === matriculaAlumno
        ? {
            ...estudiante,
            solicitudCambio: false,
            motivoCambio: 'Solicitud rechazada por Vinculación'
          }
        : estudiante
    )

    setEstudiantes(actualizados)
  }

  const solicitarCambioUnidad = () => {
    const actualizado = {
      ...alumnoActual,
      solicitudCambio: true,
      motivoCambio: 'Pendiente de revisión por Vinculación'
    }

    setAlumnoActual(actualizado)

    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.matricula === actualizado.matricula
          ? actualizado
          : estudiante
      )
    )
  }


  if (pantalla === 'vinculacion') {
    return (
      <div className="dashboard-vinculacion">
        <div className="sidebar">
          <h2>Vinculación</h2>
          <button onClick={() => setPantalla('inicio')}>Inicio</button>
        </div>

        <div className="content">
          <h1>Panel de Vinculación</h1>
<input
  placeholder="Buscar por nombre o matrícula"
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
/>
          <div className="kpi-container">
            <div className="kpi-card">
              <h3>{estudiantes.length}</h3>
              <p>Total alumnos</p>
            </div>

            <div className="kpi-card">
              <h3>{solicitudesCambio.length}</h3>
              <p>Solicitudes</p>
            </div>

            <div className="kpi-card">
              <h3>
                {estudiantes.filter((e) => e.fase >= 3).length}
              </h3>
              <p>En fase avanzada</p>
            </div>
          </div>

          <h2>📋 Solicitudes de Cambio</h2>

          {solicitudesCambio.length === 0 ? (
            <p>No hay solicitudes pendientes</p>
          ) : (
            solicitudesCambio.map((alumno, index) => (
              <div key={index}>
                <p><strong>Alumno:</strong> {alumno.nombre}</p>
                <p><strong>Matrícula:</strong> {alumno.matricula}</p>

                <button onClick={() => aprobarCambio(alumno.matricula)}>
                  Aprobar
                </button>

                <button onClick={() => rechazarCambio(alumno.matricula)}>
                  Rechazar
                </button>

                <hr />
              </div>
            ))
          )}

          <h2>👨‍🎓 Expedientes</h2>

         {estudiantesFiltrados.map((alumno, index) => (
            <div key={index} className="alumno-card">
              <p><strong>{alumno.nombre}</strong></p>
              <p>{alumno.carrera}</p>
              <p>Fase: {alumno.fase}</p>
              <p>{alumno.estatus}</p>
              <hr />
        <button onClick={() => eliminarAlumno(alumno.matricula)}>
         Eliminar
        </button>
        <button onClick={() => editarAlumno(alumno)}>
         Editar
        </button>
            </div>
          ))}
        </div>
        {alumnoEditando && (
  <div className="alumno-card">
    <h3>Editar Alumno</h3>

    <input
      value={alumnoEditando.nombre}
      onChange={(e) =>
        setAlumnoEditando({ ...alumnoEditando, nombre: e.target.value })
      }
      placeholder="Nombre"
    />

    <input
      value={alumnoEditando.carrera}
      onChange={(e) =>
        setAlumnoEditando({ ...alumnoEditando, carrera: e.target.value })
      }
      placeholder="Carrera"
    />

    <input
      value={alumnoEditando.fase}
      onChange={(e) =>
        setAlumnoEditando({ ...alumnoEditando, fase: e.target.value })
      }
      placeholder="Fase"
    />

    <button onClick={guardarEdicion}>Guardar cambios</button>
    <button onClick={() => setAlumnoEditando(null)}>Cancelar</button>
  </div>
)}
      </div>
    )
  }

  if (pantalla === 'registro') {
    return (
      <div>
        <h1>Crear Cuenta</h1>

        <input
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />

        <input
          placeholder="Nombre Completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Correo Institucional"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          placeholder="Carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
        />

        <input
          placeholder="CURP"
          value={curp}
          onChange={(e) => setCurp(e.target.value)}
        />

        <button onClick={guardarEstudiante}>Guardar</button>
      </div>
    )
  }

  if (pantalla === 'login') {
    return (
      <div>
        <h1>Iniciar Sesión</h1>

        <input
          placeholder="Matrícula"
          value={loginMatricula}
          onChange={(e) => setLoginMatricula(e.target.value)}
        />

        <button onClick={iniciarSesion}>Entrar</button>
      </div>
    )
  }

 if (alumnoActual) {
    return (
      <div className="alumno">
        <h1>Bienvenido {alumnoActual.nombre}</h1>
<button onClick={cerrarSesion}>
  Cerrar sesión
</button>
        <h3>Tu avance en GESTADIAS</h3>
{avisosAlumno.length > 0 && (
  <div className="avisos-alumno">
    <h3>📢 Avisos importantes</h3>

    {avisosAlumno.map((aviso, index) => (
      <p key={index} className="aviso-item">
        {aviso}
      </p>
    ))}
  </div>
)}
        <div className="kpi-grid">
          <div className="kpi-card">
            <h2>{alumnoActual.fase}</h2>
            <p>Fase actual</p>
          </div>

          <div className="kpi-card">
            <p>{alumnoActual.estatus}</p>

            <p className="kpi-label">Estatus</p>
          </div>

          <div className="kpi-card">
            <p>{alumnoActual.unidadEconomica || 'Ninguna'}</p>

            <p className="kpi-label unidad-label">Unidad Económica</p>
          </div>
        </div>

        {!alumnoActual.solicitudCambio && (
          <button onClick={solicitarCambioUnidad}>
            Solicitar cambio de Unidad Económica
          </button>
        )}

        {alumnoActual.solicitudCambio && (
          <p>⏳ Solicitud enviada a Vinculación</p>
        )}
<h3>Fase 2</h3>
        <h3>Unidades Económicas disponibles</h3>

        {unidadesFiltradas.map((unidad, index) => (
          <button
            key={index}
            onClick={() => seleccionarUnidadEconomica(unidad)}
          >
            {unidad.nombre}
          </button>
        ))}
<h3>Fase 3</h3>

<h4>Instrucciones para la Carta de Presentación</h4>

<div className="instrucciones">
  <p>
    La Dirección de Vinculación te otorga la carta de presentación de estadía que te acredita como alumno de la universidad en su último cuatrimestre.
  </p>

  <p>
    Esta carta deberás entregarla a la empresa donde desees ingresar.
  </p>

  <ul>
    <li><strong>Conserva</strong> la carta original y realiza copias para las empresas que lo requieran.</li>
    <li><strong>No entregues</strong> el documento original.</li>
    <li>Escanea la carta en formato PDF a color.</li>
    <li>Nombra el archivo como: <strong>MATRÍCULA_PRESENTACIÓN</strong></li>
    <li>Ejemplo: <strong>21090001_PRESENTACIÓN</strong></li>
  </ul>
</div>
        <input type="file" accept=".pdf" />
        <button onClick={subirCartaPresentacion}>
          Subir Carta de Presentación
        </button>

        <p>
          Carta de Presentación:{' '}
          {alumnoActual.documentos.presentacion ? '✅' : '❌'}
        </p>

        {alumnoActual.documentos.presentacion && (
          <div>
<h3>Fase 4</h3>

<h4>Instrucciones para la Carta de Aceptación</h4>

<div className="instrucciones">
  <p>
    Esta carta es emitida por la empresa donde realizarás tu estadía una vez que haya aceptado tu ingreso.
  </p>

  <p>
    Debes utilizar el formato editable y llenarlo con los datos de la empresa correspondiente.
  </p>

  <ul>
    <li>Asegúrate de que tu asesor empresarial la firme con pluma azul.</li>
    <li>Este documento será considerado como original.</li>
    <li>Escanéala en formato PDF a color.</li>
    <li>Nombra el archivo como: <strong>MATRÍCULA_ACEPTACIÓN</strong></li>
    <li>Ejemplo: <strong>21090001_ACEPTACIÓN</strong></li>
  </ul>
</div>

            <input type="file" accept=".pdf" />
            <button onClick={subirCartaAceptacion}>
              Subir Carta de Aceptación
            </button>

            <p>
              Carta de Aceptación:{' '}
              {alumnoActual.documentos.aceptacion ? '✅' : '❌'}
            </p>

            {alumnoActual.documentos.aceptacion && (
              <div>
                <h3>Fase 5</h3>

<h4>Instrucciones para la Carta Compromiso</h4>

<ol className="instrucciones">
  <li>Vinculación te mandará a tu correo la carta.</li>
  <li>Imprime 3 originales a color, lo firmas TU y el asesor de la unidad.</li>
  <li><strong>TODAS LAS FIRMAS EN TINTA AZUL.</strong></li>
  <li>Lleva los 3 originales a la Dirección de Vinculación.</li>
  <li>El director(a) de Vinculación firmará los 3 ejemplares; 
    te devolverá 2 (uno para ti y otro para tu unidad) 
    y se quedará con uno</li>
  <li>Escanea tu documento original a color en formato PDF.</li>
  <li>Nombra el archivo como MATRÍCULA_COMPROMISO (ej. 21090001_COMPROMISO) y súbelo aquí.</li>
</ol>
                <input type="file" accept=".pdf" />
                <button onClick={subirCartaCompromiso}>
                  Subir Carta Compromiso
                </button>

                <p>
                  Carta Compromiso:{' '}
                  {alumnoActual.documentos.compromiso ? '✅' : '❌'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="dashboard">
  <img src={logo} alt="Logo GESTADÍAS" className="logo" />
  <h1 className="titulo-principal">GESTADIAS</h1>
<h2 className="subtitulo">Departamento de Vinculación</h2>

      <button onClick={() => setPantalla('login')}>
        Iniciar Sesión
      </button>

      <button onClick={() => setPantalla('registro')}>
        Crear Cuenta
      </button>

      <button onClick={() => setPantalla('vinculacion')}>
        Panel de Vinculación
      </button>

      <div className="avisos-panel">
        <h3>Avisos de Vinculación</h3>

        {avisos.map((aviso, index) => (
          <div key={index} className="aviso-card">
            {aviso}
          </div>
        ))}
      </div>

      <div className="fases-panel">
        <h3>Fases de Estadía</h3>

        <div className="fase activa">1. Registro del alumno</div>
        <div className="fase">2. Selección de Unidad Económica</div>
        <div className="fase">3. Carta de Presentación</div>
        <div className="fase">4. Carta de Aceptación</div>
        <div className="fase">5. Carta Compromiso</div>
        <div className="fase">6. Estadía Activa</div>
        <div className="fase">7. Liberación Final</div>
      </div>
    </div>
  );
}

export default App