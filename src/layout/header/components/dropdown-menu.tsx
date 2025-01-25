import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AUTH_PATHS } from "@/routes/default-layout/auth/index.enum";
import { STATIC_PATHS } from "@/routes/default-layout/static/index.enum";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
const HeaderDropdownMenu = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  return (
    <>
      {user ? null : (
        <DropdownMenu>
          <DropdownMenuTrigger className="lg:hidden">
            <Menu size={28} strokeWidth={1.25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <NavLink to={AUTH_PATHS.FOR_LOGIN}>
              <DropdownMenuItem> {t("header-page.SignIn")}</DropdownMenuItem>
            </NavLink>
            <NavLink to={STATIC_PATHS.FOR_HOME}>
              <DropdownMenuItem> {t("header-page.Home")}</DropdownMenuItem>
            </NavLink>
            <NavLink to={USER_PATHS.FOR_FEED}>
              <DropdownMenuItem> {t("header-page.Outfits")}</DropdownMenuItem>
            </NavLink>
            <NavLink to={STATIC_PATHS.FOR_ABOUT}>
              <DropdownMenuItem>{t("header-page.About")}</DropdownMenuItem>
            </NavLink>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default HeaderDropdownMenu;
