import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import headerKa from "./ka/pages/header.json";
import headerEn from "./en/pages/header.json";
import signInKa from "./ka/pages/sign-in.json";
import signInEn from "./en/pages/sign-in.json";
import signUpKa from "./ka/pages/register.json";
import signUpEn from "./en/pages/register.json";
import profileEn from "./en/pages/profile.json";
import profileKa from "./ka/pages/profile.json";
import createPostEn from "./en/pages/create-post.json";
import createPostKa from "./ka/pages/create-post.json";
import aboutUsEn from "./en/pages/about-us.json";
import aboutUsKa from "./ka/pages/about-us.json";
import footerEn from "./en/pages/footer.json";
import footerKa from "./ka/pages/footer.json";
import feedEn from "./en/pages/feed.json";
import feedKa from "./ka/pages/feed.json";
import homeEn from "./en/pages/home.json";
import homeKa from "./ka/pages/home.json";
import notFoundEn from "./en/pages/not-found.json";
import notFoundKa from "./ka/pages/not-found.json";

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      translation: {
        "header-page": headerKa,
        "sign-in": signInKa,
        "register-page": signUpKa,
        "profile-page": profileKa,
        "create-post": createPostKa,
        "about-us": aboutUsKa,
        "footer-page": footerKa,
        "feed-page": feedKa,
        "home-page": homeKa,
        "not-found": notFoundKa,
      },
    },
    en: {
      translation: {
        "header-page": headerEn,
        "sign-in": signInEn,
        "register-page": signUpEn,
        "profile-page": profileEn,
        "create-post": createPostEn,
        "about-us": aboutUsEn,
        "footer-page": footerEn,
        "feed-page": feedEn,
        "home-page": homeEn,
        "not-found": notFoundEn,
      },
    },
  },
  lng: "en",
  fallbackLng: "ka",

  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
