import { iniciarSesion } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
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

  async function manejarLogin(event) {
    event.preventDefault();

    setMensaje("");

    if (!formulario.email || !formulario.password) {
      setMensaje("Completá todos los campos.");
      return;
    }

    setCargando(true);

    try {
      await iniciarSesion(formulario.email, formulario.password);

      navigate("/");
    } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setMensaje("Correo o contraseña incorrectos.");
      } else if (error.code === "auth/invalid-email") {
        setMensaje("El correo electrónico no es válido.");
      } else {
        setMensaje("No se pudo iniciar sesión. Intentá nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <main>
      <h1>Ingresar</h1>

      <form onSubmit={manejarLogin}>
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
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formulario.password}
            onChange={manejarCambio}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? "INGRESANDO..." : "INGRESAR"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </main>
  );
}

export default Login;
