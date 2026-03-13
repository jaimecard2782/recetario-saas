import { useState } from "react";

export default function RecetasPage() {
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState<"texto" | "video">("texto");

  const buscarReceta = () => {
    const termino = busqueda.trim();

    if (!termino) {
      alert("Por favor escribe una receta.");
      return;
    }

    if (modo === "texto") {
      const url = `https://www.google.com/search?q=${encodeURIComponent(
        "receta " + termino
      )}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        termino + " receta"
      )}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0, color: "#2f2f2f" }}>Recetas</h1>
      <p>Busca recetas en texto o en video, como prefieras.</p>

      <div
        style={{
          marginTop: "24px",
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #e5e0d8",
          maxWidth: "700px",
        }}
      >
        <input
          type="text"
          placeholder="Ejemplo: torta de chocolate"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #d8d2c8",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        />

        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <button
            onClick={() => setModo("texto")}
            style={{
              ...buttonStyle,
              background: modo === "texto" ? "#d9c7b3" : "#f3ece4",
            }}
          >
            Ver en texto
          </button>

          <button
            onClick={() => setModo("video")}
            style={{
              ...buttonStyle,
              background: modo === "video" ? "#d9c7b3" : "#f3ece4",
            }}
          >
            Ver en video
          </button>
        </div>

        <button onClick={buscarReceta} style={searchButtonStyle}>
          Buscar receta
        </button>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 600,
  color: "#5c4432",
};

const searchButtonStyle: React.CSSProperties = {
  padding: "14px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#5c4432",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 600,
};