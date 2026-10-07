import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

function generarCodigoTorneo() {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";

  for (let i = 0; i < 6; i += 1) {
    codigo += caracteres[Math.floor(Math.random() * caracteres.length)];
  }

  return codigo;
}

export async function crearTorneo({
  userId,
  alias,
  title,
  description,
  matchCount,
  isPublic,
}) {
  if (!userId) {
    throw new Error("El usuario es obligatorio.");
  }

  if (!title?.trim()) {
    throw new Error("El nombre del torneo es obligatorio.");
  }

  const cantidadPartidos = Number(matchCount);

  if (!Number.isInteger(cantidadPartidos) || cantidadPartidos < 1) {
    throw new Error("La cantidad de partidos debe ser válida.");
  }

  const torneoRef = await addDoc(collection(db, "tournaments"), {
    title: title.trim(),
    description: description?.trim() || "",
    createdBy: userId,
    createdByAlias: alias || "Jugador",
    code: generarCodigoTorneo(),
    status: "open",
    isPublic: Boolean(isPublic),
    matchCount: cantidadPartidos,
    matches: [],
    participantCount: 0,
    winnerId: null,
    winnerAlias: null,
    createdAt: serverTimestamp(),
    startedAt: null,
    finishedAt: null,
  });

  return torneoRef.id;
}
