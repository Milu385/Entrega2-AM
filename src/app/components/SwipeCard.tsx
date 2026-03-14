import { useState, useEffect } from "react";
import { X, Heart, MapPin, Bed, Bath, Square, Info, Hand } from "lucide-react";
import { Property } from "./PropertyCard";
import { ImageWithFallback } from "./ui/ImageWithFallback";

interface SwipeCardProps {
  property: Property;
  onLike: () => void;
  onDislike: () => void;
  onDetail: () => void;
  style?: React.CSSProperties;
}

export function SwipeCard({ property, onLike, onDislike, onDetail, style }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Ocultar hint después de la primera interacción o después de un tiempo
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setShowHint(false); // Ocultar hint al interactuar
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setDragX(deltaX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (dragX > 100) {
      onLike();
    } else if (dragX < -100) {
      onDislike();
    }

    setDragX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = handleDragEnd;

  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = handleDragEnd;
  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  const rotation = isDragging ? dragX / 20 : 0;
  const opacity = Math.max(0.5, 1 - Math.abs(dragX) / 300);

  // Cálculos para indicadores visuales
  const likeOpacity = Math.min(1, Math.max(0, dragX / 100));
  const dislikeOpacity = Math.min(1, Math.max(0, -dragX / 100));
  const likeScale = 1 + likeOpacity * 0.5;
  const dislikeScale = 1 + dislikeOpacity * 0.5;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        opacity: opacity,
        transition: isDragging ? "none" : "all 0.3s ease",
        zIndex: isDragging ? 50 : 10,
        ...style
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full max-w-md h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden pointer-events-none select-none transition-colors">
        {/* Imagen principal */}
        <div className="relative h-full">
          <ImageWithFallback
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

          {/* Overlays de color al arrastrar */}
          <div
            className="absolute inset-0 bg-green-500 Mix-blend-overlay transition-opacity duration-200"
            style={{ opacity: likeOpacity * 0.3 }}
          />
          <div
            className="absolute inset-0 bg-red-500 Mix-blend-overlay transition-opacity duration-200"
            style={{ opacity: dislikeOpacity * 0.3 }}
          />

          {/* Badge de tipo */}
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-lg z-20">
            {property.type}
          </div>

          {/* Botón de info - reactiva eventos de puntero */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evitar iniciar drag
              onDetail();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:scale-110 transition-transform z-20"
          >
            <Info className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Indicadores de swipe mejorados */}
          <div
            className="absolute top-1/4 right-8 transform rotate-12 origin-top-right transition-transform duration-200 z-30 pointer-events-none"
            style={{
              opacity: likeOpacity,
              transform: `rotate(-15deg) scale(${likeScale})`
            }}
          >
            <div className="border-[6px] border-green-400 text-green-400 px-8 py-2 rounded-lg text-4xl font-black tracking-widest uppercase bg-white/20 backdrop-blur-sm shadow-2xl skew-x-[-10deg]">
              ME GUSTA
            </div>
          </div>

          <div
            className="absolute top-1/4 left-8 transform -rotate-12 origin-top-left transition-transform duration-200 z-30 pointer-events-none"
            style={{
              opacity: dislikeOpacity,
              transform: `rotate(15deg) scale(${dislikeScale})`
            }}
          >
            <div className="border-[6px] border-red-500 text-red-500 px-8 py-2 rounded-lg text-4xl font-black tracking-widest uppercase bg-white/20 backdrop-blur-sm shadow-2xl skew-x-[-10deg]">
              NO ME GUSTA
            </div>
          </div>

          {/* Hint de animación de swipe */}
          {showHint && !isDragging && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
              <div className="bg-black/40 backdrop-blur-md rounded-full p-4 animate-pulse">
                <Hand className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
          )}

          {/* Información de la propiedad */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/90 to-transparent pt-20 z-20">
            <div className="mb-2">
              <div className="text-3xl mb-2 font-bold">
                ${property.price.toLocaleString()}
                {property.type === "Alquiler" && <span className="text-lg font-normal">/mes</span>}
              </div>
              <h2 className="text-2xl mb-2 font-semibold line-clamp-2">{property.title}</h2>
              <div className="flex items-center gap-2 mb-4 opacity-90">
                <MapPin className="w-5 h-5" />
                <span className="text-lg line-clamp-1">{property.location}</span>
              </div>
            </div>

            {/* Características */}
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5" />
                <span>{property.area}m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
