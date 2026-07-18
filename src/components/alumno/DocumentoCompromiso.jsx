import { useState } from "react";

function DocumentoCompromiso({
  alumnoActual,
  subirCartacompromiso
}) 
{
    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState("");

 return (
  <div className="documento-card">
<h3>Fase 5</h3>

 <h4>Instrucciones para la Carta de Compromiso</h4>
<div className="instrucciones">
<p>En este documento la organización, la Universidad y el alumno se comprometen a aportar lo que les corresponde a fin de que el alumno culmine su proyecto.</p>
<p>Este documento te lo entrega la Dirección de Vinculación y deberás realizar lo siguiente:</p>
<ul>
   <li>Imprime 3 DOCUMENTOS ORIGINALES A COLOR.</li> 
   <li>Los 3 documentos deben firmarse con bolígrafo de TINTA AZUL por:</li> 
   <li>Firma del estudiante en estadía</li> 
   <li>Firma del asesor de la organización</li>
   <li>Realiza la ultima firma en la dirrección de VINCULACIÓN de la UTP</li>
   <li>En la dirección de vinculación te firmaran los 3 originales de la carta compromiso.</li>
   <li>Se quedará una original en la dirección</li>
   <li>Te devolverán 2 para que te quedes con una y la otra la entregues a la organización.</li>
   <li>Escanea a color en formato .PDF y nómbralo de la siguiente manera:</li>
   <li>
      <strong>MATRICULA_COMPROMISO</strong>
   </li>
</ul>
<ul>
    <li>
      <strong>{alumnoActual.matricula}_COMPROMISO.pdf</strong>
    </li>
  </ul>
</div>

<input
  type="file"
  accept=".pdf,application/pdf"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("❌ Solo se permiten archivos PDF.");
      setArchivo(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("❌ El archivo no debe superar los 5 MB.");
      setArchivo(null);
      return;

    if (file.size === 0) {
  setError("❌ El archivo está vacío.");
  setArchivo(null);
  return;
}
    }

const nombreOriginal = file.name.toUpperCase();

const nombreEsperado1 =
`${alumnoActual.matricula}_COMPROMISO.PDF`;

const nombreEsperado2 =
`${alumnoActual.matricula}_COMPROMISO.PDF`;
if (
  nombreOriginal !== nombreEsperado1 &&
  nombreOriginal.normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== nombreEsperado2
) {
  setError(
`❌ El archivo debe llamarse: ${alumnoActual.matricula}_COMPROMISO.pdf` 
  );
  setArchivo(null);
  return;
}
setError("");
    setArchivo(file);
  }}
/>
{error && <p className="error-documento">{error}</p>}

{archivo && (
  <p className="archivo-correcto">
    ✅ Archivo seleccionado: {archivo.name}
  </p>
)}

      <button
  disabled={!archivo || error !== ""}
  onClick={() => subirCartacompromiso(archivo)}
>
  Subir Carta de compromiso
</button>

      <p>
        Carta de compromiso:
        {alumnoActual.documentos.compromiso ? " ✅" : " ❌"}
      </p>
  </div>
  );
}

export default DocumentoCompromiso;