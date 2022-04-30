import { useEffect, useRef } from 'react';

import { SearchIcon } from '../assets/icons';

type SearchInputType = {
  onValueChange: (_val: string) => void;
};

const SearchInput = ({ onValueChange }: SearchInputType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className="relative flex items-center">
      <input
        ref={inputRef}
        type="text"
        onChange={(e) => onValueChange(e.target.value)}
        className="pl-3 max-w-[150px] text-sm py-1 pr-8 rounded-md text-gray-400 bg-gray-900 ring-1 ring-blue-400 focus:ring-2 focus:outline-none"
      />
      <SearchIcon className="absolute h-4 w-4 right-3" />
    </div>
  );
};

export default SearchInput;
