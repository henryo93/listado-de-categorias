import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white flex space-x-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 hover:text-white underline"
                : "text-white hover:text-orange-400"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 hover:text-white underline"
                : "text-white hover:text-orange-400"
            }
          >
            Categorías
          </NavLink>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;