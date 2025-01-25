import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

type SortProps = {
  sortOrder: "newest" | "oldest";
  setSortOrder: (order: "newest" | "oldest") => void;
};

const Sort: React.FC<SortProps> = ({ sortOrder, setSortOrder }) => {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-between items-center">
        <Button className="border-none bg-inherit hover:bg-inherit text-black dark:text-white w-24 font-body">
          {t("feed-page.SortTitle")}
        </Button>
        <ChevronDown strokeWidth={1.25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setSortOrder("newest")}
          className={sortOrder === "newest" ? "font-bold" : ""}
        >
          {t("feed-page.Newest")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSortOrder("oldest")}
          className={sortOrder === "oldest" ? "font-bold" : ""}
        >
          {t("feed-page.Oldest")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
