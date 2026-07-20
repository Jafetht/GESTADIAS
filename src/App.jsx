import './App.css'
import { useState, useEffect } from 'react'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Registro from './components/Registro'
import carreras from './Data/carreras'
import Organizaciones from './components/alumno/Organizaciones'
import padronOrganizaciones from "./Data/padronOrganizaciones";
import DocumentoPresentacion from "./components/alumno/DocumentoPresentacion";
import DocumentoAceptacion from "./components/alumno/DocumentoAceptacion";
import DocumentoCompromiso from './components/alumno/DocumentoCompromiso';
import TransicionFase from "./components/alumno/TransicionFase";
import MenuAlumno from "./components/MenuAlumno";
import DashboardVinculacion from "./components/VINCULACION/DashboardVinculacion";


function App() {
  const [pantalla, setPantalla] = useState('inicio')
  const [estudiantes, setEstudiantes] = useState(() => {
    const data = localStorage.getItem('gestadias_estudiantes')
    return data ? JSON.parse(data) : []
  })
  const [solicitudesOrganizaciones, setSolicitudesOrganizaciones] = useState(() => {
    const data = localStorage.getItem("gestadias_solicitudes_organizaciones");
    return data ? JSON.parse(data) : [];
  });
  const eliminarAlumno = (matricula) => {
    const confirmar = confirm('¿Seguro que deseas eliminar este alumno?')
    if (!confirmar) return
    setEstudiantes(estudiantes.filter((e) => e.matricula !== matricula))
  }
  const editarAlumno = (alumno) => {
    setAlumnoEditando(alumno)
  }
  const guardarEdicion = () => {
    const actualizados = estudiantes.map((estudiante) =>
      estudiante.matricula === alumnoEditando.matricula ? alumnoEditando : estudiante)
    setEstudiantes(actualizados)
    setAlumnoEditando(null)
  }
  const [alumnoEditando, setAlumnoEditando] = useState(null)
  const [avisos, setAvisos] = useState([
    '📢 Bienvenido a GESTADIAS',
    '⚠ Los estudiantes deben subir primero su Carta de Presentación',
    '📄 El sistema controla el avance por fases'])
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
  const [mostrarTransicion, setMostrarTransicion] = useState(false);
  const [datosTransicion, setDatosTransicion] = useState({
    titulo: "",
    mensaje: ""
  });
  const [busqueda, setBusqueda] = useState('')

  const guardarEstudiante = () => {
    const nuevoEstudiante = {
      matricula,
      nombre,
      correo,
      carrera,
      curp,
      organizacion: '',
      solicitudCambio: false,
      motivoCambio: '',
      fase: 1,
      estatus: 'Registro completado',

documentos: {
  presentacion: {
    archivo: null,
    estado: "pendiente",
    motivo: ""
  },

  aceptacion: {
    archivo: null,
    estado: "pendiente",
    motivo: ""
  },

  compromiso: {
    archivo: null,
    estado: "pendiente",
    motivo: ""
  }
},

cartaCompromiso: {
    enviada: false,
    fechaEnvio: null
}
};
    setEstudiantes([...estudiantes, nuevoEstudiante])
    alert('Cuenta creada correctamente')
    setPantalla('inicio')
  }
  const iniciarSesion = () => {
    const alumnoEncontrado = estudiantes.find((estudiante) => estudiante.matricula === loginMatricula)
    if (alumnoEncontrado) {
      setAlumnoActual(alumnoEncontrado)
      setPantalla('alumno') // 👈 ESTE ES EL ARREGLO
    } else {
      alert('Matrícula no encontrada')
    }
  }
  const avisosAlumno = []
  if (alumnoActual) {
    if (
  alumnoActual.fase >= 3 &&
  alumnoActual.documentos.presentacion.estado !== "aprobado"
) {
      avisosAlumno.push('⚠ Debes subir la Carta de Presentación para continuar a la siguiente fase')
    }
    if (
    alumnoActual.documentos.presentacion.estado === "aprobado" &&
    alumnoActual.documentos.aceptacion.estado !== "aprobado"
){
      avisosAlumno.push('📌 Sube la Carta de Aceptación para avanzar a la Fase 5')
    }
    if (
    alumnoActual.documentos.aceptacion.estado === "aprobado" &&
    alumnoActual.documentos.compromiso.estado !== "aprobado"
) {
      avisosAlumno.push('📄 Sube la Carta Compromiso para avanzar a la Fase 6')
    }
  }
  const cerrarSesion = () => {
    setAlumnoActual(null)
    localStorage.removeItem('gestadias_alumno_actual')
    setPantalla('inicio')
  }
  const subirCartaPresentacion = (archivo) => {
    setDatosTransicion({
      titulo: "Validando Carta de Presentación...",
      mensaje: "Actualizando tu expediente y preparando la siguiente fase."
    });
    setMostrarTransicion(true);
    setTimeout(() => {
      const actualizado = {
        ...alumnoActual,
        documentos: {
          ...alumnoActual.documentos,
          presentacion: {
    ...alumnoActual.documentos.presentacion,
    archivo,
    estado: "aprobado",
    motivo: ""
}
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
        ))
      setMostrarTransicion(false);
    }, 2500);
  }
  const subirCartaAceptacion = () => {
    setDatosTransicion({
      titulo: "Validando Carta de Aceptación...",
      mensaje: "Verificando el documento y habilitando la siguiente fase."
    });
    setMostrarTransicion(true);
    setTimeout(() => {
      const actualizado =
      {
        ...alumnoActual,
        documentos: {
          ...alumnoActual.documentos,
          aceptacion: {
    ...alumnoActual.documentos.aceptacion,
    estado: "aprobado",
    motivo: ""
}
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
      setMostrarTransicion(false);
    }, 2500);
  }
  const subirCartaCompromiso = () => {
    setDatosTransicion({
      titulo: "🎉 Activando tu Estadía Profesional...",
      mensaje: "Toda tu documentación ha sido validada correctamente. Preparando tu expediente..."
    });
    setMostrarTransicion(true);
    setTimeout(() => {
      const actualizado = {
        ...alumnoActual,
        documentos: {
          ...alumnoActual.documentos,
          compromiso: {
    ...alumnoActual.documentos.compromiso,
    estado: "aprobado",
    motivo: ""
}
        },
        fase: 6,
        estatus: 'Estadía autorizada'
      }

      setAlumnoActual(actualizado)

      setEstudiantes(
        estudiantes.map((estudiante) =>
          estudiante.matricula === actualizado.matricula
            ? actualizado
            : estudiante
        )
      )
      setMostrarTransicion(false);
    }, 2500);
  }
const [vistaVinculacion, setVistaVinculacion] = useState("alumnos");


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


  useEffect(() => {
    localStorage.setItem(
      "gestadias_solicitudes_organizaciones",
      JSON.stringify(solicitudesOrganizaciones)
    );
  }, [solicitudesOrganizaciones]);
  const registrarSolicitudOrganizacion = (datos) => {
    setSolicitudesOrganizaciones([
      ...solicitudesOrganizaciones,
      {
        id: Date.now(),
        ...datos,
        alumno: alumnoActual.nombre,
        matricula: alumnoActual.matricula,
        carrera: alumnoActual.carrera,
        estatus: "Solicitud recibida",
        fecha: new Date().toLocaleDateString()
      }
    ]);
  };

  const organizacionesFiltradas = alumnoActual
    ? padronOrganizaciones.filter((organizacion) =>
      organizacion.carrerasRelacionadas.some(
        (carrera) =>
          carrera.toLowerCase() === alumnoActual.carrera.toLowerCase()
      )
    ):
     [];

  const solicitudesCambio = estudiantes.filter(
    (estudiante) => estudiante.solicitudCambio
  );

  const estudiantesFiltrados = estudiantes.filter((estudiante) =>
    estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(estudiante.matricula).includes(busqueda)
  );

  const seleccionarOrganizacion = (organizacion) => {
    setDatosTransicion({
      titulo: "Registrando organización...",
      mensaje: "Preparando la Fase 2 de tu proceso de estadía."
    });

    setMostrarTransicion(true);
    setTimeout(() => {
      const actualizado = {
        ...alumnoActual,
        organizacion: organizacion.nombre,
        datosOrganizacion: organizacion,
        fase: 2,
        estatus: organizacion.enProceso
          ? "Organización en proceso de registro por Vinculación"
          : "Organización seleccionada"
      }

      setAlumnoActual(actualizado)

      setEstudiantes(
        estudiantes.map((estudiante) =>
          estudiante.matricula === actualizado.matricula
            ? actualizado
            : estudiante
        )
      )

      alert(`Organización seleccionada: ${organizacion.nombre}`)

      setMostrarTransicion(false);

    }, 2500);
  }


  const aprobarCambio = (matriculaAlumno) => {
    const actualizados = estudiantes.map((estudiante) =>
      estudiante.matricula === matriculaAlumno
        ? {
          ...estudiante,
          organizacion: '',
          solicitudCambio: false,
          motivoCambio: '',
          fase: 1,
          estatus: 'Cambio aprobado, seleccione nueva Organización'
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

  const solicitarCambioOrganizacion = () => {
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
  if (pantalla === "vinculacion") {
    return (
      <DashboardVinculacion
        estudiantes={estudiantes}
        setEstudiantes={setEstudiantes}
        solicitudesCambio={solicitudesCambio}
        eliminarAlumno={eliminarAlumno}
        editarAlumno={editarAlumno}
        guardarEdicion={guardarEdicion}
        alumnoEditando={alumnoEditando}
        setAlumnoEditando={setAlumnoEditando}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        setPantalla={setPantalla}
        vistaVinculacion={vistaVinculacion}
        setVistaVinculacion={setVistaVinculacion}
      />
    );
  }

if (pantalla === 'perfil') {
  return (
    <div className="alumno">

      <MenuAlumno
        alumnoActual={alumnoActual}
        cerrarSesion={cerrarSesion}
        setPantalla={setPantalla}
      />

      <div className="documento-card">

        <h3>👤 Mi Perfil</h3>

        <p><strong>Nombre:</strong> {alumnoActual.nombre}</p>

        <p><strong>Matrícula:</strong> {alumnoActual.matricula}</p>

        <p><strong>Correo:</strong> {alumnoActual.correo}</p>

        <p><strong>Carrera:</strong> {alumnoActual.carrera}</p>

      </div>

    </div>
  )
}

if (pantalla === 'documentos') {
  return (
    <div className="alumno">

      <MenuAlumno
        alumnoActual={alumnoActual}
        cerrarSesion={cerrarSesion}
        setPantalla={setPantalla}
      />

      <div className="documento-card">

        <h3>📄 Mis Documentos</h3>

        <p>
          Carta de Presentación:
{alumnoActual.documentos.presentacion.estado === "aprobado"
    ? " ✅"
    : " ❌"}
        </p>

        <p>
        Carta de Aceptación:
{alumnoActual.documentos.aceptacion.estado === "aprobado"
    ? " ✅"
    : " ❌"}
        </p>

        <p>
         Carta Compromiso:
{alumnoActual.documentos.compromiso.estado === "aprobado"
    ? " ✅"
    : " ❌"}
        </p>

      </div>

    </div>
  )
}

if (pantalla === 'estadia') {
  return (
    <div className="alumno">

      <MenuAlumno
        alumnoActual={alumnoActual}
        cerrarSesion={cerrarSesion}
        setPantalla={setPantalla}
      />

      <div className="fase-final">

        <h3>📌 Mi Estadía</h3>

        <p>
          Organización:
          {alumnoActual.organizacion || "Sin asignar"}
        </p>

        <p>
          Fase actual:
          {alumnoActual.fase}
        </p>

        <p>
          Estatus:
          {alumnoActual.estatus}
        </p>

      </div>

    </div>
  )
}

if (pantalla === 'registro') {
  return (
    <Registro
      matricula={matricula}
      setMatricula={setMatricula}
      nombre={nombre}
      setNombre={setNombre}
      correo={correo}
      setCorreo={setCorreo}
      carrera={carrera}
      setCarrera={setCarrera}
      curp={curp}
      setCurp={setCurp}
      guardarEstudiante={guardarEstudiante}
      setPantalla={setPantalla}
    />
  )
}

if (pantalla === 'login') {
  return (
    <Login
      loginMatricula={loginMatricula}
      setLoginMatricula={setLoginMatricula}
      iniciarSesion={iniciarSesion}
      setPantalla={setPantalla}
    />
  )
}

console.log("Alumno actual:", alumnoActual);
console.log("Organizaciones filtradas:", organizacionesFiltradas);

if (mostrarTransicion) {
  return (
    <TransicionFase
      titulo={datosTransicion.titulo}
      mensaje={datosTransicion.mensaje}
    />
  );
}

if (alumnoActual) {

  return (

    <div className="alumno">
      <MenuAlumno
        alumnoActual={alumnoActual}
        cerrarSesion={cerrarSesion}
        setPantalla={setPantalla}
      />
      <h1>HOLA {alumnoActual.nombre}</h1>

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

          <p>Estatus</p>
        </div>

        <div className="kpi-card">
          <p>{alumnoActual.organizacion || 'Ninguna'}</p>

          <p>Organización</p>
        </div>
      </div>

      {alumnoActual.fase <= 2 && (
        <Organizaciones
          alumnoActual={alumnoActual}
          organizacionesFiltradas={organizacionesFiltradas}
          seleccionarOrganizacion={seleccionarOrganizacion}
          solicitarCambioOrganizacion={solicitarCambioOrganizacion}
          registrarSolicitudOrganizacion={registrarSolicitudOrganizacion}
        />
      )}

      {alumnoActual.fase === 2 && (
        <DocumentoPresentacion
          alumnoActual={alumnoActual}
          subirCartaPresentacion={subirCartaPresentacion}
        />
      )}
{alumnoActual.documentos.presentacion.estado === "aprobado" &&
 alumnoActual.documentos.aceptacion.estado !== "aprobado" && (
          <DocumentoAceptacion
            alumnoActual={alumnoActual}
            subirCartaAceptacion={subirCartaAceptacion}
          />
        )}
{alumnoActual.documentos.aceptacion.estado === "aprobado" &&
 alumnoActual.documentos.compromiso.estado !== "aprobado" && (
          <DocumentoCompromiso
            alumnoActual={alumnoActual}
            subirCartaCompromiso={subirCartaCompromiso}
          />
        )}

      {alumnoActual.fase === 6 && (
        <div className="fase-final">

          <h3>🎉 Fase 6 - Estadía Activa</h3>

          <h4>¡Felicidades continúa con éxito tu Estadía Profesional!</h4>

          <p className="frase-motivacional">
            "Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas."
            <br />
            <strong>— Eclesiastés 9:10</strong>
          </p>

          <p>
            Tu estadía profesional ha sido activada correctamente.
            A partir de este momento podrás desarrollar tus actividades dentro de la organización asignada.
            Recuerda mantener comunicación con tu asesor académico y con tu asesor empresarial durante todo el proceso.
          </p>

          <div className="aviso-estadia">
            📌 Próximamente aquí podrás subir tu Carta de Terminación de Estadía y concluir tu proceso en GESTADIAS.
          </div>

          <div className="resumen-fases">

            <h4>Resumen de fases concluidas</h4>

            <ul>
              <li>✅ Registro de estudiante completado</li>
              <li>✅ Selección de organización realizada</li>
              <li>✅ Carta de Presentación entregada</li>
              <li>✅ Carta de Aceptación entregada</li>
              <li>✅ Carta Compromiso entregada</li>
            </ul>

          </div>

        </div>
      )}
    </div>
  );
}

return (
  <Inicio setPantalla={setPantalla} />
);
}

export default App;