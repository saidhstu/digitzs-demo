// File: components/checkout/OrderSummary.tsx
'use client'
import { usePayment } from '@/lib/contexts/PaymentContext';
import React from 'react';

const OrderSummary: React.FC = () => {
    const {  selectedPlan } = usePayment();
  return (
    <>
      <div className="mb-4">
        <h3 className="text-sm text-gray-500">Plan</h3>
        <div className="mt-2 flex justify-between">
          <div>
            <span className="font-medium">{selectedPlan?.name} </span>
            <span className="text-blue-600">{selectedPlan?.trialText}</span>
          </div>
          <span className="font-medium">€0.99</span>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="font-medium">Total à payer aujourd&apos;hui:</span>
          <span className="font-medium">€0.99</span>
        </div>
      </div>
      
      <div className="mb-6 rounded-md bg-gray-50 p-4 text-sm text-gray-600">
        <p>
         {selectedPlan?.description}
        </p>
      </div>
    </>
  );
};

export default OrderSummary;
