import React from 'react';
import { X, Headphones, Phone, Clock } from 'lucide-react';

interface SupportSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportSheet({ isOpen, onClose }: SupportSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all transform animate-in slide-in-from-bottom duration-300 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ayuda y Soporte</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100">soporte 24/7</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Estamos aquí para ayudarte en cualquier momento del día.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
            <Phone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">Llámanos o escríbenos</p>
              <p className="text-lg font-bold text-green-700 dark:text-green-400 tracking-wide">+57 304 2081589</p>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Tu satisfacción es nuestra prioridad. No dudes en contactarnos si tienes alguna duda sobre las propiedades o el funcionamiento de la app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
