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
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
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
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 ${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {property.type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg mb-1 line-clamp-1">{property.title}</h3>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-3 text-gray-700">
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

        <div className="text-blue-600 text-xl">
          ${property.price.toLocaleString()}
          {property.type === "Alquiler" && <span className="text-sm">/mes</span>}
        </div>
      </div>
    </div>
  );
}
