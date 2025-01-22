import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Cta = () => {
  const { t } = useTranslation();
  return (
    <div className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-primary">
        {t("about-us.JoinUsTitle")}
      </h2>
      <p className="mt-4 text-lg text-secondary-foreground max-w-3xl mx-auto">
        {t("about-us.JoinUsText")}
      </p>
      <Button className="mt-8 px-6 py-3  rounded-md bg-[#6A0DAD] hover:bg-[#6a0dadb3] ">
        <NavLink to="/register"> {t("about-us.JoinUsButton")} </NavLink>
      </Button>
    </div>
  );
};

export default Cta;
