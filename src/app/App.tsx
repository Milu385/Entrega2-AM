// Proceso Automático - Construcción del Prototipo - Iteración 15
import { useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { PropertyCard } from "./components/PropertyCard";
import { SearchBar } from "./components/SearchBar";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  const MOCK_PROPERTY = {
    id: "1",
    title: "Apartamento de Prueba",
    price: 300000000,
    location: "Medellín",
    bedrooms: 2,
    bathrooms: 2,
    area: 60,
    type: "Venta",
    images: [] as string[],
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?w=800",
    description: "Un bonito apartamento.",
    agent: { name: "Agent", phone: "123", email: "123@1.com" }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Prototipo Inmobiliario</h1>
        
        
        {
            activeTab === 'search' && (
                <div className="mb-4">
                    <SearchBar searchQuery="" onSearchChange={() => { }} onOpenFilters={() => { }} />
                </div>
            )
        }

        
        {
            activeTab === 'search' && (
                <div className="mt-4">
                    <PropertyCard property={MOCK_PROPERTY} onToggleFavorite={() => { }} onClick={() => { }} />
                </div>
            )
        }
        
      </div>
      
      
      <BottomNav activeTab={activeTab as any} onTabChange={(t : any) => setActiveTab(t)} />
      
    </div>
  );
}