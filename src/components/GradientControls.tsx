import logoImage from "@/assets/brush.png";
import { ColorPicker } from "@/components/ColorPicker";
import { ColorStops } from "@/components/ColorStops";
import { DirectionSelect } from "@/components/DirectionSelect";
import { RandomizeButton } from "@/components/RandomizeButton";
import { TypeSelect } from "@/components/TypeSelect";

export const GradientControls = () => (
  <div className="bg-offwhite flex min-h-80 w-full justify-center">
    <div className="flex w-full max-w-7xl flex-col items-center gap-3 p-3">
      <div className="flex gap-1 py-3 lg:py-4">
        <img
          alt="logo"
          src={logoImage}
          className="mt-0.5 size-[34px] lg:mt-0 lg:size-10"
        />
        <h1 className="font-heading h-14 w-fit bg-clip-text text-[26px] font-bold lg:text-4xl">
          Gradient Generator
        </h1>
      </div>
      <div className="flex flex-col gap-7 divide-gray-300 pb-4 lg:h-52 lg:flex-row lg:gap-0 lg:divide-x lg:pb-2">
        <div className="-mt-2 flex flex-col items-center justify-center gap-3 lg:mt-0 lg:gap-4 lg:px-12">
          <TypeSelect />
          <DirectionSelect />
          <RandomizeButton />
        </div>
        <div className="flex justify-center lg:px-12 lg:pt-1">
          <ColorStops />
        </div>
        <div className="flex items-center justify-center lg:px-12">
          <ColorPicker />
        </div>
      </div>
    </div>
  </div>
);
