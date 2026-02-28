import { Home, Search, Heart, User } from "lucide-react";

type Tab = "home" | "search" | "favorites" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as Tab, icon: Home, label: "Inicio" },
    { id: "search" as Tab, icon: Search, label: "Buscar" },
    { id: "favorites" as Tab, icon: Heart, label: "Favoritos" },
    { id: "profile" as Tab, icon: User, label: "Perfil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-30">
      <div className="flex items-center justify-around px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 py-2 px-4 min-w-[60px]"
            >
              <Icon 
                className={`w-6 h-6 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span 
                className={`text-xs ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
