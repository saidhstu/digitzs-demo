
// File: components/checkout/OrderSummarySection.tsx
import React from 'react';
import BenefitsSection from './BenefitsSection';
import OrderSummary from './OrderSummary';

const OrderSummarySection: React.FC = () => {
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold">Vérifiez le résumé de votre commande</h2>
      
      <OrderSummary />
      
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-medium">24/7</p>
            <p className="text-sm text-gray-500">Support</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Satisfaction</p>
            <p className="text-sm text-gray-500">Garantie</p>
          </div>
        </div>
      </div>
      
      <BenefitsSection />
      
      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Paiement sécurisé alimenté par
        <span className="ml-1 font-semibold">stripe</span>
      </div>
    </div>
  );
};

export default OrderSummarySection;