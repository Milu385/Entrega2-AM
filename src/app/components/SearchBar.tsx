import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  onOpenFilters: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ onOpenFilters, searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar ubicación, precio..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
        />
      </div>
      <button
        onClick={onOpenFilters}
        className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
