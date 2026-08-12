"use client";

import type { Metadata } from "next";
import { config } from "@/lib/config";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: `404 - ${config.seo.title}`,
  description: "Page not found",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>Page not found</p>
        <p className={styles.handle}>@rootward3n</p>
        <a href="/" className={styles.link}>
          Return Home
        </a>
      </div>
    </div>
  );
}