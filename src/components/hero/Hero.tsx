"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntersectionObserver } from "@/hooks/useScroll";
import { config } from "@/lib/config";
import styles from "./Hero.module.css";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [heroRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={heroRef} id="home" className={styles.hero} aria-labelledby="hero-title">
      <HeroVisual reducedMotion={reducedMotion} isMobile={false} />
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} aria-hidden="true" />
          <span>IT Student · AI & Cybersecurity Enthusiast</span>
       </div>
        <h1 id="hero-title" className={styles.username}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {config.profile.username}
         </motion.span>
       </h1>
        <motion.p
          className={styles.realName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {config.profile.name}
       </motion.p>
        <motion.p
          className={styles.role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {config.profile.role}
       </motion.p>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {config.profile.tagline}
      </motion.p>
        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Button size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Projects
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get In Touch
          </Button>
        </motion.div>
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          aria-hidden="true"
        >
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine} />
        </motion.div>
      </div>
    </section>
  );
}