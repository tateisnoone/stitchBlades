import { Button } from "@/components/ui/button";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ShareOutfitSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleCreatePost = () => {
    navigate(USER_PATHS.FOR_CREATE);
  };

  return (
    <section className="relative bg-gradient-to-t from-violet-100 via-violet-300 to-background py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-title text-black dark:text-black mb-4">
          {t("home-page.CreatePostTitle")}
        </h2>

        {/* Description */}
        <p className="text-black dark:text-gray-900 text-lg mb-8">
          {t("home-page.CreatePostText")}
        </p>

        {/* CTA Button */}
        <Button
          className="px-6 py-3 text-lg font-medium text-white dark:text-black
           rounded-lg shadow-md  focus:outline-none focus:ring-2 "
          onClick={handleCreatePost}
        >
          {t("home-page.StartCreating")}
        </Button>
      </div>

      {/* Image */}
    </section>
  );
};

export default ShareOutfitSection;
