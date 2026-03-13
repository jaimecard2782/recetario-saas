import { recetarios } from "../recetarios";

export default function RecetasPage() {

  return (
    <div>

      <h2>Biblioteca de Recetarios</h2>
      <p>Explora tus recetarios y abre el PDF o el video.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "20px"
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
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
            }}
          >

            <div
              style={{
                width: "100%",
                height: "120px",
                borderRadius: "14px",
                marginBottom: "14px",
                background: "linear-gradient(135deg,#fdf2f8,#fce7f3,#fae8ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px"
              }}
            >
              📘
            </div>

            <p style={{fontSize:"12px",fontWeight:700,color:"#a16207"}}>
              {recetario.categoria}
            </p>

            <h3>{recetario.titulo}</h3>

            <p style={{color:"#6b7280"}}>
              {recetario.descripcion}
            </p>

            <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

              <a href={recetario.pdf} target="_blank">
                <button>Ver PDF</button>
              </a>

              <a href={recetario.video} target="_blank">
                <button>Ver video</button>
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}