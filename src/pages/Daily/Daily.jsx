import "./Daily.css";

import {
  guardarPrediccion,
  obtenerPredicciones,
} from "../../services/predictionService";
import { useEffect, useState } from "react";

import { obtenerPartidosPorFecha } from "../../services/footballService";
import { seleccionarPartidosDiarios } from "../../engine/seleccionarPartidosDiarios";
import { useAuth } from "../../context/AuthContext";

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

  const fechaLocal = new Date(
    Number(anio),
    Number(mes) - 1,
    Number(dia)
  );

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fechaLocal);
}

function formatearHora(fecha) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(fecha));
}

// =========================================
// SABER SI EL PARTIDO YA COMENZÓ
// =========================================

function partidoComenzo(fecha) {
  if (!fecha) {
    return false;
  }

  return new Date(fecha).getTime() <= Date.now();
}

function Daily() {
  const { usuario, cargando } = useAuth();

  const [partidos, setPartidos] = useState([]);

  const [pronosticos, setPronosticos] = useState([]);

  const [cargandoPartidos, setCargandoPartidos] =
    useState(true);

  const [cargandoEnvio, setCargandoEnvio] =
    useState(false);

  const [mensaje, setMensaje] = useState("");

  // =========================================
  // CARGAR DESAFÍO DIARIO
  // =========================================

  useEffect(() => {
    if (cargando) {
      return;
    }

    async function cargarDesafioDiario() {
      try {
        setCargandoPartidos(true);
        setMensaje("");

        const fecha = obtenerFechaArgentina();

        // =========================================
        // 1. OBTENER PARTIDOS DEL DÍA
        // =========================================

        const partidosDelDia =
          await obtenerPartidosPorFecha(fecha);

        const partidosSeleccionados =
          seleccionarPartidosDiarios(partidosDelDia);

        setPartidos(partidosSeleccionados);

        // =========================================
        // 2. CREAR PRONÓSTICOS VACÍOS
        // =========================================

        const pronosticosIniciales =
          partidosSeleccionados.map(() => ({
            local: "",
            visitante: "",
          }));

        // =========================================
        // 3. RECUPERAR PRONÓSTICOS GUARDADOS
        // =========================================

        if (
          usuario &&
          partidosSeleccionados.length > 0
        ) {
          const prediccionesGuardadas =
            await obtenerPredicciones({
              userId: usuario.uid,
              mode: "daily",
              gameId: fecha,
            });

          prediccionesGuardadas.forEach(
            (prediccionGuardada) => {
              const indice =
                partidosSeleccionados.findIndex(
                  (partido) =>
                    String(partido.apiId) ===
                    String(
                      prediccionGuardada.matchId
                    )
                );

              if (indice === -1) {
                return;
              }

              pronosticosIniciales[indice] = {
                local:
                  prediccionGuardada.homeGoals ??
                  "",
                visitante:
                  prediccionGuardada.awayGoals ??
                  "",
              };
            }
          );
        }

        setPronosticos(pronosticosIniciales);

        // =========================================
        // 4. VALIDAR CANTIDAD
        // =========================================

        if (partidosSeleccionados.length < 3) {
          setMensaje(
            "No hay suficientes partidos disponibles para completar el desafío diario."
          );
        }
      } catch (error) {
        console.error(
          "Error al cargar el desafío diario:",
          error
        );

        setMensaje(
          error.message ||
            "No se pudo cargar el desafío diario."
        );
      } finally {
        setCargandoPartidos(false);
      }
    }

    cargarDesafioDiario();
  }, [cargando, usuario]);

  // =========================================
  // CAMBIAR PRONÓSTICO
  // =========================================

  function manejarPronostico(
    indice,
    equipo,
    valor
  ) {
    const partido = partidos[indice];

    if (partidoComenzo(partido?.date)) {
      setMensaje(
        "Este partido ya comenzó y su pronóstico está bloqueado."
      );

      return;
    }

    const nuevoValor =
      valor === "" ? "" : Number(valor);

    setPronosticos((actuales) =>
      actuales.map((pronostico, i) => {
        if (i !== indice) {
          return pronostico;
        }

        return {
          ...pronostico,
          [equipo]: nuevoValor,
        };
      })
    );

    setMensaje("");
  }

  // =========================================
  // ENVIAR PRONÓSTICOS
  // =========================================

  async function enviarPronosticos(event) {
    event.preventDefault();

    setMensaje("");

    if (!usuario) {
      setMensaje(
        "Tenés que iniciar sesión para jugar."
      );

      return;
    }

    if (partidos.length !== 3) {
      setMensaje(
        "El desafío diario todavía no está disponible."
      );

      return;
    }

    // =========================================
    // VALIDAR SOLO PARTIDOS ABIERTOS
    // =========================================

    const partidosAbiertos = partidos.filter(
      (partido) => !partidoComenzo(partido.date)
    );

    if (partidosAbiertos.length === 0) {
      setMensaje(
        "Todos los partidos del desafío ya comenzaron. Los pronósticos están cerrados."
      );

      return;
    }

    // =========================================
    // VALIDAR PRONÓSTICOS DE LOS PARTIDOS ABIERTOS
    // =========================================

    const indicePronosticoInvalido =
      partidos.findIndex(
        (partido, indice) =>
          !partidoComenzo(partido.date) &&
          (
            pronosticos[indice]?.local === "" ||
            pronosticos[indice]?.visitante === ""
          )
      );

    if (indicePronosticoInvalido !== -1) {
      setMensaje(
        "Completá los pronósticos de los partidos que todavía están abiertos."
      );

      return;
    }

    setCargandoEnvio(true);

    try {
      const gameId = obtenerFechaArgentina();

      // =========================================
      // GUARDAR SOLAMENTE PARTIDOS ABIERTOS
      // =========================================

      for (
        let indice = 0;
        indice < partidos.length;
        indice++
      ) {
        const partido = partidos[indice];

        // Si el partido ya comenzó,
        // NO se vuelve a guardar.
        if (partidoComenzo(partido.date)) {
          continue;
        }

        const pronostico =
          pronosticos[indice];

        await guardarPrediccion({
          userId: usuario.uid,
          matchId: String(partido.apiId),
          mode: "daily",
          gameId,
          homeGoals: pronostico.local,
          awayGoals: pronostico.visitante,
        });
      }

      console.log(
        "Pronósticos abiertos guardados correctamente:",
        {
          usuario: usuario.uid,
          gameId,
          partidos,
          pronosticos,
        }
      );

      setMensaje(
        "PRONÓSTICOS REGISTRADOS CORRECTAMENTE"
      );
    } catch (error) {
      console.error(
        "Error al guardar los pronósticos:",
        error
      );

      setMensaje(
        error.message ||
          "No se pudieron guardar los pronósticos."
      );
    } finally {
      setCargandoEnvio(false);
    }
  }

  // =========================================
  // CARGANDO
  // =========================================

  if (cargando || cargandoPartidos) {
    return (
      <main className="daily">
        <section className="daily__header">
          <span className="daily__eyebrow">
            FUTBOLERO
          </span>

          <h1>DESAFÍO DIARIO</h1>

          <p>
            Cargando los partidos de hoy...
          </p>
        </section>
      </main>
    );
  }

  // =========================================
  // VISTA PRINCIPAL
  // =========================================

  return (
    <main className="daily">
      <section className="daily__header">
        <span className="daily__eyebrow">
          FUTBOLERO
        </span>

        <h1>DESAFÍO DIARIO</h1>

        <p>
          Tres partidos. Una oportunidad cada día.
        </p>

        <span className="daily__date">
          {formatearFecha(
            obtenerFechaArgentina()
          ).toUpperCase()}
        </span>
      </section>

      {partidos.length > 0 && (
        <form onSubmit={enviarPronosticos}>
          <section className="daily__matches">
            {partidos.map((partido, indice) => {
              const bloqueado = partidoComenzo(
                partido.date
              );

              return (
                <article
                  className="daily__match-card"
                  key={partido.apiId}
                >
                  <div className="daily__match-number">
                    PARTIDO {indice + 1}
                  </div>

                  <div className="daily__match-time">
                    {partido.competition?.name}
                    {" · "}
                    {formatearHora(partido.date)}
                  </div>

                  <div className="daily__teams">
                    <div className="daily__team">
                      <div className="daily__team-logo">
                        {partido.homeTeam.logo ? (
                          <img
                            src={
                              partido.homeTeam.logo
                            }
                            alt={
                              partido.homeTeam.name
                            }
                            style={{
                              width: "52px",
                              height: "52px",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          "⚽"
                        )}
                      </div>

                      <strong>
                        {partido.homeTeam.name}
                      </strong>
                    </div>

                    <span className="daily__vs">
                      VS
                    </span>

                    <div className="daily__team">
                      <div className="daily__team-logo">
                        {partido.awayTeam.logo ? (
                          <img
                            src={
                              partido.awayTeam.logo
                            }
                            alt={
                              partido.awayTeam.name
                            }
                            style={{
                              width: "52px",
                              height: "52px",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          "⚽"
                        )}
                      </div>

                      <strong>
                        {partido.awayTeam.name}
                      </strong>
                    </div>
                  </div>

                  <div className="daily__prediction">
                    <span>
                      {bloqueado
                        ? "PRONÓSTICO BLOQUEADO"
                        : "TU PRONÓSTICO"}
                    </span>

                    <div className="daily__score">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={
                          pronosticos[indice]
                            ?.local ?? ""
                        }
                        disabled={bloqueado}
                        onChange={(event) =>
                          manejarPronostico(
                            indice,
                            "local",
                            event.target.value
                          )
                        }
                      />

                      <span>-</span>

                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={
                          pronosticos[indice]
                            ?.visitante ?? ""
                        }
                        disabled={bloqueado}
                        onChange={(event) =>
                          manejarPronostico(
                            indice,
                            "visitante",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="daily__actions">
            <button
              type="submit"
              disabled={cargandoEnvio}
            >
              {cargandoEnvio
                ? "GUARDANDO..."
                : "ENVIAR PRONÓSTICOS"}
            </button>

            <p>
              Podés modificar cada pronóstico hasta
              que comience el partido.
            </p>

            {mensaje && <p>{mensaje}</p>}
          </section>
        </form>
      )}

      {partidos.length === 0 && mensaje && (
        <section className="daily__actions">
          <p>{mensaje}</p>
        </section>
      )}
    </main>
  );
}

export default Daily;
