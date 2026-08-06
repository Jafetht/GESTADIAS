import { useState } from "react";


function ModuloAlumnos({
  estudiantes,
  abrirAlumno,
  eliminarAlumno,
  rutaAlumnos,
  guardarRuta
}) {


  const [nivel, setNivel] = useState(
    rutaAlumnos.nivel
  );


  const [generacionSeleccionada, setGeneracionSeleccionada] =
  useState(rutaAlumnos.generacionSeleccionada);

  const [carreraSeleccionada, setCarreraSeleccionada] =
  useState(rutaAlumnos.carreraSeleccionada);

  const [nivelAcademicoSeleccionado, setNivelAcademicoSeleccionado] =
  useState(rutaAlumnos.nivelAcademicoSeleccionado || null);
  


const generaciones = [
  ...new Set(
    estudiantes.map(alumno => alumno.generacion)
  )
].sort((a, b) => {

  const anioA = Number(a.split(" ").pop());
  const anioB = Number(b.split(" ").pop());

  // Primero ordenar por año (más reciente arriba)
  if (anioA !== anioB) {
    return anioB - anioA;
  }

  // Si es el mismo año:
  // Enero - Abril arriba de Mayo - Agosto
  if (a.includes("Enero")) return -1;
  if (b.includes("Enero")) return 1;

  return 0;

});



  const seleccionarGeneracion = (generacion)=>{

    setGeneracionSeleccionada(generacion);

    setNivel("nivel");


guardarRuta({
  nivel: "nivel",
  generacionSeleccionada: generacion,
  nivelAcademicoSeleccionado: null,
  carreraSeleccionada: null
});

  };


  const seleccionarNivelAcademico = (nivel) => {

  setNivelAcademicoSeleccionado(nivel);

  setNivel("carreras");

  guardarRuta({
    nivel: "carreras",
    generacionSeleccionada,
    nivelAcademicoSeleccionado: nivel,
    carreraSeleccionada: null
  });

};


  const seleccionarCarrera = (carrera)=>{

    setCarreraSeleccionada(carrera);

    setNivel("alumnos");


guardarRuta({
  nivel: "alumnos",
  generacionSeleccionada,
  nivelAcademicoSeleccionado,
  carreraSeleccionada: carrera
});

  };



  const volver = ()=>{


if(nivel==="alumnos"){

    setNivel("carreras");

    setCarreraSeleccionada(null);

    guardarRuta({
        nivel:"carreras",
        generacionSeleccionada,
        nivelAcademicoSeleccionado,
        carreraSeleccionada:null
    });

}
else if(nivel==="carreras"){

    setNivel("nivel");

    setCarreraSeleccionada(null);

    guardarRuta({
        nivel:"nivel",
        generacionSeleccionada,
        nivelAcademicoSeleccionado:null,
        carreraSeleccionada:null
    });

}
else if(nivel==="nivel"){

    setNivel("generaciones");

    setGeneracionSeleccionada(null);
    setNivelAcademicoSeleccionado(null);

    guardarRuta({
        nivel:"generaciones",
        generacionSeleccionada:null,
        nivelAcademicoSeleccionado:null,
        carreraSeleccionada:null
    });

}


  };



const alumnosGeneracion = estudiantes.filter(
  alumno =>
    alumno.generacion === generacionSeleccionada &&
    alumno.nivelAcademico === nivelAcademicoSeleccionado
);



  const carreras = [
    ...new Set(
      alumnosGeneracion.map(alumno=>alumno.carrera)
    )
  ];



const alumnosCarrera = estudiantes.filter(
  alumno =>
    alumno.generacion === generacionSeleccionada &&
    alumno.nivelAcademico === nivelAcademicoSeleccionado &&
    alumno.carrera === carreraSeleccionada
);

const anioGeneracion = generacionSeleccionada
  ? generacionSeleccionada.split(" ").pop()
  : "";


return (

<div className="modulo-alumnos">


<h2>👨‍🎓 Gestión de Estudiantes</h2>



{nivel!=="generaciones" && (

<button
className="btn-regresar"
onClick={volver}
>
← Regresar
</button>

)}




{nivel==="generaciones" && (

<div>

<h3>Seleccione generación</h3>


{generaciones.map(generacion=>(

<div
key={generacion}
className="card-modulo"
onClick={()=>seleccionarGeneracion(generacion)}
>

<h3>{generacion}</h3>

<p>
Consultar alumnos y carreras disponibles
</p>

<span>
Ver carreras →
</span>

</div>

))}

</div>

)}


{nivel==="nivel" && (

<div>

<h3>
  {generacionSeleccionada} - {nivelAcademicoSeleccionado}
</h3>

<div
className="card-modulo"
onClick={() =>
  seleccionarNivelAcademico(
    generacionSeleccionada.includes("Enero")
      ? "Licenciatura"
      : "TSU"
  )
}
>

<h3>
🏢 Estadías {
  generacionSeleccionada.includes("Enero")
    ? "Licenciatura"
    : "TSU"
} {anioGeneracion}
</h3>

<p>
Consultar alumnos y carreras disponibles
</p>

<span>
Ver carreras →
</span>

</div>

</div>

)}


{nivel==="carreras" && (

<div>

<h3>{generacionSeleccionada}</h3>


{carreras.map(carrera=>(

<div
key={carrera}
className="card-modulo"
onClick={()=>seleccionarCarrera(carrera)}
>

<h3>
🏢 {carrera}
</h3>

<p>
Alumnos registrados en esta carrera
</p>

<span>
Ver alumnos →
</span>

</div>

))}


</div>

)}






{nivel==="alumnos" && (

<div>


<h3>🏢 {carreraSeleccionada}</h3>




{alumnosCarrera.map(alumno => (

  <div
    key={alumno.matricula}
    className="card-alumno"
    onClick={() => abrirAlumno(alumno)}
  >

    <div className="alumno-info">

      <strong>
        {alumno.matricula}
      </strong>

      <span>
        {alumno.nombre}
      </span>

    </div>


    <div className="documentos-estado">

      <span>
        Presentación { alumno.documentos.presentacion.estado === "sin_subir" ? "✖" : "✔"}
      </span>

      <span>
        Aceptación {alumno.documentos.aceptacion.estado === "sin_subir" ? "✖" : "✔"}
      </span>

      <span>
        Compromiso {alumno.documentos.compromiso.estado === "sin_subir" ? "✖" : "✔"}
      </span>

    </div>


    <button
  className="btn-eliminar-alumno"
  onClick={(e) => {
    e.stopPropagation();
    eliminarAlumno(alumno.matricula);
  }}
>
  🗑 Borrar estudiante
</button>


  </div>

))}



</div>

)}



</div>

);


}


export default ModuloAlumnos;