import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Languages } from "lucide-react";
import i18n from "@/i18n";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const handleLangChange = (lang: "en" | "ka") => {
    console.log(`Language changed to: ${lang}`);
    i18n.changeLanguage(lang);
  };
  console.log(t("header-page.LangEn"));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50  h-10 w-10 ">
        <Languages className="w-5 h-5 text-gray-700 dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-md rounded-md p-2 bg-white dark:bg-black z-50">
        <DropdownMenuItem onClick={() => handleLangChange("en")}>
          <Button variant="ghost" className="flex items-center mb-2 font-body">
            {t("header-page.LangEn")}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLangChange("ka")}>
          <Button variant="ghost" className="flex items-center font-body ">
            {t("header-page.LangKa")}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
