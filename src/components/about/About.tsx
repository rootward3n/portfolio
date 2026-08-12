"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import styles from "./About.module.css";

export function About() {
  return (
    <Section id="about" padding="lg" background="elevated" className={styles.about}>
      <Container size="lg">
        <div className={styles.header}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">Building at the intersection of intelligence and security</h2>
          <p className="section-description">
            I&apos;m an IT student driven by curiosity about how intelligent systems can be both powerful and secure.
            My journey spans neural architectures, threat landscapes, and clean software craftsmanship.
          </p>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={cn(styles.card, styles.bioCard)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.cardTitle}>Background</h3>
            <p className={styles.cardText}>{config.profile.bio}</p>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{config.profile.location}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>{config.profile.status}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={cn(styles.card, styles.focusCard)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={styles.cardTitle}>Current Focus</h3>
            <div className={styles.focusList}>
              {[
                "Deep Learning & Neural Architecture Design",
                "Web Application Security & Penetration Testing",
                "Full-Stack Development with TypeScript & Python",
                "Open Source Contribution & Developer Tooling",
              ].map((focus, i) => (
                <motion.div
                  key={focus}
                  className={styles.focusItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <span className={styles.focusDot} aria-hidden="true" />
                  <span>{focus}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={cn(styles.dot, styles.dotClose)} />
              <span className={cn(styles.dot, styles.dotMin)} />
              <span className={cn(styles.dot, styles.dotMax)} />
            </div>
            <span className={styles.terminalTitle}>about.sh</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}> whoami</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.output}>@rootward3n — IT Student | AI & Security Researcher</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}> ls interests/</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.output}>[ai] [security] [dev]</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}