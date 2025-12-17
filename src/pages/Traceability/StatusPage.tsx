
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_SKUS } from '../../mocks/data';
import { CheckCircle, Clock, Package, QrCode, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';

const StatusPage = () => {
    const { state, dispatch } = useStore();
    const [selectedQrItem, setSelectedQrItem] = React.useState<string | null>(null);

    if (state.status === 'Borrador' || state.status === 'PendienteCliente') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Package size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-heading text-gray-500">No hay orden en producción</h2>
                <p className="text-gray-400 mt-2">
                    {state.status === 'PendienteCliente'
                        ? 'Esperando aprobación del cliente...'
                        : 'Cree y apruebe una cotización primero.'}
                </p>
                <Link to="/quote" className="mt-6 px-6 py-2 bg-verdi-dark text-white rounded hover:bg-black transition-colors">
                    Ir al Cotizador
                </Link>
            </div>
        );
    }

    if (state.status === 'Rechazada') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <AlertCircle size={64} className="text-red-300 mb-4" />
                <h2 className="text-xl font-heading text-red-500">Orden Rechazada</h2>
                <p className="text-gray-400 mt-2">El cliente ha rechazado la propuesta.</p>
                <Link to="/quote" className="mt-6 px-6 py-2 bg-verdi-dark text-white rounded hover:bg-black transition-colors">
                    Volver a Cotizar
                </Link>
            </div>
        );
    }

    // const allItemsTerminated = Object.values(state.itemsStatus).every(s => s === 'Terminado') && state.items.length > 0;
    const progress = state.items.length > 0
        ? (Object.values(state.itemsStatus).filter(s => s === 'Terminado').length / state.items.length) * 100
        : 0;

    const isNewOrder = state.status === 'Aprobada' && progress === 0;

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

            {isNewOrder && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 bg-green-50 border border-green-200 p-6 rounded-lg flex items-start gap-4"
                >
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="font-heading text-lg text-green-800">¡Nueva Orden de Producción!</h3>
                        <p className="text-green-700 mt-1">
                            El cliente ha aprobado la cotización. Los items han sido programados para producción.
                            Escanee el código QR para comenzar a actualizar el estado de cada item.
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* QR Code Card */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6">
                        {state.items.length > 0 ? (
                            <QRCode
                                value={state.items[0].skuId}
                                size={120}
                                viewBox={`0 0 120 120`}
                                fgColor="#1a1a1a"
                                bgColor="#ffffff"
                                level="L"
                            />
                        ) : (
                            <QrCode size={120} className="text-verdi-dark" />
                        )}
                    </div>
                    <h3 className="font-heading text-lg mb-2">Código de Producción</h3>
                    <p className="text-sm text-gray-400 mb-6 font-mono">
                        {state.items.length > 0 ? state.items[0].skuId : 'Sin items'}
                    </p>
                    <Link to="/traceability/scan" className="w-full px-4 py-3 bg-verdi-gold text-verdi-dark font-medium rounded hover:bg-yellow-500 transition-colors">
                        Abrir Escáner Móvil
                    </Link>
                </div>

                {/* Progress & List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Bar & Validation */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Progreso de Producción</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-green-500"
                            />
                        </div>

                        {/* Production Validation Action */}
                        {progress === 100 && (
                            <div className="border-t border-gray-100 pt-4">
                                {!state.productionValidated ? (
                                    <div className="flex items-center justify-between bg-yellow-50 p-4 rounded border border-yellow-200">
                                        <div>
                                            <h4 className="font-bold text-yellow-800">Confirmar Finalización</h4>
                                            <p className="text-sm text-yellow-700">Todos los items están marcados como terminados. Valide la orden para notificar a Comercial.</p>
                                        </div>
                                        <button
                                            onClick={() => dispatch({ type: 'VALIDATE_PRODUCTION' })}
                                            className="px-6 py-3 bg-verdi-dark text-verdi-gold font-heading font-bold rounded shadow-lg hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                        >
                                            <CheckCircle size={20} />
                                            Validar Producción
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded border border-green-200">
                                        <CheckCircle size={20} />
                                        <span className="font-bold">Producción Validada Correctamente</span>
                                    </div>
                                )}
                            </div>
                        )}
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
                                        <div className="flex items-center gap-4">
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${isDone ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {isDone ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                {status}
                                            </div>
                                            {!isDone && (
                                                <button
                                                    onClick={() => dispatch({ type: 'MARK_ITEM_TERMINATED', payload: item.skuId })}
                                                    className="px-3 py-1 bg-verdi-dark text-white text-xs rounded hover:bg-black transition-colors"
                                                >
                                                    Terminar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedQrItem(item.skuId)}
                                                className="p-1 text-gray-400 hover:text-gray-600"
                                                title="Ver QR"
                                            >
                                                <QrCode size={18} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Individual Item QR Modal */}
            {selectedQrItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedQrItem(null)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-6 rounded-lg max-w-sm w-full text-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="font-heading text-xl mb-4 text-verdi-dark">Código de Item</h3>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 mb-4 inline-block">
                            <QRCode
                                value={selectedQrItem}
                                size={200}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <p className="font-mono text-sm text-gray-500 mb-6">{selectedQrItem}</p>
                        <button
                            onClick={() => setSelectedQrItem(null)}
                            className="w-full py-2 bg-gray-100 font-bold rounded hover:bg-gray-200"
                        >
                            Cerrar
                        </button>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default StatusPage;
