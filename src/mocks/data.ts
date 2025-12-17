
export interface SKU {
    id: string;
    name: string;
    category: 'Moda' | 'Home';
    price: number; // Precio de Venta
    cost: number;  // Costo de Producción
    material: string;
    image: string;
}

export interface Region {
    id: string;
    name: string;
    currency: 'COP' | 'USD' | 'MXN';
    taxRate: number; // 0.19 for 19%
    shippingCost: number; // Flat simulated rate
}

export const MOCK_SKUS: SKU[] = [
    // MODA
    {
        id: 'M001',
        name: 'MOCHILA WAYUU CLÁSICA',
        category: 'Moda',
        price: 450000,
        cost: 150000,
        material: 'Hilo de Algodón',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'M002',
        name: 'SOBRE DE FIBRAS METALIZADAS',
        category: 'Moda',
        price: 320000,
        cost: 90000,
        material: 'Fique + Cobre',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
    },
    // HOME
    {
        id: 'H001',
        name: 'ALFOMBRA FIQUE TEJIDO',
        category: 'Home',
        price: 1200000,
        cost: 400000,
        material: 'Fique Natural',
        image: 'https://images.unsplash.com/photo-1596200219609-b63cf4c7cae5?auto=format&fit=crop&q=80&w=800'
    }
];

export const MOCK_REGIONS: Region[] = [
    { id: 'COL', name: 'Colombia', currency: 'COP', taxRate: 0.19, shippingCost: 20000 },
    { id: 'MEX', name: 'México', currency: 'MXN', taxRate: 0.16, shippingCost: 1500 }, // Converted roughly or keep in USD/Local
    { id: 'USA', name: 'USA', currency: 'USD', taxRate: 0.00, shippingCost: 50 },
    { id: 'ME', name: 'Medio Oriente', currency: 'USD', taxRate: 0.05, shippingCost: 120 },
];

export interface OrderState {
    id: string;
    customerName: string;
    regionId: string;
    items: OrderItem[];
    status: 'Borrador' | 'Pendiente' | 'PendienteCliente' | 'Aprobada' | 'Rechazada';
    paymentStatus: 'Pendiente' | 'Parcial' | 'Pagado';
    itemsStatus: Record<string, 'Pendiente' | 'Terminado'>; // Keyed by skuId for simplicity in mock
    discount: number; // Percentage 0-1
}

export interface CustomRugDetails {
    weave: string;
    combination: string;
    border: string;
    cut: string;
    code: string;
    dimensions: {
        widthFt: number;
        widthIn: number;
        lengthFt: number;
        lengthIn: number;
        totalSqFt: number;
        totalSqMts: number;
    };
    unitPrice: number;
}

export interface OrderItem {
    skuId: string;
    quantity: number;
    // Optional overrides/customizations
    name?: string;
    price?: number;
    category?: 'Moda' | 'Home';
    customDetails?: CustomRugDetails;
}

export const INITIAL_ORDER_STATE: OrderState = {
    id: 'ORD-2024-001',
    customerName: '',
    regionId: 'COL',
    items: [],
    status: 'Borrador',
    paymentStatus: 'Pendiente',
    itemsStatus: {},
    discount: 0
};
