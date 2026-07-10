import logo from '../assets/logo-gestadias.png'


function Inicio({ setPantalla }){

  return (

    <div className="dashboard">

      <img 
        src={logo} 
        alt="Logo GESTADÍAS" 
        className="logo" 
      />

      <h1 className="titulo-principal">
        GESTADIAS
      </h1>

      <h2 className="subtitulo">
        Departamento de Vinculación
      </h2>

      <h3>
        Si eres alumno, inicia sesión o crea una cuenta para continuar
      </h3>


      <button onClick={() => setPantalla('login')}>
        Iniciar Sesión
      </button>


      <button onClick={() => setPantalla('registro')}>
        Crear Cuenta
      </button>


      <button onClick={() => setPantalla('vinculacion')}>
        Panel de Vinculación
      </button>


      <div className="avisos-panel">

        <h3>
          Avisos de Vinculación
        </h3>


        <div className="aviso-card">
          📢 Bienvenido a GESTADIAS
        </div>


        <div className="aviso-card">
          ⚠ Los estudiantes deben subir primero su Carta de Presentación
        </div>


        <div className="aviso-card">
          📄 El sistema controla el avance por fases
        </div>

      </div>



      <div className="fases-panel">

        <h3>
          Fases de Estadía
        </h3>


        <div className="fase activa">
          1. Registro del alumno
        </div>

        <div className="fase">
          2. Selección de Unidad Económica
        </div>

        <div className="fase">
          3. Carta de Presentación
        </div>

        <div className="fase">
          4. Carta de Aceptación
        </div>

        <div className="fase">
          5. Carta Compromiso
        </div>

        <div className="fase">
          6. Estadía Activa
        </div>

        <div className="fase">
          7. Liberación Final
        </div>

      </div>


    </div>

  )

}


export default Inicio