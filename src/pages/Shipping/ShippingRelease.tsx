
import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShippingRelease = () => {
    const { state, dispatch } = useStore();
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        carrier: 'FedEx',
        tracking: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const allItemsTerminated = Object.keys(state.itemsStatus).length > 0 &&
        state.items.every(item => state.itemsStatus[item.skuId] === 'Terminado');

    const isPaid = state.paymentStatus === 'Pagado';
    const isUnlocked = allItemsTerminated && isPaid;

    if (!isUnlocked) {
        return (
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="bg-gray-100 p-8 rounded-full mb-6 relative">
                    <Lock size={64} className="text-gray-400" />
                    {!isPaid && <div className="absolute top-0 right-0 bg-red-500 w-4 h-4 rounded-full animate-ping" />}
                </div>
                <h2 className="font-heading text-2xl text-verdi-dark mb-2">Módulo de Despacho Bloqueado</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    Para liberar el formato de envío, la orden debe estar 100% Pagada y todos los items deben estar Terminados en trazabilidad.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    <div className={`p-4 rounded border flex items-center justify-between ${isPaid ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                        <span className="font-medium">Pago Confirmado</span>
                        {isPaid ? <CheckCircle size={20} /> : <Lock size={20} />}
                    </div>
                    <div className={`p-4 rounded border flex items-center justify-between ${allItemsTerminated ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                        <span className="font-medium">Producción Terminada</span>
                        {allItemsTerminated ? <CheckCircle size={20} /> : <Lock size={20} />}
                    </div>
                </div>

                {/* Developer Override for Testing */}
                {!isPaid && (
                    <button
                        onClick={() => dispatch({ type: 'MARK_PAID' })}
                        className="mt-12 text-xs text-gray-300 hover:text-gray-500 underline"
                    >
                        [DEV] Simular Pago Recibido
                    </button>
                )}
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 animate-in fade-in zoom-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                    <CheckCircle size={48} />
                </div>
                <h2 className="font-heading text-3xl text-verdi-dark mb-4">¡Orden Despachada!</h2>
                <p className="text-gray-500 mb-8">El formato de shipping ha sido generado y enviado a logística.</p>
                <div className="bg-white p-6 rounded shadow-sm border text-left max-w-md mx-auto">
                    <p className="text-xs text-gray-400 uppercase mb-1">Tracking Number</p>
                    <p className="font-mono text-lg font-bold">{formData.tracking || '7789-9988-1234'}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <header className="mb-8">
                <h1 className="font-heading text-3xl text-verdi-dark">Shipping Release</h1>
                <p className="text-green-600 flex items-center gap-2 mt-2">
                    <CheckCircle size={16} /> Orden lista para despacho
                </p>
            </header>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <h3 className="font-heading text-lg mb-6 border-b pb-2">Información de Envío</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Dirección de Entrega</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-200 rounded"
                            placeholder="Calle, Número, Apto (Auto-rellenado del CRM)"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Ciudad / Estado</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Zip Code</label>
                            <input type="text" className="w-full p-3 border border-gray-200 rounded" placeholder="00000" />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded border border-gray-100 mt-6">
                        <h4 className="font-bold text-sm mb-4">Detalles del Transportador</h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">Carrier</label>
                                <select
                                    className="w-full p-3 border border-gray-200 rounded bg-white"
                                    value={formData.carrier}
                                    onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                                >
                                    <option>FedEx</option>
                                    <option>DHL Express</option>
                                    <option>UPS</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">Tracking Number (Simulado)</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 rounded-l"
                                        placeholder="Scan or Type"
                                        value={formData.tracking}
                                        onChange={(e) => setFormData({ ...formData, tracking: e.target.value })}
                                    />
                                    <button className="px-4 bg-gray-200 border border-l-0 border-gray-200 rounded-r hover:bg-gray-300">
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setSubmitted(true)}
                        className="w-full py-4 bg-verdi-dark text-white font-bold rounded mt-6 hover:bg-black transition-colors flex justify-center items-center gap-2"
                    >
                        <Truck size={20} /> Generar Guía & Liberar
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
