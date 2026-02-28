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
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
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
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Heart
                className={`w-5 h-5 ${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
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
          <div className="text-blue-600 text-3xl mb-2">
            ${property.price.toLocaleString()}
            {property.type === "Alquiler" && <span className="text-lg">/mes</span>}
          </div>
          <h1 className="text-2xl mb-2">{property.title}</h1>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Características */}
        <div className="flex gap-6 mb-6 pb-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Bed className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Habitaciones</div>
              <div>{property.bedrooms}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Bath className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Baños</div>
              <div>{property.bathrooms}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Square className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Área</div>
              <div>{property.area}m²</div>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <h2 className="text-xl mb-3">Descripción</h2>
          <p className="text-gray-600 leading-relaxed">{property.description}</p>
        </div>

        {/* Galería */}
        <div className="mb-6">
          <h2 className="text-xl mb-3">Galería</h2>
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
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <h2 className="text-xl mb-4">Agente Inmobiliario</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div>{property.agent.name}</div>
              <div className="text-sm text-gray-600">Agente Certificado</div>
            </div>
          </div>
          <div className="space-y-2">
            <a
              href={`tel:${property.agent.phone}`}
              className="flex items-center gap-3 p-3 bg-white rounded-xl"
            >
              <Phone className="w-5 h-5 text-blue-600" />
              <span>{property.agent.phone}</span>
            </a>
            <a
              href={`mailto:${property.agent.email}`}
              className="flex items-center gap-3 p-3 bg-white rounded-xl"
            >
              <Mail className="w-5 h-5 text-blue-600" />
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
