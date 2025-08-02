import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

import { useGradientStore } from "@/stores/gradient";

const options = [
  { value: 270, label: "To Left" },
  { value: 90, label: "To Right" },
  { value: 0, label: "To Top" },
  { value: 180, label: "To Bottom" },
  { value: 315, label: "To Top Left" },
  { value: 45, label: "To Top Right" },
  { value: 225, label: "To Bottom Left" },
  { value: 135, label: "To Bottom Right" },
] as const;

export const AngleSelect = () => {
  const [type, angle, setAngle] = useGradientStore(
    useShallow((s) => [s.type, s.angle, s.setAngle]),
  );

  const isDisabled = type === "radial";
  const selectedOption =
    options.find(({ value }) => value === angle) ?? options[0];

  return (
    <Listbox
      as="div"
      disabled={isDisabled}
      value={selectedOption}
      onChange={({ value }) => setAngle(value)}
      className="flex flex-col gap-0.5"
    >
      <Label
        className={twMerge(
          "hidden text-center text-sm lg:inline",
          isDisabled ? "text-gray-400" : "text-gray-500",
        )}
      >
        Gradient Direction
      </Label>
      <div className="relative">
        <ListboxButton
          className={twMerge(
            "group relative w-40 rounded-md py-1.5 pr-10 pl-3 text-left text-sm/6 shadow-xs ring-1 ring-gray-200 ring-inset focus:ring-2 focus:ring-blue-600 focus:outline-hidden",
            isDisabled ? "bg-gray-100 text-gray-400" : "bg-white",
          )}
        >
          <span className="block truncate">{selectedOption.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 text-gray-400 transition ease-out group-data-active:rotate-180"
            />
          </span>
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white p-1 text-sm shadow-lg ring-1 ring-gray-200/70 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0"
        >
          {options.map((option, i) => (
            <ListboxOption
              key={i}
              value={option}
              className="group relative rounded-sm px-2 py-1.5 select-none data-focus:bg-blue-600"
            >
              <span className="block truncate font-normal group-data-focus:text-white group-data-selected:font-semibold">
                {option.label}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="size-4" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
