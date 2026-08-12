"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { config } from "@/lib/config";
import styles from "./DevelopmentSection.module.css";

// Icon components
function FullStackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function RealTimeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function DevToolingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function CleanArchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function DefaultDevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const DEV_ICONS: Record<string, React.ComponentType> = {
  "Full-Stack Web Development": FullStackIcon,
  "Real-time Systems": RealTimeIcon,
  "Developer Tooling": DevToolingIcon,
  "Clean Architecture": CleanArchIcon,
};

export function DevelopmentSection() {
  return (
    <Section id="development" padding="lg" background="grid" className={styles.development}>
      <Container size="lg">
        <div className={styles.header}>
          <span className="section-label">Software Development</span>
          <h2 className="section-title">Clean code, scalable systems</h2>
          <p className="section-description">
            I believe in writing code that&apos;s not just functional, but maintainable, performant, and a joy to work with.
          </p>
        </div>

        <div className={styles.paradigmsGrid}>
          {config.interests.development.slice(0, 4).map((paradigm, i) => {
            const IconComponent = DEV_ICONS[paradigm] || DefaultDevIcon;
            return (
              <motion.div
                key={paradigm}
                className={styles.paradigmCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={styles.paradigmIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <IconComponent />
                  </svg>
                </div>
                <h3 className={styles.paradigmTitle}>{paradigm}</h3>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={styles.principlesSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className={styles.principlesTitle}>Engineering Principles</h3>
          <div className={styles.principlesGrid}>
            {[
              { title: "Type Safety First", desc: "TypeScript everywhere. Catch bugs at compile time, not runtime." },
              { title: "Clean Architecture", desc: "Separation of concerns. Dependency inversion. Testable code." },
              { title: "Performance Conscious", desc: "Measure before optimizing. Bundle size matters. Core Web Vitals." },
              { title: "Developer Experience", desc: "Great tooling, clear docs, fast feedback loops. Happy developers ship better code." },
            ].map((principle, i) => (
              <motion.div
                key={principle.title}
                className={styles.principleCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              >
                <h4 className={styles.principleTitle}>{principle.title}</h4>
                <p className={styles.principleDesc}>{principle.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}