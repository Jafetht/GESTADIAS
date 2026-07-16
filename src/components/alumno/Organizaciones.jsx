import { useState } from "react";


function Organizaciones({
  alumnoActual,
  organizacionesFiltradas,
  seleccionarOrganizacion,
  solicitarCambioOrganizacion,
  registrarSolicitudOrganizacion
}) {
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [nuevaOrganizacion, setNuevaOrganizacion] = useState({
  razonSocial: "",
  direccion: "",
  contacto: "",
  puesto: "",
  telefono: "",
  correo: ""
});
const enviarSolicitud = () => {

  registrarSolicitudOrganizacion(nuevaOrganizacion);
  
  seleccionarOrganizacion({
  nombre: nuevaOrganizacion.razonSocial,
  direccion: nuevaOrganizacion.direccion,
  contacto: nuevaOrganizacion.contacto,
  puesto: nuevaOrganizacion.puesto,
  telefono: nuevaOrganizacion.telefono,
  correo: nuevaOrganizacion.correo,
  enProceso: true
});

  alert("Solicitud enviada correctamente a Vinculación.");

  setNuevaOrganizacion({
    razonSocial: "",
    direccion: "",
    contacto: "",
    puesto: "",
    telefono: "",
    correo: ""
  });

  setMostrarRegistro(false);

};



  return (
    <>
            {!alumnoActual.organizacion && (
                <>
          <h3>Fase 2</h3>

          <h3>"Una vez que una organización te haya aceptado, selecciónala aquí."</h3>

<div className="instrucciones">

<p>
       Te presentamos el Padrón de Organizaciones, también conocido como Catálogo de Organizaciones.
Este apartado tiene como propósito brindarte información sobre las organizaciones disponibles 
para realizar tu estadía profesional. 

Aquí podrás consultar las opciones disponibles, seleccionar la organización de tu interés 
y solicitar una vacante utilizando tu correo institucional, acompañado de una redacción 
personalizada generada automáticamente con tus datos.
      </p>
</div>
         <table className="tabla-organizaciones">
    <thead>
        <tr>
            <th>No.</th>
            <th>Organizaciones disponibles</th>
            <th>Información</th>
            <th>Seleccionar</th>
        </tr>
    </thead>

    <tbody>
        {organizacionesFiltradas.map((organizacion, index) => (
            <tr key={index}>
                <td>{index + 1}</td>

                <td>{organizacion.nombre}</td>

                <td>
                    <button
                        className="btn-info"
                        onClick={() =>
                            setOrganizacionSeleccionada(organizacion)
                        }
                    >
                        Ver información
                    </button>
                </td>

                <td>
                    <button
                        className="btn-seleccionar"
                        onClick={() =>
                            seleccionarOrganizacion(organizacion)
                        }
                    >
                        Seleccionar
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
{organizacionSeleccionada && (
<div className="modal-fondo">

<div className="modal">

<h2>{organizacionSeleccionada.nombre}</h2>

<p><strong>Dirección:</strong> {organizacionSeleccionada.direccion}</p>

<p><strong>Contacto:</strong> {organizacionSeleccionada.contacto}</p>

<p><strong>Puesto:</strong> {organizacionSeleccionada.puesto}</p>

<p><strong>Teléfono:</strong> {organizacionSeleccionada.telefono}</p>

<p>
  <strong>Correo:</strong>{" "}
  <a
    className="correo-link"
    href={`mailto:${organizacionSeleccionada.correo}?subject=${encodeURIComponent(
      `Solicitud de Estadía Profesional - ${alumnoActual.nombre}`
    )}&body=${encodeURIComponent(
`Buen día

Mi nombre es ${alumnoActual.nombre}, estudiante de la Universidad Tecnológica del Poniente, de la carrera de ${alumnoActual.carrera}.

Por medio del presente me permito expresar mi interés en realizar mi Estadía Profesional en ${organizacionSeleccionada.nombre}.

Agradezco de antemano el tiempo brindado para considerar mi solicitud y quedo atento(a) a cualquier información adicional o documentación que sea necesaria.

Sin más por el momento, le envío un cordial saludo.

Atentamente,

${alumnoActual.nombre}
Matrícula: ${alumnoActual.matricula}
Universidad Tecnológica del Poniente`
    )}`}
  >
    {organizacionSeleccionada.correo}
  </a>
</p>


<button onClick={() => setOrganizacionSeleccionada(null)}>Cerrar</button>

</div>
</div>
)}

{mostrarRegistro && (

<div className="modal-fondo">
<div className="modal">
<h2>Solicitud de nueva organización</h2>
<input
placeholder="Razón social"
value={nuevaOrganizacion.razonSocial}
onChange={(e)=>
setNuevaOrganizacion({
...nuevaOrganizacion,
razonSocial:e.target.value
})
}
/>
<input
placeholder="Dirección"
value={nuevaOrganizacion.direccion}
onChange={(e)=>
setNuevaOrganizacion({
...nuevaOrganizacion,
direccion:e.target.value
})
}
/>
<input
placeholder="Nombre del contacto"
value={nuevaOrganizacion.contacto}
onChange={(e)=>
setNuevaOrganizacion({
...nuevaOrganizacion,
contacto:e.target.value
})
}
/>
<input
placeholder="Cargo / Puesto"
value={nuevaOrganizacion.puesto}
onChange={(e)=>
setNuevaOrganizacion({
...nuevaOrganizacion,
puesto:e.target.value
})
}
/>
<input
placeholder="Teléfono"
value={nuevaOrganizacion.telefono}
onChange={(e)=>
setNuevaOrganizacion({
...nuevaOrganizacion,
telefono:e.target.value
})
}
/>
<input
placeholder="Correo"
value={nuevaOrganizacion.correo}
onChange={(e)=>
setNuevaOrganizacion({
...nuevaOrganizacion,
correo:e.target.value
})
}
/>

<button onClick={enviarSolicitud}>
Enviar solicitud
</button>

<button
onClick={() => setMostrarRegistro(false)}
>
Cancelar
</button>
</div>
</div>
)}

<div className="registrar-org">
<h3>
¿La organización que buscas no aparece?
</h3>
<button
  onClick={() => setMostrarRegistro(true)}
>
  Registrar nueva organización
</button>
</div>
        </>
      )}

    </>
  )
}


export default Organizaciones;