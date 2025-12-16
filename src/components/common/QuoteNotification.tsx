
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Mail, Clock } from 'lucide-react';
import { useEffect } from 'react';

interface QuoteNotificationProps {
    visible: boolean;
    onClose: () => void;
    type: 'sent' | 'approved' | 'rejected';
    clientName: string;
    email?: string;
}

export const QuoteNotification = ({ visible, onClose, type, clientName, email = "cliente@ejemplo.com" }: QuoteNotificationProps) => {

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    const getContent = () => {
        switch (type) {
            case 'sent':
                return {
                    icon: <Mail className="text-blue-500" size={24} />,
                    title: 'Cotización Enviada',
                    message: `Se ha enviado un correo a ${clientName} (${email}) con el link de aprobación.`,
                    color: 'bg-blue-50 border-blue-200'
                };
            case 'approved':
                return {
                    icon: <CheckCircle className="text-green-500" size={24} />,
                    title: 'Cotización Aprobada',
                    message: `El cliente ${clientName} ha aprobado la cotización. Orden enviada a producción.`,
                    color: 'bg-green-50 border-green-200'
                };
            case 'rejected':
                return {
                    icon: <XCircle className="text-red-500" size={24} />,
                    title: 'Cotización Rechazada',
                    message: `El cliente ${clientName} ha rechazado la propuesta. Revisar comentarios.`,
                    color: 'bg-red-50 border-red-200'
                };
            default:
                return {
                    icon: <Clock className="text-gray-500" size={24} />,
                    title: 'Notificación',
                    message: '',
                    color: 'bg-gray-50 border-gray-200'
                };
        }
    };

    const content = getContent();

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 min-w-[350px] max-w-md p-4 rounded-lg shadow-xl border ${content.color} flex items-start gap-4 backdrop-blur-sm bg-opacity-95`}
                >
                    <div className="mt-1">{content.icon}</div>
                    <div className="flex-1">
                        <h4 className="font-heading text-sm font-bold text-gray-800">{content.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{content.message}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XCircle size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
