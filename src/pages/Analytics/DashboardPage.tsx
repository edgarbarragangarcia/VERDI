
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Package } from 'lucide-react';

const KPICard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-verdi-dark">{value}</h3>
                <p className={`text-xs mt-2 ${sub.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>{sub}</p>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
    </div>
);

const MOCK_SALES_DATA = [
    { name: 'Lun', sales: 4000, quotes: 2400 },
    { name: 'Mar', sales: 3000, quotes: 1398 },
    { name: 'Mie', sales: 2000, quotes: 9800 },
    { name: 'Jue', sales: 2780, quotes: 3908 },
    { name: 'Vie', sales: 1890, quotes: 4800 },
    { name: 'Sab', sales: 2390, quotes: 3800 },
];

const MOCK_REGION_DATA = [
    { name: 'Colombia', value: 400 },
    { name: 'USA', value: 300 },
    { name: 'México', value: 300 },
    { name: 'Medio Oriente', value: 200 },
];

const COLORS = ['#D4AF37', '#1A1A1A', '#B87333', '#F5F5F0'];

export const DashboardPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto space-y-8"
        >
            <header>
                <h1 className="font-heading text-3xl text-verdi-dark">Dashboard Comercial</h1>
                <p className="text-gray-500 mt-2">Resumen de ventas y KPIs en tiempo real.</p>
            </header>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Ventas Totales"
                    value="$124.5M"
                    sub="+12.5% vs mes ant."
                    icon={DollarSign}
                    color="bg-verdi-gold"
                />
                <KPICard
                    title="Cotizaciones"
                    value="1,284"
                    sub="32 pendientes de aprobación"
                    icon={TrendingUp}
                    color="bg-verdi-dark"
                />
                <KPICard
                    title="Clientes Nuevos"
                    value="45"
                    sub="+5 esta semana"
                    icon={Users}
                    color="bg-verdi-copper"
                />
                <KPICard
                    title="Items en Producción"
                    value="342"
                    sub="98% on time"
                    icon={Package}
                    color="bg-gray-400"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-heading text-lg mb-6">Cotizaciones vs Ventas Efectivas</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOCK_SALES_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Bar dataKey="quotes" name="Cotizado" fill="#F5F5F0" stroke="#D4AF37" strokeWidth={1} />
                                <Bar dataKey="sales" name="Vendido" fill="#D4AF37" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Region Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-heading text-lg mb-6">Ventas por Región</h3>
                    <div className="h-64 w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={MOCK_REGION_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {MOCK_REGION_DATA.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {MOCK_REGION_DATA.map((entry, index) => (
                            <div key={entry.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                    <span className="text-gray-600">{entry.name}</span>
                                </div>
                                <span className="font-bold">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
