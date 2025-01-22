import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Github, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-title font-bold text-primary">
            StitchBlades
          </h2>
          <p className="mt-4 text-secondary-foreground">
            {t("footer-page.Text1")}
          </p>
          <div className="flex items-center gap-4 mt-6">
            {/* Social Media Icons */}
            <NavLink
              to="https://www.linkedin.com/in/tatia-daghelashvili-84b73a1a3/"
              target="_blank"
            >
              <Linkedin size={24} strokeWidth={1.25} />
            </NavLink>
            <NavLink to="https://github.com/tateisnoone" target="_blank">
              <Github size={24} strokeWidth={1.25} />
            </NavLink>
            <NavLink
              to="https://www.instagram.com/tateisnoone/"
              target="_blank"
            >
              <Instagram size={24} strokeWidth={1.25} />
            </NavLink>
          </div>
        </div>

        {/* Quick Links */}
        <div className="hidden lg:block">
          <h3 className="text-xl font-semibold text-primary">
            {t("footer-page.QuickLinks")}
          </h3>
          <ul className="mt-4 space-y-2 text-secondary-foreground">
            <li>
              <NavLink to="/about" className="hover:underline">
                {t("footer-page.About")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/community" className="hover:underline">
                {t("footer-page.Community")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:underline">
                {t("footer-page.Contact")}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="hidden lg:block">
          <h3 className="text-xl font-semibold">
            {" "}
            {t("footer-page.StayUpdated")}
          </h3>
          <p className="mt-4">{t("footer-page.StayUpdatedText")}</p>
          <form className="mt-6 flex items-center">
            <input
              type="email"
              placeholder={t("footer-page.EmailPlaceholder")}
              className="px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
            >
              {t("footer-page.Subscribe")}
            </button>
          </form>
        </div>

        <Accordion type="single" collapsible className="lg:hidden">
          <AccordionItem value="item-1">
            <AccordionTrigger> {t("footer-page.QuickLinks")}</AccordionTrigger>
            <AccordionContent>
              <ul className="mt-4 space-y-2 text-secondary-foreground">
                <li>
                  <NavLink to="/about" className="hover:underline">
                    {t("footer-page.About")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/community" className="hover:underline">
                    {t("footer-page.Community")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="hover:underline">
                    {t("footer-page.Contact")}
                  </NavLink>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger> {t("footer-page.StayUpdated")}</AccordionTrigger>
            <AccordionContent>
              <p className="mt-4 text-secondary-foreground">
                {t("footer-page.StayUpdatedText")}
              </p>
              <form className="mt-6 flex items-center">
                <input
                  type="email"
                  placeholder={t("footer-page.EmailPlaceholder")}
                  className="px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
                >
                  {t("footer-page.Subscribe")}
                </button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-sm text-center text-secondary-foreground">
        © {new Date().getFullYear()} StitchBlades. All Rights Reserved
      </div>
    </footer>
  );
};
