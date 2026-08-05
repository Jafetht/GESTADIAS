import { useState } from "react";


function DocumentosAlumno({
  alumno,
  documentos = [],
  actualizarDocumento,
  actualizarAlumno
}) {

const [pdfSeleccionado, setPdfSeleccionado] = useState(null);

const listaDocumentos = [
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


const obtenerDocumento = (tipo) => {

  const documento = documentos.find(
    doc => doc.tipo === tipo
  );


  if(!documento){

    return {
      estado:"No entregado",
      clase:"rechazado",
      archivo:"Sin archivo"
    };

  }


  if(documento.estado === "aprobado"){

    return {
      estado:"Aprobado",
      clase:"aprobado",
      archivo:documento.nombre
    };

  }


  if(documento.estado === "rechazado"){

    return {
      estado:"Rechazado",
      clase:"rechazado",
      archivo:documento.nombre
    };

  }


  return {
    estado:"Pendiente",
    clase:"pendiente",
    archivo:documento.nombre
  };

};



const aprobar = (tipo)=>{

 const documento = documentos.find(
   d=>d.tipo===tipo
 );

 if(!documento) return;


 actualizarDocumento(documento.id,{
   estado:"aprobado"
 });

};



  const rechazar = (tipo) => {

    const motivo = prompt(
      "Ingrese el motivo del rechazo:"
    );


    if(!motivo) return;


const documento = documentos.find(
 d => d.tipo === tipo
);

if(!documento) return;

actualizarDocumento(documento.id,{
 estado:"rechazado",
 motivo
});

  };



  return (

    <div>
      <h1>
        📄 Documentos del Expediente
      </h1>
    <div className="documentos-layout">
      <div className="lista-documentos">
      


      {listaDocumentos.map((doc)=>{


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


<button
  onClick={() => {

    const documentoReal = documentos.find(
      d => d.tipo === doc.id
    );

    if(documentoReal){

      setPdfSeleccionado(
        `http://localhost:3001/${documentoReal.ruta}`
      );

    }

  }}
>
👁 Ver
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

{doc.id === "aceptacion" && (
  <div className="carta-compromiso-control">

    <p>
      Descargar formato editable de la Carta Compromiso del estudiante.
    </p>

<a
  href="/FORMATO-COMPROMISO-EDITABLE-CARTA.docx"
  download
>
  <button>
    📥 Descargar formato
  </button>
</a>

<label>
  <input
    type="checkbox"
    checked={alumno.cartaCompromisoEnviada || false}
    onChange={(e) => {

      const actualizado = {
        ...alumno,
        cartaCompromisoEnviada: e.target.checked
      };

      actualizarAlumno(actualizado);

    }}
  />

  Se envió carta al estudiante
</label>

  </div>
)}

          </div>

        );


      })}


      </div>

      {pdfSeleccionado && (
  <div className="visor-pdf">

    <h3>
      Vista previa del documento
    </h3>

    <iframe
      src={pdfSeleccionado}
      title="Vista previa PDF"
    />

    <button
      onClick={() => setPdfSeleccionado(null)}
    >
      Cerrar visor
    </button>

  </div>
)}

</div>

    </div>
  
  );

}


export default DocumentosAlumno;