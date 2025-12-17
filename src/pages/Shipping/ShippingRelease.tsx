
import { useStore } from '../../context/StoreContext';
import { Truck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShippingReleaseDocument } from '../../components/documents/ShippingReleaseDocument';

export const ShippingRelease = () => {
    const { state } = useStore();

    if (state.status !== 'Aprobada') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Truck size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-heading text-gray-500">No hay orden lista para despacho</h2>
                <p className="text-gray-400 mt-2">La orden debe estar aprobada para generar el Shipping Release.</p>
                <Link to="/quote" className="mt-6 px-6 py-2 bg-verdi-dark text-white rounded hover:bg-black transition-colors">
                    Ir a Cotizaciones
                </Link>
            </div>
        );
    }

    const isReadyForShipping = Object.values(state.itemsStatus).every(s => s === 'Terminado') && state.items.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
        >
            <header className="mb-8 flex justify-between items-end print:hidden">
                <div>
                    <h1 className="font-heading text-3xl text-verdi-dark">Despacho</h1>
                    <p className="text-gray-500 mt-1">Generación de Documentos de Exportación</p>
                </div>
                {!isReadyForShipping && (
                    <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded text-sm flex items-center gap-2 border border-yellow-200">
                        <AlertCircle size={16} />
                        <span>Advertencia: La producción no ha sido marcada como terminada aún.</span>
                    </div>
                )}
                <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-verdi-gold text-verdi-dark font-bold rounded hover:bg-yellow-500 transition-colors"
                >
                    Imprimir / Guardar PDF
                </button>
            </header>

            <div className="bg-gray-100 p-8 overflow-auto print:p-0 print:bg-white">
                <div className="bg-white shadow-lg mx-auto print:shadow-none">
                    <ShippingReleaseDocument />
                </div>
            </div>
        </motion.div>
    );
};
