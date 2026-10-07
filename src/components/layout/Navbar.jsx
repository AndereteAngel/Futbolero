import "./Navbar.css";

import { Link } from "react-router-dom";
import { cerrarSesion } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { usuario, perfil } = useAuth();

  async function manejarCerrarSesion() {
    try {
      await cerrarSesion();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/">FUTBOLERO</Link>
      </div>

      <nav className="navbar__nav">
        {usuario ? (
          <>
            <Link to="/torneos/crear" className="navbar__link">
              CREAR TORNEO
            </Link>

            <span className="navbar__alias">{perfil?.alias}</span>

            <button
              type="button"
              className="navbar__logout"
              onClick={manejarCerrarSesion}
            >
              SALIR
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">
              INGRESAR
            </Link>

            <Link
              to="/registro"
              className="navbar__link navbar__link--primary"
            >
              REGISTRARSE
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
