import { useState } from "react";
import ModuloAlumnos from "./ModuloAlumnos";
import ExpedienteAlumno from "./ExpedienteAlumno";
import Registro from "../Registro";
import Organizaciones from "./Organizaciones";

function DashboardVinculacion({
  estudiantes,
  setEstudiantes,
  busqueda,
  setBusqueda,
  setPantalla,
  matricula,
  setMatricula,
  nombre,
  setNombre,
  correo,
  setCorreo,
  carrera,
  setCarrera,
  curp,
  setCurp,
  guardarEstudiante,
  eliminarAlumno,
  periodo,
  setPeriodo,
  anio,
  setAnio,
  organizaciones,
  setOrganizaciones,
  actualizarAlumno
  // demás props...
}) {

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [vista, setVista] = useState("alumnos");


  const [rutaAlumnos, setRutaAlumnos] = useState({
    nivel: "generaciones",
    generacionSeleccionada: null,
    carreraSeleccionada: null
  });



  // SUBIR DOCUMENTO PDF

  const subirDocumento = (tipo, archivo) => {

    if (!archivo) return;


    const lector = new FileReader();


    lector.onload = () => {


      const actualizados = estudiantes.map((alumno) => {


        if (
          alumno.matricula === alumnoSeleccionado.matricula
        ) {


          return {

            ...alumno,

            documentos: {

              ...alumno.documentos,

              [tipo]: {

                ...alumno.documentos?.[tipo],

                archivo: lector.result,

                nombreArchivo: archivo.name,

                estado: "pendiente"

              }

            }

          };

        }


        return alumno;


      });



      setEstudiantes(actualizados);



      const alumnoNuevo = actualizados.find(
        alumno =>
          alumno.matricula === alumnoSeleccionado.matricula
      );


      setAlumnoSeleccionado(alumnoNuevo);
      actualizarAlumno(alumnoNuevo);


    };


    lector.readAsDataURL(archivo);

  };





  // ACTUALIZAR ESTADO DEL DOCUMENTO

const actualizarDocumento = async (id, datos) => {

  try {

    const respuesta = await fetch(
      `http://localhost:3001/documentos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      }
    );


    const documentoActualizado = await respuesta.json();


    console.log(
      "Documento actualizado:",
      documentoActualizado
    );

    const alumnosActualizados = estudiantes.map((alumno) => {

  if (alumno.matricula === documentoActualizado.matricula) {

return {
  ...alumno,

  documentos: {
    ...alumno.documentos,

[documentoActualizado.tipo]: {
  ...alumno.documentos[documentoActualizado.tipo],
  estado: datos.estado
}
  },

fase:
  datos.estado === "aprobado"
    ? (
        documentoActualizado.tipo === "presentacion"
          ? 3
          : documentoActualizado.tipo === "aceptacion"
          ? 4
          : documentoActualizado.tipo === "compromiso"
          ? 5
          : alumno.fase
      )
    : alumno.fase,

estatus:
  datos.estado === "rechazado"
    ? "Documento rechazado"
    :
  documentoActualizado.tipo === "presentacion"
    ? "Carta de Presentación aprobada"
    : documentoActualizado.tipo === "aceptacion"
    ? "Carta de Aceptación aprobada"
    : documentoActualizado.tipo === "compromiso"
    ? "Estadía autorizada"
    : alumno.estatus
};

  }

  return alumno;

});


setEstudiantes(alumnosActualizados);


const alumnoNuevo = alumnosActualizados.find(
  alumno => alumno.matricula === documentoActualizado.matricula
);


setAlumnoSeleccionado(alumnoNuevo);
actualizarAlumno(alumnoNuevo);



  } catch(error) {

    console.error(
      "Error actualizando documento:",
      error
    );

  }

};





  return (

    <div className="dashboard-vinculacion">


      <div className="sidebar">


        <h2>
          Vinculación
        </h2>


        <button
          onClick={() => setPantalla("inicio")}>
          Inicio
        </button>

        <button 
          onClick={() => setVista("registro")}>
          Registrar estudiante
        </button>

        <button 
          onClick={() => setVista("organizaciones")}>
          Organizaciones
        </button>

        <button onClick={() => setVista("alumnos")}>
          Gestión de Estudiantes
        </button>



      </div>





      <div className="content">



{vista === "alumnos" && (
  <input
    type="text"
    placeholder="🔍 Buscar por nombre o matrícula..."
    value={busqueda}
    onChange={(e) => {
      const texto = e.target.value;
      setBusqueda(texto);

      if (texto.trim() === "") {
  setAlumnoSeleccionado(null);
  setBusqueda("");
  return;
}


const encontrado = estudiantes.find(
  (alumno) =>
    alumno.nombre.toLowerCase().includes(texto.toLowerCase()) ||
    alumno.matricula.includes(texto)
);

if (encontrado) {
  setAlumnoSeleccionado(encontrado);
} else {
  setAlumnoSeleccionado(null);
}
    }}
  />
)}

{
  vista === "organizaciones" ? (

    <Organizaciones
      organizaciones={organizaciones}
      setOrganizaciones={setOrganizaciones}
    />

  ) : vista === "registro" ? (

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
      
      periodo={periodo}
      setPeriodo={setPeriodo}

      anio={anio}
      setAnio={setAnio}

      guardarEstudiante={() =>
        guardarEstudiante(() => setVista("alumnos"))
      }
      setPantalla={() => setVista("alumnos")}
    />

  ) : alumnoSeleccionado ? (

    <ExpedienteAlumno
      alumno={alumnoSeleccionado}
      cerrar={() => {
  setAlumnoSeleccionado(null);
  setBusqueda("");
}}
      actualizarDocumento={actualizarDocumento}
      actualizarAlumno={actualizarAlumno}
      subirDocumento={subirDocumento}
    />

  ) : (

    <ModuloAlumnos
      estudiantes={estudiantes}
      abrirAlumno={(alumno) => setAlumnoSeleccionado(alumno)}
      eliminarAlumno={eliminarAlumno}
      rutaAlumnos={rutaAlumnos}
      guardarRuta={(ruta) => setRutaAlumnos(ruta)}
    />

  )
}



      </div>


    </div>

  );

}


export default DashboardVinculacion;