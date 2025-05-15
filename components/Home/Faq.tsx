'use client'
import React, { useState } from "react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Comment cela fonctionne-t-il?",
    answer:
      "YOu installez l'extension, activez-la dans votre navigateur, et elle vous aide automatiquement avec toutes les questions ou quiz que vous rencontrez.",
  },
  {
    id: 2,
    question: "L'extension fonctionne-t-elle dans différentes langues?",
    answer:
      "Oui, elle prend en charge plusieurs langues. Vous pouvez changer de langue dans les paramètres de l'extension.",
  },
  {
    id: 3,
    question: "Est-ce plus précis que ChatGPT?",
    answer:
      "La précision dépend de votre cas d'utilisation, mais nous utilisons des modèles de langage avancés pour fournir des réponses très précises.",
  },
  {
    id: 4,
    question: "Comment protégeons-nous vos données?",
    answer:
      "Nous utilisons un cryptage de bout en bout et ne stockons jamais vos données personnelles sur nos serveurs. Votre vie privée est notre priorité absolue.",
  },
  {
    id: 5,
    question: "Est-ce à l'abri du plagiat?",
    answer:
      "Oui. Notre outil génère du contenu original et cite correctement les références lorsque nécessaire, ce qui réduit le risque de plagiat.",
  },
  {
    id: 6,
    question: "Quelle est votre politique de remboursement?",
    answer:
      "Nous offrons une garantie de remboursement de 14 jours. Si vous n'êtes pas satisfait, contactez simplement notre support pour un remboursement complet.",
  },
];

const FAQ: React.FC = () => {
  // If you want only one FAQ open at a time, store a single index (or null).
  // If you want multiple open at once, you could store an array of open IDs.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // If the clicked FAQ is already open, close it; otherwise, open it.
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-6">Questions fréquemment posées</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.id} className="border-b border-gray-200">
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left flex justify-between items-center py-4"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {/* Simple chevron icon (rotates when open) */}
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isOpen && (
                <div className="py-2">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
