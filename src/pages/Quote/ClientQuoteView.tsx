
import { useMemo, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_REGIONS, MOCK_SKUS, type Region } from '../../mocks/data';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { QuoteNotification } from '../../components/common/QuoteNotification';
import { motion } from 'framer-motion';

export const ClientQuoteView = () => {
    const { state, dispatch } = useStore();
    const region = MOCK_REGIONS.find((r: Region) => r.id === state.regionId) || MOCK_REGIONS[0];
    const [actionStatus, setActionStatus] = useState<'idle' | 'approved' | 'rejected'>('idle');
    const [showNotification, setShowNotification] = useState(false);
    const [comments, setComments] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

    const totals = useMemo(() => {
        let subtotal = 0;
        state.items.forEach(item => {
            const sku = MOCK_SKUS.find(s => s.id === item.skuId);
            if (sku) {
                subtotal += sku.price * item.quantity;
            }
        });

        const discountAmount = subtotal * state.discount;
        const subtotalAfterDiscount = subtotal - discountAmount;
        const taxAmount = subtotalAfterDiscount * region.taxRate;
        const shipping = state.items.length > 0 ? region.shippingCost : 0;
        const total = subtotalAfterDiscount + taxAmount + shipping;

        return { subtotal, discountAmount, total, taxAmount, shipping };
    }, [state.items, state.regionId, state.discount, region]);

    const handleApprove = () => {
        dispatch({ type: 'APPROVE_ORDER' });
        setActionStatus('approved');
        setShowNotification(true);
    };

    const handleReject = () => {
        if (!rejectReason) return;
        dispatch({ type: 'REJECT_ORDER' });
        setActionStatus('rejected');
        setShowNotification(true);
        setShowRejectInput(false);
    };

    if (state.items.length === 0) {
        return <div className="p-8 text-center text-gray-500">No hay cotización activa para visualizar.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-primary">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-verdi-dark text-verdi-cream p-8 text-center">
                    <h1 className="font-heading text-3xl tracking-widest text-verdi-gold mb-2">VERDI</h1>
                    <p className="text-sm opacity-80 uppercase tracking-wide">Propuesta Comercial</p>
                </div>

                <div className="p-8">
                    {/* Client Info */}
                    <div className="mb-8 p-4 bg-gray-50 rounded border border-gray-100">
                        <h2 className="font-bold text-gray-800 mb-2">Preparado para:</h2>
                        <p className="text-xl text-verdi-dark">{state.customerName || 'Cliente Estimado'}</p>
                        <p className="text-gray-500 text-sm mt-1">Destino: {region.name}</p>
                    </div>

                    {/* Items */}
                    <table className="w-full mb-8">
                        <thead className="border-b border-gray-200">
                            <tr>
                                <th className="text-left py-2 font-medium text-gray-500 text-sm">Producto</th>
                                <th className="text-center py-2 font-medium text-gray-500 text-sm">Cant</th>
                                <th className="text-right py-2 font-medium text-gray-500 text-sm">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {state.items.map(item => {
                                const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                                if (!sku) return null;
                                return (
                                    <tr key={item.skuId}>
                                        <td className="py-4">
                                            <div className="font-medium text-gray-800">{sku.name}</div>
                                            <div className="text-xs text-gray-400">{sku.material}</div>
                                        </td>
                                        <td className="text-center py-4 text-gray-600">{item.quantity}</td>
                                        <td className="text-right py-4 font-medium text-gray-800">
                                            ${(sku.price * item.quantity).toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end mb-8">
                        <div className="w-full md:w-1/2 space-y-2">
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Subtotal</span>
                                <span>${totals.subtotal.toLocaleString()}</span>
                            </div>
                            {state.discount > 0 && (
                                <div className="flex justify-between text-verdi-gold text-sm">
                                    <span>Descuento ({(state.discount * 100)}%)</span>
                                    <span>- ${totals.discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Impuestos</span>
                                <span>${totals.taxAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Envío</span>
                                <span>${totals.shipping.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-heading text-xl text-verdi-dark pt-4 border-t border-gray-200 mt-2">
                                <span>Total</span>
                                <span>${totals.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {actionStatus === 'idle' && state.status !== 'Aprobada' && state.status !== 'Rechazada' ? (
                        <div className="space-y-4">
                            {!showRejectInput ? (
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleApprove}
                                        className="flex-1 py-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex justify-center items-center gap-2 font-bold"
                                    >
                                        <CheckCircle size={20} /> Aprobar Propuesta
                                    </button>
                                    <button
                                        onClick={() => setShowRejectInput(true)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 font-bold"
                                    >
                                        <XCircle size={20} /> Rechazar
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-50 p-4 rounded border border-red-100"
                                >
                                    <h4 className="font-bold text-red-800 mb-2">Motivo del Rechazo</h4>
                                    <textarea
                                        className="w-full p-3 border border-red-200 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-200"
                                        placeholder="Por favor indíquenos la razón..."
                                        rows={3}
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                    />
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleReject}
                                            disabled={!rejectReason}
                                            className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                        >
                                            Confirmar Rechazo
                                        </button>
                                        <button
                                            onClick={() => setShowRejectInput(false)}
                                            className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <MessageSquare size={16} /> Agregar Comentarios (Opcional)
                                </label>
                                <textarea
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-verdi-gold"
                                    placeholder="¿Alguna pregunta o comentario adicional?"
                                    rows={2}
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={`p-6 rounded text-center ${actionStatus === 'approved' || state.status === 'Aprobada'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            <h3 className="font-heading text-xl mb-2">
                                {actionStatus === 'approved' || state.status === 'Aprobada'
                                    ? '¡Gracias por su aprobación!'
                                    : 'Propuesta Rechazada'}
                            </h3>
                            <p className="text-sm opacity-80">
                                {actionStatus === 'approved' || state.status === 'Aprobada'
                                    ? 'Hemos notificado al equipo y su orden está en proceso.'
                                    : 'Hemos notificado sus comentarios al equipo comercial.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <QuoteNotification
                visible={showNotification}
                onClose={() => setShowNotification(false)}
                type={actionStatus === 'approved' ? 'approved' : 'rejected'}
                clientName={state.customerName || "Cliente"}
            />
        </div>
    );
};

export default ClientQuoteView;
