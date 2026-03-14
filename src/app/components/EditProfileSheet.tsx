import { useState } from "react";
import { X, Check } from "lucide-react";

interface EditProfileSheetProps {
    isOpen: boolean;
    onClose: () => void;
    currentName: string;
    onSave: (newName: string) => void;
}

export function EditProfileSheet({ isOpen, onClose, currentName, onSave }: EditProfileSheetProps) {
    const [name, setName] = useState(currentName);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(name);
        onClose();
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto transition-colors">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-semibold dark:text-white">Editar Perfil</h2>
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <X className="w-6 h-6 dark:text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                                Nombre a mostrar
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej. Juan Pérez"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:text-white transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={!name.trim()}
                            className="w-full py-4 flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                        >
                            <Check className="w-5 h-5" />
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
