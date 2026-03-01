// Proceso Automático - Construcción del Prototipo - Iteración 40
import { useState, useEffect } from "react";
import { PropertyCard, Property } from "./components/PropertyCard";
import { Login } from "./components/Login";
import { SearchBar } from "./components/SearchBar";
import { FilterSheet, Filters } from "./components/FilterSheet";
import { PropertyDetail } from "./components/PropertyDetail";
import { BottomNav } from "./components/BottomNav";
import { SwipeView } from "./components/SwipeView";
import { Bell, MapPin, Heart } from "lucide-react";
import { Toast, ToastType } from "./components/Toast";
import { Notification, NotificationList } from "./components/NotificationList";
import photo1559329146807aff9ff1fb from "../assets/properties/photo-1559329146-807aff9ff1fb.jpg";
import photo161017753464434d881503b83 from "../assets/properties/photo-1610177534644-34d881503b83.jpg";
import photo163888593012585350348d266 from "../assets/properties/photo-1638885930125-85350348d266.jpg";
import photo1704428382583c9c7c1e55d94 from "../assets/properties/photo-1704428382583-c9c7c1e55d94.jpg";
import photo17068088498277366c098b317 from "../assets/properties/photo-1706808849827-7366c098b317.jpg";
import photo1762397794646f19044bd0828 from "../assets/properties/photo-1762397794646-f19044bd0828.jpg";

type Tab = "home" | "search" | "favorites" | "profile";

type PropertyWithDetails = Property & {
  description: string;
  images: string[];
  agent: { name: string; phone: string; email: string };
};

const OFFLINE_IMAGE_BY_ID: Record<string, string> = {
  "1559329146-807aff9ff1fb": photo1559329146807aff9ff1fb,
  "1610177534644-34d881503b83": photo161017753464434d881503b83,
  "1638885930125-85350348d266": photo163888593012585350348d266,
  "1704428382583-c9c7c1e55d94": photo1704428382583c9c7c1e55d94,
  "1706808849827-7366c098b317": photo17068088498277366c098b317,
  "1762397794646-f19044bd0828": photo1762397794646f19044bd0828,
};

const getUnsplashPhotoId = (image: string): string | null => {
  const match = image.match(/photo-([^?]+)/i);
  return match?.[1] ?? null;
};

const toOfflineImage = (image: string): string => {
  const photoId = getUnsplashPhotoId(image);
  if (!photoId) {
    return image;
  }

  return OFFLINE_IMAGE_BY_ID[photoId] ?? image;
};

const normalizePropertiesForOffline = (properties: PropertyWithDetails[]): PropertyWithDetails[] => {
  return properties.map((property) => ({
    ...property,
    image: toOfflineImage(property.image),
    images: property.images.map((image) => toOfflineImage(image)),
  }));
};

