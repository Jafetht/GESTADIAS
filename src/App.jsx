import LoginVinculacion from "./components/VINCULACION/LoginVinculacion";
import Footer from "./Footer";
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
import DashboardAlumno from "./components/alumno/DashboardAlumno";
import MenuMisDocumentos from "./components/alumno/MenuMisDocumentos";




function App() {
  const [vinculacionAutorizada, setVinculacionAutorizada] = useState(false);
  const [pantalla, setPantalla] = useState('inicio')
  const [estudiantes, setEstudiantes] = useState(() => {
    const data = localStorage.getItem('gestadias_estudiantes')
    return data ? JSON.parse(data) : []
  })
  const [solicitudesOrganizaciones, setSolicitudesOrganizaciones] = useState(() => {
    const data = localStorage.getItem("gestadias_solicitudes_organizaciones");
    return data ? JSON.parse(data) : [];
  });
  const [organizaciones, setOrganizaciones] = useState(() => {
  const data = localStorage.getItem("gestadias_organizaciones");

  return data
    ? JSON.parse(data)
    : padronOrganizaciones;
});

const actualizarAlumno = (alumnoActualizado) => {

  setEstudiantes(
    estudiantes.map((estudiante)=>
      estudiante.matricula === alumnoActualizado.matricula
      ? alumnoActualizado
      : estudiante
    )
  );

  if(
    alumnoActual &&
    alumnoActual.matricula === alumnoActualizado.matricula
  ){
    setAlumnoActual(alumnoActualizado);
  }

};

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

  const [periodo, setPeriodo] = useState('')
  const [anio, setAnio] = useState('')  
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

const guardarEstudiante = (alFinalizar) => {

  if (
    !matricula.trim() ||
    !nombre.trim() ||
    !correo.trim() ||
    !carrera ||
    !curp.trim() ||
    !periodo ||
    !anio
  ) {
    alert('⚠ Por favor, completa todos los campos del registro');
    return;
  }

  const nuevoEstudiante = {
    matricula,
    nombre,
    correo,
    carrera,
    curp,
    periodo,
    anio,

    nivelAcademico:
      periodo === "Enero - Abril"
        ? "Licenciatura"
        : "TSU",

    generacion: `${periodo} ${anio}`,

    organizacion: '',
    solicitudCambio: false,
    motivoCambio: '',
    fase: 0,
    estatus: 'Pendiente de selección de organización',

documentos: {
  presentacion: {
    archivo: null,
    nombreArchivo: "",
    estado: "sin_subir"
  },

  aceptacion: {
    archivo: null,
    nombreArchivo: "",
    estado: "sin_subir"
  },

  compromiso: {
    archivo: null,
    nombreArchivo: "",
    estado: "sin_subir"
  }
},

cartaCompromisoEnviada: false

  };

  setEstudiantes([...estudiantes, nuevoEstudiante]);

  setMatricula('');
  setNombre('');
  setCorreo('');
  setCarrera('');
  setCurp('');
  setPeriodo('');
  setAnio('');

  alert('Cuenta creada correctamente');

  if (alFinalizar) {
    alFinalizar();
  } else {
    setPantalla('inicio');
  }
};

  const iniciarSesion = async () => {
  const alumnoEncontrado = estudiantes.find(
    (estudiante) => estudiante.matricula === loginMatricula
  );
  if (!alumnoEncontrado) {
    alert("Matrícula no encontrada");
    return;
  }
  try {
    const respuesta = await fetch(
      `https://gestadias.onrender.com/documentos/alumno/${alumnoEncontrado.matricula}`
    );
    const documentos = await respuesta.json();
    const actualizado = {
      ...alumnoEncontrado
    };
    documentos.forEach((doc) => {
      actualizado.documentos[doc.tipo] = {
        archivo: `https://gestadias.onrender.com/${doc.ruta}`,
        nombreArchivo: doc.nombre,
        estado: doc.estado
      };
    });
    setAlumnoActual(actualizado);

setEstudiantes(
  estudiantes.map((estudiante) =>
    estudiante.matricula === actualizado.matricula
      ? actualizado
      : estudiante
  )
);

setPantalla("alumno");
  } catch (error) {
    console.error(error);
    setAlumnoActual(alumnoEncontrado);
    setPantalla("alumno");
  }
};

  const avisosAlumno = []
if (alumnoActual) {

  if (
    alumnoActual.fase >= 2 &&
    alumnoActual.documentos.presentacion.estado === "sin_subir"
  ) {
    avisosAlumno.push(
      "⚠ Debes subir la Carta de Presentación para continuar a la siguiente fase"
    );
  }

  if (
    alumnoActual.documentos.presentacion.estado === "subido" &&
    alumnoActual.documentos.aceptacion.estado === "sin_subir"
  ) {
    avisosAlumno.push(
      "📌 Sube la Carta de Aceptación para avanzar a la Fase 4"
    );
  }

  if (
    alumnoActual.documentos.aceptacion.estado === "subido" &&
    alumnoActual.documentos.compromiso.estado === "sin_subir"
  ) {
    avisosAlumno.push(
      "📄 Sube la Carta Compromiso para avanzar a la Fase 5"
    );
  }
}
const cerrarVinculacion = () => {
  setVinculacionAutorizada(false);
  setPantalla("inicio");
};
  const cerrarSesion = () => {
    setAlumnoActual(null)
    localStorage.removeItem('gestadias_alumno_actual')
    setPantalla('inicio')
  }
const subirCartaPresentacion = async (archivo) => {

  const formData = new FormData();

  formData.append("archivo", archivo);
  formData.append("matricula", alumnoActual.matricula);
  formData.append("tipo", "presentacion");


  try {

    const respuesta = await fetch(
      "https://gestadias.onrender.com/documentos/subir",
      {
        method:"POST",
        body:formData
      }
    );


    const datos = await respuesta.json();
    console.log(datos);

    const actualizado = {
  ...alumnoActual,
  documentos: {
    ...alumnoActual.documentos,
    presentacion: {
      archivo: `https://gestadias.onrender.com/${datos.ruta}`,
      nombreArchivo: archivo.name,
      estado: "en_revision"
    }
  },
  estatus: "Carta de Presentación en revisión"
};

setAlumnoActual(actualizado);

setEstudiantes(
  estudiantes.map((estudiante) =>
    estudiante.matricula === actualizado.matricula
      ? actualizado
      : estudiante
  )
);

    alert("PDF subido correctamente");
  } catch(error){
    console.error(error);
    alert("Error al subir PDF");
  }

};
const subirCartaAceptacion = async (archivo) => {

  const formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("matricula", alumnoActual.matricula);
  formData.append("tipo", "aceptacion");
  try {
    const respuesta = await fetch(
      "https://gestadias.onrender.com/documentos/subir",
      {
        method:"POST",
        body:formData
      }
    );
    const datos = await respuesta.json();
    const actualizado = {
      ...alumnoActual,
      documentos:{
        ...alumnoActual.documentos,
        aceptacion:{
          archivo:`https://gestadias.onrender.com/${datos.ruta}`,
          nombreArchivo:archivo.name,
          estado:"en_revision"
        }
      },
      estatus:"Carta de Aceptación en revisión",
      fase: 3
    };

console.log("Aceptación actualizada:", actualizado);

    setAlumnoActual(actualizado);
    setEstudiantes(
      estudiantes.map((estudiante)=>
        estudiante.matricula === actualizado.matricula
        ? actualizado
        : estudiante
      )
    );
    alert("Carta de Aceptación subida correctamente");
  } catch(error){
    console.error(error);
    alert("Error al subir Carta de Aceptación");
  }

};

const subirCartaCompromiso = async (archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("matricula", alumnoActual.matricula);
  formData.append("tipo", "compromiso");

  try {
    const respuesta = await fetch(
      "https://gestadias.onrender.com/documentos/subir",
      {
        method: "POST",
        body: formData
      }
    );
    const datos = await respuesta.json();
    const actualizado = {
      ...alumnoActual,
      documentos: {
        ...alumnoActual.documentos,
        compromiso: {
  archivo: `https://gestadias.onrender.com/${datos.ruta}`,
  nombreArchivo: archivo.name,
  estado: "en_revision"
}
      },
      fase: 4,
      estatus: "Carta de Compromiso en revisión"
    };

    setAlumnoActual(actualizado);
    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.matricula === actualizado.matricula
          ? actualizado
          : estudiante
      )
    );
    alert("Carta de Compromiso subida correctamente");
  } catch (error) {
    console.error(error);
    alert("Error al subir Carta de Compromiso");
  }
};

