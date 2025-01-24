import React from "react";
import { Controller } from "react-hook-form";
import { Command } from "@/components/ui/command";

type SearchInputProps = {
  control: any; // Replace with proper `useForm` control type
  handleSearchChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  control,
  handleSearchChange,
}) => {
  return (
    <Command className="rounded-lg border shadow-md mb-10 w-2/3 dark:border-solid dark:border-neutral-800 h-10">
      <Controller
        name="searchText"
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            onChange={(e) => handleSearchChange(e, onChange)}
            value={value}
            placeholder="Enter search text..."
            className="h-10 p-2 shadow-md dark:bg-inherit font-body"
          />
        )}
      />
    </Command>
  );
};

export default SearchInput;
