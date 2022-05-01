import { useState } from 'react';

import { TriangleDownIcon } from '../assets/icons';

type Option = { id: string; label: string };

type SelectInputProps = {
  text: string;
  options: Array<Option>;
  label: string;
  hideLabel?: boolean;
  wrapperClassName?: string;
  className?: string;
  onChangeValue?: (_val: string) => void;
  disabled?: boolean;
};

const SelectInput = (props: SelectInputProps) => {
  const {
    text,
    hideLabel,
    className,
    options,
    label,
    wrapperClassName,
    onChangeValue,
    disabled,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (optionId: string) => {
    onChangeValue && onChangeValue(optionId);
    setIsOpen(false);
  };

  return (
    <div className={`${wrapperClassName && wrapperClassName}`}>
      <label className={hideLabel ? 'sr-only' : 'block font-medium text-gray-400'}>
        {label}
      </label>
      <div className="mt-1 relative">
        <button
          disabled={disabled}
          onClick={() => setIsOpen((open) => !open)}
          className={`flex w-full items-center px-3 py-2 bg-gray-900 focus:outline-none focus:border-blue-500/40 transition-all rounded-md disabled:cursor-not-allowed disabled:opacity-50 ${
            className && className
          }`}>
          <span className="flex-1 font-medium truncate block text-left text-gray-400">
            {text}
          </span>
          <TriangleDownIcon className="h-6 w-6 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-20 shadow-lg w-full mt-1 bg-gray-900 rounded-md overflow-auto max-h-60 text-gray-400">
            {options.map((option) => (
              <div
                key={option.id}
                className="px-3 py-2 text-base hover:cursor-pointer hover:bg-gray-800 transition-all leading-4"
                onClick={() => handleChange(option.id)}>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
