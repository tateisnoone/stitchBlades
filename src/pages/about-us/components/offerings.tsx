import { useTranslation } from "react-i18next";

const Offerings = () => {
  const { t } = useTranslation();
  return (
    <div className="py-16 bg-secondary/10">
      <h2 className="text-3xl md:text-4xl text-center">
        {t("about-us.OfferingsTitle")}
      </h2>
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="bg-card p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-primary">
            {t("about-us.Card1Title")}
          </h3>
          <p className="mt-2 text-secondary-foreground">
            {t("about-us.Card1Text")}
          </p>
        </div>
        <div className="bg-card p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-primary">
            {t("about-us.Card2Title")}
          </h3>
          <p className="mt-2 text-secondary-foreground">
            {t("about-us.Card2Text")}
          </p>
        </div>
        <div className="bg-card p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-primary">
            {t("about-us.Card3Title")}
          </h3>
          <p className="mt-2 text-secondary-foreground">
            {t("about-us.Card3Text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offerings;
