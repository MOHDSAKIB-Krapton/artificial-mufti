"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * A reusable, top-level modal component using a React Portal.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to be called when the modal is requested to close.
 * @param {React.ReactNode} props.children - The content to be rendered inside the modal.
 * @returns {React.ReactPortal | null} A React Portal if the component is mounted, otherwise null.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
}: ModalProps): React.ReactPortal | null {
  // State to track if the component is mounted on the client-side.
  // This is necessary because `document` is not available during server-side rendering (SSR) in Next.js.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // You could also create a dedicated root element for the portal here if one doesn't exist.
    // Example:
    // let portalRoot = document.getElementById("modal-root");
    // if (!portalRoot) {
    //   portalRoot = document.createElement("div");
    //   portalRoot.id = "modal-root";
    //   document.body.appendChild(portalRoot);
    // }

    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) {
    return null;
  }

  // Use a React Portal to render the modal into the document body,
  // making it a top-level element in the DOM tree.
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
