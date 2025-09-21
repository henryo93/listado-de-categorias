import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vista, setVista] = useState("tabla"); // "tabla" o "cards"

   // Función para formatear fecha ISO a "dd/MM/yyyy HH:mm:ss"
  function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const fecha = parseISO(fechaISO);
    return format(fecha, "dd/MM/yyyy HH:mm:ss");
  }

  useEffect(() => {
    async function fetchCategorias() {
      try {
        setLoading(true);
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!res.ok) throw new Error("Error al cargar categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategorias();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-4">Categorías</h1>

      <div className="mb-4 space-x-2">
        <button
          onClick={() => setVista("tabla")}
          className={`px-4 py-2 rounded ${
            vista === "tabla" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
          }`}
        >
          Ver en Tabla
        </button>
        <button
          onClick={() => setVista("cards")}
          className={`px-4 py-2 rounded ${
            vista === "cards" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
          }`}
        >
          Ver en Cards
        </button>
      </div>

      {vista === "tabla" ? (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="border text-black px-4 py-2 text-left">ID</th>
              <th className="border text-black px-4 py-2 text-left">Nombre</th>
              <th className="border text-black px-4 py-2 text-left">Imagen</th>
              <th className="border text-black px-4 py-2 text-left">Fecha creación</th>
              <th className="border text-black px-4 py-2 text-left">Fecha modificación</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-100">
                <td className="border text-black px-4 py-2">{cat.id}</td>
                <td className="border text-black px-4 py-2">{cat.name}</td>
                <td className="border text-black px-4 py-2">
                  <img src={cat.image} alt={cat.name} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="border text-black px-4 py-2">{formatearFecha(cat.creationAt)}</td>
                <td className="border text-black px-4 py-2">{formatearFecha(cat.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <div key={cat.id} className="bg-white text-black rounded shadow p-4 flex flex-col items-center">
              <img src={cat.image} alt={cat.name} className="h-24 w-24 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold">{cat.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}