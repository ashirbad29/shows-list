import { StarFilledIcon, StarIcon } from '../assets/icons';

const StarRatingPicker = (props: {
  value: number | null;
  onChange: (_: number) => void;
  number?: number;
  wrapperClassName?: string;
  label?: string;
  disabled?: boolean;
}) => {
  const {
    value,
    onChange,
    number = 5,
    wrapperClassName,
    label,
    disabled = false,
  } = props;
  const values = Array.from({ length: number }, (_, index) => index + 1);

  return (
    <div className={`${wrapperClassName && wrapperClassName}`}>
      {label && <label className="text-gray-400 block">{label}</label>}
      <div className={`flex items-center space-x-3`}>
        {values.map((num) => {
          const isSelected = value && num <= value;
          return (
            <span
              className={`block p-1 rounded cursor-pointer hover:bg-white hover:bg-opacity-10 transition-colors ${
                disabled && 'cursor-not-allowed'
              }`}
              key={num}
              onClick={() => {
                !disabled && onChange(num);
              }}>
              {isSelected ? (
                <StarFilledIcon className="w-6 h-6 text-yellow-400" />
              ) : (
                <StarIcon className="w-6 h-6 text-gray-500" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRatingPicker;
