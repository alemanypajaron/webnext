'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQ({ items, title = 'Preguntas Frecuentes', subtitle }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-heading font-bold text-primary mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div key={index} className="rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-start justify-between gap-6 bg-accent hover:bg-accent-dark transition-colors"
              >
                <span className="text-lg font-semibold text-primary leading-relaxed pt-1">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`flex-shrink-0 text-primary transition-transform mt-1.5 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-8 py-6 bg-white">
                  <p className="text-gray-700 leading-relaxed text-base">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

