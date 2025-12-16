
import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_SKUS } from '../../mocks/data';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScannerPage = () => {
    const { state, dispatch } = useStore();
    const navigate = useNavigate();

    const [scannedItem, setScannedItem] = useState<string | null>(null);

    // Filter items that are not yet "Terminado"
    const pendingItems = state.items.filter(item => state.itemsStatus[item.skuId] !== 'Terminado');

    const handleSimulateScan = (skuId: string) => {

        setScannedItem(skuId);
        // Simulate processing delay
        setTimeout(() => {
            dispatch({ type: 'MARK_ITEM_TERMINATED', payload: skuId });
        }, 500);
    };

    const handleClose = () => {
        navigate('/traceability');
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-4 text-white">
                <h2 className="font-heading">Escanear Producto</h2>
                <button onClick={handleClose} className="p-2 bg-white/10 rounded-full">
                    <X size={20} />
                </button>
            </div>

            {/* Camera Viewport Simulation */}
            <div className="flex-1 relative bg-gray-900 overflow-hidden flex items-center justify-center">
                {!scannedItem ? (
                    <>
                        {/* Camera Feed Simulation */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center" />

                        {/* Scanning Overlay */}
                        <div className="relative w-64 h-64 border-2 border-verdi-gold rounded-lg shadow-[0_0_0_1000px_rgba(0,0,0,0.7)] flex items-center justify-center">
                            <div className="w-60 h-0.5 bg-verdi-gold animate-pulse shadow-[0_0_10px_2px_rgba(212,175,55,0.5)]" />
                        </div>

                        <div className="absolute bottom-10 left-0 w-full px-8 text-center">
                            <p className="text-white text-sm mb-4">Simular lectura de código:</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {pendingItems.map(item => {
                                    const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                                    return (
                                        <button
                                            key={item.skuId}
                                            onClick={() => handleSimulateScan(item.skuId)}
                                            className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg active:scale-95 transition-transform"
                                        >
                                            {sku?.name} ({item.skuId})
                                        </button>
                                    );
                                })}
                                {pendingItems.length === 0 && (
                                    <p className="text-green-400 font-bold">¡Todo terminado!</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-8 rounded-xl text-center flex flex-col items-center animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-1">¡Escaneo Exitoso!</h3>
                        <p className="text-gray-500 mb-6">Item marcado como Terminado.</p>
                        <button
                            onClick={() => { setScannedItem(null); }}
                            className="px-6 py-2 bg-verdi-dark text-white rounded hover:bg-black"
                        >
                            Escanear Siguiente
                        </button>
                    </div>
                )}
            </div>

            <div className="p-4 bg-black text-center">
                <p className="text-gray-500 text-xs">PWA Scanner Simulation v1.0</p>
            </div>
        </div>
    );
};

export default ScannerPage;
