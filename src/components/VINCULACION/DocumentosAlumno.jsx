function DocumentosAlumno({
  alumno,
  actualizarDocumento,
  subirDocumento
}) {


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



  return (

    <div className="documentos-panel">


      <h2>
        📄 Documentos del Expediente
      </h2>



      <div className="documentos-grid">


      {documentos.map((doc)=>{


        const informacion =
          obtenerDocumento(doc.id);



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


              <button>
                👁 Ver
              </button>


              <button>
                ⬇ Descargar
              </button>


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


            </div>


          </div>

        );


      })}


      </div>


    </div>

  );

}


export default DocumentosAlumno;