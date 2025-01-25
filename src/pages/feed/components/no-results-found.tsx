import iconWhite from "@/assets/images/noresultw.png";
import iconBlack from "@/assets/images/noresultb.png";
import { useTranslation } from "react-i18next";

const NoResults = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-48   w-full">
      <p className="text-lg font-body"> {t("feed-page.NoResults")}</p>
      <img src={iconBlack} className="dark:hidden size-20" />
      <img src={iconWhite} className="hidden dark:block size-20" />
    </div>
  );
};

export default NoResults;
