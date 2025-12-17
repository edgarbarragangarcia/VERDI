
import { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_REGIONS, MOCK_SKUS, type Region } from '../../mocks/data';
import { Plus, Trash2, Ruler } from 'lucide-react';

export const QuoteForm = () => {
    const { state, dispatch } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<'Moda' | 'Home'>('Moda');
    const [selectedSkuId, setSelectedSkuId] = useState<string>('');

    // State for Custom Rug Form (Home)
    const [customRug, setCustomRug] = useState({
        weave: 'Luma',
        combination: '',
        border: 'NA',
        cut: 'Regular',
        code: '',
        warpFt: 12, // Default from image
        warpIn: 0,
        weftFt: 12,
        weftIn: 0,
        pricePerSqFt: 101, // Default from image
        quantity: 1
    });

    const filteredSkus = MOCK_SKUS.filter(sku => sku.category === selectedCategory);

    // Calculate dimensions
    const dimensions = useMemo(() => {
        const warpInches = (Number(customRug.warpFt) * 12) + Number(customRug.warpIn);
        const weftInches = (Number(customRug.weftFt) * 12) + Number(customRug.weftIn);

        const totalSqFt = (warpInches * weftInches) / 144;

        const warpMts = warpInches * 0.0254;
        const weftMts = weftInches * 0.0254;
        const totalSqMts = warpMts * weftMts;

        return {
            warpInches,
            weftInches,
            totalSqFt,
            warpMts,
            weftMts,
            totalSqMts
        };
    }, [customRug.warpFt, customRug.warpIn, customRug.weftFt, customRug.weftIn]);

    const handleAddItem = () => {
        if (selectedCategory === 'Moda') {
            if (!selectedSkuId) return;
            const sku = MOCK_SKUS.find(s => s.id === selectedSkuId);
            if (!sku) return;

            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    skuId: selectedSkuId,
                    quantity: 1,
                    name: sku.name,
                    price: sku.price,
                    category: 'Moda'
                }
            });
            setSelectedSkuId('');
        } else {
            // Add Custom Home Item
            const newSkuId = `CUSTOM-${Date.now()}`;
            const unitPrice = dimensions.totalSqFt * Number(customRug.pricePerSqFt);

            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    skuId: newSkuId,
                    quantity: Number(customRug.quantity),
                    name: `Rug - ${customRug.weave} (${customRug.combination})`,
                    category: 'Home',
                    price: unitPrice, // Price per unit (Rug)
                    customDetails: {
                        weave: customRug.weave,
                        combination: customRug.combination,
                        border: customRug.border,
                        cut: customRug.cut,
                        code: customRug.code,
                        dimensions: {
                            widthFt: Number(customRug.warpFt),
                            widthIn: Number(customRug.warpIn),
                            lengthFt: Number(customRug.weftFt),
                            lengthIn: Number(customRug.weftIn),
                            totalSqFt: dimensions.totalSqFt,
                            totalSqMts: dimensions.totalSqMts
                        },
                        unitPrice: Number(customRug.pricePerSqFt)
                    }
                }
            });
            // Reset form optionally?
        }
    };

    const handleCustomChange = (field: string, value: string | number) => {
        setCustomRug(prev => ({ ...prev, [field]: value }));
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

            {/* Item Selector / Configurator */}
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

                {selectedCategory === 'Moda' ? (
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
                ) : (
                    // Custom Home Item Form
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="lg:col-span-1">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tejido (Weave)</label>
                                <input
                                    type="text"
                                    value={customRug.weave}
                                    onChange={(e) => handleCustomChange('weave', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Combinación</label>
                                <input
                                    type="text"
                                    value={customRug.combination}
                                    onChange={(e) => handleCustomChange('combination', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                    placeholder="Ex: White Fique Fiber + Gray..."
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Borde</label>
                                <input
                                    type="text"
                                    value={customRug.border}
                                    onChange={(e) => handleCustomChange('border', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Corte</label>
                                <input
                                    type="text"
                                    value={customRug.cut}
                                    onChange={(e) => handleCustomChange('cut', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Código</label>
                                <input
                                    type="text"
                                    value={customRug.code}
                                    onChange={(e) => handleCustomChange('code', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Precio / Sq.Ft</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-gray-400">$</span>
                                    <input
                                        type="number"
                                        value={customRug.pricePerSqFt}
                                        onChange={(e) => handleCustomChange('pricePerSqFt', e.target.value)}
                                        className="w-full pl-6 p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Cantidad</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={customRug.quantity}
                                    onChange={(e) => handleCustomChange('quantity', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-verdi-gold outline-none"
                                />
                            </div>
                        </div>

                        {/* Dimensions Calculator */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-3 text-verdi-dark font-medium">
                                <Ruler size={16} />
                                <span>Dimensiones</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500">Warp (Ft/In)</label>
                                    <div className="flex gap-2">
                                        <input type="number" placeholder="Ft" className="w-full p-2 text-sm border rounded" value={customRug.warpFt} onChange={e => handleCustomChange('warpFt', e.target.value)} />
                                        <input type="number" placeholder="In" className="w-full p-2 text-sm border rounded" value={customRug.warpIn} onChange={e => handleCustomChange('warpIn', e.target.value)} />
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">{dimensions.warpMts.toFixed(2)} Mts</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Weft (Ft/In)</label>
                                    <div className="flex gap-2">
                                        <input type="number" placeholder="Ft" className="w-full p-2 text-sm border rounded" value={customRug.weftFt} onChange={e => handleCustomChange('weftFt', e.target.value)} />
                                        <input type="number" placeholder="In" className="w-full p-2 text-sm border rounded" value={customRug.weftIn} onChange={e => handleCustomChange('weftIn', e.target.value)} />
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">{dimensions.weftMts.toFixed(2)} Mts</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Area Total</label>
                                    <div className="font-semibold text-verdi-dark flex flex-col">
                                        <span>{dimensions.totalSqFt.toFixed(2)} Sq.Ft</span>
                                        <span className="text-xs text-gray-400 font-normal">{dimensions.totalSqMts.toFixed(2)} M2</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Total Item</label>
                                    <div className="font-bold text-lg text-verdi-dark">
                                        ${(dimensions.totalSqFt * Number(customRug.pricePerSqFt) * Number(customRug.quantity)).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleAddItem}
                                className="px-6 py-3 bg-verdi-dark text-white rounded-md hover:bg-black transition-colors flex items-center gap-2"
                            >
                                <Plus size={18} /> Agregar Custom Rug
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Items List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Item</th>
                            <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Detalles</th>
                            <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Cant</th>
                            <th className="text-right p-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {state.items.map((item) => {
                            const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                            // Fallback to item props if SKU not found (Custom Item)
                            const name = item.name || sku?.name || 'Unknown';
                            const price = item.price || sku?.price || 0;
                            const material = item.customDetails ? `${item.customDetails.weave} - ${item.customDetails.combination}` : sku?.material;

                            return (
                                <tr key={item.skuId} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-verdi-dark">{name}</div>
                                        <div className="text-xs text-gray-400">{material}</div>
                                        {item.customDetails && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.customDetails.dimensions.totalSqFt.toFixed(2)} Sq.Ft @ ${item.customDetails.unitPrice}/sf
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-xs text-gray-500">
                                        {item.customDetails && (
                                            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                                <span>W: {item.customDetails.dimensions.widthFt}'{item.customDetails.dimensions.widthIn}"</span>
                                                <span>L: {item.customDetails.dimensions.lengthFt}'{item.customDetails.dimensions.lengthIn}"</span>
                                            </div>
                                        )}
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
                                        ${(price * item.quantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
                                <td colSpan={5} className="p-8 text-center text-gray-400">
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

