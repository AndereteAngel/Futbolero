import { calcularPuntajePartido } from "./seleccionarPartidosDiarios";

export function seleccionarPartidosParaTorneo(
  partidos,
  competicionesSeleccionadas = []
) {
  if (!Array.isArray(partidos)) {
    return [];
  }

  const competiciones = Array.isArray(
    competicionesSeleccionadas
  )
    ? competicionesSeleccionadas.filter(Boolean)
    : [];

  const partidosValidos = partidos
    .filter((partido) => {
      if (
        !partido ||
        !partido.homeTeam?.name ||
        !partido.awayTeam?.name ||
        !partido.competition?.name
      ) {
        return false;
      }

      if (competiciones.length === 0) {
        return true;
      }

      return competiciones.includes(
        partido.competition.name
      );
    })
    .map((partido) => ({
      ...partido,
      selectionScore: calcularPuntajePartido(partido),
    }));

  return partidosValidos.sort(
    (a, b) => b.selectionScore - a.selectionScore
  );
}
