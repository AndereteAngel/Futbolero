// src/engine/seleccionarPartidosDiarios.js

// =========================================================
// CONFIGURACIÓN
// =========================================================

const CANTIDAD_PARTIDOS_DIARIOS = 3;

// =========================================================
// COMPETICIONES
// =========================================================

const IMPORTANCIA_COMPETICIONES = {
  "UEFA Champions League": 10,
  "UEFA Europa League": 8,
  "UEFA Europa Conference League": 7,

  "CONMEBOL Libertadores": 10,
  "CONMEBOL Sudamericana": 8,

  "Premier League": 10,
  "LaLiga": 10,
  "Serie A": 9,
  "Bundesliga": 9,
  "Ligue 1": 8,
  "Primeira Liga": 7,

  "Liga Profesional": 8,
  "Brasileirão Série A": 9,
  "Liga MX": 7,
  "MLS": 6,
  "Süper Lig": 7,
  "Saudi Pro League": 6,
  "Egyptian Premier League": 5,
  "J1 League": 5,
};

// =========================================================
// EQUIPOS
// =========================================================

const EQUIPOS = {
  // -------------------------
  // NIVEL S
  // -------------------------

  "Real Madrid": {
    nivel: "S",
    popularidad: 10,
  },

  "Barcelona": {
    nivel: "S",
    popularidad: 10,
  },

  "Manchester City": {
    nivel: "S",
    popularidad: 10,
  },

  "Liverpool": {
    nivel: "S",
    popularidad: 10,
  },

  "Arsenal": {
    nivel: "S",
    popularidad: 9,
  },

  "Bayern Munich": {
    nivel: "S",
    popularidad: 10,
  },

  "PSG": {
    nivel: "S",
    popularidad: 9,
  },

  "Inter": {
    nivel: "S",
    popularidad: 9,
  },

  "Milan": {
    nivel: "S",
    popularidad: 9,
  },

  "River Plate": {
    nivel: "S",
    popularidad: 9,
  },

  "Boca Juniors": {
    nivel: "S",
    popularidad: 9,
  },

  "Benfica": {
    nivel: "S",
    popularidad: 8,
  },

  "Porto": {
    nivel: "S",
    popularidad: 8,
  },

  "Inter Miami": {
    nivel: "S",
    popularidad: 8,
  },

  // -------------------------
  // NIVEL A
  // -------------------------

  "Manchester United": {
    nivel: "A",
    popularidad: 9,
  },

  "Chelsea": {
    nivel: "A",
    popularidad: 9,
  },

  "Tottenham": {
    nivel: "A",
    popularidad: 8,
  },

  "Newcastle": {
    nivel: "A",
    popularidad: 7,
  },

  "Aston Villa": {
    nivel: "A",
    popularidad: 7,
  },

  "Atlético Madrid": {
    nivel: "A",
    popularidad: 9,
  },

  "Athletic Club": {
    nivel: "A",
    popularidad: 7,
  },

  "Sevilla": {
    nivel: "A",
    popularidad: 7,
  },

  "Valencia": {
    nivel: "A",
    popularidad: 7,
  },

  "Juventus": {
    nivel: "A",
    popularidad: 9,
  },

  "Napoli": {
    nivel: "A",
    popularidad: 8,
  },

  "Roma": {
    nivel: "A",
    popularidad: 8,
  },

  "Lazio": {
    nivel: "A",
    popularidad: 7,
  },

  "Borussia Dortmund": {
    nivel: "A",
    popularidad: 9,
  },

  "Bayer Leverkusen": {
    nivel: "A",
    popularidad: 8,
  },

  "RB Leipzig": {
    nivel: "A",
    popularidad: 7,
  },

  "Marseille": {
    nivel: "A",
    popularidad: 8,
  },

  "Lyon": {
    nivel: "A",
    popularidad: 8,
  },

  "Monaco": {
    nivel: "A",
    popularidad: 8,
  },

  "Sporting CP": {
    nivel: "A",
    popularidad: 8,
  },

  "Braga": {
    nivel: "A",
    popularidad: 7,
  },

  "Racing": {
    nivel: "A",
    popularidad: 7,
  },

  "Independiente": {
    nivel: "A",
    popularidad: 7,
  },

  "San Lorenzo": {
    nivel: "A",
    popularidad: 7,
  },

  "Estudiantes": {
    nivel: "A",
    popularidad: 7,
  },

  "Vélez": {
    nivel: "A",
    popularidad: 6,
  },

  "Flamengo": {
    nivel: "A",
    popularidad: 9,
  },

  "Palmeiras": {
    nivel: "A",
    popularidad: 9,
  },

  "Corinthians": {
    nivel: "A",
    popularidad: 8,
  },

  "São Paulo": {
    nivel: "A",
    popularidad: 8,
  },

  "Santos": {
    nivel: "A",
    popularidad: 8,
  },

  "Fluminense": {
    nivel: "A",
    popularidad: 7,
  },

  "Atlético Mineiro": {
    nivel: "A",
    popularidad: 8,
  },

  "Grêmio": {
    nivel: "A",
    popularidad: 8,
  },

  "Internacional": {
    nivel: "A",
    popularidad: 7,
  },

  "Cruzeiro": {
    nivel: "A",
    popularidad: 7,
  },

  "América": {
    nivel: "A",
    popularidad: 8,
  },

  "Chivas": {
    nivel: "A",
    popularidad: 8,
  },

  "Cruz Azul": {
    nivel: "A",
    popularidad: 7,
  },

  "Tigres": {
    nivel: "A",
    popularidad: 8,
  },

  "Monterrey": {
    nivel: "A",
    popularidad: 8,
  },

  "LA Galaxy": {
    nivel: "A",
    popularidad: 7,
  },

  "LAFC": {
    nivel: "A",
    popularidad: 7,
  },

  "Seattle Sounders": {
    nivel: "A",
    popularidad: 6,
  },

  "Atlanta United": {
    nivel: "A",
    popularidad: 6,
  },

  "Galatasaray": {
    nivel: "A",
    popularidad: 8,
  },

  "Fenerbahçe": {
    nivel: "A",
    popularidad: 8,
  },

  "Beşiktaş": {
    nivel: "A",
    popularidad: 7,
  },

  "Al Hilal": {
    nivel: "A",
    popularidad: 8,
  },

  "Al Nassr": {
    nivel: "A",
    popularidad: 8,
  },

  "Al Ahli": {
    nivel: "A",
    popularidad: 7,
  },

  "Al Ittihad": {
    nivel: "A",
    popularidad: 7,
  },

  // -------------------------
  // NIVEL B
  // -------------------------

  "Botafogo": {
    nivel: "B",
    popularidad: 6,
  },

  "Vasco da Gama": {
    nivel: "B",
    popularidad: 6,
  },

  "Bahia": {
    nivel: "B",
    popularidad: 6,
  },

  "Lanús": {
    nivel: "B",
    popularidad: 5,
  },

  "Argentinos Juniors": {
    nivel: "B",
    popularidad: 5,
  },

  "Talleres": {
    nivel: "B",
    popularidad: 6,
  },

  "Rosario Central": {
    nivel: "B",
    popularidad: 6,
  },

  "Peñarol": {
    nivel: "B",
    popularidad: 7,
  },

  "Nacional": {
    nivel: "B",
    popularidad: 7,
  },

  "Atlético Nacional": {
    nivel: "B",
    popularidad: 6,
  },

  "Millonarios": {
    nivel: "B",
    popularidad: 6,
  },

  "América de Cali": {
    nivel: "B",
    popularidad: 6,
  },

  "Colo-Colo": {
    nivel: "B",
    popularidad: 6,
  },

  "Universidad de Chile": {
    nivel: "B",
    popularidad: 6,
  },

  "Olimpia": {
    nivel: "B",
    popularidad: 6,
  },

  "Cerro Porteño": {
    nivel: "B",
    popularidad: 6,
  },

  "LDU Quito": {
    nivel: "B",
    popularidad: 6,
  },

  "Independiente del Valle": {
    nivel: "B",
    popularidad: 6,
  },

  "Barcelona SC": {
    nivel: "B",
    popularidad: 6,
  },
};

