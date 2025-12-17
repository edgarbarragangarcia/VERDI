
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_REGIONS, MOCK_SKUS, type Region } from '../../mocks/data';
import QRCode from 'react-qr-code';



export const ShippingReleaseDocument: React.FC = () => {
    const { state } = useStore();
    const region = MOCK_REGIONS.find((r: Region) => r.id === state.regionId) || MOCK_REGIONS[0];

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    return (
        <div className="bg-white p-8 max-w-[210mm] mx-auto text-black font-sans text-xs border border-gray-300 shadow-lg">

            <div className="text-center font-bold text-xl mb-4 uppercase">Shipping Release</div>

            {/* Header Grid */}
            <div className="flex justify-between mb-4">
                <div className="border border-black p-1 w-64 flex">
                    <span className="font-bold mr-2">QUOTE NO.</span>
                    <span>{state.id}</span>
                </div>
                <div className="flex border border-black">
                    <div className="border-r border-black p-1 text-center w-12">
                        <div className="font-bold text-[10px]">DAY</div>
                        <div>{day}</div>
                    </div>
                    <div className="border-r border-black p-1 text-center w-24">
                        <div className="font-bold text-[10px]">MONTH</div>
                        <div>{month}</div>
                    </div>
                    <div className="p-1 text-center w-16">
                        <div className="font-bold text-[10px]">YEAR</div>
                        <div>{year}</div>
                    </div>
                </div>
            </div>

            {/* Manufacturer & Notify Party */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Manufacturer */}
                <div className="border border-black">
                    <div className="bg-gray-100 font-bold text-center border-b border-black p-1">MANUFACTURER</div>
                    <div className="grid grid-cols-[80px_1fr] text-[10px]">
                        <div className="border-b border-black p-1 font-bold">Empresa</div>
                        <div className="border-b border-l border-black p-1">VERDI DESIGN S.A.S</div>

                        <div className="border-b border-black p-1 font-bold">NIT</div>
                        <div className="border-b border-l border-black p-1">900.641.188</div>

                        <div className="border-b border-black p-1 font-bold">Dirección</div>
                        <div className="border-b border-l border-black p-1">Cra 69p #78 - 67, Las Ferias</div>

                        <div className="border-b border-black p-1 font-bold">Ciudad</div>
                        <div className="border-b border-l border-black p-1">Bogota D.C.</div>

                        <div className="border-b border-black p-1 font-bold">País</div>
                        <div className="border-b border-l border-black p-1">Colombia</div>

                        <div className="border-b border-black p-1 font-bold">Teléfono</div>
                        <div className="border-b border-l border-black p-1">(57) 350 8112884</div>

                        <div className="p-1 font-bold">Email</div>
                        <div className="border-l border-black p-1">info@verdi.com.co</div>
                    </div>
                </div>

                {/* Notify Party */}
                <div className="border border-black">
                    <div className="bg-gray-100 font-bold text-center border-b border-black p-1">NOTIFY PARTY CONTACT / BROKER</div>
                    <div className="grid grid-cols-[80px_1fr] text-[10px]">
                        <div className="border-b border-black p-1 font-bold">COMPANY</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="border-b border-black p-1 font-bold">ATTN</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="border-b border-black p-1 font-bold">ADDRESS</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="border-b border-black p-1 font-bold">COUNTRY</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="border-b border-black p-1 font-bold">CITY</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="border-b border-black p-1 font-bold">PHONE</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="p-1 font-bold">EMAIL</div>
                        <div className="border-l border-black p-1 h-6"></div>
                    </div>
                </div>
            </div>

            {/* Sold To & Ship To */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Sold To */}
                <div className="border border-black">
                    <div className="bg-gray-100 font-bold text-center border-b border-black p-1">SOLD TO:</div>
                    <div className="grid grid-cols-[100px_1fr] text-[10px]">
                        <div className="border-b border-black p-1 font-bold">Importer/Business/Private Party Name</div>
                        <div className="border-b border-l border-black p-1 h-10">{state.customerName}</div>

                        <div className="border-b border-black p-1 font-bold">Internal Revenue Service (IRS) number/Social Security Number (SSN)</div>
                        <div className="border-b border-l border-black p-1 h-10"></div>

                        <div className="border-b border-black p-1 font-bold">MAILING ADDRESS</div>
                        <div className="border-b border-l border-black p-1"></div>

                        <div className="border-b border-black p-1 font-bold">COUNTRY</div>
                        <div className="border-b border-l border-black p-1">{region.name}</div>

                        <div className="border-b border-black p-1 font-bold">CITY</div>
                        <div className="border-b border-l border-black p-1"></div>

                        <div className="border-b border-black p-1 font-bold">*State/Province</div>
                        <div className="border-b border-l border-black p-1"></div>

                        <div className="border-b border-black p-1 font-bold">*Phone number</div>
                        <div className="border-b border-l border-black p-1"></div>

                        <div className="p-1 font-bold">*Email address</div>
                        <div className="border-l border-black p-1"></div>
                    </div>
                </div>

                {/* Ship To */}
                <div className="border border-black">
                    <div className="bg-gray-100 font-bold text-center border-b border-black p-1">SHIP TO:</div>
                    <div className="grid grid-cols-[80px_1fr] text-[10px]">
                        <div className="border-b border-black p-1 font-bold">COMPANY</div>
                        <div className="border-b border-l border-black p-1 h-8">{state.customerName}</div>

                        <div className="border-b border-black p-1 font-bold">ATTN</div>
                        <div className="border-b border-l border-black p-1 h-8"></div>

                        <div className="border-b border-black p-1 font-bold">ADDRESS</div>
                        <div className="border-b border-l border-black p-1 h-8"></div>

                        <div className="border-b border-black p-1 font-bold">COUNTRY</div>
                        <div className="border-b border-l border-black p-1 h-6">{region.name}</div>

                        <div className="border-b border-black p-1 font-bold">CITY</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="border-b border-black p-1 font-bold">PHONE</div>
                        <div className="border-b border-l border-black p-1 h-6"></div>

                        <div className="p-1 font-bold">EMAIL</div>
                        <div className="border-l border-black p-1 h-6"></div>

                        <div className="p-1 font-bold border-t border-black">ID</div>
                        <div className="border-l border-t border-black p-1 h-6"></div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="border border-black mb-4">
                <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-center font-bold bg-gray-100 text-[10px] border-b border-black">
                    <div className="p-1 border-r border-black">KIND OF ARTICLE</div>
                    <div className="p-1 border-r border-black">DESCRIPTION</div>
                    <div className="p-1 border-r border-black">QUANTITY</div>
                    <div className="p-1 border-r border-black">PRICE USD</div>
                    <div className="p-1">SUBTOTAL USD</div>
                </div>
                {state.items.map(item => {
                    const sku = MOCK_SKUS.find(s => s.id === item.skuId);
                    if (!sku) return null;
                    return (
                        <div key={item.skuId} className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-[10px] border-b border-black last:border-b-0">
                            <div className="p-1 border-r border-black">{sku.category}</div>
                            <div className="p-1 border-r border-black text-left">
                                <span className="font-bold">{sku.name}</span><br />
                                {sku.material}<br />
                                REF: {sku.id}
                            </div>
                            <div className="p-1 border-r border-black text-center">{item.quantity}</div>
                            <div className="p-1 border-r border-black text-right">${sku.price}</div>
                            <div className="p-1 text-right">${(sku.price * item.quantity)}</div>
                        </div>
                    );
                })}
                {/* Fillers to make it look like the sheet */}
                <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-[10px] border-t border-black">
                    <div className="p-1 border-r border-black h-4"></div>
                    <div className="p-1 border-r border-black h-4 flex justify-end items-center pr-2 font-bold">TOTAL QUANTITY</div>
                    <div className="p-1 border-r border-black h-4 text-center">{state.items.reduce((acc, i) => acc + i.quantity, 0)}</div>
                    <div className="p-1 border-r border-black h-4 font-bold text-right pr-2">SUBTOTAL USD</div>
                    <div className="p-1 text-right">${state.items.reduce((acc, i) => {
                        const sku = MOCK_SKUS.find(s => s.id === i.skuId);
                        return acc + (sku ? sku.price * i.quantity : 0);
                    }, 0)}</div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="border border-black mb-2">
                        <div className="bg-gray-100 font-bold text-center border-b border-black p-1 text-[10px]">Observations & Tracking</div>
                        <div className="p-2 h-20 text-[10px] flex items-center justify-between">
                            <span className="text-gray-400 italic">No special instructions.</span>
                            {/* Shipping QR */}
                            <div className="border border-gray-200 bg-white p-1">
                                <QRCode
                                    value={`SHIPPING-${state.id}`}
                                    size={64}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border border-black flex">
                        <div className="bg-gray-100 font-bold p-1 border-r border-black text-[10px] w-32">Negotiation Term</div>
                        <div className="p-1 flex-1"></div>
                    </div>
                </div>
                <div className="border border-black text-[10px]">
                    <div className="grid grid-cols-[2fr_1fr] border-b border-black">
                        <div className="p-1 border-r border-black font-bold text-right pr-2">INTERNATIONAL FREIGHT</div>
                        <div className="p-1 text-right text-gray-400">0</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr] border-b border-black">
                        <div className="p-1 border-r border-black font-bold text-right pr-2">INSURANCE</div>
                        <div className="p-1 text-right text-gray-400">0</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr]">
                        <div className="p-1 border-r border-black font-bold text-right pr-2">TOTAL INVOICE</div>
                        <div className="p-1 text-right font-bold">${state.items.reduce((acc, i) => {
                            const sku = MOCK_SKUS.find(s => s.id === i.skuId);
                            return acc + (sku ? sku.price * i.quantity : 0);
                        }, 0)}</div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-[10px] text-center font-bold">
                Please note that deliveries are made only to the Ground Floor. We appreciate your understanding and kindly ask that someone be available to receive the package. If you have any questions or need further assistance, please do not hesitate to contact us.
            </div>

            <div className="mt-8 flex justify-between items-center text-[10px] text-gray-500">
                <div>
                    <p>Telefono: (031) 722 6723</p>
                    <p>Celular: (+57) 350 8112884</p>
                </div>
                <div>
                    <p>info@verdi.com.co</p>
                    <p>www.verdi.com.co</p>
                </div>
                <div className="text-right">
                    <p>Carrera 69p #78-67</p>
                    <p>Bogotá, Colombia</p>
                </div>
            </div>

        </div >
    );
};
