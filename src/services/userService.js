import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./firebase";

export async function crearPerfilUsuario(uid, datos) {
    const usuarioRef = doc(db, "users", uid);

    await setDoc(usuarioRef, {
        email: datos.email,
        alias: datos.alias,
        aliasLower: datos.alias.toLowerCase().trim(),
        pais: datos.pais,
        photoURL: null,
        createdAt: serverTimestamp(),
    });
}