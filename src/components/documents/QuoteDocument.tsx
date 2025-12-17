
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_REGIONS, MOCK_SKUS, type Region } from '../../mocks/data';

interface QuoteDocumentProps {
    date: string;
}

export const QuoteDocument: React.FC<QuoteDocumentProps> = ({ date }) => {
    const { state } = useStore();
    const region = MOCK_REGIONS.find((r: Region) => r.id === state.regionId) || MOCK_REGIONS[0];

    // Calculate totals
    const calculateTotals = () => {
        let subtotal = 0;
        state.items.forEach(item => {
            const sku = MOCK_SKUS.find(s => s.id === item.skuId);
            const price = item.price || sku?.price || 0;
            subtotal += price * item.quantity;
        });

        const discountAmount = subtotal * state.discount;
        const subtotalAfterDiscount = subtotal - discountAmount;
        return { subtotal, discountAmount, subtotalAfterDiscount };
    };

    const { subtotal, discountAmount, subtotalAfterDiscount } = calculateTotals();

    return (
        <div className="bg-white p-8 max-w-[210mm] mx-auto text-black font-serif text-sm">
            {/* Header / Manufacturer Info */}
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        {/* Logo Placeholder */}
                        <div className="w-16 h-16 bg-verdi-gold text-verdi-dark font-bold flex items-center justify-center text-xl mb-4">V</div>
                        <h1 className="text-xl font-bold uppercase tracking-widest text-verdi-dark">VERDI DESIGN S.A.S</h1>
                        <p>NIT: 900.641.188</p>
                        <p>Cra 69p #78 - 67, Las Ferias</p>
                        <p>Bogota D.C., Colombia</p>
                        <p>info@verdi.com.co</p>
                    </div>
                    {/* Quote Details */}
                    <div className="text-right">
                        <h2 className="text-2xl font-bold uppercase mb-4 text-verdi-dark border-b border-verdi-dark pb-2 inline-block">Cotización</h2>
                        <div className="grid grid-cols-[100px_1fr] gap-2 text-left text-xs">
                            <span className="font-bold">Quote:</span>
                            <span>{state.id}</span>

                            <span className="font-bold">Date:</span>
                            <span>{date}</span>

                            <span className="font-bold">Valid:</span>
                            <span>30 Days</span>

                            <span className="font-bold">Project:</span>
                            <span>Residence</span>

                            <span className="font-bold">Sales Ref.:</span>
                            <span>Online</span>

                            <span className="font-bold">HS Code:</span>
                            <span>5702.32.0000</span>

                            <span className="font-bold">Currency:</span>
                            <span>{region.currency}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sold To / Ship To */}
            <div className="grid grid-cols-2 gap-8 mb-8 border-t border-b border-gray-200 py-4">
                <div>
                    <h3 className="font-bold uppercase mb-2 text-xs text-gray-500">Sold To / Importer of Record</h3>
                    <p className="font-bold text-lg">{state.customerName || 'Cliente'}</p>
                    <p>Address Not Provided</p>
                    <p>{region.name}</p>
                </div>
                <div>
                    <h3 className="font-bold uppercase mb-2 text-xs text-gray-500">Ship To</h3>
                    <p className="font-bold text-lg">{state.customerName || 'Cliente'}</p>
                    <p>Address Not Provided</p>
                    <p>{region.name}</p>
                </div>
            </div>

            <p className="text-xs italic mb-4 text-gray-500">
                *Never bend textile. Do not remove PVC tube until placed at final install location. Carefully review care & handling instructions prior to manipulating product.
            </p>

            {/* Items Table */}
            <div className="mb-0">
                <div className="border-b-2 border-verdi-dark mb-4 flex justify-between font-bold uppercase text-xs pb-2">
                    <span className="w-1/2">Dimensions:</span>
                    <span className="w-20 text-center">Area:</span>
                    <span className="w-24 text-right">Price/Sq.Ft.:</span>
                    <span className="w-32 text-right">SUBTOTAL:</span>
                </div>

                <div className="space-y-8">
                    {state.items.map((item, index) => {
                        const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                        // Fallback for custom items
                        const isCustom = !!item.customDetails;
                        const name = item.name || sku?.name || 'Unknown Item';
                        const price = item.price || sku?.price || 0;
                        const subtotalItem = price * item.quantity;



                        return (
                            <div key={item.skuId} className="border-b border-gray-200 pb-6 break-inside-avoid">
                                <div className="font-bold bg-gray-100 p-1 mb-2">Item #{index + 1}: {name}</div>

                                {isCustom && item.customDetails ? (
                                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 text-xs">
                                        {/* Specs */}
                                        <div className="space-y-1">
                                            <div className="grid grid-cols-[80px_1fr]">
                                                <span className="font-bold">Weave:</span>
                                                <span>{item.customDetails.weave}</span>
                                            </div>
                                            <div className="grid grid-cols-[80px_1fr]">
                                                <span className="font-bold">Combination:</span>
                                                <span>{item.customDetails.combination}</span>
                                            </div>
                                            <div className="grid grid-cols-[80px_1fr]">
                                                <span className="font-bold">Border:</span>
                                                <span>{item.customDetails.border}</span>
                                            </div>
                                            <div className="grid grid-cols-[80px_1fr]">
                                                <span className="font-bold">Cut:</span>
                                                <span>{item.customDetails.cut}</span>
                                            </div>
                                            <div className="grid grid-cols-[80px_1fr]">
                                                <span className="font-bold">Code:</span>
                                                <span>{item.customDetails.code}</span>
                                            </div>
                                            <div className="grid grid-cols-[80px_1fr]">
                                                <span className="font-bold">Quantity:</span>
                                                <span>{item.quantity}</span>
                                            </div>
                                        </div>

                                        {/* Dimensions */}
                                        <div className="text-center space-y-1">
                                            <div className="grid grid-cols-[40px_40px_40px] gap-2 border-b border-gray-300 pb-1 mb-1 font-bold">
                                                <span>Ft.</span>
                                                <span>In.</span>
                                                <span>Mts.</span>
                                            </div>
                                            <div className="grid grid-cols-[40px_40px_40px] gap-2">
                                                <span className="text-gray-500 text-[10px] w-full text-left">Warp</span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <div className="grid grid-cols-[40px_40px_40px] gap-2">
                                                <span>{item.customDetails.dimensions.widthFt}</span>
                                                <span>{item.customDetails.dimensions.widthIn}</span>
                                                <span>{(item.customDetails.dimensions.widthFt * 0.3048 + item.customDetails.dimensions.widthIn * 0.0254).toFixed(2)}</span>
                                            </div>
                                            <div className="grid grid-cols-[40px_40px_40px] gap-2">
                                                <span className="text-gray-500 text-[10px] w-full text-left">Weft</span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <div className="grid grid-cols-[40px_40px_40px] gap-2">
                                                <span>{item.customDetails.dimensions.lengthFt}</span>
                                                <span>{item.customDetails.dimensions.lengthIn}</span>
                                                <span>{(item.customDetails.dimensions.lengthFt * 0.3048 + item.customDetails.dimensions.lengthIn * 0.0254).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Area */}
                                        <div className="text-center w-20">
                                            <div className="font-bold border-b border-gray-300 pb-1 mb-2">Sq.Ft.</div>
                                            <div>{item.customDetails.dimensions.totalSqFt.toFixed(2)}</div>
                                            <div className="text-[10px] text-gray-500 mt-1">
                                                {(item.customDetails.dimensions.totalSqMts).toFixed(2)} Sq.Mts
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right w-24">
                                            <div>${item.customDetails.unitPrice}</div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="text-right w-32 font-bold">
                                            ${subtotalItem.toLocaleString()}
                                        </div>
                                    </div>
                                ) : (
                                    /* Standard Item */
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-500">{sku?.material}</p>
                                            <p className="text-xs">QTY: {item.quantity}</p>
                                        </div>
                                        <div className="text-right font-bold">
                                            ${subtotalItem.toLocaleString()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
                <div className="w-1/2 border border-gray-800">
                    <div className="flex justify-between p-2 border-b border-gray-200 bg-gray-50">
                        <span className="font-bold text-xs uppercase">Subtotal</span>
                        <span className="font-bold">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 border-b border-gray-200">
                        <span className="font-bold text-xs uppercase text-gray-500">Discount ({state.discount * 100}%)</span>
                        <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                    {/* Simplified for matching the specific Quote Image request which often focuses on product subtotal, 
                        but normally would include tax/shipping. Keeping minimal as per reference image style. */}
                    <div className="flex justify-between p-2 bg-gray-100">
                        <span className="font-bold text-sm uppercase">Total</span>
                        <span className="font-bold text-sm">${subtotalAfterDiscount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Footer / Terms */}
            <div className="text-[10px] text-gray-500 space-y-2 mt-auto">
                <p>
                    *Note: Price in {region.currency}. Shipping costs may change at time of shipment.
                </p>
                <p>
                    *Due to our handcrafted process and the irregularity of our materials, it is possible to find slight variations in the color and/or structure/size of the piece. Such small irregularities are characteristic of this craftsmanship and are not considered a defect.
                </p>
                <p className="font-bold italic">
                    *By placing an order with us you are deemed to have read, understood and agreed to our Terms and Conditions as stipulated on our website.
                </p>
                <div className="mt-8 pt-4 border-t border-gray-300 text-center uppercase tracking-widest text-verdi-dark font-bold">
                    Verdi Design S.A.S
                </div>
            </div>
        </div>
    );
};
