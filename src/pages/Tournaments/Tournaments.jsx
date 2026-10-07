import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { crearTorneo } from "../../services/tournamentService";

function Tournaments() {
  const { usuario, perfil } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [matchCount, setMatchCount] = useState(5);
  const [isPublic, setIsPublic] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function handleCrearTorneo(event) {
    event.preventDefault();

    if (!usuario) {
      setError("Tenés que iniciar sesión para crear un torneo.");
      return;
    }

    setGuardando(true);
    setMensaje("");
    setError("");

    try {
      const torneoId = await crearTorneo({
        userId: usuario.uid,
        alias: perfil?.alias,
        title,
        description,
        matchCount,
        isPublic,
      });

      setMensaje(`Torneo creado correctamente. ID: ${torneoId}`);
      setTitle("");
      setDescription("");
      setMatchCount(5);
      setIsPublic(true);
    } catch (crearError) {
      console.error("Error al crear torneo:", crearError);
      setError(crearError.message || "No se pudo crear el torneo.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <main style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>TORNEOS</h1>

      <p style={{ marginBottom: "24px" }}>
        Creá un torneo y después seleccioná los partidos que van a formar la
        boleta.
      </p>

      {!usuario ? (
        <p>Iniciá sesión para crear un torneo.</p>
      ) : (
        <form
          onSubmit={handleCrearTorneo}
          style={{
            display: "grid",
            gap: "16px",
            textAlign: "left",
            padding: "24px",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>Crear torneo</h2>

          <label>
            Nombre
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej: Copa Futbolero"
              required
              style={{ display: "block", width: "100%", marginTop: "6px", padding: "10px", boxSizing: "border-box" }}
            />
          </label>

          <label>
            Descripción
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Contá brevemente de qué se trata el torneo."
              rows={4}
              style={{ display: "block", width: "100%", marginTop: "6px", padding: "10px", boxSizing: "border-box", resize: "vertical" }}
            />
          </label>

          <label>
            Cantidad de partidos
            <input
              type="number"
              min="1"
              max="30"
              value={matchCount}
              onChange={(event) => setMatchCount(event.target.value)}
              style={{ display: "block", width: "120px", marginTop: "6px", padding: "10px" }}
            />
          </label>

          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(event) => setIsPublic(event.target.checked)}
            />
            Torneo público
          </label>

          <button type="submit" disabled={guardando}>
            {guardando ? "CREANDO..." : "CREAR TORNEO"}
          </button>

          {mensaje && (
            <p style={{ color: "green" }}>
              {mensaje}
            </p>
          )}

          {error && (
            <p style={{ color: "crimson" }}>
              {error}
            </p>
          )}
        </form>
      )}
    </main>
  );
}

export default Tournaments;
