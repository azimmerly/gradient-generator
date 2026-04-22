import { DocumentDuplicateIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useShallow } from "zustand/shallow";

import { CopyButton } from "@/components/CopyButton";
import { useGradientStore } from "@/stores/gradient";
import { getGradientString } from "@/utils/getGradientString";
import { useCopy } from "@/utils/useCopy";

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
      className="grid min-h-110 w-full flex-1 place-items-center p-2.5"
    >
      <div className="-mt-8 flex max-w-lg flex-col items-center gap-4 rounded-lg bg-mist-950/40 p-4.5 shadow backdrop-blur-md lg:-mt-16 lg:gap-6 lg:p-6">
        <pre className="font-code text-[15px] text-wrap text-shadow-xs lg:text-base">
          <span className="text-orange-200">background: </span>
          <span className="text-white">{gradientCSS};</span>
        </pre>
        <div className="flex w-full gap-1.5 sm:gap-2">
          <CopyButton
            label="Copy CSS"
            copiedLabel="CSS Copied!"
            onCopy={() => copyCss(() => `background: ${gradientCSS};`)}
            copied={copiedCss}
            icon={DocumentDuplicateIcon}
          />
          <CopyButton
            label="Copy URL"
            copiedLabel="URL Copied!"
            onCopy={() => copyUrl(() => window.location.href)}
            copied={copiedUrl}
            icon={LinkIcon}
          />
        </div>
      </div>
    </div>
  );
};
