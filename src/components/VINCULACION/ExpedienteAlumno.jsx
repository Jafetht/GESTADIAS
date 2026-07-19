import { useState } from "react";
import DocumentosAlumno from "./DocumentosAlumno";


function ExpedienteAlumno({
  alumno,
  cerrar,
  actualizarDocumento
}) {


  const [pestana, setPestana] = useState("datos");


  if (!alumno) return null;



  return (

    <div className="expediente">


      <button
        className="btn-regresar"
        onClick={cerrar}
      >
        ← Regresar
      </button>



      <div className="encabezado-expediente">


        <div className="avatar-expediente">

          {
            alumno.nombre
            ? alumno.nombre.charAt(0).toUpperCase()
            : "A"
          }

        </div>



        <div className="info-principal">


          <h2>
            {alumno.nombre}
          </h2>


          <p>
            Matrícula: {alumno.matricula}
          </p>


          <p>
            {alumno.carrera}
          </p>


        </div>



        <div className="estado-principal">

          <span>
            Estado
          </span>


          <strong>
            🟢 {alumno.estatus}
          </strong>


        </div>



      </div>





      <div className="tabs-expediente">


        <button
          className={
            pestana === "datos"
            ? "tab-activa"
            : "tab"
          }
          onClick={() =>
            setPestana("datos")
          }
        >
          Datos
        </button>



        <button
          className={
            pestana === "documentos"
            ? "tab-activa"
            : "tab"
          }
          onClick={() =>
            setPestana("documentos")
          }
        >
          Documentos
        </button>



        <button
          className={
            pestana === "observaciones"
            ? "tab-activa"
            : "tab"
          }
          onClick={() =>
            setPestana("observaciones")
          }
        >
          Observaciones
        </button>



      </div>







      {
        pestana === "datos" && (

          <div className="ficha-alumno">


            <div className="datos-grid">


              <div className="dato-card">

                <span>
                  Matrícula
                </span>

                <strong>
                  {alumno.matricula}
                </strong>

              </div>



              <div className="dato-card">

                <span>
                  Carrera
                </span>

                <strong>
                  {alumno.carrera}
                </strong>

              </div>



              <div className="dato-card">

                <span>
                  Correo
                </span>

                <strong>
                  {alumno.correo}
                </strong>

              </div>



              <div className="dato-card">

                <span>
                  Fase actual
                </span>

                <strong>
                  Fase {alumno.fase}
                </strong>

              </div>



              <div className="dato-card">

                <span>
                  Organización
                </span>

                <strong>
                  {
                    alumno.organizacion
                    || "Sin asignar"
                  }
                </strong>

              </div>



              <div className="dato-card">

                <span>
                  Estatus
                </span>

                <strong>
                  {alumno.estatus}
                </strong>

              </div>


            </div>


          </div>

        )
      }








      {
        pestana === "documentos" && (

          <DocumentosAlumno

            alumno={alumno}

            actualizarDocumento={
              actualizarDocumento
            }

          />

        )
      }








      {
        pestana === "observaciones" && (

          <div className="panel-expediente">


            <h3>
              📝 Observaciones del alumno
            </h3>



            <textarea

              className="campo-observaciones"

              rows="8"

              placeholder="
              Escriba observaciones sobre el alumno,
              seguimiento de estadía o comentarios importantes...
              "

            />



            <br />



            <button
              className="btn-guardar-observacion"
            >
              💾 Guardar observación
            </button>



          </div>

        )
      }




    </div>

  );

}


export default ExpedienteAlumno;