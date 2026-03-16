import { X, Info } from "lucide-react";

interface AboutSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutSheet({ isOpen, onClose }: AboutSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto transition-colors">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Acerca de
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/50">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Esta aplicación es una versión de demostración con fines exclusivamente ilustrativos. 
                Algunas funcionalidades pueden estar limitadas, incompletas o no reflejar el comportamiento 
                final del producto. La información mostrada puede ser simulada y no debe considerarse 
                como datos reales o definitivos.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Créditos</h3>
              
              <div className="grid gap-3">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="font-medium dark:text-gray-200 uppercase tracking-wide text-xs text-blue-600 dark:text-blue-400 mb-1">Ingeniero de Promts</p>
                  <p className="text-gray-900 dark:text-white font-semibold">Santiago Maya Horta</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="font-medium dark:text-gray-200 uppercase tracking-wide text-xs text-blue-600 dark:text-blue-400 mb-1">Ingeniero de sistemas</p>
                  <p className="text-gray-900 dark:text-white font-semibold">Santiago Posso Acevedo</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="font-medium dark:text-gray-200 uppercase tracking-wide text-xs text-blue-600 dark:text-blue-400 mb-1">Ingeniero de sistemas</p>
                  <p className="text-gray-900 dark:text-white font-semibold">Daniel Cardona Gonzalez</p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
