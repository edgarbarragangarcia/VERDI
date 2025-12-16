
import { useState } from 'react';
import { QrCode, ArrowRight, ArrowLeft, Package, Plus, Minus } from 'lucide-react';
import { MOCK_SKUS } from '../../mocks/data';
import { motion, AnimatePresence } from 'framer-motion';

export const InventoryPage = () => {
    const [mode, setMode] = useState<'menu' | 'prod-finish' | 'scan-in' | 'scan-out'>('menu');
    const [scannedItem, setScannedItem] = useState<any>(null);
    const [showQrModal, setShowQrModal] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleMockScan = () => {
        // Simulate scanning a random item
        const randomSku = MOCK_SKUS[Math.floor(Math.random() * MOCK_SKUS.length)];
        setScannedItem(randomSku);
    };

    const handleProcess = () => {
        // Simulate processing (add/deduct)
        setTimeout(() => {
            setScannedItem(null);
            alert(mode === 'scan-in' ? 'Item ingresado al inventario correctamente.' : 'Item descontado del inventario.');
            setMode('menu');
        }, 500);
    };

    const handleGenerateQr = (skuId: string) => {
        setGeneratedCode(`VERDI-${skuId}-${Date.now().toString().slice(-4)}`);
        setShowQrModal(true);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="font-heading text-3xl text-verdi-dark mb-6">Gestión de Inventario & Producción</h1>

            {mode === 'menu' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={() => setMode('prod-finish')}
                        className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-4 group"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                            <QrCode size={32} />
                        </div>
                        <h3 className="font-bold text-gray-800">Finalizar Producción (QR)</h3>
                        <p className="text-sm text-gray-500 text-center">Generar código para nuevo producto</p>
                    </button>

                    <button
                        onClick={() => setMode('scan-in')}
                        className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-4 group"
                    >
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                            <Plus size={32} />
                        </div>
                        <h3 className="font-bold text-gray-800">Entrada Inventario</h3>
                        <p className="text-sm text-gray-500 text-center">Escanear para sumar stock</p>
                    </button>

                    <button
                        onClick={() => setMode('scan-out')}
                        className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-4 group"
                    >
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
                            <Minus size={32} />
                        </div>
                        <h3 className="font-bold text-gray-800">Salida Inventario</h3>
                        <p className="text-sm text-gray-500 text-center">Escanear para descontar stock</p>
                    </button>
                </div>
            )}

            {mode === 'prod-finish' && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <button onClick={() => setMode('menu')} className="mb-4 text-gray-500 hover:text-gray-800 flex items-center gap-2">
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <h2 className="text-xl font-bold mb-4">Seleccionar Producto Terminado</h2>
                    <div className="space-y-2">
                        {MOCK_SKUS.map(sku => (
                            <div key={sku.id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <img src={sku.image} alt={sku.name} className="w-12 h-12 object-cover rounded" />
                                    <div>
                                        <div className="font-bold text-gray-800">{sku.name}</div>
                                        <div className="text-xs text-gray-500">{sku.id}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleGenerateQr(sku.id)}
                                    className="px-4 py-2 bg-verdi-dark text-white rounded hover:opacity-90 flex items-center gap-2"
                                >
                                    <QrCode size={16} /> Generar QR
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(mode === 'scan-in' || mode === 'scan-out') && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-lg mx-auto text-center">
                    <button onClick={() => setMode('menu')} className="mb-6 text-gray-500 hover:text-gray-800 flex items-center gap-2">
                        <ArrowLeft size={16} /> Cancelar Operación
                    </button>

                    <h2 className="text-2xl font-bold mb-2">
                        {mode === 'scan-in' ? 'Entrada de Inventario' : 'Salida de Inventario'}
                    </h2>
                    <p className="text-gray-500 mb-8">Escanee el código QR del producto</p>

                    {!scannedItem ? (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-64 h-64 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 border-2 border-verdi-gold opacity-50 animate-pulse"></div>
                                <QrCode size={64} className="text-white opacity-50" />
                                <span className="absolute bottom-4 text-white text-xs">Cámara Activa (Simulación)</span>
                            </div>
                            <button
                                onClick={handleMockScan}
                                className="px-6 py-3 bg-verdi-gold text-verdi-dark font-bold rounded hover:bg-white border border-verdi-gold transition-colors"
                            >
                                Simular Escaneo
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 p-6 rounded border border-gray-200"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                <Package size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{scannedItem.name}</h3>
                            <p className="text-gray-500 text-sm mb-6">SKU: {scannedItem.id}</p>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleProcess}
                                    className={`px-8 py-3 rounded text-white font-bold flex items-center gap-2 ${mode === 'scan-in' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    {mode === 'scan-in' ? <Plus size={20} /> : <Minus size={20} />}
                                    {mode === 'scan-in' ? 'Confirmar Entrada' : 'Confirmar Salida'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            {/* QR Details Modal */}
            <AnimatePresence>
                {showQrModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowQrModal(false)}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white p-8 rounded-lg max-w-sm w-full text-center"
                        >
                            <h3 className="font-bold text-xl mb-4">Código Generado</h3>
                            <div className="bg-gray-100 p-4 rounded mb-4 break-all font-mono text-sm">
                                {generatedCode}
                            </div>
                            <div className="w-48 h-48 bg-gray-900 mx-auto mb-6 flex items-center justify-center text-white">
                                [QR CODE VISUAL]
                            </div>
                            <button
                                onClick={() => setShowQrModal(false)}
                                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded font-bold text-gray-700"
                            >
                                Cerrar / Imprimir
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
