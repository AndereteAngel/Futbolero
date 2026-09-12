import { auth, db } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    doc,
    runTransaction,
    serverTimestamp,
} from "firebase/firestore";

export async function registrarUsuario({
    email,
    alias,
    pais,
    password,
}) {
    const aliasNormalizado = alias.trim().toLowerCase();

    if (!aliasNormalizado) {
        throw new Error("El alias es obligatorio.");
    }

    // Creamos primero la cuenta de Authentication.
    const credencial = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    const uid = credencial.user.uid;

    try {
        // Reservamos el alias de forma atómica.
        await runTransaction(db, async (transaction) => {
            const aliasRef = doc(db, "aliases", aliasNormalizado);
            const usuarioRef = doc(db, "users", uid);

            const aliasSnapshot = await transaction.get(aliasRef);

            if (aliasSnapshot.exists()) {
                throw new Error("ALIAS_EN_USO");
            }

            transaction.set(aliasRef, {
                uid,
                alias: alias.trim(),
                createdAt: serverTimestamp(),
            });

            transaction.set(usuarioRef, {
                email: email.trim(),
                alias: alias.trim(),
                aliasLower: aliasNormalizado,
                pais,
                photoURL: null,
                createdAt: serverTimestamp(),
            });
        });

        return credencial.user;
    } catch (error) {
        // Si la creación del perfil o del alias falla,
        // eliminamos la cuenta de Authentication para no dejar
        // un usuario incompleto.
        try {
            await credencial.user.delete();
        } catch (deleteError) {
            console.error(
                "No se pudo eliminar la cuenta creada:",
                deleteError
            );
        }

        throw error;
    }
}

export async function iniciarSesion(email, password) {
    const credencial = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    return credencial.user;
}

export async function cerrarSesion() {
    await signOut(auth);
}