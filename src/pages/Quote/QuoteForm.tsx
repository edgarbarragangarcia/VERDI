
import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_REGIONS, MOCK_SKUS, type Region } from '../../mocks/data';
import { Plus, Trash2 } from 'lucide-react';

export const QuoteForm = () => {
    const { state, dispatch } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<'Moda' | 'Home'>('Moda');
    const [selectedSkuId, setSelectedSkuId] = useState<string>('');

    const filteredSkus = MOCK_SKUS.filter(sku => sku.category === selectedCategory);

    const handleAddItem = () => {
        if (!selectedSkuId) return;
        dispatch({ type: 'ADD_ITEM', payload: { skuId: selectedSkuId, quantity: 1 } });
        setSelectedSkuId('');
    };

    return (
        <div className="space-y-8">
            {/* Customer & Region */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Cliente</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-md focus:border-verdi-gold focus:ring-1 focus:ring-verdi-gold outline-none"
                        placeholder="Nombre del Cliente"
                        value={state.customerName}
                        onChange={(e) => dispatch({ type: 'SET_CUSTOMER', payload: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Región de Envío</label>
                    <select
                        className="w-full p-3 border border-gray-200 rounded-md focus:border-verdi-gold focus:ring-1 focus:ring-verdi-gold outline-none bg-white"
                        value={state.regionId}
                        onChange={(e) => dispatch({ type: 'SET_REGION', payload: e.target.value })}
                    >
                        {MOCK_REGIONS.map((r: Region) => (
                            <option key={r.id} value={r.id}>{r.name} ({r.currency})</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Item Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-heading text-lg mb-4 text-verdi-dark">Agregar Items</h3>

                {/* Category Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-100">
                    {['Moda', 'Home'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as 'Moda' | 'Home')}
                            className={`pb-2 px-4 transition-colors relative ${selectedCategory === cat
                                ? 'text-verdi-dark font-medium'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {cat}
                            {selectedCategory === cat && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-verdi-gold" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-500 mb-2">Producto</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-md focus:border-verdi-gold outline-none"
                            value={selectedSkuId}
                            onChange={(e) => setSelectedSkuId(e.target.value)}
                        >
                            <option value="">Selecciona un producto...</option>
                            {filteredSkus.map(sku => (
                                <option key={sku.id} value={sku.id}>
                                    {sku.name} - ${sku.price.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleAddItem}
                        disabled={!selectedSkuId}
                        className="px-6 py-3 bg-verdi-dark text-white rounded-md hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Plus size={18} /> Agregar
                    </button>
                </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Item</th>
                            <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Cant</th>
                            <th className="text-right p-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {state.items.map((item) => {
                            const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                            if (!sku) return null;
                            return (
                                <tr key={item.skuId} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-verdi-dark">{sku.name}</div>
                                        <div className="text-xs text-gray-400">{sku.material}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                                                onClick={() => dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { skuId: item.skuId, quantity: Math.max(1, item.quantity - 1) } })}
                                            >-</button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                                                onClick={() => dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { skuId: item.skuId, quantity: item.quantity + 1 } })}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                        ${(sku.price * item.quantity).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.skuId })}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {state.items.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-400">
                                    No hay items en la cotización
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
