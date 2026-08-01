import { useState } from "react";


function MenuMisDocumentos({
  alumnoActual,
  
  borrarDocumento
}) {

const [pdfSeleccionado, setPdfSeleccionado] = useState(null);

return (
  <div className="documentos-layout">

    <div className="lista-documentos">

      <div className="documento-card">
        <h4>Fase 2</h4>
        <p className="nombre-documento">Carta de Presentación</p>
        
          <strong>
{alumnoActual.documentos.presentacion.estado === "sin_subir"
    ? "❌ Pendiente"
    : alumnoActual.documentos.presentacion.estado === "aprobado"
    ? "✔ Aprobado"
    : "🕒 En revisión"}
</strong>

<p>
  Archivo:
  <strong>
    {alumnoActual.documentos.presentacion.nombreArchivo || "Sin archivo"}
  </strong>
</p>
        
        {alumnoActual.documentos.presentacion.estado !== "sin_subir" && (
          <div>
<button
 onClick={() =>
   setPdfSeleccionado(
     alumnoActual.documentos.presentacion.archivo
   )
 }
>
👁️ Ver
</button>
<button onClick={() =>borrarDocumento("presentacion")}>
🗑️ Borrar
</button>
          </div>
        )}
      </div>


      <div className="documento-card">
        <h4>Fase 3</h4>
        <p className="nombre-documento">Carta de Aceptación</p>

        <strong>
{alumnoActual.documentos.aceptacion.estado === "sin_subir"
    ? "❌ Pendiente"
    : alumnoActual.documentos.aceptacion.estado === "aprobado"
    ? "✔ Aprobado"
    : "🕒 En revisión"}
</strong>

<p>
  Archivo:
  <strong>
    {alumnoActual.documentos.aceptacion.nombreArchivo || "Sin archivo"}
  </strong>
</p>

        {alumnoActual.documentos.aceptacion.estado !== "sin_subir" && (
          <div>
            <button
onClick={() =>
  setPdfSeleccionado(
    alumnoActual.documentos.aceptacion.archivo
  )
}
            >
              👁️ Ver
            </button>
<button onClick={() => borrarDocumento("aceptacion")}>
🗑️ Borrar
</button>
          </div>
        )}
      </div>


      <div className="documento-card">
        <h4>Fase 4</h4>
        <p className="nombre-documento">Carta de Compromiso</p>

<strong>
{alumnoActual.documentos.compromiso.estado === "sin_subir"
    ? "❌ Pendiente"
    : alumnoActual.documentos.compromiso.estado === "aprobado"
    ? "✔ Aprobado"
    : "🕒 En revisión"}
</strong>

<p>
  Archivo:
  <strong>
    {alumnoActual.documentos.compromiso.nombreArchivo || "Sin archivo"}
  </strong>
</p>

        {alumnoActual.documentos.compromiso.estado !== "sin_subir" && (
          <div>
            <button
onClick={() =>
  setPdfSeleccionado(
    alumnoActual.documentos.compromiso.archivo
  )
}
            >
              👁️ Ver
            </button>
<button onClick={() => borrarDocumento("compromiso")}>
    🗑️ Borrar
</button>
          </div>
        )}
      </div>



    </div>
  {pdfSeleccionado && (
    <div className="visor-pdf">
      <h3>Vista previa del documento</h3>

      <iframe
        src={pdfSeleccionado}
        width="100%"
        height="700px"
        title="Visor PDF"
      />

      <button onClick={() => setPdfSeleccionado(null)}>
        Cerrar visor
      </button>
    </div>
  )}
  </div>
  );
}

export default MenuMisDocumentos;