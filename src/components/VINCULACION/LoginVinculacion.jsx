import { useState } from "react";


function LoginVinculacion({
  autorizar,
  setPantalla
}) {


  const [clave, setClave] = useState("");



  const ingresar = () => {

    if (clave === "VIN2026") {

      autorizar(true);

    } else {

      alert("Contraseña incorrecta");

    }


  };



  return (

    <div className="login-vinculacion">


      <div className="login-vinculacion-card">


        <h1>
          🔒 GESTADIAS
        </h1>


        <h2>
          Departamento de Vinculación
        </h2>



        <p>
          Acceso exclusivo para personal autorizado
        </p>



        <input

          type="password"

          placeholder="Contraseña"

          value={clave}

          onChange={(e)=>setClave(e.target.value)}

        />



        <button
          onClick={ingresar}
        >
          Ingresar
        </button>



        <button
          className="volver-inicio"
          onClick={()=>{
  autorizar(false);
  setPantalla("inicio");
}}
        >
          ← Regresar
        </button>



      </div>


    </div>

  );


}


export default LoginVinculacion;