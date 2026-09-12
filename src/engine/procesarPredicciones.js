import { procesarResultado } from "./procesarResultado.js";

// =========================================
// PROCESAR TODAS LAS PREDICCIONES
// DE UN PARTIDO
// =========================================

export function procesarPredicciones({
    partido,
    predicciones,
}) {
    if (!partido) {
        throw new Error("Falta indicar el partido.");
    }

    if (!Array.isArray(predicciones)) {
        throw new Error(
            "Las predicciones deben ser un array."
        );
    }

    return predicciones.map((prediccion) => {
        const puntos = procesarResultado({
            pronosticoLocal: prediccion.homeGoals,
            pronosticoVisitante: prediccion.awayGoals,
            partido,
        });

        return {
            ...prediccion,
            points: puntos,
        };
    });
}