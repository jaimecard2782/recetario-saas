import {
  House,
  BookOpen,
  Heart,
  ShoppingBag,
  UserRound,
} from "lucide-react";

const items = [
  { key: "inicio", label: "Inicio", icon: House },
  { key: "recetas", label: "Recetas", icon: BookOpen },
  { key: "guardadas", label: "Guardadas", icon: Heart },
  { key: "compras", label: "Compras", icon: ShoppingBag },
  { key: "perfil", label: "Perfil", icon: UserRound },
];

function BottomNav({ pantalla, setPantalla }) {
  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const activo = pantalla === item.key;

        return (
          <button
            key={item.key}
            className={`bottom-nav__item ${activo ? "active" : ""}`}
            onClick={() => setPantalla(item.key)}
            aria-label={item.label}
          >
            <div className="bottom-nav__inner">
              <Icon size={22} strokeWidth={2.2} />
              <span>{item.label}</span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;