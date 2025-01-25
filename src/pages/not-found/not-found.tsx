import { Button } from "@/components/ui/button";
import { STATIC_PATHS } from "@/routes/default-layout/static/index.enum";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleGoHome = () => {
    navigate(STATIC_PATHS.FOR_HOME);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center p-8 rounded-lg shadow-lg dark:bg-white max-w-md w-full">
          <h1 className="text-6xl text-[#8B0000]">{t("not-found.404")}</h1>
          <p className="mt-4 text-xl text-gray-700 dark:text-black">
            {t("not-found.Text")}
          </p>
          <Button
            onClick={handleGoHome}
            className="mt-6 bg-[#6A0DAD] hover:bg-purple-700 text-white px-6 py-2 rounded-lg focus:outline-none font-body"
          >
            {t("not-found.Button")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
