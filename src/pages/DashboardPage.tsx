export default function DashboardPage() {
  return <h1 style={{ color: "red" }}>PRUEBA DASHBOARD</h1>;
}
  const buscarEnGoogle = () => {
    window.open(
      "https://www.google.com/search?q=recetas+de+reposteria",
      "_blank"
    );
  };

  const buscarEnYouTube = () => {
    window.open(
      "https://www.youtube.com/results?search_query=recetas+de+reposteria",
      "_blank"
    );
  };

  return (
    <div style={pageStyle}>
      <div style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>Mi Repostería</p>
          <h1 style={titleStyle}>Tus recetas ahora son inteligentes</h1>
          <p style={subtitleStyle}>
            Busca ideas, consulta recetas, revisa costos y organiza tus pedidos
            desde un solo lugar.
          </p>
        </div>

        <div style={heroActionsStyle}>
          <button style={primaryButtonStyle} onClick={buscarEnGoogle}>
            Buscar en Google
          </button>
          <button style={secondaryButtonStyle} onClick={buscarEnYouTube}>
            Ver en YouTube
          </button>
        </div>
      </div>

      <div style={welcomeCardStyle}>
        <h2 style={welcomeTitleStyle}>¿Qué quieres hacer hoy?</h2>
        <p style={welcomeTextStyle}>
          Usa la app para cocinar en casa, inspirarte con nuevas recetas o
          llevar un mejor control si trabajas con pedidos de repostería.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Accesos rápidos</h2>

        <div style={cardsGridStyle}>
          <button style={actionCardButtonStyle} onClick={buscarEnGoogle}>
            <div style={iconCircleStyle}>🔎</div>
            <h3 style={cardTitleStyle}>Buscar receta en Google</h3>
            <p style={cardTextStyle}>
              Encuentra recetas escritas, ideas nuevas e inspiración rápida.
            </p>
          </button>

          <button style={actionCardButtonStyle} onClick={buscarEnYouTube}>
            <div style={iconCircleStyle}>▶</div>
            <h3 style={cardTitleStyle}>Buscar receta en YouTube</h3>
            <p style={cardTextStyle}>
              Mira recetas en video y sigue el paso a paso visual.
            </p>
          </button>

          <div style={actionCardStyle}>
            <div style={iconCircleStyle}>💰</div>
            <h3 style={cardTitleStyle}>Calcular costo</h3>
            <p style={cardTextStyle}>
              Calcula ingredientes, costos y precio sugerido de venta.
            </p>
          </div>

          <div style={actionCardStyle}>
            <div style={iconCircleStyle}>📋</div>
            <h3 style={cardTitleStyle}>Ver pedidos</h3>
            <p style={cardTextStyle}>
              Organiza encargos y lleva control de lo que tienes pendiente.
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

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const heroStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #fff4f8 0%, #ffe9f2 100%)",
  border: "1px solid #f1d5e2",
  borderRadius: "22px",
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  boxShadow: "0 10px 30px rgba(214, 166, 188, 0.12)",
};

const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#b15d84",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const titleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "10px",
  color: "#4f3140",
  fontSize: "32px",
  lineHeight: 1.15,
};

const subtitleStyle: React.CSSProperties = {
  margin: 0,
  color: "#7b6670",
  lineHeight: 1.6,
  fontSize: "15px",
  maxWidth: "680px",
};

const heroActionsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const primaryButtonStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #d96b98 0%, #e98ab3 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: "14px",
  padding: "12px 18px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(217, 107, 152, 0.22)",
};

const secondaryButtonStyle: React.CSSProperties = {
  background: "#ffffff",
  color: "#9b4f73",
  border: "1px solid #efcfdd",
  borderRadius: "14px",
  padding: "12px 18px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
};

const welcomeCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0e1e8",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(120, 90, 104, 0.05)",
};

const welcomeTitleStyle: React.CSSProperties = {
  margin: "0 0 10px 0",
  color: "#5a3948",
  fontSize: "21px",
};

const welcomeTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#76656d",
  lineHeight: 1.6,
  fontSize: "15px",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "2px",
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#5a3948",
  fontSize: "21px",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const actionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0e1e8",
  borderRadius: "20px",
  padding: "18px",
  boxShadow: "0 8px 24px rgba(120, 90, 104, 0.05)",
};

const actionCardButtonStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0e1e8",
  borderRadius: "20px",
  padding: "18px",
  boxShadow: "0 8px 24px rgba(120, 90, 104, 0.05)",
  textAlign: "left",
  cursor: "pointer",
};

const iconCircleStyle: React.CSSProperties = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  background: "#fff1f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "12px",
  fontSize: "18px",
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#5a3948",
  fontSize: "17px",
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#76656d",
  lineHeight: 1.5,
  fontSize: "14px",
};

const summaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
};

const summaryCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0e1e8",
  borderRadius: "20px",
  padding: "18px",
  boxShadow: "0 8px 24px rgba(120, 90, 104, 0.05)",
};

const summaryTitleStyle: React.CSSProperties = {
  margin: "0 0 10px 0",
  color: "#7a5a69",
  fontSize: "16px",
};

const summaryNumberStyle: React.CSSProperties = {
  margin: 0,
  color: "#3c2a33",
  fontSize: "28px",
  fontWeight: 700,
};