import logoImage from "@/assets/brush.png";
import { AngleSelect } from "@/components/AngleSelect";
import { ColorPicker } from "@/components/ColorPicker";
import { ColorStops } from "@/components/ColorStops";
import { TypeSelect } from "@/components/TypeSelect";

export const GradientControls = () => (
  <div className="bg-offwhite flex min-h-80 w-full justify-center">
    <div className="flex w-full max-w-7xl flex-col items-center gap-3 p-3">
      <div className="flex gap-1 py-4">
        <img loading="eager" src={logoImage} className="size-8 sm:size-10" />
        <h1 className="font-heading h-14 w-fit bg-clip-text text-2xl font-bold sm:text-4xl">
          Gradient Generator
        </h1>
      </div>
      <div className="flex flex-col gap-7 divide-gray-300 pb-6 sm:h-52 sm:flex-row sm:gap-0 sm:divide-x sm:pb-2">
        <div className="flex flex-col items-center gap-3 sm:gap-5 sm:px-12 sm:pt-6">
          <TypeSelect />
          <AngleSelect />
        </div>
        <div className="flex justify-center sm:px-12 sm:pt-1">
          <ColorStops />
        </div>
        <div className="flex items-center justify-center sm:px-12">
          <ColorPicker />
        </div>
      </div>
    </div>
  </div>
);