const verDocumento = (documento) => {
  if(documento.archivo){
    window.open(
      documento.archivo,
      "_blank"
    );
  }else{
    alert("Documento no disponible");
}};

const borrarDocumento = (tipoDocumento) => {
  const confirmar = confirm(
    "¿Seguro que deseas borrar este documento?"
  );

  if (!confirmar) return;

  let nuevaFase = alumnoActual.fase;
  let nuevoEstatus = alumnoActual.estatus;

  // Carta de Presentación
  if (tipoDocumento === "presentacion") {
    nuevaFase = 2;
    nuevoEstatus = "Carta de Presentación pendiente de subir";
  }

  // Carta de Aceptación
  if (tipoDocumento === "aceptacion") {
    nuevaFase = 3;
    nuevoEstatus = "Carta de Aceptación pendiente de subir";
  }

  // Carta Compromiso
  if (tipoDocumento === "compromiso") {
    nuevaFase = 4;
    nuevoEstatus = "Carta Compromiso pendiente de subir";
  }

  const actualizado = {
    ...alumnoActual,

    fase: nuevaFase,
    estatus: nuevoEstatus,

    documentos: {
      ...alumnoActual.documentos,

      [tipoDocumento]: {
        archivo: null,
        nombreArchivo: "",
        estado: "sin_subir"
      }
    }
  };

  setAlumnoActual(actualizado);

  setEstudiantes(
    estudiantes.map((estudiante) =>
      estudiante.matricula === actualizado.matricula
        ? actualizado
        : estudiante
    )
  );

  alert("Documento eliminado correctamente");
};



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

