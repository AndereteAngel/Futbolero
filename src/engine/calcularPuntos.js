
// =========================================
// CALCULAR RESULTADO
// =========================================

function obtenerResultado(golesLocal, golesVisitante) {
  if (golesLocal > golesVisitante) {
    return "LOCAL";
  }

  if (golesLocal < golesVisitante) {
    return "VISITANTE";
  }

  return "EMPATE";
}

// =========================================
// CALCULAR PUNTOS DEL PRONÓSTICO
// =========================================

export function calcularPuntos({
  pronosticoLocal,
  pronosticoVisitante,
  resultadoLocal,
  resultadoVisitante,
  estado,
}) {
  // =========================================
  // PARTIDO SUSPENDIDO / NO VÁLIDO
  // =========================================

  const estadosNoValidos = [
    "PST",
    "CANC",
    "ABD",
    "AWD",
    "WO",
  ];

  if (
    estado &&
    estadosNoValidos.includes(estado)
  ) {
    return null;
  }

  // =========================================
  // VALIDAR DATOS
  // =========================================

  if (
    pronosticoLocal === null ||
    pronosticoLocal === undefined ||
    pronosticoVisitante === null ||
    pronosticoVisitante === undefined ||
    resultadoLocal === null ||
    resultadoLocal === undefined ||
    resultadoVisitante === null ||
    resultadoVisitante === undefined
  ) {
    return null;
  }

  const predLocal = Number(pronosticoLocal);
  const predVisitante = Number(pronosticoVisitante);

  const realLocal = Number(resultadoLocal);
  const realVisitante = Number(resultadoVisitante);

  if (
    Number.isNaN(predLocal) ||
    Number.isNaN(predVisitante) ||
    Number.isNaN(realLocal) ||
    Number.isNaN(realVisitante)
  ) {
    return null;
  }

  // =========================================
  // 3 PUNTOS
  // RESULTADO EXACTO
  // =========================================

  if (
    predLocal === realLocal &&
    predVisitante === realVisitante
  ) {
    return 3;
  }

  // =========================================
  // RESULTADO
  // =========================================

  const resultadoPronosticado =
    obtenerResultado(
      predLocal,
      predVisitante
    );

  const resultadoReal =
    obtenerResultado(
      realLocal,
      realVisitante
    );

  // =========================================
  // RESULTADO INCORRECTO
  // =========================================

  if (
    resultadoPronosticado !== resultadoReal
  ) {
    return 0;
  }

  // =========================================
  // DIFERENCIA DE GOLES
  // =========================================

  const diferenciaPronosticada =
    predLocal - predVisitante;

  const diferenciaReal =
    realLocal - realVisitante;

  // =========================================
  // 2 PUNTOS
  // RESULTADO + DIFERENCIA CORRECTA
  // =========================================

  if (
    diferenciaPronosticada ===
    diferenciaReal
  ) {
    return 2;
  }

  // =========================================
  // 1 PUNTO
  // RESULTADO CORRECTO
  // =========================================

  return 1;
}
