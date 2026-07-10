function UnidadEconomica({
  alumnoActual,
  unidadesFiltradas,
  seleccionarUnidadEconomica,
  solicitarCambioUnidad
}) {

  return (
    <>

      {!alumnoActual.unidadEconomica && (
        <>
          <h3>Fase 2</h3>

          <h3>Unidades Económicas disponibles</h3>

          {unidadesFiltradas.map((unidad) => (

            <button
              key={unidad.id}
              onClick={() => seleccionarUnidadEconomica(unidad)}
            >
              {unidad.nombre}
            </button>

          ))}

        </>
      )}


      {alumnoActual.unidadEconomica && (

        <div className="unidad-info">

          <h3>Unidad Económica seleccionada</h3>

          <p>
            <strong>Empresa:</strong>
            {alumnoActual.datosUnidad?.nombre}
          </p>


          <p>
            <strong>Convenio:</strong>

            {
              alumnoActual.datosUnidad.convenio
              ? ' ✅ Convenio vigente'
              : ' ⚠ Pendiente de convenio'
            }

          </p>


          <p>
            <strong>Carreras:</strong>

            {
              alumnoActual.datosUnidad?.carreras?.join(', ')
            }

          </p>


          <button onClick={solicitarCambioUnidad}>
            Solicitar cambio de Unidad Económica
          </button>


        </div>

      )}

    </>
  )
}


export default UnidadEconomica