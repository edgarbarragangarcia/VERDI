import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="h-screen bg-verdi-dark text-white font-sans overflow-hidden relative flex flex-col">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-verdi-gold/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-verdi-gold/10 rounded-full blur-[100px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 px-8 py-6 flex-none flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-verdi-gold rounded-full flex items-center justify-center text-verdi-dark font-bold font-heading">V</div>
                    <span className="text-xl font-heading tracking-widest text-white">VERDI</span>
                </div>
                <Link to="/login" className="px-6 py-2 border border-verdi-gold/50 text-verdi-gold hover:bg-verdi-gold hover:text-verdi-dark transition-all rounded-full text-sm font-medium tracking-wide">
                    PORTAL INTERNO
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-8 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl lg:text-6xl font-heading leading-tight mb-6">
                            Artesanía <br />
                            <span className="text-verdi-gold italic">Redefinida.</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed font-light">
                            Fusionamos fibras naturales con metales nobles para crear piezas de interiorismo que cuentan historias de tradición y lujo contemporáneo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link
                                to="/login"
                                className="px-8 py-3 bg-verdi-gold text-verdi-dark text-center font-bold font-heading rounded hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Iniciar Sesión <ArrowRight size={20} />
                            </Link>
                            <button className="px-8 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-all text-center">
                                Explorar Colección
                            </button>
                        </div>

                        <div className="flex gap-8 border-t border-white/10 pt-6">
                            <div>
                                <h3 className="text-2xl font-heading text-white">25+</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Países</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-heading text-white">500+</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Proyectos Exclusivos</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-heading text-white">100%</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Hecho a Mano</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block h-[60vh] max-h-[600px]"
                    >
                        {/* Abstract Art Representation */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1596200219609-b63cf4c7cae5?auto=format&fit=crop&q=80&w=800"
                                alt="Verdi Rug Detail"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Floating Feature Cards */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-3"
                            >
                                <div className="p-2 bg-verdi-gold rounded-full text-verdi-dark">
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-300 uppercase">Calidad Premium</p>
                                    <p className="font-bold text-sm">Fique & Cobre</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 border border-verdi-gold/20 rounded-full animate-spin-slow z-0" style={{ animationDuration: '20s' }} />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
