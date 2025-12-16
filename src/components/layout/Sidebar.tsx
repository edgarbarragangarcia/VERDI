
import { NavLink } from 'react-router-dom';
import { ShoppingBag, Barcode, Truck, PieChart } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { icon: ShoppingBag, label: 'Cotizador', path: '/quote' },
    { icon: Barcode, label: 'Trazabilidad', path: '/traceability' },
    { icon: Truck, label: 'Despacho', path: '/shipping' },
    { icon: PieChart, label: 'Reportes', path: '/analytics' },
];

export const Sidebar = () => {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-20 lg:w-64 h-screen bg-verdi-dark text-verdi-cream flex flex-col fixed left-0 top-0 border-r border-verdi-gold/20"
            style={{ backgroundColor: 'var(--color-verdi-dark)' }}
        >
            <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-verdi-gold rounded-full flex items-center justify-center text-verdi-dark font-bold">V</div>
                <span className="hidden lg:block font-heading text-xl tracking-widest text-verdi-gold">VERDI</span>
            </div>

            <nav className="flex-1 mt-8">
                <ul className="space-y-2 px-2">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    clsx(
                                        'flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300',
                                        'hover:bg-white/5 hover:text-verdi-gold',
                                        isActive ? 'bg-white/10 text-verdi-gold border-l-4 border-verdi-gold' : 'text-gray-400'
                                    )
                                }
                            >
                                <item.icon size={20} />
                                <span className="hidden lg:block font-body text-sm">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-verdi-copper/20 flex items-center justify-center text-verdi-copper">
                        <span className="text-xs">CM</span>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-sm font-medium">Comercial</p>
                        <p className="text-xs text-gray-500">Online</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
