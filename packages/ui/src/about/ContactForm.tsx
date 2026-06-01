"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-panel p-8 text-center">
        <span className="material-symbols-outlined text-primary text-4xl mb-4">check_circle</span>
        <p className="font-headline-lg text-xl text-on-surface mb-2">Request received</p>
        <p className="section-body">
          Our team will respond to your enquiry shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 space-y-6">
      <div>
        <label htmlFor="name" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y min-h-[120px]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-on-primary font-label-md uppercase tracking-widest py-4 luxury-button"
      >
        Send request
      </button>
    </form>
  );
}
