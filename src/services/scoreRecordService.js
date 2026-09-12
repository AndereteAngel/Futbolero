import {
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";

import { db } from "./firebase";

// =========================================
// GUARDAR SCORE RECORD
// =========================================

export async function guardarScoreRecord({
    userId,
    predictionId,
    matchId,
    gameId,
    mode,
    predictedHomeGoals,
    predictedAwayGoals,
    realHomeGoals,
    realAwayGoals,
    points,
}) {
    if (!userId) {
        throw new Error("Falta indicar el usuario.");
    }

    if (!predictionId) {
        throw new Error("Falta indicar la predicción.");
    }

    if (!matchId) {
        throw new Error("Falta indicar el partido.");
    }

    if (!gameId) {
        throw new Error("Falta indicar el juego.");
    }

    if (!mode) {
        throw new Error("Falta indicar el modo de juego.");
    }

    if (
        points !== null &&
        ![0, 1, 2, 3].includes(points)
    ) {
        throw new Error(
            "Los puntos deben ser 0, 1, 2, 3 o null."
        );
    }

    const recordId = predictionId;

    const recordRef = doc(
        db,
        "scoreRecords",
        recordId
    );

    await setDoc(
        recordRef,
        {
            userId,
            predictionId,
            matchId: String(matchId),
            gameId,
            mode,

            predictedHomeGoals:
                Number(predictedHomeGoals),

            predictedAwayGoals:
                Number(predictedAwayGoals),

            realHomeGoals:
                realHomeGoals === null ||
                    realHomeGoals === undefined
                    ? null
                    : Number(realHomeGoals),

            realAwayGoals:
                realAwayGoals === null ||
                    realAwayGoals === undefined
                    ? null
                    : Number(realAwayGoals),

            points,

            createdAt: serverTimestamp(),
            processedAt: serverTimestamp(),
        },
        {
            merge: false,
        }
    );

    return recordId;
}

// =========================================
// OBTENER SCORE RECORDS DE UN USUARIO
// =========================================

export async function obtenerScoreRecordsPorUsuario(
    userId
) {
    if (!userId) {
        throw new Error("Falta indicar el usuario.");
    }

    const recordsRef = collection(
        db,
        "scoreRecords"
    );

    const recordsQuery = query(
        recordsRef,
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(recordsQuery);

    return snapshot.docs.map((recordDoc) => ({
        id: recordDoc.id,
        ...recordDoc.data(),
    }));
}