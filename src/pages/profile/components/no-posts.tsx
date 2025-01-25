import { Button } from "@/components/ui/button";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NoPosts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleCreatePost = () => {
    navigate(USER_PATHS.FOR_CREATE);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-4">
        <Info className="w-12 h-12 text-gray-500 dark:text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
        {t("profile-page.NoPosts")}
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        {t("profile-page.NoPostsText")}
      </p>
      <Button onClick={handleCreatePost} className="mt-4">
        {t("profile-page.Create")}
      </Button>
    </div>
  );
};

export default NoPosts;
