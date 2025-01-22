import { useTranslation } from "react-i18next";

const Mission = () => {
  const { t } = useTranslation();
  return (
    <div className="py-16 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        {t("about-us.MissionTitle")}
      </h2>
      <p className="mt-4 text-lg text-center max-w-3xl mx-auto">
        {t("about-us.MissionText")}
      </p>
    </div>
  );
};

export default Mission;
