import { HTMLAttributes, forwardRef } from "react";
import styles from "./Section.module.css";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg" | "xl";
  background?: "none" | "elevated" | "grid";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = "", id, children, padding = "lg", background = "none", ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`${styles.section} ${styles[`p-${padding}`]} ${styles[`bg-${background}`]} ${className}`}
        {...props}
      >
        <div className={styles.container}>{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";