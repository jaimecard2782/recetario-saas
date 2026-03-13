import { useEffect, useState } from "react";
import RecetasPage from "./pages/RecetasPage";

type Tab =
  | "inicio"
  | "recetas"
  | "mis-recetas"
  | "compras"
  | "costos"
  | "perfil";

type ShoppingItem = {
  id: number;
  nombre: string;
  comprado: boolean;
};

type CostItem = {
  id: number;
  nombre: string;
  cantidadUsada: number;
  cantidadPaquete: number;
  precioPaquete: number;
};

type RecipeItem = {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
};

type SavedRecipe = {
  id: number;
  nombre: string;
  descripcion: string;
};

function App() {
  const [tabActiva, setTabActiva] = useState<Tab>("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [moneda, setMoneda] = useState("COP");
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
const [tipoUso, setTipoUso] = useState<string>(() => {
  return localStorage.getItem("tipo-uso-reposteria") || "";
});
  const [nombreRecetaNueva, setNombreRecetaNueva] = useState("");
  const [descripcionRecetaNueva, setDescripcionRecetaNueva] = useState("");

  const [misRecetas, setMisRecetas] = useState<SavedRecipe[]>(() => {
    const guardado = localStorage.getItem("mis-recetas-reposteria");
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [listaCompras, setListaCompras] = useState<ShoppingItem[]>(() => {
    const guardado = localStorage.getItem("lista-compras-reposteria");
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [ingredientesCosto, setIngredientesCosto] = useState<CostItem[]>([
    {
      id: 1,
      nombre: "Harina",
      cantidadUsada: 500,
      cantidadPaquete: 1000,
      precioPaquete: 4000,
    },
  ]);

  const [porcionesOriginales, setPorcionesOriginales] = useState(8);
  const [porcionesNuevas, setPorcionesNuevas] = useState(12);

  const [ingredientesReceta, setIngredientesReceta] = useState<RecipeItem[]>([
    { id: 1, nombre: "Harina", cantidad: 500, unidad: "g" },
    { id: 2, nombre: "Huevos", cantidad: 4, unidad: "unidades" },
    { id: 3, nombre: "Mantequilla", cantidad: 200, unidad: "g" },
  ]);

  useEffect(() => {
    localStorage.setItem(
      "lista-compras-reposteria",
      JSON.stringify(listaCompras)
    );
  }, [listaCompras]);
useEffect(() => {
  localStorage.setItem("tipo-uso-reposteria", tipoUso);
}, [tipoUso]);
  useEffect(() => {
    localStorage.setItem("mis-recetas-reposteria", JSON.stringify(misRecetas));
  }, [misRecetas]);

  const buscarEnTexto = () => {
    const termino = busqueda.trim();
    if (!termino) {
      alert("Por favor escribe una receta.");
      return;
    }
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      "receta " + termino
    )}`;
    window.open(url, "_blank");
  };

  const buscarEnVideo = () => {
    const termino = busqueda.trim();
    if (!termino) {
      alert("Por favor escribe una receta.");
      return;
    }
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      termino + " receta"
    )}`;
    window.open(url, "_blank");
  };

  const guardarReceta = () => {
    const nombre = nombreRecetaNueva.trim();
    const descripcion = descripcionRecetaNueva.trim();

    if (!nombre) {
      alert("Escribe el nombre de la receta.");
      return;
    }

    const nuevaReceta: SavedRecipe = {
      id: Date.now(),
      nombre,
      descripcion,
    };

    setMisRecetas((prev) => [nuevaReceta, ...prev]);
    setNombreRecetaNueva("");
    setDescripcionRecetaNueva("");
  };

  const eliminarRecetaGuardada = (id: number) => {
    setMisRecetas((prev) => prev.filter((receta) => receta.id !== id));
  };

  const agregarIngrediente = () => {
    const nombre = nuevoIngrediente.trim();
    if (!nombre) {
      alert("Escribe un ingrediente.");
      return;
    }

    const nuevo: ShoppingItem = {
      id: Date.now(),
      nombre,
      comprado: false,
    };

    setListaCompras((prev) => [nuevo, ...prev]);
    setNuevoIngrediente("");
  };

  const toggleComprado = (id: number) => {
    setListaCompras((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  };

  const eliminarIngrediente = (id: number) => {
    setListaCompras((prev) => prev.filter((item) => item.id !== id));
  };

  const agregarIngredienteCosto = () => {
    setIngredientesCosto((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: "",
        cantidadUsada: 0,
        cantidadPaquete: 0,
        precioPaquete: 0,
      },
    ]);
  };

  const actualizarIngredienteCosto = (
    id: number,
    campo: keyof CostItem,
    valor: string | number
  ) => {
    setIngredientesCosto((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  const eliminarIngredienteCosto = (id: number) => {
    setIngredientesCosto((prev) => prev.filter((item) => item.id !== id));
  };

  const calcularCostoUsado = (item: CostItem) => {
    if (
      item.cantidadUsada <= 0 ||
      item.cantidadPaquete <= 0 ||
      item.precioPaquete <= 0
    ) {
      return 0;
    }

    return (item.cantidadUsada / item.cantidadPaquete) * item.precioPaquete;
  };

  const agregarIngredienteReceta = () => {
    setIngredientesReceta((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: "",
        cantidad: 0,
        unidad: "",
      },
    ]);
  };

  const actualizarIngredienteReceta = (
    id: number,
    campo: keyof RecipeItem,
    valor: string | number
  ) => {
    setIngredientesReceta((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  const eliminarIngredienteReceta = (id: number) => {
    setIngredientesReceta((prev) => prev.filter((item) => item.id !== id));
  };

  const recalcularCantidad = (cantidad: number) => {
    if (porcionesOriginales <= 0 || porcionesNuevas <= 0) return 0;
    return (cantidad / porcionesOriginales) * porcionesNuevas;
  };

  const costoTotal = ingredientesCosto.reduce(
    (total, item) => total + calcularCostoUsado(item),
    0
  );

  const precioSugerido = costoTotal * 3;

  const pendientes = listaCompras.filter((item) => !item.comprado).length;
  const comprados = listaCompras.filter((item) => item.comprado).length;

  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const renderContenido = () => {
    if (tabActiva === "inicio") {
      return (
        <>
          <section style={heroCardStyle}>
            <p style={miniLabelStyle}>Tu cocina, más fácil</p>
           <h1 style={heroTitleStyle}>
  Tus recetas ahora son inteligentes✨
</h1>
            <p style={heroTextStyle}>
              Todo lo que necesitas para buscar recetas, guardar tus favoritas,
              organizar ingredientes y preparar postres en un solo lugar.
            </p>

            <input
              type="text"
              placeholder="Ejemplo: torta de chocolate, brownies, cheesecake..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={inputStyle}
            />

            <div style={buttonGroupStyle}>
              <button onClick={buscarEnTexto} style={secondaryButtonStyle}>
                Ver receta en texto
              </button>
              <button onClick={buscarEnVideo} style={primaryButtonStyle}>
                Ver receta en video
              </button>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Funciones principales</h2>

            <div style={cardGridStyle}>
              <button
                style={featureCardStyle}
                onClick={() => setTabActiva("recetas")}
              >
                <div style={emojiStyle}>📖</div>
                <h3 style={featureTitleStyle}>Ver recetas</h3>
                <p style={featureTextStyle}>
                  Consulta recetas en texto o video de forma rápida.
                </p>
              </button>

              <button
                style={featureCardStyle}
                onClick={() => setTabActiva("mis-recetas")}
              >
                <div style={emojiStyle}>📚</div>
                <h3 style={featureTitleStyle}>Mis recetas</h3>
                <p style={featureTextStyle}>
                  Guarda tus propias recetas y consérvalas en la app.
                </p>
              </button>

              <button
                style={featureCardStyle}
                onClick={() => setTabActiva("compras")}
              >
                <div style={emojiStyle}>🛒</div>
                <h3 style={featureTitleStyle}>Lista de compras</h3>
                <p style={featureTextStyle}>
                  Organiza tus ingredientes para cocinar sin olvidar nada.
                </p>
              </button>

              <button
                style={featureCardStyle}
                onClick={() => setTabActiva("costos")}
              >
                <div style={emojiStyle}>💰</div>
                <h3 style={featureTitleStyle}>Calcular costo y cantidades</h3>
                <p style={featureTextStyle}>
                  Ideal para cocinar en casa o vender con mejor control.
                </p>
              </button>
            </div>
          </section>
        </>
      );
    }

    if (tabActiva === "recetas") {
      return <RecetasPage />;
    }

    if (tabActiva === "mis-recetas") {
      return (
        <section style={contentCardStyle}>
          <h2 style={sectionTitleStyle}>Mis recetas</h2>
          <p style={sectionTextStyle}>
            Guarda tus recetas favoritas o tus propias creaciones para tenerlas
            siempre a la mano.
          </p>

          <input
            type="text"
            placeholder="Nombre de la receta"
            value={nombreRecetaNueva}
            onChange={(e) => setNombreRecetaNueva(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Descripción corta o notas de la receta"
            value={descripcionRecetaNueva}
            onChange={(e) => setDescripcionRecetaNueva(e.target.value)}
            style={textareaStyle}
          />

          <button onClick={guardarReceta} style={primaryButtonStyle}>
            Guardar receta
          </button>

          <div style={{ marginTop: "18px", display: "grid", gap: "12px" }}>
            {misRecetas.length === 0 ? (
              <div style={emptyStateStyle}>Aún no has guardado recetas.</div>
            ) : (
              misRecetas.map((receta) => (
                <div key={receta.id} style={savedRecipeCardStyle}>
                  <div style={{ flex: 1 }}>
                    <h3 style={savedRecipeTitleStyle}>{receta.nombre}</h3>
                    <p style={savedRecipeTextStyle}>
                      {receta.descripcion || "Sin descripción todavía."}
                    </p>
                  </div>

                  <button
                    onClick={() => eliminarRecetaGuardada(receta.id)}
                    style={deleteButtonStyle}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      );
    }

    if (tabActiva === "compras") {
      return (
        <section style={contentCardStyle}>
          <h2 style={sectionTitleStyle}>Lista de compras</h2>
          <p style={sectionTextStyle}>
            Agrega ingredientes, márcalos como comprados y mantén tu lista
            guardada.
          </p>

          <div style={summaryGridStyle}>
            <div style={summaryCardStyle}>
              <h3 style={summaryTitleStyle}>Pendientes</h3>
              <p style={summaryNumberStyle}>{pendientes}</p>
            </div>

            <div style={summaryCardStyle}>
              <h3 style={summaryTitleStyle}>Comprados</h3>
              <p style={summaryNumberStyle}>{comprados}</p>
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <input
              type="text"
              placeholder="Ejemplo: crema de leche"
              value={nuevoIngrediente}
              onChange={(e) => setNuevoIngrediente(e.target.value)}
              style={inputStyle}
              onKeyDown={(e) => {
                if (e.key === "Enter") agregarIngrediente();
              }}
            />

            <button onClick={agregarIngrediente} style={primaryButtonStyle}>
              Agregar ingrediente
            </button>
          </div>

          <div style={{ marginTop: "18px", display: "grid", gap: "10px" }}>
            {listaCompras.length === 0 ? (
              <div style={emptyStateStyle}>Tu lista está vacía.</div>
            ) : (
              listaCompras.map((item) => (
                <div key={item.id} style={shoppingItemStyle(item.comprado)}>
                  <button
                    onClick={() => toggleComprado(item.id)}
                    style={checkButtonStyle(item.comprado)}
                  >
                    {item.comprado ? "✓" : "○"}
                  </button>

                  <div style={{ flex: 1 }}>
                    <p style={shoppingTextStyle(item.comprado)}>
                      {item.nombre}
                    </p>
                  </div>

                  <button
                    onClick={() => eliminarIngrediente(item.id)}
                    style={deleteButtonStyle}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      );
    }

    if (tabActiva === "costos") {
      return (
        <section style={contentCardStyle}>
          <h2 style={sectionTitleStyle}>Costos y cantidades</h2>
          <p style={sectionTextStyle}>
            Ajusta porciones y calcula el costo real de tu receta.
          </p>

          <div style={summaryGridStyle}>
            <div style={summaryCardStyle}>
              <h3 style={summaryTitleStyle}>Costo total</h3>
              <p style={summaryNumberStyle}>{formatearMoneda(costoTotal)}</p>
            </div>

            <div style={summaryCardStyle}>
              <h3 style={summaryTitleStyle}>Precio sugerido</h3>
              <p style={summaryNumberStyle}>{formatearMoneda(precioSugerido)}</p>
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <h3 style={subTitleStyle}>Ajuste de receta</h3>

            <div style={summaryGridStyle}>
              <div style={summaryCardStyle}>
                <label style={labelStyle}>Porciones originales</label>
                <input
                  type="number"
                  value={porcionesOriginales || ""}
                  onChange={(e) => setPorcionesOriginales(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div style={summaryCardStyle}>
                <label style={labelStyle}>Porciones nuevas</label>
                <input
                  type="number"
                  value={porcionesNuevas || ""}
                  onChange={(e) => setPorcionesNuevas(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: "12px", display: "grid", gap: "12px" }}>
              {ingredientesReceta.map((item) => (
                <div key={item.id} style={costCardStyle}>
                  <input
                    type="text"
                    placeholder="Ingrediente"
                    value={item.nombre}
                    onChange={(e) =>
                      actualizarIngredienteReceta(item.id, "nombre", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <input
                    type="number"
                    placeholder="Cantidad original"
                    value={item.cantidad || ""}
                    onChange={(e) =>
                      actualizarIngredienteReceta(
                        item.id,
                        "cantidad",
                        Number(e.target.value)
                      )
                    }
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    placeholder="Unidad (g, ml, unidades...)"
                    value={item.unidad}
                    onChange={(e) =>
                      actualizarIngredienteReceta(item.id, "unidad", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <div style={summaryBoxStyle}>
                    <strong>Nueva cantidad:</strong>{" "}
                    {recalcularCantidad(item.cantidad).toFixed(2)} {item.unidad}
                  </div>

                  <button
                    onClick={() => eliminarIngredienteReceta(item.id)}
                    style={deleteButtonStyle}
                  >
                    Eliminar ingrediente
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "12px" }}>
              <button
                onClick={agregarIngredienteReceta}
                style={secondaryButtonStyle}
              >
                Agregar ingrediente a receta
              </button>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h3 style={subTitleStyle}>Calculadora de costos</h3>

            <div style={{ marginTop: "12px", display: "grid", gap: "12px" }}>
              {ingredientesCosto.map((item) => (
                <div key={item.id} style={costCardStyle}>
                  <input
                    type="text"
                    placeholder="Ingrediente"
                    value={item.nombre}
                    onChange={(e) =>
                      actualizarIngredienteCosto(item.id, "nombre", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <input
                    type="number"
                    placeholder="Cantidad usada"
                    value={item.cantidadUsada || ""}
                    onChange={(e) =>
                      actualizarIngredienteCosto(
                        item.id,
                        "cantidadUsada",
                        Number(e.target.value)
                      )
                    }
                    style={inputStyle}
                  />

                  <input
                    type="number"
                    placeholder="Cantidad del paquete"
                    value={item.cantidadPaquete || ""}
                    onChange={(e) =>
                      actualizarIngredienteCosto(
                        item.id,
                        "cantidadPaquete",
                        Number(e.target.value)
                      )
                    }
                    style={inputStyle}
                  />

                  <input
                    type="number"
                    placeholder="Precio del paquete"
                    value={item.precioPaquete || ""}
                    onChange={(e) =>
                      actualizarIngredienteCosto(
                        item.id,
                        "precioPaquete",
                        Number(e.target.value)
                      )
                    }
                    style={inputStyle}
                  />

                  <div style={summaryBoxStyle}>
                    <strong>Costo usado:</strong>{" "}
                    {formatearMoneda(calcularCostoUsado(item))}
                  </div>

                  <button
                    onClick={() => eliminarIngredienteCosto(item.id)}
                    style={deleteButtonStyle}
                  >
                    Eliminar ingrediente
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "16px" }}>
              <button
                onClick={agregarIngredienteCosto}
                style={primaryButtonStyle}
              >
                Agregar ingrediente de costo
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section style={contentCardStyle}>
        <h2 style={sectionTitleStyle}>Perfil</h2>
        <p style={sectionTextStyle}>
          Ajusta tus preferencias para usar la app como más te convenga.
        </p>

        <div style={profileBlockStyle}>
          <label style={labelStyle}>Selecciona tu moneda</label>
          <select
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
            style={selectStyle}
          >
            <option value="COP">COP - Peso colombiano</option>
            <option value="USD">USD - Dólar estadounidense</option>
            <option value="MXN">MXN - Peso mexicano</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>

        <div style={profileBlockStyle}>
          <label style={labelStyle}>Tipo de uso</label>
          <div style={simpleListStyle}>
            <button
  onClick={() => setTipoUso("casa")}
  style={{
  ...listItemStyle,
  backgroundColor: tipoUso === "casa" ? "#ffe8cc" : "white"
}}
>
  🏠 Uso en casa
</button>

<button
  onClick={() => setTipoUso("negocio")}
  style={{
  ...listItemStyle,
  backgroundColor: tipoUso === "negocio" ? "#ffe8cc" : "white"
}}
>
  🧁 Uso para negocio
</button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>{renderContenido()}</div>

      <nav style={bottomNavStyle}>
        <button
          onClick={() => setTabActiva("inicio")}
          style={navButtonStyle(tabActiva === "inicio")}
        >
          Inicio
        </button>

        <button
          onClick={() => setTabActiva("recetas")}
          style={navButtonStyle(tabActiva === "recetas")}
        >
          Recetas
        </button>

        <button
          onClick={() => setTabActiva("mis-recetas")}
          style={navButtonStyle(tabActiva === "mis-recetas")}
        >
          Guardadas
        </button>

        <button
          onClick={() => setTabActiva("compras")}
          style={navButtonStyle(tabActiva === "compras")}
        >
          Compras
        </button>

        <button
          onClick={() => setTabActiva("costos")}
          style={navButtonStyle(tabActiva === "costos")}
        >
          Costos
        </button>
        <button
onClick={() => setTabActiva("perfil")}
style={navButtonStyle(tabActiva === "perfil")}
>
Perfil
</button>
      </nav>
    </div>
  );
}

const appStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff4f8 0%, #f8f4f1 100%)",
  padding: "10px",
  paddingBottom: "120px",
  fontFamily: "Arial, sans-serif",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
};

const heroCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.96)",
  border: "1px solid #f1d9e5",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 6px 18px rgba(195, 120, 156, 0.07)",
  marginBottom: "14px",
};

const miniLabelStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#d36a91",
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.3px",
};

const heroTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#3f2b47",
  fontSize: "22px",
  lineHeight: 1.2,
  textAlign: "center",
};

const heroTextStyle: React.CSSProperties = {
  margin: "0 0 12px 0",
  color: "#6f6373",
  lineHeight: 1.45,
  fontSize: "14px",
  textAlign: "center",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #e3d3dc",
  fontSize: "16px",
  marginBottom: "14px",
  boxSizing: "border-box",
  background: "#fffafc",
  color: "#4a3256",
  outline: "none",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "110px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #e3d3dc",
  fontSize: "16px",
  marginBottom: "14px",
  boxSizing: "border-box",
  background: "#fffafc",
  color: "#4a3256",
  outline: "none",
  resize: "vertical",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 20px",
  border: "none",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #e96b98, #d45785)",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "0.3px",
  boxShadow: "0 10px 22px rgba(233,107,152,0.35)",
  transition: "all 0.25s ease",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 20px",
  border: "none",
  borderRadius: "18px",
  background: "#f4dfca",
  color: "#6e4d3a",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 600,
  letterSpacing: "0.2px",
  boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  transition: "all 0.25s ease",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "12px",
  color: "#4a3256",
  fontSize: "24px",
};

const sectionTextStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#7a6a7d",
  lineHeight: 1.5,
};

const subTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "12px",
  color: "#5c4432",
  fontSize: "20px",
};

const cardGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "14px",
};

const featureCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.88)",
  border: "1px solid #f0dce5",
  borderRadius: "22px",
  padding: "18px",
  textAlign: "left",
  cursor: "pointer",
};

const emojiStyle: React.CSSProperties = {
  fontSize: "32px",
  marginBottom: "8px",
};

const featureTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#4a3256",
  fontSize: "20px",
};

const featureTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#7a6a7d",
  lineHeight: 1.5,
};

const contentCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.9)",
  border: "1px solid #f0dce5",
  borderRadius: "24px",
  padding: "22px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const simpleListStyle: React.CSSProperties = {
  display: "grid",
  gap: "10px",
};

const listItemStyle: React.CSSProperties = {
  background: "#fff8fb",
  border: "1px solid #efdce7",
  borderRadius: "14px",
  padding: "12px 14px",
  color: "#5f4e63",
};

const summaryBoxStyle: React.CSSProperties = {
  background: "#fff4f8",
  border: "1px solid #efdce7",
  borderRadius: "14px",
  padding: "12px 14px",
  marginBottom: "14px",
  color: "#5f4e63",
};

const profileBlockStyle: React.CSSProperties = {
  marginBottom: "18px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "10px",
  color: "#5c4432",
  fontWeight: 700,
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d8d2c8",
  fontSize: "16px",
  boxSizing: "border-box",
};

const summaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const summaryCardStyle: React.CSSProperties = {
  background: "#fff8fb",
  border: "1px solid #efdce7",
  borderRadius: "16px",
  padding: "16px",
};

const summaryTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#5f4e63",
  fontSize: "16px",
};

const summaryNumberStyle: React.CSSProperties = {
  margin: 0,
  color: "#e96b98",
  fontSize: "28px",
  fontWeight: 700,
};

const emptyStateStyle: React.CSSProperties = {
  background: "#fff8fb",
  border: "1px dashed #e4c8d8",
  borderRadius: "14px",
  padding: "16px",
  color: "#7a6a7d",
  textAlign: "center",
};

const shoppingItemStyle = (comprado: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: comprado ? "#f6fff7" : "#fff8fb",
  border: `1px solid ${comprado ? "#cfe7d1" : "#efdce7"}`,
  borderRadius: "14px",
  padding: "12px",
});

const checkButtonStyle = (comprado: boolean): React.CSSProperties => ({
  border: "none",
  borderRadius: "999px",
  width: "34px",
  height: "34px",
  background: comprado ? "#67c27d" : "#f4dfca",
  color: comprado ? "#ffffff" : "#7a4d2c",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: 700,
  flexShrink: 0,
});

const shoppingTextStyle = (comprado: boolean): React.CSSProperties => ({
  margin: 0,
  color: comprado ? "#6e8a72" : "#5f4e63",
  textDecoration: comprado ? "line-through" : "none",
  fontWeight: 600,
});

const deleteButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "10px",
  padding: "10px 12px",
  background: "#fde3ea",
  color: "#b94b79",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 700,
};

const costCardStyle: React.CSSProperties = {
  background: "#fff8fb",
  border: "1px solid #efdce7",
  borderRadius: "16px",
  padding: "16px",
};

const savedRecipeCardStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  background: "#fff8fb",
  border: "1px solid #efdce7",
  borderRadius: "16px",
  padding: "16px",
};

const savedRecipeTitleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#4a3256",
  fontSize: "20px",
};

const savedRecipeTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#7a6a7d",
  lineHeight: 1.5,
};

const bottomNavStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "8px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(96%, 520px)",
  background: "rgba(255,255,255,0.98)",
  border: "1px solid #efdce7",
  borderRadius: "18px",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "6px",
  padding: "8px",
  zIndex: 9999,
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
};

const navButtonStyle = (active: boolean): React.CSSProperties => ({
  border: "none",
  borderRadius: "10px",
  padding: "8px 4px",
  background: active ? "#f8d8e5" : "#f8f3f6",
  color: active ? "#b94b79" : "#6c5a72",
  fontSize: "10px",
  fontWeight: 700,
  lineHeight: 1.1,
  cursor: "pointer",
  minHeight: "34px",
  whiteSpace: "normal",
  wordBreak: "break-word",
  textAlign: "center",
});

export default App;