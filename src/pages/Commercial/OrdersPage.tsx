
import { useStore } from '../../context/StoreContext';
import { MOCK_SKUS } from '../../mocks/data';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Package } from 'lucide-react';

export const OrdersPage = () => {
    const { state, dispatch } = useStore();

    // In a real app, we would fetch a list of orders.
    // Here we wrap the single context state in an array if it matches the criteria.
    const orders = state.status === 'Aprobada' ? [state] : [];

    const getSkuDetails = (skuId: string) => MOCK_SKUS.find(s => s.id === skuId);

    const calculateTotal = (items: typeof state.items) => {
        return items.reduce((acc, item) => {
            const sku = getSkuDetails(item.skuId);
            const price = item.price || sku?.price || 0;
            return acc + (price * item.quantity);
        }, 0);
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-heading text-verdi-dark font-bold">
                    Pedidos Aprobados
                </h1>
                <p className="text-gray-500 mt-2">
                    Monitoreo de pedidos en producción y estado de entrega.
                </p>
            </header>

            {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-verdi-gold/20 text-center">
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-heading text-gray-600">No hay pedidos aprobados actualmente</h3>
                    <p className="text-gray-400">Cuando un cliente apruebe una cotización, aparecerá aquí.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map(order => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={order.id}
                            className="bg-white rounded-lg shadow-lg border border-verdi-gold/20 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-verdi-dark">
                                        Orden #{order.id}
                                    </h3>
                                    <p className="text-gray-500">{order.customerName || 'Cliente Sin Nombre'}</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                        <CheckCircle size={16} /> Aprobada
                                    </span>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Total: ${calculateTotal(order.items).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6">
                                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <Package size={18} />
                                    Estado de Producción
                                </h4>
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item, idx) => {
                                        const sku = getSkuDetails(item.skuId);
                                        const status = order.itemsStatus[item.skuId] || 'Pendiente';
                                        const isFinished = status === 'Terminado';

                                        return (
                                            <div key={`${item.skuId}-${idx}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                                                        {sku?.image && (
                                                            <img src={sku.image} alt={sku.name} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-verdi-dark">{sku?.name || item.name || 'Item Personalizado'}</p>
                                                        <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${isFinished
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {isFinished ? (
                                                            <><CheckCircle size={14} /> Terminado</>
                                                        ) : (
                                                            <><Clock size={14} /> En Producción</>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Commercial Validation Section */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h4 className="font-bold text-gray-700 mb-2">Validaciones Requeridas para Despacho</h4>
                                    <div className="flex flex-col gap-4">
                                        {/* Production Status */}
                                        <div className={`p-4 rounded border flex justify-between items-center ${order.productionValidated ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                            <div>
                                                <span className="font-bold text-sm block">1. Validación Producción</span>
                                                <span className="text-xs text-gray-500">{order.productionValidated ? 'Producción ha confirmado la finalización.' : 'Pendiente de confirmación por Producción.'}</span>
                                            </div>
                                            {order.productionValidated ? <CheckCircle className="text-green-600" size={20} /> : <Clock className="text-gray-400" size={20} />}
                                        </div>

                                        {/* Commercial Action */}
                                        {order.productionValidated && (
                                            <div className={`p-4 rounded border flex justify-between items-center ${order.commercialValidated ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                                <div>
                                                    <span className="font-bold text-sm block">2. Validación Comercial</span>
                                                    <span className="text-xs text-gray-500">
                                                        {order.commercialValidated
                                                            ? 'Orden validada y lista para despacho.'
                                                            : 'Revise que la orden está lista para ser despachada.'}
                                                    </span>
                                                </div>
                                                {!order.commercialValidated ? (
                                                    <button
                                                        onClick={() => dispatch({ type: 'VALIDATE_COMMERCIAL' })}
                                                        className="px-4 py-2 bg-verdi-dark text-white text-sm font-bold rounded hover:bg-black transition-colors"
                                                    >
                                                        Aprobar para Despacho
                                                    </button>
                                                ) : (
                                                    <CheckCircle className="text-green-600" size={20} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
