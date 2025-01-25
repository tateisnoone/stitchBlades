import React from "react";
import { Controller } from "react-hook-form";
import { Command } from "@/components/ui/command";
import { useTranslation } from "react-i18next";

type SearchInputProps = {
  control: any;
  handleSearchChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  control,
  handleSearchChange,
}) => {
  const { t } = useTranslation();
  return (
    <Command className="rounded-lg border shadow-md w-2/3 dark:border-solid dark:border-neutral-800 h-10">
      <Controller
        name="searchText"
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            onChange={(e) => handleSearchChange(e, onChange)}
            value={value}
            placeholder={t("feed-page.SearchText")}
            className="h-10 py-2 px-3 shadow-md dark:bg-inherit font-body"
          />
        )}
      />
    </Command>
  );
};

export default SearchInput;
