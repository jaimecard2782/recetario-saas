import { recetarios } from "../recetarios";

export default function RecetasPage() {
  return (
    <div>
      <h2 style={{ marginBottom: "8px", color: "#4a3256" }}>
        Biblioteca de Recetarios
      </h2>

      <p style={{ color: "#7a6a7d", marginBottom: "20px" }}>
        Explora tus recetarios y abre el PDF o el video.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {recetarios.map((recetario) => (
          <div
            key={recetario.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "18px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {recetario.portada ? (
              <img
                src={recetario.portada}
                alt={recetario.titulo}
                style={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  objectFit: "contain",
                  borderRadius: "14px",
                  marginBottom: "14px",
                  display: "block",
                  background: "#f8f5f2",
                  padding: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: "14px",
                  marginBottom: "14px",
                  background:
                    "linear-gradient(135deg,#fdf2f8,#fce7f3,#fae8ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "38px",
                }}
              >
                📘
              </div>
            )}

            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#a16207",
                margin: "0 0 8px 0",
              }}
            >
              {recetario.categoria}
            </p>

            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a3256",
                fontSize: "22px",
                lineHeight: 1.2,
              }}
            >
              {recetario.titulo}
            </h3>

            <p
              style={{
                color: "#6b7280",
                margin: "0 0 14px 0",
                lineHeight: 1.5,
                flexGrow: 1,
              }}
            >
              {recetario.descripcion}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <a href={recetario.pdf} target="_blank" rel="noreferrer">
                <button
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    background: "#1f2937",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Ver PDF
                </button>
              </a>

              <a href={recetario.video} target="_blank" rel="noreferrer">
                <button
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    background: "#374151",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Ver video
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}