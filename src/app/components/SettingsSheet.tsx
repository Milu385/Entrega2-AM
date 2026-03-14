import { X, Moon, Sun } from "lucide-react";

interface SettingsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

export function SettingsSheet({ isOpen, onClose, isDarkMode, onToggleDarkMode }: SettingsSheetProps) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-semibold dark:text-white">Configuración</h2>
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <X className="w-6 h-6 dark:text-white" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Tema de la aplicación */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-900/50 text-indigo-400' : 'bg-orange-100 text-orange-500'}`}>
                                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className="font-medium dark:text-white">Modo Oscuro</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Alternar tema visual</p>
                                </div>
                            </div>

                            <button
                                onClick={onToggleDarkMode}
                                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
