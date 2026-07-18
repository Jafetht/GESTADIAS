function TransicionFase({ titulo, mensaje }) {
  return (
    <div className="transicion-fase">

      <div className="transicion-card">

        <div className="spinner"></div>

        <h2>{titulo}</h2>

        <p>{mensaje}</p>

        <div className="barra-progreso">
          <div className="barra"></div>
        </div>

      </div>

    </div>
  );
}

export default TransicionFase;