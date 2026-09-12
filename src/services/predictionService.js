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

export async function guardarPrediccion({
    userId,
    matchId,
    mode,
    gameId,
    homeGoals,
    awayGoals,
}) {
    if (!userId) {
        throw new Error("El usuario es obligatorio.");
    }

    if (!matchId) {
        throw new Error("El partido es obligatorio.");
    }

    if (!mode) {
        throw new Error("El modo de juego es obligatorio.");
    }

    const predictionId =
        `${userId}_${mode}_${gameId}_${matchId}`;

    const predictionRef = doc(
        db,
        "predictions",
        predictionId
    );

    await setDoc(
        predictionRef,
        {
            userId,
            matchId,
            mode,
            gameId,
            homeGoals: Number(homeGoals),
            awayGoals: Number(awayGoals),
            points: null,
            updatedAt: serverTimestamp(),
        },
        {
            merge: true,
        }
    );

    return predictionId;
}

export async function obtenerPredicciones({
    userId,
    mode,
    gameId,
}) {
    if (!userId) {
        throw new Error("El usuario es obligatorio.");
    }

    if (!mode) {
        throw new Error("El modo de juego es obligatorio.");
    }

    if (!gameId) {
        throw new Error("El día de juego es obligatorio.");
    }

    const predictionsRef = collection(
        db,
        "predictions"
    );

    const predictionsQuery = query(
        predictionsRef,
        where("userId", "==", userId),
        where("mode", "==", mode),
        where("gameId", "==", gameId)
    );

    const snapshot = await getDocs(predictionsQuery);

    return snapshot.docs.map((predictionDoc) => ({
        id: predictionDoc.id,
        ...predictionDoc.data(),
    }));
}

export async function obtenerPrediccionesPorPartido({
    matchId,
    mode,
    gameId,
}) {
    if (!matchId) {
        throw new Error("El partido es obligatorio.");
    }

    if (!mode) {
        throw new Error("El modo de juego es obligatorio.");
    }

    if (!gameId) {
        throw new Error("El día de juego es obligatorio.");
    }

    const predictionsRef = collection(
        db,
        "predictions"
    );

    const predictionsQuery = query(
        predictionsRef,
        where("matchId", "==", String(matchId)),
        where("mode", "==", mode),
        where("gameId", "==", gameId)
    );

    const snapshot = await getDocs(predictionsQuery);

    return snapshot.docs.map((predictionDoc) => ({
        id: predictionDoc.id,
        ...predictionDoc.data(),
    }));
}