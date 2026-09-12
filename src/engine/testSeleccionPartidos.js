// src/engine/testSeleccionPartidos.js

import {
  seleccionarPartidosDiarios,
  calcularPuntajePartido,
} from "./seleccionarPartidosDiarios";

// =========================================================
// PARTIDOS DE PRUEBA
// =========================================================

const partidosPrueba = [
  {
    apiId: 1,
    date: "2026-09-09T16:00:00-03:00",
    competition: {
      id: 2,
      name: "UEFA Champions League",
      country: "Europa",
    },
    homeTeam: {
      id: 541,
      name: "Real Madrid",
      logo: null,
    },
    awayTeam: {
      id: 505,
      name: "Inter",
      logo: null,
    },
  },

  {
    apiId: 2,
    date: "2026-09-09T16:00:00-03:00",
    competition: {
      id: 39,
      name: "Premier League",
      country: "Inglaterra",
    },
    homeTeam: {
      id: 50,
      name: "Manchester City",
      logo: null,
    },
    awayTeam: {
      id: 66,
      name: "Aston Villa",
      logo: null,
    },
  },

  {
    apiId: 3,
    date: "2026-09-09T21:30:00-03:00",
    competition: {
      id: 11,
      name: "CONMEBOL Sudamericana",
      country: "Sudamérica",
    },
    homeTeam: {
      id: 451,
      name: "Boca Juniors",
      logo: null,
    },
    awayTeam: {
      id: 126,
      name: "São Paulo",
      logo: null,
    },
  },

  {
    apiId: 4,
    date: "2026-09-09T15:00:00-03:00",
    competition: {
      id: 140,
      name: "LaLiga",
      country: "España",
    },
    homeTeam: {
      id: 541,
      name: "Real Madrid",
      logo: null,
    },
    awayTeam: {
      id: 543,
      name: "Sevilla",
      logo: null,
    },
  },

  {
    apiId: 5,
    date: "2026-09-09T14:00:00-03:00",
    competition: {
      id: 78,
      name: "Bundesliga",
      country: "Alemania",
    },
    homeTeam: {
      id: 165,
      name: "Borussia Dortmund",
      logo: null,
    },
    awayTeam: {
      id: 157,
      name: "Bayern Munich",
      logo: null,
    },
  },

  {
    apiId: 6,
    date: "2026-09-09T12:00:00-03:00",
    competition: {
      id: 1031,
      name: "Premier League",
      country: "Bhutan",
    },
    homeTeam: {
      id: 19007,
      name: "Ugyen Academy",
      logo: null,
    },
    awayTeam: {
      id: 9426,
      name: "Paro",
      logo: null,
    },
  },
];

// =========================================================
// MOSTRAR PUNTAJES
// =========================================================

console.log("========================================");
console.log("PRUEBA DEL MOTOR FUTBOLERO");
console.log("========================================");

console.log("");

partidosPrueba.forEach((partido) => {
  const puntaje = calcularPuntajePartido(partido);

  console.log(
    `${partido.homeTeam.name} vs ${partido.awayTeam.name}`
  );

  console.log(
    `Competición: ${partido.competition.name}`
  );

  console.log(`Puntaje: ${puntaje}`);

  console.log("----------------------------------------");
});

// =========================================================
// SELECCIONAR LOS 3
// =========================================================

const seleccionados =
  seleccionarPartidosDiarios(partidosPrueba);

console.log("");
console.log("========================================");
console.log("3 PARTIDOS SELECCIONADOS");
console.log("========================================");

seleccionados.forEach((partido, index) => {
  console.log(
    `${index + 1}. ${partido.homeTeam.name} vs ${partido.awayTeam.name}`
  );

  console.log(
    `   Competición: ${partido.competition.name}`
  );

  console.log(
    `   Puntaje: ${partido.selectionScore}`
  );

  console.log("");
});

console.log("========================================");