

import { useStore } from '../../context/StoreContext';
import { MOCK_SKUS } from '../../mocks/data';
import { CheckCircle, Clock, Package, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatusPage = () => {
    const { state } = useStore();

    if (state.status === 'Borrador') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Package size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-heading text-gray-500">No hay orden activa</h2>
                <p className="text-gray-400 mt-2">Cree y apruebe una cotización primero.</p>
                <Link to="/quote" className="mt-6 px-6 py-2 bg-verdi-dark text-white rounded hover:bg-black transition-colors">
                    Ir al Cotizador
                </Link>
            </div>
        );
    }

    // const allItemsTerminated = Object.values(state.itemsStatus).every(s => s === 'Terminado') && state.items.length > 0;
    const progress = state.items.length > 0
        ? (Object.values(state.itemsStatus).filter(s => s === 'Terminado').length / state.items.length) * 100
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto"
        >
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="font-heading text-3xl text-verdi-dark">Trazabilidad de Orden</h1>
                    <p className="text-gray-500 mt-1">Orden #{state.id} • {state.customerName}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-400">Estado General</div>
                    <div className={`font-bold ${state.status === 'Aprobada' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {state.status.toUpperCase()}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* QR Code Card */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6">
                        <QrCode size={120} className="text-verdi-dark" />
                    </div>
                    <h3 className="font-heading text-lg mb-2">Código de Producción</h3>
                    <p className="text-sm text-gray-400 mb-6">Escanee este código en el taller para actualizar estados.</p>
                    <Link to="/traceability/scan" className="w-full px-4 py-3 bg-verdi-gold text-verdi-dark font-medium rounded hover:bg-yellow-500 transition-colors">
                        Abrir Escáner Móvil
                    </Link>
                </div>

                {/* Progress & List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Bar */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Progreso de Producción</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-green-500"
                            />
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 font-semibold text-xs text-gray-500 uppercase">
                            Items en Producción
                        </div>
                        <div className="divide-y divide-gray-100">
                            {state.items.map(item => {
                                const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                                const status = state.itemsStatus[item.skuId] || 'Pendiente';
                                const isDone = status === 'Terminado';

                                return (
                                    <div key={item.skuId} className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-12 rounded-full ${isDone ? 'bg-green-500' : 'bg-yellow-400'}`} />
                                            <div>
                                                <div className="font-medium text-verdi-dark">{sku?.name}</div>
                                                <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${isDone ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {isDone ? <CheckCircle size={14} /> : <Clock size={14} />}
                                            {status}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatusPage;
