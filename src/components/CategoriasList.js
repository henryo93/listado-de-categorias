import React, { useState, useEffect } from 'react';
import { getCategorias } from '../services/apiService';
import CategoriaCard from './CategoriaCard';

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  // Función para cargar categorías
  const cargarCategorias = async () => {
    setLoading(true);
    setError(null);
    
    const resultado = await getCategorias();
    
    if (resultado.success) {
      setCategorias(resultado.data);
      setRetryCount(0);
    } else {
      setError(resultado.message);
    }
    
    setLoading(false);
  };

  // Efecto para cargar datos al montar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  // Función para reintentar la carga
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    cargarCategorias();
  };

  // Filtrar categorías por nombre
  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.name.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  // Validación del filtro (al menos 2 caracteres o vacío)
  const filtroValido = filtroNombre.length === 0 || filtroNombre.length >= 2;

  // Loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Cargando categorías...</h2>
            <p className="text-gray-500 mt-2">Por favor espere un momento</p>
          </div>
          
          {/* Skeleton loading cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-3 inline-block mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar categorías</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              {retryCount > 0 ? `Reintentar (${retryCount})` : 'Reintentar'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🛍️ Categorías de Productos
          </h1>
          <p className="text-gray-600 text-lg">
            Explora nuestra amplia selección de categorías
          </p>
        </div>

        {/* Filtro de búsqueda */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              placeholder="Buscar categorías por nombre..."
              className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors duration-200 ${
                filtroValido 
                  ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-400' 
                  : 'border-red-300 focus:border-red-500 focus:ring-red-400'
              }`}
            />
          </div>
          {!filtroValido && (
            <p className="text-red-500 text-sm mt-1 ml-1">
              Ingrese al menos 2 caracteres para buscar
            </p>
          )}
        </div>

        {/* Estadísticas */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg px-6 py-3 border border-gray-100">
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <span className="font-bold text-2xl text-blue-600">{categorias.length}</span>
                <p className="text-gray-600">Total</p>
              </div>
              {filtroNombre && (
                <>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <span className="font-bold text-2xl text-purple-600">{categoriasFiltradas.length}</span>
                    <p className="text-gray-600">Filtradas</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Grid de categorías */}
        {filtroValido && categoriasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoriasFiltradas.map((categoria) => (
              <CategoriaCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        ) : filtroValido && categoriasFiltradas.length === 0 && filtroNombre ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 inline-block">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron categorías</h3>
              <p className="text-gray-500">Intenta con otro término de búsqueda</p>
            </div>
          </div>
        ) : null}

        {/* Botón de recarga */}
        <div className="text-center mt-8">
          <button
            onClick={cargarCategorias}
            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg shadow-md border border-gray-200 font-medium transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            🔄 Actualizar categorías
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriasList;