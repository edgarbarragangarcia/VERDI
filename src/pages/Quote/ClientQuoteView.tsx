
import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuoteNotification } from '../../components/common/QuoteNotification';
import { QuoteDocument } from '../../components/documents/QuoteDocument';

export const ClientQuoteView = () => {
    const { state, dispatch } = useStore();
    const [actionStatus, setActionStatus] = useState<'idle' | 'approved' | 'rejected'>('idle');
    const [showNotification, setShowNotification] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

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
        <div className="min-h-screen bg-gray-100 p-6 font-primary flex flex-col items-center">

            {/* The Document */}
            <div className="bg-white shadow-2xl max-w-[210mm] w-full min-h-[297mm] mb-8 overflow-hidden">
                <QuoteDocument date={new Date().toLocaleDateString()} />
            </div>

            {/* Actions Bar (Floating or Fixed at bottom) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-8">
                    <div className="text-sm text-gray-500 hidden md:block">
                        Revise la propuesta detallada arriba. Puede aprobarla o rechazarla directamente aquí.
                    </div>

                    {actionStatus === 'idle' && state.status !== 'Aprobada' && state.status !== 'Rechazada' ? (
                        <div className="flex gap-4 w-full md:w-auto">
                            {!showRejectInput ? (
                                <>
                                    <button
                                        onClick={() => setShowRejectInput(true)}
                                        className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 font-bold"
                                    >
                                        <XCircle size={20} /> Rechazar
                                    </button>
                                    <button
                                        onClick={handleApprove}
                                        className="flex-1 md:flex-none px-8 py-3 bg-verdi-dark text-verdi-gold rounded hover:bg-black transition-colors flex justify-center items-center gap-2 font-bold"
                                    >
                                        <CheckCircle size={20} /> Aprobar Propuesta
                                    </button>
                                </>
                            ) : (
                                <div className="flex-1 flex gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Razón del rechazo..."
                                        className="flex-1 border border-gray-300 p-2 rounded"
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                    />
                                    <button
                                        onClick={handleReject}
                                        disabled={!rejectReason}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={() => setShowRejectInput(false)}
                                        className="px-4 py-2 text-gray-500"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={`p-3 rounded flex items-center gap-2 ${actionStatus === 'approved' || state.status === 'Aprobada'
                            ? 'text-green-700 bg-green-50'
                            : 'text-red-700 bg-red-50'
                            }`}>
                            {actionStatus === 'approved' || state.status === 'Aprobada' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            <span className="font-bold">
                                {actionStatus === 'approved' || state.status === 'Aprobada' ? 'Propuesta Aprobada' : 'Propuesta Rechazada'}
                            </span>
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
