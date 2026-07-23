
import { useState } from "react";

function DocumentosAlumno({
  alumno,
  actualizarDocumento,
  subirDocumento,
  enviarCartaCompromiso
}) {

    const [documentoVer, setDocumentoVer] = useState(null);


  const documentos = [
    {
      id: "presentacion",
      nombre: "Carta de Presentación"
    },
    {
      id: "aceptacion",
      nombre: "Carta de Aceptación"
    },
    {
      id: "compromiso",
      nombre: "Carta Compromiso"
    }
  ];


  const obtenerDocumento = (id) => {

    const documento = alumno.documentos?.[id];


    if (documento === true) {

      return {
        estado: "Aprobado",
        clase: "aprobado",
        archivo: "Documento registrado"
      };

    }


    if (documento === false || !documento) {

      return {
        estado: "No entregado",
        clase: "rechazado",
        archivo: "Sin archivo"
      };

    }


    if (documento.estado === "rechazado") {

      return {
        estado: "Rechazado",
        clase: "rechazado",
        archivo: documento.archivo
          ? "Archivo cargado"
          : "Sin archivo"
      };

    }


    if (documento.estado === "aprobado") {

      return {
        estado: "Aprobado",
        clase: "aprobado",
        archivo: documento.archivo
          ? "Archivo cargado"
          : "Documento validado"
      };

    }


    return {

      estado:"Pendiente",
      clase:"pendiente",
      archivo: documento.archivo
        ? "Archivo cargado"
        : "Sin archivo"

    };

  };



  const aprobar = (tipo) => {

    actualizarDocumento(tipo,{
      estado:"aprobado"
    });

  };



  const rechazar = (tipo) => {

    const motivo = prompt(
      "Ingrese el motivo del rechazo:"
    );


    if(!motivo) return;


    actualizarDocumento(tipo,{
      estado:"rechazado",
      motivo
    });

  };

  if (documentoVer) {
    return (
      <div className="documentos-panel">

        <button onClick={() => setDocumentoVer(null)}>
          ← Regresar
        </button>

        <iframe
          src={documentoVer}
          title="Documento PDF"
          style={{
            width: "100%",
            height: "80vh",
            border: "none"
          }}
        />

      </div>
    );
  }

  return (

    <div className="documentos-panel">


      <h2>
        📄 Documentos del Expediente
      </h2>



      <div className="documentos-grid">


      {documentos.map((doc)=>{


const informacion = obtenerDocumento(doc.id);
const archivo = alumno.documentos?.[doc.id]?.archivo;

console.log("ARCHIVO:", archivo);

const nombreArchivo =
  alumno.documentos?.[doc.id]?.nombreArchivo || `${doc.nombre}.pdf`;


        return (

          <div
            className="documento-card"
            key={doc.id}
          >


            <h3>
              📄 {doc.nombre}
            </h3>


            <p>

              Estado:

              <span
                className={
                  `estado-documento ${informacion.clase}`
                }
              >

                {informacion.estado}

              </span>

            </p>


            <p>

              Archivo:

              <strong>
                {informacion.archivo}
              </strong>

            </p>


            <div className="acciones-documento">


{archivo && (
  <>
    <button onClick={() => setDocumentoVer(archivo)}>
      👁 Ver
    </button>

    <a
      href={archivo}
      download={nombreArchivo}
    >
      <button>⬇ Descargar</button>
    </a>
  </>
)}

              <button
                onClick={()=>
                  aprobar(doc.id)
                }
              >
                ✔ Aprobar
              </button>


              <button
                onClick={()=>
                  rechazar(doc.id)
                }
              >
                ❌ Rechazar
              </button>
{
  doc.id === "aceptacion" && (

    alumno.cartaCompromiso?.enviada ? (

      <button disabled>
        ✅ Carta Compromiso enviada
      </button>

    ) : (

      <button
        onClick={() =>
          enviarCartaCompromiso(alumno)
        }
      >
        📧 Enviar Carta Compromiso
      </button>

    )

  )
}

            </div>


          </div>

        );


      })}


      </div>


    </div>

  );

}


export default DocumentosAlumno;
