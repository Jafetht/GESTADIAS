import { useState } from "react";
import ModuloAlumnos from "./ModuloAlumnos";
import ExpedienteAlumno from "./ExpedienteAlumno";

function DashboardVinculacion({
  estudiantes,
  setEstudiantes,
  busqueda,
  setBusqueda,
  setPantalla
}) {

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);


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









  // ENVIAR CARTA COMPROMISO

const enviarCartaCompromiso = (alumno) => {

  const asunto = "CARTA COMPROMISO - Dirección de Vinculación";

  const mensaje = `Estimado(a) estudiante:

Por este medio se comparte su Carta Compromiso correspondiente al proceso de Estadía Profesional.

IMPORTANTE:
Este trámite se realiza de manera presencial.

Le solicitamos recabar las siguientes firmas utilizando TINTA AZUL:

• Tu firma.
• La firma de tu asesor(a) de la organización.

Posteriormente deberás acudir al Departamento de Vinculación para obtener la firma del Director(a) de Vinculación.

Atentamente.

Dirección de Vinculación
Universidad Tecnológica del Poniente`;

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(alumno.correo)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`,
    "_blank"
  );

  const actualizados = estudiantes.map((e) => {

    if (e.matricula === alumno.matricula) {

      return {

        ...e,

        cartaCompromiso: {

          enviada: true,

          fechaEnvio: new Date().toLocaleString()

        }

      };

    }

    return e;

  });

  setEstudiantes(actualizados);

  setAlumnoSeleccionado(

    actualizados.find(
      e => e.matricula === alumno.matricula
    )

  );

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
          onClick={() => setPantalla("inicio")}
        >
          Inicio
        </button>


      </div>





      <div className="content">



        <input

          placeholder="Buscar alumno..."

          value={busqueda}

          onChange={(e)=>
            setBusqueda(e.target.value)
          }

        />

        {
          alumnoSeleccionado ? (


<ExpedienteAlumno
  alumno={alumnoSeleccionado}
  cerrar={() => setAlumnoSeleccionado(null)}
  actualizarDocumento={actualizarDocumento}
  subirDocumento={subirDocumento}
  enviarCartaCompromiso={enviarCartaCompromiso}
/>


          ) : (



            <ModuloAlumnos


              estudiantes={estudiantes}



              abrirAlumno={(alumno)=>{

                setAlumnoSeleccionado(alumno);

              }}



              rutaAlumnos={
                rutaAlumnos
              }



              guardarRuta={(ruta)=>{

                setRutaAlumnos(ruta);

              }}


            />



          )

        }



      </div>


    </div>

  );

}


export default DashboardVinculacion;