useEffect(() => {
  localStorage.setItem(
    "gestadias_organizaciones",
    JSON.stringify(organizaciones)
  );
}, [organizaciones]);

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
  ? organizaciones.filter((organizacion) =>
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
      mensaje: "Preparando la Fase 1 de tu proceso de estadía."
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
const continuarSinOrganizacion = () => {

  const actualizado = {
    ...alumnoActual,
    fase: 2,
    estatus: "Convenio de organización solicitado a Vinculación"
  };

  setAlumnoActual(actualizado);

  setEstudiantes(
    estudiantes.map((estudiante) =>
      estudiante.matricula === actualizado.matricula
        ? actualizado
        : estudiante
    )
  );
};



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

if (pantalla === "vinculacion" && !vinculacionAutorizada) {
  return (
    <LoginVinculacion
  autorizar={setVinculacionAutorizada}
  setPantalla={setPantalla}
/>
  );
}

if (pantalla === "vinculacion" && vinculacionAutorizada) {
    return (
      <DashboardVinculacion
estudiantes={estudiantes}
setEstudiantes={setEstudiantes}

busqueda={busqueda}
setBusqueda={setBusqueda}

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

  periodo={periodo}
  setPeriodo={setPeriodo}

  anio={anio}
  setAnio={setAnio}

guardarEstudiante={guardarEstudiante}
eliminarAlumno={eliminarAlumno}

setPantalla={setPantalla}

cerrarVinculacion={cerrarVinculacion}

solicitudesCambio={solicitudesCambio}
editarAlumno={editarAlumno}

guardarEdicion={guardarEdicion}

alumnoEditando={alumnoEditando}
setAlumnoEditando={setAlumnoEditando}


vistaVinculacion={vistaVinculacion}
setVistaVinculacion={setVistaVinculacion}

organizaciones={organizaciones}
setOrganizaciones={setOrganizaciones}

actualizarAlumno={actualizarAlumno}

setAlumnoActual={setAlumnoActual}
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

if (pantalla === "documentos") {
  return (

    <div className="alumno">

      <MenuAlumno
        alumnoActual={alumnoActual}
        cerrarSesion={cerrarSesion}
        setPantalla={setPantalla}
      />

      <MenuMisDocumentos
  alumnoActual={alumnoActual}
  verDocumento={verDocumento}
  borrarDocumento={borrarDocumento}
/>

    </div>

  );
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
      periodo={periodo}
      setPeriodo={setPeriodo}
      anio={anio}
      setAnio={setAnio}
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
    <DashboardAlumno
      alumnoActual={alumnoActual}
      setAlumnoActual={setAlumnoActual}

      estudiantes={estudiantes}
      setEstudiantes={setEstudiantes}

      avisosAlumno={avisosAlumno}

      organizacionesFiltradas={organizacionesFiltradas}

      cerrarSesion={cerrarSesion}
      setPantalla={setPantalla}

      seleccionarOrganizacion={seleccionarOrganizacion}
      continuarSinOrganizacion={continuarSinOrganizacion}
      solicitarCambioOrganizacion={solicitarCambioOrganizacion}
      registrarSolicitudOrganizacion={registrarSolicitudOrganizacion}

      subirCartaPresentacion={subirCartaPresentacion}
      subirCartaAceptacion={subirCartaAceptacion}
      subirCartaCompromiso={subirCartaCompromiso}
    />
  );
}

return (
  <>
    <Inicio setPantalla={setPantalla} />
    <Footer />
  </>
);
}

export default App;