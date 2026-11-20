import { DocumentDuplicateIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useShallow } from "zustand/shallow";

import { CopyButton } from "@/components/CopyButton";
import { useGradientStore } from "@/stores/gradient";
import { getGradientString } from "@/utils/getGradientString";
import { tokenizeGradient } from "@/utils/tokenizeGradient";
import { useCopy } from "@/utils/useCopy";

// Catppuccin Latte
const TOKEN_COLORS = {
  property: "text-[#1e66f5]",
  function: "text-[#40a02b]",
  direction: "text-[#d20f39]",
  value: "text-[#8839ef]",
  punctuation: "text-[#4c4f69]",
  text: "text-[#4c4f69]",
} as const;

export const GradientPreview = () => {
  const { copied: copiedCss, copy: copyCss } = useCopy();
  const { copied: copiedUrl, copy: copyUrl } = useCopy();
  const { type, directionAngle, radialPosition, stops } = useGradientStore(
    useShallow(({ type, directionAngle, radialPosition, stops }) => ({
      type,
      directionAngle,
      radialPosition,
      stops,
    })),
  );

  const gradientCSS = getGradientString({
    type,
    stops,
    directionAngle,
    radialPosition,
  });

  return (
    <div
      style={{ background: gradientCSS }}
      className="grid min-h-110 w-full flex-1 place-items-center p-4"
    >
      <div className="-mt-8 flex max-w-xl flex-col items-center gap-6 rounded-2xl bg-white p-4.5 shadow-lg ring-1 ring-mist-200 lg:-mt-16 lg:gap-6 lg:p-8">
        <pre className="font-code w-full rounded-lg bg-[#eff1f5] px-4 py-3 text-[15px] text-wrap ring-1 ring-[#dce0e8] ring-inset lg:text-base">
          <span className={TOKEN_COLORS.property}>background</span>
          <span className={TOKEN_COLORS.punctuation}>: </span>
          {tokenizeGradient(gradientCSS).map(({ type, text }, i) => (
            <span key={i} className={TOKEN_COLORS[type]}>
              {text}
            </span>
          ))}
          <span className={TOKEN_COLORS.punctuation}>;</span>
        </pre>
        <div className="flex w-full justify-end gap-2">
          <CopyButton
            label="Copy CSS"
            onCopy={() => copyCss(() => `background: ${gradientCSS};`)}
            copied={copiedCss}
            icon={DocumentDuplicateIcon}
          />
          <CopyButton
            label="Copy URL"
            onCopy={() => copyUrl(() => window.location.href)}
            copied={copiedUrl}
            icon={LinkIcon}
          />
        </div>
      </div>
    </div>
  );
};
