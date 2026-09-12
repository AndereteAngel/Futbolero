import { calcularPuntos } from "./calcularPuntos.js";

// =========================================
// PROCESAR RESULTADO DE UN PARTIDO
// =========================================

export function procesarResultado({
    pronosticoLocal,
    pronosticoVisitante,
    partido,
}) {
    if (!partido) {
        throw new Error("Falta indicar el partido.");
    }

    const resultadoLocal = partido.goals?.home ?? null;
    const resultadoVisitante = partido.goals?.away ?? null;
    const estado = partido.status ?? null;

    // =========================================
    // CALCULAR PUNTOS
    // =========================================

    const puntos = calcularPuntos({
        pronosticoLocal,
        pronosticoVisitante,
        resultadoLocal,
        resultadoVisitante,
        estado,
    });

    return puntos;
}