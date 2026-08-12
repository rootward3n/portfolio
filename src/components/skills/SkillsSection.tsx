"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { config } from "@/lib/config";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  return (
    <Section id="skills" padding="lg" background="elevated" className={styles.skills}>
      <Container size="lg">
        <div className={styles.header}>
          <span className="section-label">Skills & Proficiency</span>
          <h2 className="section-title">Technical capabilities across domains</h2>
          <p className="section-description">
            Self-assessed proficiency levels based on project experience, coursework, and continuous learning.
          </p>
        </div>

        <div className={styles.skillsGrid}>
          {config.topSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={styles.skillCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              <div className={styles.skillBar}>
                <div
                  className={styles.skillProgress}
                  style={{ width: `${skill.level}%` }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency: ${skill.level}%`}
                />
              </div>
              <span className={styles.skillDomain}>{skill.domain}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}