import { useState, useEffect } from "react";
import DocumentosAlumno from "./DocumentosAlumno";


function ExpedienteAlumno({
  alumno,
  cerrar,
  actualizarDocumento,
  actualizarAlumno
  
}) {


  const [pestana, setPestana] = useState("datos");
  const [documentos, setDocumentos] = useState([]);
  

useEffect(() => {

  if(!alumno) return;


  fetch(
    `https://gestadias.onrender.com/documentos/alumno/${alumno.matricula}`
  )
  .then(res => res.json())
  .then(data => {

    console.log("DOCUMENTOS RECIBIDOS:", data);

    console.log("DOCUMENTOS DEL ALUMNO EN VIN:", data);

    setDocumentos(data);

  })
  .catch(error => {

    console.error(
      "Error cargando documentos:",
      error
    );

  });


}, [alumno]); 



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


<div className="dato-card dato-correo">

  <span>
    ✉ Correo institucional
  </span>

  <strong>
    {alumno.correo}
  </strong>

  <a
    href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
      alumno.correo
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-gmail-expediente"
  >
    📧 Abrir Gmail
  </a>

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

  documentos={documentos || []}

  actualizarDocumento={actualizarDocumento}

  actualizarAlumno={actualizarAlumno}

/>

        )
      }

    </div>

  );

}

export default ExpedienteAlumno;