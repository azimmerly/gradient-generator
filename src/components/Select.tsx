import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

type GradientSelectProps<T> = {
  label: string;
  options: readonly {
    value: T;
    label: string;
    icon: React.ElementType;
  }[];
  value: T;
  onChange: (value: T) => void;
};

export const Select = <T,>({
  label,
  options,
  value,
  onChange,
}: GradientSelectProps<T>) => {
  const selectedOption = options.find((o) => o.value === value) ?? options[0];
  const { icon: SelectedOptionIcon, label: selectedOptionLabel } =
    selectedOption;

  return (
    <Listbox
      as="div"
      value={value}
      onChange={onChange}
      className="flex flex-col gap-0.5"
    >
      <Label className="hidden text-center text-sm text-mist-500 lg:inline">
        {label}
      </Label>
      <div className="relative">
        <ListboxButton className="group relative w-45 rounded-md bg-white py-1.5 pr-10 pl-3 text-left text-sm/6 shadow-xs ring-1 ring-mist-200 ring-inset">
          <div className="flex items-center gap-1.5">
            <SelectedOptionIcon className="size-4 text-mist-400" />
            <span className="block truncate">{selectedOptionLabel}</span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 text-mist-400 transition ease-out group-data-active:rotate-180"
            />
          </span>
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white p-1 text-sm shadow-lg ring-1 ring-mist-200/70 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0"
        >
          {options.map(({ value, label, icon: Icon }) => (
            <ListboxOption
              key={label}
              value={value}
              className="group relative flex items-center gap-1.5 rounded-md px-2 py-1.5 select-none data-focus:bg-blue-600"
            >
              <Icon className="size-4 text-mist-400 group-data-focus:text-white" />
              <span className="block truncate font-normal group-data-focus:text-white group-data-selected:font-semibold">
                {label}
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
