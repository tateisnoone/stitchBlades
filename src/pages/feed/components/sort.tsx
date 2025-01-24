import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortProps = {
  sortOrder: "newest" | "oldest";
  setSortOrder: (order: "newest" | "oldest") => void;
};

const Sort: React.FC<SortProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="rounded-md border px-4 py-2 text-gray-700 dark:text-gray-300 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800">
          Sort by Date
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-neutral-900">
        <DropdownMenuItem
          onClick={() => setSortOrder("newest")}
          className={sortOrder === "newest" ? "font-bold" : ""}
        >
          Newest
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSortOrder("oldest")}
          className={sortOrder === "oldest" ? "font-bold" : ""}
        >
          Oldest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
