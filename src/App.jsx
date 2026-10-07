import { BrowserRouter, Route, Routes } from "react-router-dom";

import Daily from "./pages/Daily/Daily";
import Footer from "./components/layout/Footer";
import HeadToHead from "./pages/HeadToHead/HeadToHead";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/layout/Navbar";
import Register from "./pages/Register/Register";
import CreateTournament from "./pages/Tournaments/CreateTournament";
import { useAuth } from "./context/AuthContext";

function App() {
  const { cargando } = useAuth();

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/registro" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/diario" element={<Daily />} />

        <Route path="/mano-a-mano" element={<HeadToHead />} />

        <Route path="/torneos/crear" element={<CreateTournament />} />

        <Route
          path="*"
          element={
            <main>
              <h1>Futbolero</h1>
              <p>La página que buscás no existe.</p>
            </main>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
