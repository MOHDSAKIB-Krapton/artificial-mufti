"use client";

import { motion } from "motion/react";

export default function AboutVisionSection() {
  return (
    <section className="bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-[var(--font-serif)] text-foreground mb-6">
              Our Vision
            </h2>
            <p className="text-lg font-sans text-foreground/80 leading-relaxed">
              Bridging the gap between ancient wisdom and modern technology.
              Artificial Mufti makes Islamic guidance accessible to everyone,
              everywhere, with respect, humor, and authenticity.
            </p>

            {/* Islamic geometric pattern */}
            <div className="mt-8 flex justify-start">
              <div className="w-16 h-16 relative">
                <motion.div
                  initial={{ rotate: -45 }}
                  whileInView={{ rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="absolute w-full h-full border-2 border-primary/30 rounded-full"
                />
                <motion.div
                  initial={{ rotate: 45 }}
                  whileInView={{ rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute inset-1 border border-primary/20 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-2xl p-8 lg:p-10 shadow-sm">
              <h3 className="text-2xl lg:text-3xl font-bold font-[var(--font-serif)] text-foreground mb-4">
                Why AI + Islam?
              </h3>
              <p className="text-base font-sans text-foreground/80 leading-relaxed">
                In a world of information overload, we provide reliable,
                source-backed Islamic guidance without the intimidation factor.
                Think of us as your friendly neighborhood scholar who never
                sleeps and always has time for your questions.
              </p>

              {/* Decorative Islamic border accent */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-2xl" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/20 rounded-bl-lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
