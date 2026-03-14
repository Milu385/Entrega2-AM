import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, User, Phone, Mail } from "lucide-react";
import { Property } from "./PropertyCard";
import { ImageWithFallback } from "./ui/ImageWithFallback";

interface PropertyDetailProps {
  property: Property & {
    description: string;
    images: string[];
    agent: {
      name: string;
      phone: string;
      email: string;
    };
  };
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
}

export function PropertyDetail({ property, onBack, onToggleFavorite }: PropertyDetailProps) {
  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-950 z-50 overflow-y-auto transition-colors duration-200">
      {/* Header con Imagen */}
      <div className="relative h-80">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white dark:hover:bg-gray-900"
          >
            <ArrowLeft className="w-5 h-5 dark:text-gray-200" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white dark:hover:bg-gray-900">
              <Share2 className="w-5 h-5 dark:text-gray-200" />
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="w-10 h-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white dark:hover:bg-gray-900"
            >
              <Heart
                className={`w-5 h-5 ${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
              />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm inline-block">
            {property.type}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Precio y Título */}
        <div className="mb-4">
          <div className="text-blue-600 dark:text-blue-400 text-3xl mb-2 font-bold">
            ${property.price.toLocaleString()}
            {property.type === "Alquiler" && <span className="text-lg text-gray-500 dark:text-gray-400 font-normal ml-1">/mes</span>}
          </div>
          <h1 className="text-2xl mb-2 dark:text-white">{property.title}</h1>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Características */}
        <div className="flex flex-wrap gap-x-4 gap-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/40 rounded-lg flex items-center justify-center shrink-0">
              <Bed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Habitaciones</div>
              <div className="text-sm font-medium dark:text-gray-200">{property.bedrooms}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/40 rounded-lg flex items-center justify-center shrink-0">
              <Bath className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Baños</div>
              <div className="text-sm font-medium dark:text-gray-200">{property.bathrooms}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/40 rounded-lg flex items-center justify-center shrink-0">
              <Square className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Área</div>
              <div className="text-sm font-medium dark:text-gray-200">{property.area}m²</div>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <h2 className="text-xl mb-3 dark:text-white">Descripción</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{property.description}</p>
        </div>

        {/* Galería */}
        <div className="mb-6">
          <h2 className="text-xl mb-3 dark:text-white">Galería</h2>
          <div className="grid grid-cols-2 gap-2">
            {property.images.map((img, idx) => (
              <ImageWithFallback
                key={idx}
                src={img}
                alt={`Vista ${idx + 1}`}
                className="w-full h-32 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Agente */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 transition-colors rounded-2xl p-4 mb-6">
          <h2 className="text-xl mb-4 dark:text-white">Agente Inmobiliario</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="dark:text-white font-medium">{property.agent.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Agente Certificado</div>
            </div>
          </div>
          <div className="space-y-2">
            <a
              href={`tel:${property.agent.phone}`}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 dark:text-gray-200"
            >
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{property.agent.phone}</span>
            </a>
            <a
              href={`mailto:${property.agent.email}`}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 dark:text-gray-200"
            >
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">{property.agent.email}</span>
            </a>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 pb-6">
          <button className="flex-1 py-4 rounded-xl border-2 border-blue-600 text-blue-600">
            Agendar Visita
          </button>
          <button className="flex-1 py-4 rounded-xl bg-blue-600 text-white">
            Contactar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}
