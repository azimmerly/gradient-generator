import { Button } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

type CopyButtonProps = {
  copied: boolean;
  onCopy: () => void;
  icon: React.ElementType;
  label: string;
  copiedLabel: string;
};

export const CopyButton = ({
  copied,
  onCopy,
  label,
  copiedLabel,
  icon: Icon,
}: CopyButtonProps) => (
  <Button
    onClick={onCopy}
    disabled={copied}
    className={twMerge(
      "flex flex-1 transform-gpu items-center justify-center gap-1 rounded bg-white p-2.5 text-[13px] font-semibold shadow transition will-change-transform",
      copied
        ? "animate-scale-bounce cursor-default opacity-92"
        : "cursor-pointer hover:opacity-92 active:scale-99",
    )}
  >
    {copied ? (
      <>
        <CheckCircleIcon strokeWidth={2} className="size-4 text-emerald-600" />
        {copiedLabel}
      </>
    ) : (
      <>
        <Icon strokeWidth={2} className="size-4" />
        {label}
      </>
    )}
  </Button>
);
