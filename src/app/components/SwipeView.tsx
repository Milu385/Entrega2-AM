import { useState, useEffect } from "react";
import { X, Heart, RotateCcw } from "lucide-react";
import { Property } from "./PropertyCard";
import { SwipeCard } from "./SwipeCard";

interface SwipeViewProps {
  properties: (Property & {
    description: string;
    images: string[];
    agent: { name: string; phone: string; email: string };
  })[];
  onPropertyDetail: (id: string) => void;
  onLike: (property: Property) => void;
  onDislike: (property: Property) => void;
}

interface UserPreferences {
  likedProperties: Property[];
  dislikedProperties: Property[];
  preferredPriceRange: [number, number];
  preferredBedrooms: number[];
  preferredLocations: string[];
  preferredTypes: string[];
}

export function SwipeView({ properties, onPropertyDetail, onLike, onDislike }: SwipeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    likedProperties: [],
    dislikedProperties: [],
    preferredPriceRange: [0, Number.MAX_VALUE],
    preferredBedrooms: [],
    preferredLocations: [],
    preferredTypes: [],
  });

  // Inicializar propiedades aleatorias
  useEffect(() => {
    const shuffled = [...properties].sort(() => Math.random() - 0.5);
    setDisplayedProperties(shuffled);
  }, [properties]);

  // Calcular similitud entre dos propiedades
  const calculateSimilarity = (prop: Property, preferences: UserPreferences): number => {
    let score = 0;

    if (preferences.likedProperties.length === 0) {
      return Math.random(); // Si no hay preferencias, orden aleatorio
    }

    // Calcular precio promedio de propiedades que le gustaron
    const avgPrice = preferences.likedProperties.reduce((sum, p) => sum + p.price, 0) /
      preferences.likedProperties.length;

    // Similitud de precio (entre más cercano al promedio, mejor)
    const priceDiff = Math.abs(prop.price - avgPrice);
    const priceScore = Math.max(0, 1 - priceDiff / avgPrice);
    score += priceScore * 3;

    // Similitud de habitaciones
    if (preferences.preferredBedrooms.includes(prop.bedrooms)) {
      score += 2;
    }

    // Similitud de ubicación
    const propLocation = prop.location.split(",")[0];
    if (preferences.preferredLocations.some(loc => propLocation.includes(loc))) {
      score += 2;
    }

    // Similitud de tipo
    if (preferences.preferredTypes.includes(prop.type)) {
      score += 1.5;
    }

    return score;
  };

  // Reorganizar propiedades según preferencias
  const sortByPreferences = (props: Property[], prefs: UserPreferences): Property[] => {
    return [...props].sort((a, b) => {
      const scoreA = calculateSimilarity(a, prefs);
      const scoreB = calculateSimilarity(b, prefs);
      return scoreB - scoreA;
    });
  };

  const handleLike = () => {
    const currentProperty = displayedProperties[currentIndex];
    if (!currentProperty) return;

    onLike(currentProperty);

    // Actualizar preferencias
    const newPreferences: UserPreferences = {
      likedProperties: [...preferences.likedProperties, currentProperty],
      dislikedProperties: preferences.dislikedProperties,
      preferredPriceRange: preferences.preferredPriceRange,
      preferredBedrooms: [...new Set([...preferences.preferredBedrooms, currentProperty.bedrooms])],
      preferredLocations: [...new Set([...preferences.preferredLocations, currentProperty.location.split(",")[0]])],
      preferredTypes: [...new Set([...preferences.preferredTypes, currentProperty.type])],
    };

    setPreferences(newPreferences);

    // Reorganizar propiedades restantes
    const remaining = displayedProperties.slice(currentIndex + 1);
    const sorted = sortByPreferences(remaining, newPreferences);
    setDisplayedProperties([...displayedProperties.slice(0, currentIndex + 1), ...sorted]);

    setCurrentIndex(currentIndex + 1);
  };

  const handleDislike = () => {
    const currentProperty = displayedProperties[currentIndex];
    if (!currentProperty) return;

    onDislike(currentProperty);

    const newPreferences: UserPreferences = {
      ...preferences,
      dislikedProperties: [...preferences.dislikedProperties, currentProperty],
    };

    setPreferences(newPreferences);
    setCurrentIndex(currentIndex + 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);

      // Remover la última propiedad de las preferencias
      const lastProperty = displayedProperties[currentIndex - 1];
      setPreferences({
        ...preferences,
        likedProperties: preferences.likedProperties.filter(p => p.id !== lastProperty.id),
        dislikedProperties: preferences.dislikedProperties.filter(p => p.id !== lastProperty.id),
      });
    }
  };

  const currentProperty = displayedProperties[currentIndex];
  const hasMore = currentIndex < displayedProperties.length;

  if (!hasMore) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl mb-2">¡No hay más propiedades!</h2>
          <p className="text-gray-600 mb-6">
            Has visto todas las propiedades disponibles.
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setPreferences({
                likedProperties: [],
                dislikedProperties: [],
                preferredPriceRange: [0, Number.MAX_VALUE],
                preferredBedrooms: [],
                preferredLocations: [],
                preferredTypes: [],
              });
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            Reiniciar Búsqueda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header con contadores e indicadores */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-8 h-8 rounded-full border border-red-400 flex items-center justify-center">
            <X className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-red-400 font-bold text-[10px] tracking-wider hidden sm:block">NOPE</span>
        </div>

        <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {currentIndex + 1} / {displayedProperties.length}
        </span>

        <div className="flex items-center gap-2 opacity-50">
          <span className="text-green-400 font-bold text-[10px] tracking-wider hidden sm:block">LIKE</span>
          <div className="w-8 h-8 rounded-full border border-green-400 flex items-center justify-center">
            <Heart className="w-4 h-4 text-green-400 fill-current" />
          </div>
        </div>
      </div>

      {/* Área de tarjetas */}
      <div className="flex-1 relative overflow-hidden">

        {currentProperty && (
          <>
            {/* Siguiente tarjeta (preview) */}
            {displayedProperties[currentIndex + 1] && (
              <SwipeCard
                key={displayedProperties[currentIndex + 1].id}
                property={displayedProperties[currentIndex + 1]}
                onLike={() => { }}
                onDislike={() => { }}
                onDetail={() => { }}
                style={{
                  transform: "scale(0.95) translateY(10px)",
                  opacity: 0.5,
                  zIndex: 0,
                  pointerEvents: "none", // Desactivar interacción en la carta de fondo
                }}
              />
            )}

            {/* Tarjeta actual */}
            <SwipeCard
              key={currentProperty.id}
              property={currentProperty}
              onLike={handleLike}
              onDislike={handleDislike}
              onDetail={() => onPropertyDetail(currentProperty.id)}
              style={{
                zIndex: 10,
              }}
            />
          </>
        )}
      </div>

      {/* Botones de acción */}
      <div className="px-6 py-6 flex items-center justify-center gap-6">
        <button
          onClick={handleDislike}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-colors"
        >
          <X className="w-8 h-8 text-red-500" />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={handleUndo}
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-blue-500" />
          </button>
        )}

        <button
          onClick={handleLike}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <Heart className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  );
}
