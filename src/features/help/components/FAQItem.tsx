import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="rounded-md border-2 border-[#172117] bg-white shadow-neo-sm overflow-hidden mb-3 font-serif">
      <button
        type="button"
        id={`faq-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between gap-3 font-black text-sm sm:text-base text-[#172117] hover:bg-[#FAFDF9] transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#172117] transition-transform shrink-0 ${
            isOpen ? 'rotate-180 text-[#2E7D32]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={`faq-panel-${id}`}
          role="region"
          aria-labelledby={`faq-btn-${id}`}
          className="p-4 pt-0 text-xs sm:text-sm text-[#496274] leading-relaxed border-t-2 border-[#172117] bg-[#FAFDF9] animate-fadeIn font-medium"
        >
          <p className="pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