const MOCK_PROPERTIES: PropertyWithDetails[] = [
    {
      id: "1",
      title: "Apartamento Moderno en el Centro",
      price: 450000000,
      location: "El Poblado, Medellín",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      type: "Venta",
      image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzA0NzU2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      description: "Hermoso apartamento moderno completamente renovado con acabados de lujo. Ubicado en el corazón de El Poblado con acceso a todas las comodidades. Incluye cocina equipada, baños modernos y balcón con vista panorámica.",
      images: [
        "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNDkwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDQ2ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MDQ4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzA0NzU2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      ],
      agent: {
        name: "María González",
        phone: "+57 300 123 4567",
        email: "maria.gonzalez@inmobiliaria.com.co",
      },
    },
    {
      id: "2",
      title: "Casa Familiar en Barrio Residencial",
      price: 850000000,
      location: "Envigado, Medellín",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      type: "Venta",
      image: "https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGZhY2FkZXxlbnwxfHx8fDE3NzA0NDM0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      description: "Espectacular casa unifamiliar en zona tranquila y segura de Envigado. Amplio jardín, garaje para 2 coches, y todas las comodidades para una familia. Cerca de colegios y centros comerciales.",
      images: [
        "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDQ2ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNDkwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MDQ4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGZhY2FkZXxlbnwxfHx8fDE3NzA0NDM0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      ],
      agent: {
        name: "Carlos Rodríguez",
        phone: "+57 310 234 5678",
        email: "carlos.rodriguez@inmobiliaria.com.co",
      },
    },
    {
      id: "3",
      title: "Ático con Terraza Privada",
      price: 3200000,
      location: "Laureles, Medellín",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: "Alquiler",
      image: "https://images.unsplash.com/photo-1762397794646-f19044bd0828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb25kbyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDQ5NDM3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      description: "Impresionante ático con amplia terraza y vistas espectaculares. Edificio moderno con piscina, gimnasio y seguridad 24h. Zona premium de la ciudad.",
      images: [
        "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDQ2ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MDQ4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNDkwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1762397794646-f19044bd0828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb25kbyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDQ5NDM3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      ],
      agent: {
        name: "Ana López",
        phone: "+57 320 345 6789",
        email: "ana.lopez@inmobiliaria.com.co",
      },
    },
    {
      id: "4",
      title: "Estudio Céntrico Amueblado",
      price: 1800000,
      location: "Centro, Medellín",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      type: "Alquiler",
      image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzA0NzU2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      description: "Acogedor estudio completamente amueblado y equipado. Perfecto para profesionales o estudiantes. A pasos del metro y zonas de ocio.",
      images: [
        "https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MDQ4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNDkwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDQ2ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzA0NzU2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      ],
      agent: {
        name: "Pedro Martínez",
        phone: "+57 301 456 7890",
        email: "pedro.martinez@inmobiliaria.com.co",
      },
    },
    {
      id: "5",
      title: "Finca con Jardín y Piscina",
      price: 1200000000,
      location: "Sabaneta, Medellín",
      bedrooms: 5,
      bathrooms: 4,
      area: 280,
      type: "Venta",
      image: "https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGZhY2FkZXxlbnwxfHx8fDE3NzA0NDM0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      description: "Exclusiva finca independiente con amplias zonas comunes, jardín privado y piscina. Ideal para familias que buscan tranquilidad y espacio. Garaje para 3 vehículos.",
      images: [
        "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDQ2ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNDkwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MDQ4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGZhY2FkZXxlbnwxfHx8fDE3NzA0NDM0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      ],
      agent: {
        name: "Laura Fernández",
        phone: "+57 315 567 8901",
        email: "laura.fernandez@inmobiliaria.com.co",
      },
    },
    {
      id: "6",
      title: "Apartamento con Vistas al Parque",
      price: 2500000,
      location: "Belén, Medellín",
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      type: "Alquiler",
      image: "https://images.unsplash.com/photo-1762397794646-f19044bd0828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb25kbyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDQ5NDM3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      description: "Luminoso apartamento con vistas directas al parque. Recién reformado, con pisos de madera y cocina americana. Edificio con ascensor.",
      images: [
        "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDQ2ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc3MDQ4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNDkwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
        "https://images.unsplash.com/photo-1762397794646-f19044bd0828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb25kbyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDQ5NDM3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      ],
      agent: {
        name: "Roberto Sánchez",
        phone: "+57 318 678 9012",
        email: "roberto.sanchez@inmobiliaria.com.co",
      },
    },
  ];

const OFFLINE_MOCK_BY_ID = new Map(
  normalizePropertiesForOffline(MOCK_PROPERTIES).map((property) => [property.id, property] as const)
);

export default function App() {
  /* 
   * Initialize state from localStorage if available, otherwise use defaults.
   * This ensures data persistence across browser sessions.
   */
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTabState] = useState<Tab>(() => {
    const saved = localStorage.getItem("activeTab");
    return (saved as Tab) || "home";
  });

  const [properties, setProperties] = useState<PropertyWithDetails[]>(() => {
    const saved = localStorage.getItem("properties");
    const parsed: PropertyWithDetails[] = saved ? JSON.parse(saved) : MOCK_PROPERTIES;
    const normalized = normalizePropertiesForOffline(parsed);

    return normalized.map((property) => {
      const canonical = OFFLINE_MOCK_BY_ID.get(property.id);
      if (!canonical) {
        return property;
      }

      return {
        ...property,
        image: canonical.image,
        images: [...canonical.images],
      };
    });
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });

  const [filters, setFilters] = useState<Filters>(() => {
    const saved = localStorage.getItem("filters");
    return saved
      ? JSON.parse(saved)
      : {
        type: "Todos",
        priceRange: [0, 2000000000],
        bedrooms: null,
      };
  });

  // Wrapper for setActiveTab to sync with localStorage
  const setActiveTab = (tab: Tab) => {
    setActiveTabState(tab);
    localStorage.setItem("activeTab", tab);
  };

  const handleLogin = (email: string) => {
    // In a real app, we would validate credentials here
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Optional: Clear other user-specific data if needed
    setActiveTab("home");
  };

  // Effect to save properties to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  // Effect to save search query
  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  // Effect to save filters
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  // Notifications State & Logic
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      isRead: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const handleShowToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);


  const handleProtectedAction = (action: () => void) => {
    if (!user) {
      setActiveTab("profile");
      return;
    }
    action();
  };

  const toggleFavorite = (id: string) => {
    handleProtectedAction(() => {
      setProperties((prev: Property[]) =>
        prev.map((prop: Property) => {
          if (prop.id === id) {
            const newStatus = !prop.isFavorite;
            if (newStatus) {
              addNotification(`Propiedad "${prop.title}" agregada a favoritos`);
              handleShowToast("Agregada a favoritos");
            } else {
              handleShowToast("Eliminada de favoritos", "info");
            }
            return { ...prop, isFavorite: newStatus };
          }
          return prop;
        })
      );
    });
  };

  const handlePropertyLike = (property: Property) => {
    handleProtectedAction(() => {
      setProperties((prev: Property[]) =>
        prev.map((prop: Property) =>
          prop.id === property.id ? { ...prop, isFavorite: true } : prop
        )
      );
      addNotification(`Te ha gustado "${property.title}"`);
      handleShowToast("¡Me gusta!", "success");
    });
  };

  const handlePropertyDislike = (property: Property) => {
    // Solo registramos el dislike, no hacemos nada especial
    console.log("Disliked:", property.title);
  };

  const filteredProperties = properties.filter((prop: Property) => {
    // Filtro de búsqueda
    const matchesSearch =
      searchQuery === "" ||
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro de tipo
    const matchesType =
      filters.type === "Todos" || prop.type === filters.type;

    // Filtro de precio
    const matchesPrice =
      prop.price >= filters.priceRange[0] &&
      prop.price <= filters.priceRange[1];

    // Filtro de habitaciones
    const matchesBedrooms =
      filters.bedrooms === null || prop.bedrooms === filters.bedrooms;

    return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
  });

  const favoriteProperties = properties.filter((prop: Property) => prop.isFavorite);

  const propertyDetail = selectedProperty
    ? properties.find((p: Property) => p.id === selectedProperty)
    : null;

  const displayProperties =
    activeTab === "favorites" ? favoriteProperties : filteredProperties;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Vista de Detalle */}
      {propertyDetail && (
        <PropertyDetail
          property={propertyDetail}
          onBack={() => setSelectedProperty(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {!propertyDetail && (
        <>
          {/* Header */}
          <div className="bg-white px-6 pt-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-gray-600">Ubicación</div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Medellín, Colombia</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative transition-colors ${isNotificationOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </button>
                {isNotificationOpen && (
                  <div className="absolute right-0 top-12 z-50">
                    <NotificationList
                      notifications={notifications}
                      onClose={() => setIsNotificationOpen(false)}
                      onMarkAsRead={markAsRead}
                      onClearAll={clearAllNotifications}
                    />
                  </div>
                )}
              </div>
            </div>

            {activeTab === "search" && (
              <SearchBar
                onOpenFilters={() => setIsFilterOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}
          </div>

          {/* Contenido Principal */}
          {activeTab === "home" && (
            <SwipeView
              properties={properties}
              onPropertyDetail={setSelectedProperty}
              onLike={handlePropertyLike}
              onDislike={handlePropertyDislike}
            />
          )}

          {activeTab === "search" && (
            <div className="px-6 pt-4 flex-1 overflow-y-auto">
              <h2 className="text-xl mb-4">Resultados de Búsqueda</h2>
              <div className="grid grid-cols-1 gap-4">
                {displayProperties.map((property: Property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onToggleFavorite={toggleFavorite}
                    onClick={setSelectedProperty}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="px-6 pt-4 flex-1 overflow-y-auto">
              <h2 className="text-xl mb-4">Mis Favoritos</h2>
              {!user ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">
                    Inicia sesión para ver tus favoritos
                  </p>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="mt-4 text-blue-600 font-medium"
                  >
                    Ir a Iniciar Sesión
                  </button>
                </div>
              ) : favoriteProperties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">
                    No tienes propiedades favoritas
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Explora y guarda las propiedades que te gusten
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {favoriteProperties.map((property: Property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onToggleFavorite={toggleFavorite}
                      onClick={setSelectedProperty}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="px-6 pt-4 flex-1 overflow-y-auto">
              {!user ? (
                <Login onLogin={handleLogin} />
              ) : (
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">SP</span>
                  </div>
                  <h2 className="text-xl mb-1">Santiago P</h2>
                  <p className="text-gray-600 mb-6">{user.email}</p>

                  <div className="space-y-3">
                    <button className="w-full py-3 px-4 bg-gray-50 rounded-xl text-left">
                      Editar Perfil
                    </button>
                    <button className="w-full py-3 px-4 bg-gray-50 rounded-xl text-left">
                      Mis Búsquedas Guardadas
                    </button>
                    <button className="w-full py-3 px-4 bg-gray-50 rounded-xl text-left">
                      Configuración
                    </button>
                    <button className="w-full py-3 px-4 bg-gray-50 rounded-xl text-left">
                      Ayuda y Soporte
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl text-left"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Filtros */}
          <FilterSheet
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Navegación Inferior */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}