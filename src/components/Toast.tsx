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

  const bgColor = {
    success: "bg-green-500 dark:bg-green-600",
    error: "bg-red-500 dark:bg-red-600",
    info: "bg-blue-500 dark:bg-blue-600",
  }[type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  }[type];

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{ zIndex: UI_CONSTANTS.TOAST_Z_INDEX }}
      role="alert"
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
