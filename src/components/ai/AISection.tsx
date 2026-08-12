"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { config } from "@/lib/config";
import styles from "./AISection.module.css";

// Icon components
function GenerativeAIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ComputerVisionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path d="M1 1l2 2m25.07-25.07l-2 2" />
    </svg>
  );
}

function AISafetyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

const AI_ICONS: Record<string, React.ComponentType> = {
  "Generative AI": GenerativeAIIcon,
  "Computer Vision": ComputerVisionIcon,
  "AI Safety & Alignment": AISafetyIcon,
};

export function AISection() {
  return (
    <Section id="ai" padding="lg" background="grid" className={styles.ai}>
      <Container size="lg">
        <div className={styles.header}>
          <span className="section-label">Artificial Intelligence</span>
          <h2 className="section-title">Exploring the architecture of intelligence</h2>
          <p className="section-description">
            From neural network design to generative models, I&apos;m fascinated by how machines learn, reason, and create.
          </p>
        </div>

        <div className={styles.interestsGrid}>
          {config.interests.ai.map((interest, i) => {
            const IconComponent = AI_ICONS[interest] || DefaultIcon;
            return (
              <motion.div
                key={interest}
                className={styles.interestCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={styles.interestIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <IconComponent />
                  </svg>
                </div>
                <h3 className={styles.interestTitle}>{interest}</h3>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}