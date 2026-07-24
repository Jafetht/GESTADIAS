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



  const generaciones = [
    "🏢 Estadías TSU 2026",
    "🏢 Estadías Licenciatura 2026"
  ];



  const seleccionarGeneracion = (generacion)=>{

    setGeneracionSeleccionada(generacion);

    setNivel("carreras");


    guardarRuta({
      nivel:"carreras",
      generacionSeleccionada:generacion,
      carreraSeleccionada:null
    });

  };



  const seleccionarCarrera = (carrera)=>{

    setCarreraSeleccionada(carrera);

    setNivel("alumnos");


    guardarRuta({
      nivel:"alumnos",
      generacionSeleccionada,
      carreraSeleccionada:carrera
    });

  };



  const volver = ()=>{


    if(nivel==="alumnos"){

      setNivel("carreras");

      setCarreraSeleccionada(null);


      guardarRuta({
        nivel:"carreras",
        generacionSeleccionada,
        carreraSeleccionada:null
      });

    }


    else if(nivel==="carreras"){

      setNivel("generaciones");

      setGeneracionSeleccionada(null);


      guardarRuta({
        nivel:"generaciones",
        generacionSeleccionada:null,
        carreraSeleccionada:null
      });

    }


  };




  const alumnosGeneracion = estudiantes.filter((alumno)=>{

    if(generacionSeleccionada?.includes("TSU")){

      return alumno.carrera.includes("TSU");

    }


    return !alumno.carrera.includes("TSU");

  });



  const carreras = [
    ...new Set(
      alumnosGeneracion.map(alumno=>alumno.carrera)
    )
  ];



  const alumnosCarrera = estudiantes.filter(
    alumno=>alumno.carrera===carreraSeleccionada
  );



return (

<div className="modulo-alumnos">


<h2>👨‍🎓 Gestión de Alumnos</h2>



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
        Presentación {alumno.documentos.presentacion ? "✔" : "✖"}
      </span>

      <span>
        Aceptación {alumno.documentos.aceptacion ? "✔" : "✖"}
      </span>

      <span>
        Compromiso {alumno.documentos.compromiso ? "✔" : "✖"}
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