// =========================================================
// FUNCIONES AUXILIARES
// =========================================================

function obtenerEquipo(nombre) {
  return (
    EQUIPOS[nombre] || {
      nivel: "C",
      popularidad: 3,
    }
  );
}

function obtenerImportanciaCompeticion(nombre) {
  return IMPORTANCIA_COMPETICIONES[nombre] || 0;
}

function obtenerValorNivel(nivel) {
  const valores = {
    S: 4,
    A: 3,
    B: 2,
    C: 1,
  };

  return valores[nivel] || 1;
}

// =========================================================
// PUNTAJE DE PARTIDO
// =========================================================

export function calcularPuntajePartido(partido) {
  const local = obtenerEquipo(partido.homeTeam.name);
  const visitante = obtenerEquipo(partido.awayTeam.name);

  let puntaje = 0;

  // -------------------------------------------------------
  // 1. POPULARIDAD DE LOS EQUIPOS
  // -------------------------------------------------------

  puntaje += local.popularidad;
  puntaje += visitante.popularidad;

  // -------------------------------------------------------
  // 2. NIVEL DE LOS EQUIPOS
  // -------------------------------------------------------

  puntaje += obtenerValorNivel(local.nivel);
  puntaje += obtenerValorNivel(visitante.nivel);

  // -------------------------------------------------------
  // 3. DOS EQUIPOS NIVEL S
  // -------------------------------------------------------

  if (local.nivel === "S" && visitante.nivel === "S") {
    puntaje += 10;
  }

  // -------------------------------------------------------
  // 4. FAVORITO CONTRA FAVORITO
  // -------------------------------------------------------

  if (
    (local.nivel === "S" || local.nivel === "A") &&
    (visitante.nivel === "S" || visitante.nivel === "A")
  ) {
    puntaje += 5;
  }

  // -------------------------------------------------------
  // 5. IMPORTANCIA DE LA COMPETICIÓN
  // -------------------------------------------------------

  puntaje += obtenerImportanciaCompeticion(
    partido.competition.name
  );

  // -------------------------------------------------------
  // 6. RIVALIDAD / INTERÉS
  // -------------------------------------------------------

  const rivalidades = [
    ["Real Madrid", "Barcelona"],
    ["Manchester City", "Manchester United"],
    ["Liverpool", "Manchester United"],
    ["Inter", "Milan"],
    ["Boca Juniors", "River Plate"],
    ["Racing", "Independiente"],
    ["Flamengo", "Fluminense"],
    ["Galatasaray", "Fenerbahçe"],
    ["América", "Chivas"],
  ];

  const hayRivalidad = rivalidades.some(
    ([equipo1, equipo2]) =>
      (partido.homeTeam.name === equipo1 &&
        partido.awayTeam.name === equipo2) ||
      (partido.homeTeam.name === equipo2 &&
        partido.awayTeam.name === equipo1)
  );

  if (hayRivalidad) {
    puntaje += 8;
  }

  // -------------------------------------------------------
  // 7. PENALIZACIÓN POR EQUIPOS DESCONOCIDOS
  // -------------------------------------------------------

  if (local.nivel === "C" || visitante.nivel === "C") {
    puntaje -= 3;
  }

  return puntaje;
}

// =========================================================
// SELECCIÓN DE LOS 3 PARTIDOS
// =========================================================

export function seleccionarPartidosDiarios(partidos) {
  if (!Array.isArray(partidos)) {
    return [];
  }

  const partidosValidos = partidos
    .filter((partido) => {
      return (
        partido &&
        partido.homeTeam?.name &&
        partido.awayTeam?.name &&
        partido.competition?.name
      );
    })
    .map((partido) => ({
      ...partido,
      selectionScore: calcularPuntajePartido(partido),
    }));

  const partidosOrdenados = [...partidosValidos].sort(
    (a, b) => b.selectionScore - a.selectionScore
  );

  return partidosOrdenados.slice(
    0,
    CANTIDAD_PARTIDOS_DIARIOS
  );
}

// =========================================================
// EXPORTACIONES
// =========================================================

export { EQUIPOS, IMPORTANCIA_COMPETICIONES };