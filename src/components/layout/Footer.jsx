import "./Footer.css";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <span className="footer__logo">FUTBOLERO</span>

          <p>DONDE CADA PRONÓSTICO CUENTA</p>
        </div>

        <nav className="footer__nav" aria-label="Navegación principal">
          <Link to="/">INICIO</Link>

          <Link to="/">🎯 DESAFÍO DIARIO</Link>

          <Link to="/">⚔️ MANO A MANO</Link>

          <Link to="/">🏆 TORNEOS</Link>
        </nav>

        <div className="footer__rankings">
          <span>RANKINGS</span>

          <div>
            <Link to="/">DIARIO</Link>
            <Link to="/">SEMANAL</Link>
            <Link to="/">MENSUAL</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} FUTBOLERO</span>

        <span>TODOS LOS PRONÓSTICOS CUENTAN</span>
      </div>
    </footer>
  );
}

export default Footer;
