"use client";

import { useState, type ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`glass-panel overflow-hidden transition-colors duration-300 ${
              isOpen ? "border-primary/30" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-headline-lg text-lg text-on-surface pr-4">{item.question}</span>
              <span
                className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>
            {isOpen && (
              <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-2 section-body leading-relaxed border-t border-outline-variant/20 pt-6">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
