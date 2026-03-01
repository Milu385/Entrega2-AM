import { X, Bell } from "lucide-react";

export interface Notification {
    id: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
}

interface NotificationListProps {
    notifications: Notification[];
    onClose: () => void;
    onMarkAsRead: (id: string) => void;
    onClearAll: () => void;
}

export function NotificationList({ notifications, onClose, onMarkAsRead, onClearAll }: NotificationListProps) {
    return (
        <div className="absolute top-20 right-4 w-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    Notificaciones
                </h3>
                <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                        <button
                            onClick={onClearAll}
                            className="text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                            Borrar todas
                        </button>
                    )}
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p>No tienes notificaciones</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? "bg-blue-50/50" : ""}`}
                                onClick={() => onMarkAsRead(notification.id)}
                            >
                                <div className="flex gap-3">
                                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!notification.isRead ? "bg-blue-600" : "bg-gray-300"}`} />
                                    <div>
                                        <p className={`text-sm ${!notification.isRead ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(notification.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
