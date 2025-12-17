
import { NavLink } from 'react-router-dom';
import { ShoppingBag, Barcode, Truck, PieChart, User, Users, Factory, Globe, Package } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';

const ROLES = [
    {
        title: 'Comercial',
        icon: Users,
        items: [
            { icon: ShoppingBag, label: 'Cotizador', path: '/quote' },
            { icon: Package, label: 'Pedidos', path: '/orders' },
            { icon: PieChart, label: 'Reportes', path: '/analytics' },
        ]
    },
    {
        title: 'Cliente',
        icon: User,
        items: [
            { icon: Globe, label: 'Portal Cliente', path: '/quote/client-view' },
        ]
    },
    {
        title: 'Producción',
        icon: Factory,
        items: [
            { icon: Barcode, label: 'Trazabilidad', path: '/traceability' },
        ]
    },
    {
        title: 'Logística',
        icon: Truck,
        items: [
            { icon: Truck, label: 'Despacho', path: '/shipping' },
        ]
    }
];

export const Sidebar = () => {
    const { state } = useStore();
    const hasApprovedOrder = state.status === 'Aprobada';
    const hasPendingClient = state.status === 'PendienteCliente';

    // Helper to determine badge color/presence
    const getBadge = (path: string) => {
        if (path === '/traceability' && hasApprovedOrder) {
            return <div className="absolute right-2 top-3 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />;
        }
        if (path === '/quote' && hasPendingClient) {
            return <div className="absolute right-2 top-3 w-2 h-2 rounded-full bg-blue-400" />;
        }
        return null;
    };

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-20 lg:w-64 h-screen bg-verdi-dark text-verdi-cream flex flex-col fixed left-0 top-0 border-r border-verdi-gold/20 z-40 overflow-y-auto"
            style={{ backgroundColor: 'var(--color-verdi-dark)' }}
        >
            <div className="p-6 flex items-center justify-center lg:justify-start gap-3 sticky top-0 bg-verdi-dark z-10">
                <div className="w-8 h-8 bg-verdi-gold rounded-full flex items-center justify-center text-verdi-dark font-bold">V</div>
                <span className="hidden lg:block font-heading text-xl tracking-widest text-verdi-gold">VERDI</span>
            </div>

            <nav className="flex-1 mt-4 px-3 space-y-6">
                {ROLES.map((role) => (
                    <div key={role.title}>
                        <div className="hidden lg:flex items-center gap-2 px-3 mb-2 text-xs font-bold uppercase tracking-wider text-verdi-gold/50">
                            <role.icon size={12} />
                            {role.title}
                        </div>
                        <ul className="space-y-1">
                            {role.items.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            clsx(
                                                'relative flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300',
                                                'hover:bg-white/5 hover:text-verdi-gold',
                                                isActive ? 'bg-white/10 text-verdi-gold border-l-2 border-verdi-gold' : 'text-gray-400'
                                            )
                                        }
                                    >
                                        <item.icon size={18} />
                                        <span className="hidden lg:block font-body text-sm">{item.label}</span>
                                        {getBadge(item.path)}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto sticky bottom-0 bg-verdi-dark">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-verdi-copper/20 flex items-center justify-center text-verdi-copper">
                        <span className="text-xs">U</span>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-sm font-medium">Multi-Rol Active</p>
                        <p className="text-xs text-gray-500">Admin Mode</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

