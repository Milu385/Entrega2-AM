import { useState } from "react";
import { User, Lock, Mail } from "lucide-react";

interface LoginProps {
    onLogin: (email: string) => void;
}

export function Login({ onLogin }: LoginProps) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password || (isRegistering && !name)) {
            setError("Por favor completa todos los campos");
            return;
        }

        // Mock authentication - accept any non-empty credentials
        onLogin(email);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isRegistering ? "Crear Cuenta" : "Bienvenido"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isRegistering
                            ? "Ingresa tus datos para registrarte"
                            : "Ingresa a tu cuenta para continuar"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isRegistering && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nombre</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Tu Nombre"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        {isRegistering ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    {isRegistering ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        {isRegistering ? "Inicia Sesión aquí" : "Regístrate aquí"}
                    </button>
                </p>
            </div>
        </div>
    );
}
