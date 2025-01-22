import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const AboutHero = () => {
  const { t } = useTranslation();
  return (
    <div className="relative bg-gradient-to-b from-violet-950 via-violet-500 to-background py-20 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-5xl font-bold ">
          {t("about-us.HeroTitle")}
        </h1>
        <p className="mt-6 text-lg md:text-xl">{t("about-us.HeroText")}</p>
        <Button className="mt-8 px-6 py-3 rounded-md hover:bg-primary/80">
          {t("about-us.HeroButton")}
        </Button>
      </div>
    </div>
  );
};

export default AboutHero;
