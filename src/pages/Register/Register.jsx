import { registrarUsuario } from "../../services/authService";
import { useState } from "react";

function Register() {
  const [formulario, setFormulario] = useState({
    email: "",
    alias: "",
    pais: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  function manejarCambio(event) {
    const { name, value } = event.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  }

  async function manejarRegistro(event) {
    event.preventDefault();

    setMensaje("");

    if (
      !formulario.email ||
      !formulario.alias ||
      !formulario.pais ||
      !formulario.password ||
      !formulario.confirmarPassword
    ) {
      setMensaje("Completá todos los campos.");
      return;
    }

    if (formulario.password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      await registrarUsuario({
        email: formulario.email,
        alias: formulario.alias,
        pais: formulario.pais,
        password: formulario.password,
      });

      setMensaje("Cuenta creada correctamente.");
    } catch (error) {
      if (error.message === "ALIAS_EN_USO") {
        setMensaje("Ese alias ya está en uso.");
      } else if (error.code === "auth/email-already-in-use") {
        setMensaje("Ese correo electrónico ya está registrado.");
      } else if (error.code === "auth/invalid-email") {
        setMensaje("El correo electrónico no es válido.");
      } else if (error.code === "auth/weak-password") {
        setMensaje("La contraseña es demasiado débil.");
      } else {
        console.error(error);
        setMensaje("No se pudo crear la cuenta. Intentá nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <main>
      <h1>Crear cuenta</h1>

      <form onSubmit={manejarRegistro}>
        <div>
          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formulario.email}
            onChange={manejarCambio}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="alias">Alias</label>

          <input
            id="alias"
            name="alias"
            type="text"
            value={formulario.alias}
            onChange={manejarCambio}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="pais">País</label>

          <input
            id="pais"
            name="pais"
            type="text"
            value={formulario.pais}
            onChange={manejarCambio}
            autoComplete="country-name"
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formulario.password}
            onChange={manejarCambio}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="confirmarPassword">Repetir contraseña</label>

          <input
            id="confirmarPassword"
            name="confirmarPassword"
            type="password"
            value={formulario.confirmarPassword}
            onChange={manejarCambio}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? "CREANDO..." : "REGISTRARSE"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </main>
  );
}

export default Register;
