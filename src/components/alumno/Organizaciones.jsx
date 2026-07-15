function Organizaciones({
  alumnoActual,
  organizacionesFiltradas,
  seleccionarOrganizacion,
  solicitarCambioOrganizacion
}) {

  return (
    <>

      {!alumnoActual.organizacion && (
        <>
          <h3>Fase 2</h3>

          <h3>Organizaciones disponibles</h3>

          {organizacionesFiltradas.map((organizacion) => (

  <button
    key={organizacion.id}
    onClick={() => seleccionarOrganizacion(organizacion)}
  >
    {organizacion.nombre}
  </button>

))}

        </>
      )}


      {alumnoActual.organizacion && (

        <div className="organizacion-info">

          <h3>Organización seleccionada</h3>

          <p>
            <strong>Organización:</strong>
            {alumnoActual.datosOrganizacion?.nombre}
          </p>


          <p>
            <strong>Convenio:</strong>

            {
              alumnoActual.datosOrganizacion.convenio
              ? ' ✅ Convenio vigente'
              : ' ⚠ Pendiente de convenio'
            }

          </p>


          <p>
            <strong>Carreras:</strong>

            {
              alumnoActual.datosOrganizacion?.carreras?.join(', ')
            }

          </p>


<button onClick={solicitarCambioOrganizacion}>
  Solicitar cambio de Organización
</button>


        </div>

      )}

    </>
  )
}


export default Organizaciones;