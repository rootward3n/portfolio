import { HTMLAttributes, forwardRef } from "react";
import styles from "./Container.module.css";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", size = "lg", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.container} ${styles[size]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";