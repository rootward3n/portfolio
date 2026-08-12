"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await copyToClipboard(config.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { label: "GitHub", url: config.socials.github, icon: GitHubIcon, show: !!config.socials.github },
    { label: "Instagram", url: config.socials.instagram, icon: InstagramIcon, show: !!config.socials.instagram },
    { label: "LinkedIn", url: config.socials.linkedin, icon: LinkedInIcon, show: !!config.socials.linkedin },
    { label: "Email", url: `mailto:${config.socials.email}`, icon: EmailIcon, show: !!config.socials.email },
  ].filter(s => s.show);

  return (
    <Section id="contact" padding="lg" background="grid" className={styles.contact}>
      <Container size="md">
        <div className={styles.header}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let&apos;s build something together</h2>
          <p className="section-description">
            I&apos;m always open to discussing new projects, collaboration opportunities, or just chatting about tech.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.cardTitle}>Send a Message</h3>
            <form className={styles.form} action="https://formspree.io/f/your-form-id" method="POST">
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="input"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="input"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className={styles.submitBtn}>
                Send Message
              </Button>
              <p className={styles.formNote}>
                Form endpoint not configured. Replace <code>your-form-id</code> in the form action with your Formspree/Netlify Forms ID.
              </p>
            </form>
          </motion.div>

          <motion.div
            className={styles.infoCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={styles.cardTitle}>Direct Contact</h3>
            <div className={styles.contactList}>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <div className={styles.contactIcon} aria-hidden="true">
                    <social.icon />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>{social.label}</span>
                    <span className={styles.contactValue}>
                      {social.label === "Email" ? config.socials.email : social.url.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </motion.a>
              ))}
            </div>

            <div className={styles.emailCopy}>
              <span className={styles.copyLabel}>Quick copy email</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className={styles.copyBtn}
              >
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy Email
                  </>
                )}
              </Button>
            </div>

            <div className={styles.availability}>
              <div className={styles.availabilityDot} aria-hidden="true" />
              <span>{config.profile.status}</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// Social Icons
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}