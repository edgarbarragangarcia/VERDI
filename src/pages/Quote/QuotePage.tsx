

import { QuoteForm } from './QuoteForm';
import { PricingSummary } from './PricingSummary';
import { motion } from 'framer-motion';

export const QuotePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
        >
            <header className="mb-8">
                <h1 className="font-heading text-3xl text-verdi-dark">Nueva Cotización</h1>
                <p className="text-gray-500 mt-2">Complete la información del cliente y seleccione los items.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <QuoteForm />
                </div>
                <div>
                    <PricingSummary />
                </div>
            </div>
        </motion.div>
    );
};

export default QuotePage;
