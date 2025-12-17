import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            navigate('/quote');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-verdi-cream flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="bg-verdi-dark p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-verdi-gold rounded-full flex items-center justify-center text-verdi-dark font-bold font-heading text-xl mx-auto mb-4">V</div>
                        <h2 className="text-2xl font-heading text-white tracking-wide">VERDI PORTAL</h2>
                        <p className="text-gray-400 text-sm mt-2">Acceso Administrativo y Comercial</p>
                    </div>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="nombre@verdi.co"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-verdi-gold focus:ring-1 focus:ring-verdi-gold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Contraseña</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-verdi-gold focus:ring-1 focus:ring-verdi-gold transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-verdi-dark focus:ring-verdi-gold" />
                                <span className="text-gray-600">Recordarme</span>
                            </label>
                            <a href="#" className="text-verdi-dark hover:text-verdi-gold font-medium transition-colors">¿Olvidó su contraseña?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-verdi-dark text-white font-heading font-bold tracking-wider rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    INGRESAR
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
                    &copy; {new Date().getFullYear()} Verdi Design. Todos los derechos reservados.
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
