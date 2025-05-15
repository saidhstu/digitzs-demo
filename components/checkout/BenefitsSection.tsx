'use client'
// File: components/checkout/BenefitsSection.tsx
import React from 'react';

const BenefitsSection: React.FC = () => {
  return (
    <div className="space-y-4 border-t border-gray-200 pt-6">
      <div className="flex items-center">
        <div className="mr-3 flex -space-x-2">
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-200"></div>
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-200"></div>
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-200"></div>
        </div>
        <p className="text-sm">
          <span className="font-semibold">530K+</span> Students <span className="font-semibold">love</span> Etudify
        </p>
      </div>
      
      {/* Benefit Items */}
      <BenefitItem 
        icon={<CheckIcon />}
        text={<><span className="font-semibold">84%</span> des étudiants <span className="font-semibold">obtiennent un A</span> en une semaine</>}
      />
      
      <BenefitItem 
        icon={<ClockIcon />}
        text={<><span className="font-semibold">Réduisez</span> votre temps d&apos;étude de <span className="font-semibold">9 heures</span> par semaine</>}
      />
      
      <BenefitItem 
        icon={<CodeIcon />}
        text={<><span className="font-semibold">Augmentez votre concentration de 30%</span> par rapport aux autres étudiants</>}
      />
      
      <BenefitItem 
        icon={<ChartIcon />}
        text={<><span className="font-semibold">Augmentez votre productivité de 40%</span></>}
      />
    </div>
  );
};

// Benefit Item Component
interface BenefitItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center">
      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
        {icon}
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

// Icon Components
const CheckIcon: React.FC = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const CodeIcon: React.FC = () => (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
  
  const ChartIcon: React.FC = () => (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
    </svg>
  );

  export default BenefitsSection;