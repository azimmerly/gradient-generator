import { Button } from "@headlessui/react";
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useGradientStore } from "@/stores/gradient";
import { getGradientString } from "@/utils/getGradientString";

export const GradientPreview = () => {
  const { type, angle, stops } = useGradientStore();
  const [copied, setCopied] = useState(false);
  const gradientCSS = getGradientString({ type, angle, stops });

  const handleCopy = () => {
    setCopied(true);
    copy(`background: ${gradientCSS};`);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      style={{ background: gradientCSS }}
      className="grid min-h-110 w-full flex-1 place-items-center p-2"
    >
      <div className="-mt-8 flex max-w-xl flex-col items-center gap-4 rounded-xl bg-gray-900/40 p-4 shadow backdrop-blur-md lg:-mt-16 lg:gap-7 lg:p-7">
        <pre className="font-code text-[15px] font-medium text-wrap text-shadow-sm lg:text-base">
          <span className="text-rose-300">background: </span>
          <span className="text-white">{gradientCSS};</span>
        </pre>
        <Button
          onClick={handleCopy}
          disabled={copied}
          className={twMerge(
            "flex w-full transform-gpu items-center justify-center gap-1 rounded-md py-2.5 text-[13px] font-semibold shadow transition will-change-transform hover:scale-101 lg:text-sm",
            copied
              ? "animate-scale-bounce cursor-default bg-white/80 text-gray-600"
              : "cursor-pointer bg-white active:scale-99",
          )}
        >
          {copied ? (
            <>
              <CheckCircleIcon strokeWidth={2.5} className="size-4" />
              Copied CSS code!
            </>
          ) : (
            <>
              <DocumentDuplicateIcon strokeWidth={2.1} className="size-4" />
              Copy to clipboard
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
