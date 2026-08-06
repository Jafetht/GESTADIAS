import { useState } from "react";


function Organizaciones({
  alumnoActual,
  organizacionesFiltradas,
  seleccionarOrganizacion,
  continuarSinOrganizacion,
  solicitarCambioOrganizacion,
  registrarSolicitudOrganizacion
}) {
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [nuevaOrganizacion, setNuevaOrganizacion] = useState({
  razonSocial: "",
  direccion: "",
  contacto: "",
  puesto: "",
  telefono: "",
  correo: ""
});

const enviarSolicitud = () => {

  const asunto = 
  `Solicitar convenio de la organización ${nuevaOrganizacion.razonSocial}`;

  const cuerpo =
`Buen día.

Soy el estudiante de ${alumnoActual.nivel || "[NIVEL TSU]"} ${alumnoActual.carrera} de la Universidad Tecnológica del Poniente.

Y estos son los datos de la empresa para convenio:

Razón social: ${nuevaOrganizacion.razonSocial}

Dirección: ${nuevaOrganizacion.direccion}

Nombre del contacto: ${nuevaOrganizacion.contacto}

Cargo/Puesto: ${nuevaOrganizacion.puesto}

Teléfono: ${nuevaOrganizacion.telefono}

Correo: ${nuevaOrganizacion.correo}
`;

  const url =
  `https://mail.google.com/mail/?view=cm&fs=1` +
  `&to=${encodeURIComponent(
    "direccion.vinculacion@utponiente.edu.mx"
  )}` +
  `&su=${encodeURIComponent(asunto)}` +
  `&body=${encodeURIComponent(cuerpo)}`;


  window.open(url, "_blank");
  setSolicitudEnviada(true);


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
          <h3>Fase 1</h3>

          <h3>"Una vez que una organización te haya aceptado, selecciónala aquí."</h3>

<div className="instrucciones">

<p>
       Te presentamos el Padrón de Organizaciones, también conocido como Catálogo de Organizaciones.
Este apartado tiene como propósito brindarte información sobre las organizaciones disponibles 
para realizar tu estadía profesional. 

Aquí podrás consultar las opciones disponibles, seleccionar la organización
donde deseas realizar tu estadía profesional o solicitar a Vinculación la
gestión de convenio con una nueva organización.
      </p>
</div>
         <table className="tabla-organizaciones">
    <thead>
        <tr>
            <th>No.</th>
            <th>Organizaciones disponibles</th>
            <th>Espacios disponibles</th>
            <th>Información</th>
            <th>Seleccionar</th>
        </tr>
    </thead>

    <tbody>
        {organizacionesFiltradas.map((organizacion, index) => (
            <tr key={index}>
                <td>{index + 1}</td>

                <td>{organizacion.nombre}</td>
                <td>{organizacion.espaciosDisponibles || 0}</td>

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
  <button
  className="btn-gmail"
  onClick={() => {
    const url =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(organizacionSeleccionada.correo)}` +
      `&su=${encodeURIComponent(
        `Solicitud de Estadía Profesional - ${alumnoActual.nombre}`
      )}` +
      `&body=${encodeURIComponent(
`Buen día

Mi nombre es ${alumnoActual.nombre}, estudiante de la Universidad Tecnológica del Poniente, de la carrera de ${alumnoActual.carrera}.

Por medio del presente me permito expresar mi interés en realizar mi Estadía Profesional en ${organizacionSeleccionada.nombre}.

Agradezco de antemano el tiempo brindado para considerar mi solicitud y quedo atento(a) a cualquier información adicional o documentación que sea necesaria.

Sin más por el momento, le envío un cordial saludo.

Atentamente,

${alumnoActual.nombre}
Matrícula: ${alumnoActual.matricula}
Universidad Tecnológica del Poniente`
      )}`;

    window.open(url, "_blank");
  }}
>
  📧 Enviar solicitud por Gmail
</button>
<p className="nota-gmail">
⚠ Utilizan tu correo institucional de la Universidad Tecnológica del Poniente
para poder enviar esta solicitud.
</p>
</p>


<button onClick={() => setOrganizacionSeleccionada(null)}>Cerrar</button>

</div>
</div>
)}

{mostrarRegistro && (

<div className="modal-fondo">
<div className="modal">
<h2>Solicitar convenio de organización</h2>
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


{solicitudEnviada && (
  <div className="mensaje-convenio">
    <h3>✅ Solicitud enviada</h3>

    <p>
      Vinculación revisará la información y realizará el proceso de convenio
      con la organización solicitada.
    </p>

    <p>
      Mientras Vinculación realiza el proceso de convenio, puedes continuar con tu proceso de estadía. 
      Una vez que la organización sea agregada al Padrón de Organizaciones, 
      podrás seleccionarla desde este mismo apartado.
    </p>

<button
  className="btn-seleccionar"
  onClick={continuarSinOrganizacion}
>
  Continuar sin organización seleccionada
</button>




  </div>
)}


<div className="registrar-org">
<h3>
¿No encuentras la organización donde deseas realizar tu estadía?
</h3>
<button
  onClick={() => setMostrarRegistro(true)}
>
  Solicitar convenio de organización
</button>
</div>
        </>
      )}

    </>
  )
}


export default Organizaciones;