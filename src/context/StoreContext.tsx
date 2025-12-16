import { createContext, useContext, useReducer, type ReactNode, useEffect } from 'react';
import { type OrderState, INITIAL_ORDER_STATE } from '../mocks/data';

type Action =
    | { type: 'SET_CUSTOMER'; payload: string }
    | { type: 'SET_REGION'; payload: string }
    | { type: 'ADD_ITEM'; payload: { skuId: string; quantity: number } }
    | { type: 'UPDATE_ITEM_QUANTITY'; payload: { skuId: string; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: string } // skuId
    | { type: 'SET_DISCOUNT'; payload: number }
    | { type: 'APPROVE_ORDER' }
    | { type: 'SEND_QUOTE_TO_CLIENT' }
    | { type: 'REJECT_ORDER' }
    | { type: 'MARK_ITEM_TERMINATED'; payload: string } // skuId
    | { type: 'MARK_PAID' };

const StoreContext = createContext<{
    state: OrderState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function storeReducer(state: OrderState, action: Action): OrderState {
    switch (action.type) {
        case 'SET_CUSTOMER':
            return { ...state, customerName: action.payload };
        case 'SET_REGION':
            return { ...state, regionId: action.payload };
        case 'ADD_ITEM': {

            const existing = state.items.find(i => i.skuId === action.payload.skuId);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.skuId === action.payload.skuId
                            ? { ...i, quantity: i.quantity + action.payload.quantity }
                            : i
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, action.payload],
                itemsStatus: { ...state.itemsStatus, [action.payload.skuId]: 'Pendiente' }
            };
        }
        case 'UPDATE_ITEM_QUANTITY':
            return {
                ...state,
                items: state.items.map(i =>
                    i.skuId === action.payload.skuId
                        ? { ...i, quantity: action.payload.quantity }
                        : i
                )
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i.skuId !== action.payload)
            };
        case 'SET_DISCOUNT':
            return { ...state, discount: action.payload };
        case 'APPROVE_ORDER':
            return { ...state, status: 'Aprobada' };
        case 'SEND_QUOTE_TO_CLIENT':
            return { ...state, status: 'PendienteCliente' };
        case 'REJECT_ORDER':
            return { ...state, status: 'Rechazada' };
        case 'MARK_ITEM_TERMINATED':
            return {
                ...state,
                itemsStatus: { ...state.itemsStatus, [action.payload]: 'Terminado' }
            };
        case 'MARK_PAID':
            return { ...state, paymentStatus: 'Pagado' };
        default:
            return state;
    }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, INITIAL_ORDER_STATE, (initial) => {
        const persisted = localStorage.getItem('verdi_store');
        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        localStorage.setItem('verdi_store', JSON.stringify(state));
    }, [state]);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
