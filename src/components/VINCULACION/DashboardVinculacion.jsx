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


    };


    lector.readAsDataURL(archivo);

  };





  // ACTUALIZAR ESTADO DEL DOCUMENTO

  const actualizarDocumento = (
    tipoDocumento,
    datos
  ) => {


    const actualizados = estudiantes.map((alumno) => {


      if (
        alumno.matricula === alumnoSeleccionado.matricula
      ) {


        return {

          ...alumno,

          documentos: {

            ...alumno.documentos,

            [tipoDocumento]: {

              ...alumno.documentos?.[tipoDocumento],

              ...datos

            }

          }

        };

      }


      return alumno;


    });



    setEstudiantes(actualizados);



    const alumnoActualizado = actualizados.find(
      alumno =>
        alumno.matricula === alumnoSeleccionado.matricula
    );


    setAlumnoSeleccionado(alumnoActualizado);


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


      </div>





      <div className="content">



{vista === "alumnos" && (
  <input
    placeholder="Buscar alumno..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
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
      guardarEstudiante={() =>
        guardarEstudiante(() => setVista("alumnos"))
      }
      setPantalla={() => setVista("alumnos")}
    />

  ) : alumnoSeleccionado ? (

    <ExpedienteAlumno
      alumno={alumnoSeleccionado}
      cerrar={() => setAlumnoSeleccionado(null)}
      actualizarDocumento={actualizarDocumento}
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