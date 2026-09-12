import "./Home.css";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const alias = perfil?.alias || usuario?.email || "JUGADOR";

  return (
    <main className="home">
      {/* ESCENARIO PRINCIPAL */}

      <section className="home__hero">
        <div className="home__stadium-glow"></div>

        <div className="home__ball">⚽</div>

        <div className="home__brand">
          <span>FUTBOLERO</span>
        </div>

        <p className="home__slogan">DONDE CADA PRONÓSTICO CUENTA</p>

        {usuario && (
          <p className="home__welcome">
            BIENVENIDO, <strong>{alias.toUpperCase()}</strong>
          </p>
        )}
      </section>

      {/* CAMPEÓN DEL MES */}

      <section className="home__champion">
        <div className="home__section-title">
          <span>🏆</span>
          <h2>BALÓN DE ORO</h2>
        </div>

        <div className="home__champion-card">
          <div className="home__champion-ball">⚽</div>

          <div className="home__champion-info">
            <span className="home__champion-label">CAMPEÓN DEL MES</span>

            <strong className="home__champion-name">PRÓXIMAMENTE</strong>

            <span className="home__champion-period">
              PRIMER CAMPEÓN DE FUTBOLERO
            </span>
          </div>
        </div>
      </section>

      {/* MODOS DE JUEGO */}

      <section className="home__modes">
        <div className="home__section-title">
          <h2>MODOS DE JUEGO</h2>
        </div>

        <div className="home__mode-grid">
          <article className="home__mode-card home__mode-card--daily">
            <div className="home__mode-icon">🎯</div>

            <h3>DESAFÍO DIARIO</h3>

            <p>
              3 partidos.
              <br />
              Una oportunidad cada día.
            </p>

            <button type="button" onClick={() => navigate("/diario")}>
              JUGAR
            </button>
          </article>

          <article className="home__mode-card home__mode-card--h2h">
            <div className="home__mode-icon">⚔️</div>

            <h3>MANO A MANO</h3>

            <p>
              Desafiá a otro jugador
              <br />y demostrale quién sabe más.
            </p>

            <button type="button" onClick={() => navigate("/mano-a-mano")}>
              DESAFIAR
            </button>
          </article>

          <article className="home__mode-card home__mode-card--tournament">
            <div className="home__mode-icon">🏆</div>

            <h3>TORNEOS</h3>

            <p>
              Competí con otros jugadores
              <br />y buscá la gloria.
            </p>

            <button type="button" onClick={() => navigate("/torneos")}>
              VER TORNEOS
            </button>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
