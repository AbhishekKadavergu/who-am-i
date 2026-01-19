// AnimationWrappers.tsx - Reusable animation components for Phase 3
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  delay = 0,
  className = "",
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

export const CardHover: React.FC<FadeInUpProps> = ({
  children,
  className = "",
}) => (
  <motion.div
    className={className}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const ScaleOnHover: React.FC<FadeInUpProps> = ({
  children,
  className = "",
}) => (
  <motion.div
    className={className}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const StaggerContainer: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    {children}
  </motion.div>
);
