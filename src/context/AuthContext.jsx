import { auth, db } from "../services/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(
      auth,
      async (usuarioFirebase) => {
        if (!usuarioFirebase) {
          setUsuario(null);
          setPerfil(null);
          setCargando(false);
          return;
        }

        setUsuario(usuarioFirebase);

        try {
          const perfilRef = doc(db, "users", usuarioFirebase.uid);
          const perfilSnapshot = await getDoc(perfilRef);

          if (perfilSnapshot.exists()) {
            setPerfil(perfilSnapshot.data());
          } else {
            setPerfil(null);
          }
        } catch (error) {
          console.error("Error al obtener el perfil del usuario:", error);

          setPerfil(null);
        } finally {
          setCargando(false);
        }
      }
    );

    return () => cancelarSuscripcion();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        perfil,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
