export default function DashboardPage() {
  return (
    <div>
      <h1 style={titleStyle}>Panel</h1>
      <p style={subtitleStyle}>
        Tu espacio para buscar recetas, calcular costos y organizar tus pedidos
        de forma simple.
      </p>

      <div style={welcomeCardStyle}>
        <h2 style={welcomeTitleStyle}>¿Qué quieres hacer hoy?</h2>
        <p style={welcomeTextStyle}>
          Puedes usar la app para cocinar en casa, preparar postres para tu
          familia o gestionar mejor tu trabajo si vendes repostería.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Accesos rápidos</h2>

        <div style={cardsGridStyle}>
          <div style={actionCardStyle}>
            <h3 style={cardTitleStyle}>Buscar receta</h3>
            <p style={cardTextStyle}>
              Encuentra recetas en texto o en video según prefieras.
            </p>
          </div>

          <div style={actionCardStyle}>
            <h3 style={cardTitleStyle}>Calcular costo</h3>
            <p style={cardTextStyle}>
              Calcula ingredientes, costos y precio sugerido de venta.
            </p>
          </div>

          <div style={actionCardStyle}>
            <h3 style={cardTitleStyle}>Ver pedidos</h3>
            <p style={cardTextStyle}>
              Organiza encargos y lleva control de lo que tienes pendiente.
            </p>
          </div>

          <div style={actionCardStyle}>
            <h3 style={cardTitleStyle}>Cocinar para la familia</h3>
            <p style={cardTextStyle}>
              Usa la app de forma simple para inspirarte y preparar algo rico en
              casa.
            </p>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Resumen rápido</h2>

        <div style={summaryGridStyle}>
          <div style={summaryCardStyle}>
            <h3 style={summaryTitleStyle}>Recetas vistas</h3>
            <p style={summaryNumberStyle}>24</p>
          </div>

          <div style={summaryCardStyle}>
            <h3 style={summaryTitleStyle}>Costos calculados</h3>
            <p style={summaryNumberStyle}>12</p>
          </div>

          <div style={summaryCardStyle}>
            <h3 style={summaryTitleStyle}>Pedidos activos</h3>
            <p style={summaryNumberStyle}>5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const titleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "8px",
  color: "#2f2f2f",
  fontSize: "34px",
};

const subtitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "20px",
  color: "#7a7a7a",
  lineHeight: 1.5,
};

const welcomeCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e0d8",
  borderRadius: "18px",
  padding: "20px",
  marginBottom: "20px",
};

const welcomeTitleStyle: React.CSSProperties = {
  margin: "0 0 10px 0",
  color: "#5c4432",
  fontSize: "22px",
};

const welcomeTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#7a7a7a",
  lineHeight: 1.6,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#5c4432",
  fontSize: "22px",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "14px",
};

const actionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e0d8",
  borderRadius: "18px",
  padding: "18px",
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#5c4432",
  fontSize: "20px",
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#7a7a7a",
  lineHeight: 1.5,
};

const summaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "14px",
};

const summaryCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e0d8",
  borderRadius: "18px",
  padding: "18px",
};

const summaryTitleStyle: React.CSSProperties = {
  margin: "0 0 10px 0",
  color: "#5c4432",
  fontSize: "18px",
};

const summaryNumberStyle: React.CSSProperties = {
  margin: 0,
  color: "#2f2f2f",
  fontSize: "30px",
  fontWeight: 700,
};