import { useEffect } from "react";
import { Check, Info, X } from "lucide-react";

export type ToastType = "success" | "info" | "error";

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type = "info", onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColors = {
        success: "bg-green-500",
        info: "bg-blue-500",
        error: "bg-red-500",
    };

    const icons = {
        success: <Check className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
        error: <X className="w-5 h-5" />,
    };

    return (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full shadow-lg text-white ${bgColors[type]} animate-in slide-in-from-bottom-5 fade-in duration-300`}>
            {icons[type]}
            <span className="font-medium">{message}</span>
        </div>
    );
}
