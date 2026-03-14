import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: "Venta" | "Alquiler";
  isFavorite?: boolean;
}

interface PropertyCardProps {
  property: Property;
  onToggleFavorite: (id: string) => void;
  onClick: (id: string) => void;
}

export function PropertyCard({ property, onToggleFavorite, onClick }: PropertyCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-colors cursor-pointer"
      onClick={() => onClick(property.id)}
    >
      <div className="relative">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white dark:hover:bg-gray-900"
        >
          <Heart
            className={`w-5 h-5 ${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
          />
        </button>
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {property.type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg mb-1 line-clamp-1 dark:text-white">{property.title}</h3>

        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-3 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span className="text-sm">{property.area}m²</span>
          </div>
        </div>

        <div className="text-blue-600 dark:text-blue-400 text-xl font-semibold">
          ${property.price.toLocaleString()}
          {property.type === "Alquiler" && <span className="text-sm text-gray-500 dark:text-gray-400 ml-1 font-normal">/mes</span>}
        </div>
      </div>
    </div>
  );
}
