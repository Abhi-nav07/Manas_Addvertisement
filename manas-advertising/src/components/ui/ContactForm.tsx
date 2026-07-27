"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { MagneticHover } from "@/components/ui/MagneticHover";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-black/5 bg-white p-8 shadow-2xl shadow-black/5"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative group">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder=" "
                  className="peer w-full rounded-xl border-2 border-black/5 bg-neutral-50 px-4 pb-2 pt-6 text-sm font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[var(--color-primary)]"
                >
                  Name
                </label>
              </div>
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  className="peer w-full rounded-xl border-2 border-black/5 bg-neutral-50 px-4 pb-2 pt-6 text-sm font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[var(--color-primary)]"
                >
                  Email
                </label>
              </div>
            </div>
            
            <div className="relative group">
              <input
                id="company"
                name="company"
                type="text"
                placeholder=" "
                className="peer w-full rounded-xl border-2 border-black/5 bg-neutral-50 px-4 pb-2 pt-6 text-sm font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1"
              />
              <label 
                htmlFor="company" 
                className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[var(--color-primary)]"
              >
                Company (Optional)
              </label>
            </div>
            
            <div className="relative group">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder=" "
                className="peer w-full resize-none rounded-xl border-2 border-black/5 bg-neutral-50 px-4 pb-2 pt-6 text-sm font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1"
              />
              <label 
                htmlFor="message" 
                className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[var(--color-primary)]"
              >
                Project Details
              </label>
            </div>

            <MagneticHover strength={5}>
              <Button type="submit" variant="secondary" className="group w-full sm:w-auto relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </MagneticHover>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            className="flex flex-col items-center justify-center rounded-3xl border border-black/5 bg-white p-12 text-center shadow-2xl shadow-black/5"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500 ring-8 ring-green-50/50">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[var(--color-primary)]">
              We&apos;ve received your message
            </h3>
            <p className="mt-4 max-w-sm text-base text-neutral-500">
              This is a demo confirmation. In a real environment, we would be reaching out to you shortly!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
