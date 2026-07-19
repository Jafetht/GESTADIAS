function SubirDocumento({
  tipo,
  nombre,
  subirDocumento
}) {


  const seleccionarArchivo = (e)=>{

    const archivo = e.target.files[0];

    if(!archivo) return;


    subirDocumento(tipo, archivo);

  };


  return (

    <div className="subir-documento">

      <h3>{nombre}</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={seleccionarArchivo}
      />

    </div>

  );

}


export default SubirDocumento;