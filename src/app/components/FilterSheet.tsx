import { X } from "lucide-react";
import { Slider } from "./ui/slider";

export interface Filters {
  type: "Todos" | "Venta" | "Alquiler";
  priceRange: number[];
  bedrooms: number | null;
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function FilterSheet({ isOpen, onClose, filters, onFiltersChange }: FilterSheetProps) {
  if (!isOpen) return null;

  const handleApply = () => {
    onClose();
  };

  const handleReset = () => {
    onFiltersChange({
      type: "Todos",
      priceRange: [0, 2000000000],
      bedrooms: null,
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto transition-colors">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl dark:text-white">Filtros</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center dark:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Tipo de Operación */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-3 block">Tipo de Operación</label>
              <div className="flex gap-2">
                {(["Todos", "Venta", "Alquiler"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => onFiltersChange({ ...filters, type })}
                    className={`flex-1 py-2 px-4 rounded-xl border-2 transition-colors ${filters.type === type
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rango de Precio */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-3 block">
                Rango de Precio: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
                min={0}
                max={2000000000}
                step={50000000}
                className="py-4"
              />
            </div>

            {/* Habitaciones */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-3 block">Habitaciones</label>
              <div className="flex gap-2">
                {[null, 1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num ?? "any"}
                    onClick={() => onFiltersChange({ ...filters, bedrooms: num })}
                    className={`flex-1 py-2 px-4 rounded-xl border-2 transition-colors ${filters.bedrooms === num
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    {num ?? "Todas"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
}