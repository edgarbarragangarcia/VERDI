
import { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_REGIONS, MOCK_SKUS, type Region } from '../../mocks/data';
import { AlertCircle, CheckCircle, Mail, ExternalLink, Plus } from 'lucide-react';
import { QuoteNotification } from '../../components/common/QuoteNotification';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const PricingSummary = () => {
    const { state, dispatch } = useStore();
    const region = MOCK_REGIONS.find((r: Region) => r.id === state.regionId) || MOCK_REGIONS[0];

    const totals = useMemo(() => {
        let subtotal = 0;
        let totalCost = 0;

        state.items.forEach(item => {
            const sku = MOCK_SKUS.find(s => s.id === item.skuId);
            const price = item.price || sku?.price || 0;
            // For custom items, assume a cost ratio if unknown (e.g. 50%) or 0.
            const cost = sku?.cost || (price * 0.5);

            subtotal += price * item.quantity;
            totalCost += cost * item.quantity;
        });

        const discountAmount = subtotal * state.discount;
        const subtotalAfterDiscount = subtotal - discountAmount;
        const taxAmount = subtotalAfterDiscount * region.taxRate;
        const shipping = state.items.length > 0 ? region.shippingCost : 0;
        const total = subtotalAfterDiscount + taxAmount + shipping;

        // Profit Calculation (Simplified)
        // Revenue = SubtotalAfterDiscount (Excludes Tax/Shipping usually for profit calc, but tax is pass-through)
        // Profit = Revenue - Cost
        const profit = subtotalAfterDiscount - totalCost;
        const margin = subtotalAfterDiscount > 0 ? (profit / subtotalAfterDiscount) : 0;

        return { subtotal, discountAmount, subtotalAfterDiscount, taxAmount, shipping, total, profit, margin };
    }, [state.items, state.regionId, state.discount, region]);

    const maxDiscount = totals.margin > 0.3 ? 0.20 : 0.05; // Hardcoded rule: High margin allows 20%, Low allows 5%
    const discountError = state.discount > maxDiscount;
    const [showNotification, setShowNotification] = useState(false);

    const handleSendQuote = () => {
        dispatch({ type: 'SEND_QUOTE_TO_CLIENT' });
        setShowNotification(true);
    };

    return (
        <div className="bg-verdi-dark text-verdi-cream p-6 rounded-lg shadow-lg sticky top-6">
            <h3 className="font-heading text-xl mb-6 text-verdi-gold">Resumen de Cotización</h3>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal ({state.items.length} items)</span>
                    <span>${totals.subtotal.toLocaleString()}</span>
                </div>

                {/* Discount Input */}
                <div className="py-2 border-y border-white/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Descuento (%)</span>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={state.discount * 100}
                            onChange={(e) => dispatch({ type: 'SET_DISCOUNT', payload: Math.max(0, parseInt(e.target.value) || 0) / 100 })}
                            className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-right outline-none focus:border-verdi-gold"
                        />
                    </div>
                    {state.discount > 0 && (
                        <div className="flex justify-between text-sm text-verdi-gold/80">
                            <span>- ${(totals.discountAmount).toLocaleString()}</span>
                        </div>
                    )}
                    {discountError && (
                        <div className="flex items-center gap-2 text-xs text-red-400 mt-2 bg-red-900/20 p-2 rounded">
                            <AlertCircle size={12} />
                            <span>Excede el permitido ({maxDiscount * 100}%) según margen.</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Impuestos ({region.name} - {(region.taxRate * 100)}%)</span>
                    <span>${totals.taxAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Envío Estimado</span>
                    <span>${totals.shipping.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-white/20 flex justify-between items-end">
                    <span className="font-heading text-lg">Total</span>
                    <span className="font-heading text-2xl text-verdi-gold">${totals.total.toLocaleString()}</span>
                </div>
            </div>

            {/* Internal KPI for Sales Rep */}
            <div className="bg-white/5 p-4 rounded border border-white/10 mb-6">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">KPI Interno (Simulado)</h4>
                <div className="flex justify-between text-sm mb-1">
                    <span>Margen</span>
                    <span className={totals.margin < 0.3 ? 'text-red-400' : 'text-green-400'}>
                        {(totals.margin * 100).toFixed(1)}%
                    </span>
                </div>
                <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${totals.margin < 0.3 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(totals.margin * 100, 100)}%` }}
                    />
                </div>
            </div>

            <button
                onClick={handleSendQuote}
                disabled={state.items.length === 0 || discountError || state.status !== 'Borrador'}
                className="w-full py-4 bg-verdi-gold text-verdi-dark font-bold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {state.status === 'PendienteCliente' || state.status === 'Aprobada' || state.status === 'Rechazada' ? (
                    <>
                        <Mail size={20} /> Enviada
                    </>
                ) : (
                    <>
                        <Mail size={20} /> Enviar a Cliente
                    </>
                )}
            </button>

            {state.status !== 'Borrador' && (
                <button
                    onClick={() => dispatch({ type: 'RESET_ORDER' })}
                    className="w-full mt-4 py-3 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition-colors flex justify-center items-center gap-2"
                >
                    <Plus size={20} /> Nueva Cotización (Reset)
                </button>
            )}

            {state.status === 'PendienteCliente' && (
                <div className="mt-4 p-4 bg-blue-900/30 border border-blue-800 text-blue-200 text-sm rounded flex flex-col items-center gap-3">
                    <p className="text-center">La cotización ha sido enviada al cliente. Esperando aprobación.</p>
                    <Link
                        to="/quote/client-view"
                        target="_blank"
                        className="flex items-center gap-2 text-verdi-gold font-bold hover:underline"
                    >
                        <ExternalLink size={16} /> Simular Vista Cliente
                    </Link>
                </div>
            )}

            {state.status === 'Aprobada' && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-800 text-green-200 text-sm text-center rounded">
                    <CheckCircle size={16} className="inline mr-2" />
                    Cotización Aprobada. Orden enviada a Trazabilidad.
                </div>
            )}

            {state.status === 'Rechazada' && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 text-red-200 text-sm text-center rounded">
                    <AlertCircle size={16} className="inline mr-2" />
                    Cotización Rechazada por el cliente.
                </div>
            )}

            {Object.values(state.itemsStatus).length > 0 && Object.values(state.itemsStatus).every(s => s === 'Terminado') && state.status === 'Aprobada' && (
                <div className="mt-4 p-4 bg-green-500 text-white shadow-lg rounded animate-pulse border border-green-400">
                    <div className="flex items-center gap-2 mb-1 font-bold">
                        <CheckCircle size={20} />
                        <span>¡Producción Finalizada!</span>
                    </div>
                    <p className="text-sm opacity-90">
                        El pedido está listo. Puede proceder al despacho.
                    </p>
                    <Link to="/shipping" className="block mt-3 bg-white text-green-600 text-center py-2 rounded font-bold text-sm hover:bg-gray-100">
                        Ir a Despacho
                    </Link>
                </div>
            )}

            <QuoteNotification
                visible={showNotification}
                onClose={() => setShowNotification(false)}
                type="sent"
                clientName={state.customerName || "Cliente"}
            />
        </div>
    );
};
