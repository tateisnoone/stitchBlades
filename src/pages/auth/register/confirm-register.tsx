import { Button } from "@/components/ui/button";
import { AUTH_PATHS } from "@/routes/default-layout/auth/index.enum";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmailConfirmationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleNavigateToLogin = () => {
    navigate(AUTH_PATHS.FOR_LOGIN);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full text-center border border-solid border-zinc-300 shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center  rounded-full p-4 ">
          <Mail className="w-12 h-12 text-[#6A0DAD]" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {t("register-page.CheckEmail")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t("register-page.ConfirmEmailText")}
        </p>

        <Button
          variant="ghost"
          className="border border-zinc-300"
          onClick={handleNavigateToLogin}
        >
          {t("register-page.GoToLogin")}
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;
