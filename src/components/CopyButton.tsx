import { Button } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type CopyButtonProps = {
  copied: boolean;
  onCopy: () => void;
  icon: React.ElementType;
  label: string;
};

export const CopyButton = ({
  copied,
  onCopy,
  label,
  icon: Icon,
}: CopyButtonProps) => (
  <Button
    onClick={onCopy}
    disabled={copied}
    className={twMerge(
      "flex h-9 w-36 transform-gpu items-center justify-center gap-1.5 rounded-lg bg-white text-sm font-semibold shadow-xs ring-1 ring-mist-200 transition will-change-transform ring-inset",
      copied
        ? "animate-scale-bounce cursor-default text-emerald-600"
        : "cursor-pointer hover:opacity-92 active:scale-99",
    )}
  >
    <Icon strokeWidth={2} className="size-4" />
    {label}
  </Button>
);
