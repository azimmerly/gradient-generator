import { useRef, useState } from "react";

const COPIED_RESET_MS = 800;

export const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async (getText: () => string) => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  return { copy, copied };
};
