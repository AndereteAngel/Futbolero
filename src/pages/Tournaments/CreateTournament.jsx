import "./CreateTournament.css";

import { useState } from "react";
import { obtenerPartidosPorFecha } from "../../services/footballService";
import { IMPORTANCIA_COMPETICIONES } from "../../engine/seleccionarPartidosDiarios";
import { seleccionarPartidosParaTorneo } from "../../engine/seleccionarPartidosParaTorneo";

function obtenerFechaArgentina() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split("-");
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(Number(anio), Number(mes) - 1, Number(dia)));
}

function CreateTournament() {
  const [nombre, setNombre] = useState("");
  const [fechas, setFechas] = useState([obtenerFechaArgentina()]);
  const [competiciones, setCompeticiones] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const listaCompeticiones = Object.keys(IMPORTANCIA_COMPETICIONES);

  function agregarFecha() {
    setFechas((actuales) => [...actuales, obtenerFechaArgentina()]);
  }

  function cambiarFecha(indice, valor) {
    setFechas((actuales) =>
      actuales.map((fecha, i) => (i === indice ? valor : fecha))
    );
  }

  function eliminarFecha(indice) {
    if (fechas.length === 1) return;
    setFechas((actuales) => actuales.filter((_, i) => i !== indice));
  }

  function cambiarCompeticion(nombreCompeticion) {
    setCompeticiones((actuales) =>
      actuales.includes(nombreCompeticion)
        ? actuales.filter((competicion) => competicion !== nombreCompeticion)
        : [...actuales, nombreCompeticion]
    );
  }

  async function buscarPartidos() {
    setMensaje("");

    const fechasValidas = fechas
      .filter(Boolean)
      .filter((fecha, indice, lista) => lista.indexOf(fecha) === indice);

    if (fechasValidas.length === 0) {
      setMensaje("Elegí al menos un día de competencia.");
      return;
    }

    setCargando(true);

    try {
      const resultados = await Promise.all(
        fechasValidas.map((fecha) => obtenerPartidosPorFecha(fecha))
      );

      const partidosOrdenados = seleccionarPartidosParaTorneo(
        resultados.flat(),
        competiciones
      );

      setPartidos(partidosOrdenados);
      setSeleccionados([]);

      if (partidosOrdenados.length === 0) {
        setMensaje("No encontramos partidos para los días y competiciones seleccionados.");
      }
    } catch (error) {
      console.error("Error al buscar partidos del torneo:", error);
      setMensaje(error.message || "No se pudieron cargar los partidos.");
    } finally {
      setCargando(false);
    }
  }

  function alternarPartido(partido) {
    const id = String(partido.apiId);
    setSeleccionados((actuales) =>
      actuales.includes(id)
        ? actuales.filter((partidoId) => partidoId !== id)
        : [...actuales, id]
    );
  }

  return (
    <main className="tournament-create">
      <section className="tournament-create__header">
        <span>FUTBOLERO</span>
        <h1>CREAR TORNEO</h1>
        <p>Elegí los días y dejá que el Ranking Futbolero ordene los partidos.</p>
      </section>

      <section className="tournament-create__panel">
        <label>
          Nombre del torneo
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Ej: Torneo Futbolero Octubre"
          />
        </label>

        <div className="tournament-create__section">
          <div className="tournament-create__section-title">
            <h2>DÍAS DE COMPETENCIA</h2>
            <button type="button" onClick={agregarFecha}>+ AGREGAR DÍA</button>
          </div>

          {fechas.map((fecha, indice) => (
            <div className="tournament-create__date" key={indice}>
              <input
                type="date"
                value={fecha}
                onChange={(event) => cambiarFecha(indice, event.target.value)}
              />
              <span>{fecha ? formatearFecha(fecha) : "Elegí una fecha"}</span>
              {fechas.length > 1 && (
                <button type="button" onClick={() => eliminarFecha(indice)}>×</button>
              )}
            </div>
          ))}
        </div>

        <div className="tournament-create__section">
          <div className="tournament-create__section-title">
            <h2>COMPETICIONES</h2>
            <span>
              {competiciones.length === 0 ? "TODAS" : competiciones.length + " seleccionadas"}
            </span>
          </div>

          <p className="tournament-create__hint">
            Si no elegís ninguna, se mostrarán todas las competiciones disponibles.
          </p>

          <div className="tournament-create__competitions">
            {listaCompeticiones.map((competicion) => (
              <label
                key={competicion}
                className={competiciones.includes(competicion) ? "is-selected" : ""}
              >
                <input
                  type="checkbox"
                  checked={competiciones.includes(competicion)}
                  onChange={() => cambiarCompeticion(competicion)}
                />
                <span>{competicion}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="tournament-create__search"
          onClick={buscarPartidos}
          disabled={cargando}
        >
          {cargando ? "BUSCANDO PARTIDOS..." : "BUSCAR PARTIDOS"}
        </button>

        {mensaje && <p className="tournament-create__message">{mensaje}</p>}
      </section>

      {partidos.length > 0 && (
        <section className="tournament-create__matches">
          <div className="tournament-create__matches-header">
            <div>
              <span>RANKING FUTBOLERO</span>
              <h2>PARTIDOS DISPONIBLES</h2>
            </div>
            <strong>{seleccionados.length} seleccionados</strong>
          </div>

          <p className="tournament-create__hint">
            Los partidos están ordenados de mayor a menor según el Ranking Futbolero.
          </p>

          {partidos.map((partido, indice) => {
            const id = String(partido.apiId);
            const estaSeleccionado = seleccionados.includes(id);

            return (
              <button
                type="button"
                className={estaSeleccionado ? "tournament-match is-selected" : "tournament-match"}
                key={id + "-" + partido.date}
                onClick={() => alternarPartido(partido)}
              >
                <div className="tournament-match__rank">#{indice + 1}</div>
                <div className="tournament-match__info">
                  <strong>{partido.homeTeam.name} vs {partido.awayTeam.name}</strong>
                  <span>
                    {partido.competition.name} · {formatearFecha(partido.date.slice(0, 10))}
                  </span>
                </div>
                <div className="tournament-match__score">{partido.selectionScore}</div>
                <div className="tournament-match__check">{estaSeleccionado ? "✓" : "+"}</div>
              </button>
            );
          })}

          <button
            type="button"
            className="tournament-create__continue"
            disabled={!nombre.trim() || seleccionados.length === 0}
            onClick={() => setMensaje("Selección lista. El siguiente paso será guardar y configurar el torneo.")}
          >
            CONTINUAR CON EL TORNEO
          </button>
        </section>
      )}
    </main>
  );
}

export default CreateTournament;
