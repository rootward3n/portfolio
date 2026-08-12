"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { config } from "@/lib/config";
import styles from "./CybersecuritySection.module.css";

export function CybersecuritySection() {
  return (
    <Section id="cybersecurity" padding="lg" background="elevated" className={styles.cybersecurity}>
      <Container size="lg">
        <div className={styles.header}>
          <span className="section-label">Cybersecurity</span>
          <h2 className="section-title">Securing systems, understanding threats</h2>
          <p className="section-description">
            Security isn&apos;t a feature—it&apos;s a mindset. I explore offensive and defensive techniques to build resilient systems.
          </p>
        </div>

        <div className={styles.focusGrid}>
          {config.interests.cybersecurity.slice(0, 3).map((focus, i) => (
            <motion.div
              key={focus}
              className={styles.focusCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className={styles.focusNumber}>0{String(i + 1).padStart(2, "0")}</div>
              <h3 className={styles.focusTitle}>{focus}</h3>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}