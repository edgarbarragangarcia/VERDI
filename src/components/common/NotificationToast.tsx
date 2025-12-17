
import { useEffect, useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Bell } from 'lucide-react';

export const NotificationToast = () => {
    const { state } = useStore();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'info'>('info');
    const prevStatus = useRef(state.status);
    const prevItemsStatus = useRef(state.itemsStatus);

    useEffect(() => {
        // Order Approved Notification
        if (state.status === 'Aprobada' && prevStatus.current !== 'Aprobada') {
            setTimeout(() => {
                setMessage(`¡Orden Aprobada! Cliente: ${state.customerName || 'Cliente'}`);
                setType('success');
                setVisible(true);
            }, 0);
            setTimeout(() => setVisible(false), 5000);
        }

        // Production Finished Notification
        const allItemsTerminated = Object.values(state.itemsStatus).length > 0 &&
            Object.values(state.itemsStatus).every(s => s === 'Terminado') &&
            state.items.length > 0;

        const wasTerminated = Object.values(prevItemsStatus.current).length > 0 &&
            Object.values(prevItemsStatus.current).every(s => s === 'Terminado');

        if (state.status === 'Aprobada' && allItemsTerminated && !wasTerminated) {
            setTimeout(() => {
                setMessage(`¡Producción Finalizada! El pedido de ${state.customerName} está listo para despacho.`);
                setType('success');
                setVisible(true);
            }, 0);
            setTimeout(() => setVisible(false), 8000);
        }

        prevStatus.current = state.status;
        prevItemsStatus.current = state.itemsStatus;
    }, [state.status, state.itemsStatus, state.customerName, state.items.length]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2"
                >
                    <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 flex min-w-[320px]">
                        <div className={`w-2 ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        <div className="p-4 flex-1 flex items-start gap-3">
                            {type === 'success' ? (
                                <div className="p-2 bg-green-100 rounded-full text-green-600">
                                    <CheckCircle size={20} />
                                </div>
                            ) : (
                                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                    <Bell size={20} />
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Nueva Notificación</h4>
                                <p className="text-sm text-gray-600 mt-1">{message}</p>
                            </div>
                            <button
                                onClick={() => setVisible(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
