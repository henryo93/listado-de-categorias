import React, { useState } from 'react';
import { DEFAULT_IMAGE } from '../services/apiService';

const CategoriaCard = ({ categoria }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Manejar errores de carga de imagen
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Formatear fecha de creación
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Capitalizar primera letra del nombre
  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
      {/* Contenedor de imagen */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
        
        <img
          src={imageError ? DEFAULT_IMAGE : categoria.image}
          alt={categoria.name}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoading ? 'none' : 'block' }}
        />
        
        {/* Badge con ID */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ID: {categoria.id}
          </span>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {capitalizeName(categoria.name)}
          </h3>
          <p className="text-sm text-gray-500 italic">
            {categoria.slug}
          </p>
        </div>

        {/* Información adicional */}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Creado: {formatDate(categoria.creationAt)}
          </div>
          
          {categoria.creationAt !== categoria.updatedAt && (
            <div className="flex items-center text-xs text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Actualizado: {formatDate(categoria.updatedAt)}
            </div>
          )}
        </div>

        {/* Botón de acción */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            Ver Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriaCard;