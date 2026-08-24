import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimatedPageProps = {
  children: ReactNode;
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <div className="animated-page relative flex flex-col overflow-hidden">
      <div className="video-backdrop" aria-hidden="true">
        <video autoPlay muted loop playsInline poster="/src/assets/classroom-session.jpeg">
          <source
            src="https://cdn.coverr.co/videos/coverr-students-in-a-classroom-6690/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-backdrop__motion" />
        <div className="video-backdrop__overlay" />
      </div>
      {children}
    </div>
  );
}

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  return (
    <motion.section
      className={`animated-section ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
