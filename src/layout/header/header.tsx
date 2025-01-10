import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
// import i18n from "i18next";
import { ModeToggle } from "@/components/mode-toggle";
//import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "../../supabase/auth";
import logo from "@/assets/logoSB.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useAtom } from "jotai";
// import { userAtom } from "@/store/auth";
// import { useEffect, useState } from "react";
// import { getProfileInfo } from "@/supabase/profile";
// import { PostgrestSingleResponse } from "@supabase/supabase-js";
// import { DASHBOARD_PATHS } from "@/routes/dashboard/index.enum";

// type ProfileData = {
//   avatar_url: string | null;
//   full_name: string | null;
//   full_name_ge?: string | null;
//   id: string;
//   updated_at: string | null;
//   username: string | null;
//   website?: string | null;
//   number?: string | null;
// };
const Header = () => {
  //   const { t } = useTranslation();
  //   const [user] = useAtom(userAtom);
  //   const [profileData, setProfileData] = useState<ProfileData | null>(null);
  //   useEffect(() => {
  //     if (user?.user?.id) {
  //       getProfileInfo(user.user.id).then(
  //         (res: PostgrestSingleResponse<ProfileData[]>) => {
  //           if (res.error) {
  //             console.error(res.error);
  //           } else if (res.data && res.data.length > 0) {
  //             setProfileData(res.data[0]);
  //             console.log("simo qalaqeli");
  //             console.log("tatia yana");
  //           }
  //         },
  //       );
  //     }
  //   }, [user]);
  //   const { mutate: handleLogout } = useMutation({
  //     mutationKey: ["logout"],
  //     mutationFn: logout,
  //   });
  //   const handleChangeLanguage = (lang: string) => {
  //     i18n.changeLanguage(lang);
  //   };

  return (
    <div className="border-solid border-b border-b-zinc-400">
      <div className="container lg mx-auto px-4 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold text-red-400 w-20 h-20">
          <NavLink to="/">
            <img src={logo} alt="logo" className="2-full h-full" />
          </NavLink>
        </div>
        <div className="flex w-40">
          <nav className="hidden md:flex space-x-4 font-sans text-base ">
            <a className="text-gray-500 hover:text-gray-800" href="/">
              Home
            </a>
            <a className="text-gray-500 hover:text-gray-800" href="/">
              posts
            </a>
            <NavLink to="" className="text-gray-500 hover:text-gray-800">
              about
            </NavLink>
          </nav>
        </div>
        <div className="w-96 flex justify-between">
          {/* {user ? ( */}
          <>
            <NavLink to="">
              <Button className="bg-blue-500 hover:bg-blue-400 text-base font-sans">
                create
              </Button>
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-sans">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <NavLink to="">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </NavLink>

                {/* <DropdownMenuItem onClick={() => handleLogout()}>
                    Sign Out
                  </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
          ) : (
          <NavLink to="">
            <Button className="bg-blue-500 hover:bg-blue-400 text-base font-sans">
              sign in
            </Button>
          </NavLink>
          )
          <Button className="bg-white hover:bg-slate-300 text-black text-base font-sans">
            GE
          </Button>
          <Button className="bg-white hover:bg-slate-300 text-black text-base font-sans">
            EN
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
