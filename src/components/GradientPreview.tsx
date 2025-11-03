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
      className="grid min-h-110 w-full flex-1 place-items-center p-2.5"
    >
      <div className="-mt-8 flex max-w-lg flex-col items-center gap-4 rounded-xl bg-gray-950/40 p-4.5 shadow backdrop-blur-md lg:-mt-16 lg:gap-7 lg:p-7">
        <pre className="font-code text-[15px] font-medium text-wrap text-shadow-xs lg:text-base">
          <span className="text-orange-200">background: </span>
          <span className="text-white">{gradientCSS};</span>
        </pre>
        <Button
          onClick={handleCopy}
          disabled={copied}
          className={twMerge(
            "flex w-full transform-gpu items-center justify-center gap-1 rounded-md bg-white px-6 py-2.5 text-[13px] font-semibold shadow transition will-change-transform lg:py-3 lg:text-sm",
            copied
              ? "animate-scale-bounce cursor-default opacity-92"
              : "cursor-pointer hover:opacity-92 active:scale-99",
          )}
        >
          {copied ? (
            <>
              <CheckCircleIcon
                strokeWidth={2.5}
                className="size-[17px] text-emerald-500"
              />
              Copied CSS code!
            </>
          ) : (
            <>
              <DocumentDuplicateIcon
                strokeWidth={2.1}
                className="size-[17px]"
              />
              Copy to clipboard
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
