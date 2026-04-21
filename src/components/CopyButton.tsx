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
  icon: Icon,
  label,
  copiedLabel,
}: CopyButtonProps) => (
  <Button
    onClick={onCopy}
    disabled={copied}
    className={twMerge(
      "flex flex-1 transform-gpu items-center justify-center gap-1 rounded-md bg-white px-6 py-2.5 text-[13px] font-semibold shadow transition will-change-transform lg:py-3 lg:text-sm",
      copied
        ? "animate-scale-bounce cursor-default opacity-92"
        : "cursor-pointer hover:opacity-92 active:scale-99",
    )}
  >
    {copied ? (
      <>
        <CheckCircleIcon
          strokeWidth={2.5}
          className="size-4.25 text-emerald-500"
        />
        {copiedLabel}
      </>
    ) : (
      <>
        <Icon strokeWidth={2.1} className="size-4.25" />
        {label}
      </>
    )}
  </Button>
);
