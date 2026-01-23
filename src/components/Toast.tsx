import React, { useEffect, useState } from "react";
import { UI_CONSTANTS } from "../constants/ui";

export type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
};

/**
 * Toast notification component for contact form feedback.
 * Auto-closes after duration and slides out gracefully.
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = UI_CONSTANTS.TOAST_DURATION_MS,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const tone = {
    success: "border-[var(--brand-orange)]",
    error: "border-red-500",
    info: "border-white/20",
  }[type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  }[type];

  return (
    <div
      className={`
    fixed bottom-6 right-6
    max-w-sm
    bg-black
    border ${tone}
    text-white
    px-4 py-3
    rounded-lg
    shadow-[0_0_20px_rgba(255,165,0,0.25)]
    flex items-center gap-3
    transition-all duration-300
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
  `}
      style={{ zIndex: UI_CONSTANTS.TOAST_Z_INDEX }}
    >
      <span className="font-bold text-lg">{icon}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white hover:opacity-75 transition-opacity"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
