import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./components/lang-switch";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { useTranslation } from "react-i18next";
import HeaderDropdownMenu from "./components/dropdown-menu";
import { useLogout } from "@/react-query/mutation/user";
import { useProfileInfo } from "@/react-query/query/user";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import { AUTH_PATHS } from "@/routes/default-layout/auth/index.enum";
import { STATIC_PATHS } from "@/routes/default-layout/static/index.enum";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const user = useAtom(userAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = user[0]?.user.id ?? "";
  const handleStitchClick = () => {
    if (user) {
      return navigate(USER_PATHS.FOR_PROFILE);
    }
    return navigate(AUTH_PATHS.FOR_LOGIN);
  };
  const { data: profileData } = useProfileInfo(userId);
  const { mutate: handleLogout } = useLogout();

  return (
    <div className="border-solid border-b border-b-zinc-200  dark:border-b-zinc-700 dark:bg-[#1C1C1C] ">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold size-16 ">
          <NavLink to="/">
            <svg
              className="dark:fill-white size-16"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 144.68 108.44"
            >
              <path
                d="M205.69,241.33a7.76,7.76,0,0,0,1.4-.81,13.69,13.69,0,0,0,1.9-2,1.78,1.78,0,0,0,.23-1.25,2.51,2.51,0,0,0-1.78-2.18,11.18,11.18,0,0,0,1.93-3.91c.46-1.55.86-3.12,1.29-4.68a1.87,1.87,0,0,1,.3-.62c.2.76.38,1.51.61,2.26.49,1.65,1,3.3,1.54,4.92a12.45,12.45,0,0,0,1.12,2,2.83,2.83,0,0,0-1.82,3.07,1.46,1.46,0,0,0,.41.63,7.21,7.21,0,0,0,3.12,2.38,1.2,1.2,0,0,1,.67.64c.22.74.77.8,1.38.83l.1,0a2.09,2.09,0,0,0,2-.83l0,0c.34-.35,1-.56.57-1.23l.16-.06c.51.33.81.11,1.2-.3a10.93,10.93,0,0,1,1.66-1.16l.09.1-1.66,2.14c.14.48.11.51-.91.4-.06.88-.78,1.13-1.48,1.47.43.51-.1.9-.13,1.34,2,1.27,2.57,3.31,3.08,5.52a7.79,7.79,0,0,0-1.06-.55,10.28,10.28,0,0,0-1.61-.41c-.44-.07-.89,0-1.33-.08a9.07,9.07,0,0,0-2.73.54c.78.25,1.56.47,2.32.76,1.65.64,3.29,1.32,4.94,2a8.21,8.21,0,0,1,5.45,6.66,14.54,14.54,0,0,1-.45,7.23,6.7,6.7,0,0,1-7.1,4.93c-.57,0-1.17-.13-1.63.43l.56.61c0,.05,0,.1,0,.14l-.9-.24c-.5-.16-.55-.09-.49.42a.62.62,0,0,1-.26.44,7.66,7.66,0,0,1-.81.4c.69.28,1.69,0,1.77,1.12l-.32-.2a5.6,5.6,0,0,0-2.31-1,1.15,1.15,0,0,0-.54.08,3,3,0,0,1-2.64-.06l1.63,3.11a3.78,3.78,0,0,1-.22-2.38h1c-.83.71-.88,1.11-.21,1.85a2.44,2.44,0,0,1,.6,2.32,1.82,1.82,0,0,0,0,.32,4.77,4.77,0,0,1,2.63,2c-.75,0-1.43-.54-2.07-.27a4.44,4.44,0,0,1-.14,1.51,4.68,4.68,0,0,1-1.16,1.39c-.65.57-1.39,1-2.07,1.58-.18.14-.31.27-.14.62a1.77,1.77,0,0,1,0,1.32c-.72,1.62-1.52,3.2-2.3,4.79a1.09,1.09,0,0,1-.13.17l-1.08-2.1c-.39-.79-.78-1.59-1.19-2.37a3.36,3.36,0,0,1-.49-1.8c0-.52-.36-.82-.72-1.1s-1-.71-1.5-1.08a2.61,2.61,0,0,1-1.16-2.66,1,1,0,0,0-1.38-.07c-.22.14-.43.31-.69,0a5,5,0,0,1,1.61-1.42,1.18,1.18,0,0,1,.41-.19c.51-.11.67-.39.6-.9a2.66,2.66,0,0,1,.69-2.13,3.39,3.39,0,0,0,.39-.73l-.09-.16a12.57,12.57,0,0,0-2,.15,24.21,24.21,0,0,0-2.45.81l.75.2,0,.09c-.23.05-.47.08-.69.14a4,4,0,0,0-1.12.4,13.6,13.6,0,0,0-3,3.29,1.5,1.5,0,0,1-.2.23,11.42,11.42,0,0,1,2.55-4.62,1.46,1.46,0,0,0,.34-.65,3.17,3.17,0,0,1,1.2-1.91l-.45.85a5.12,5.12,0,0,1,.48.44c.67.73.77.74,1.56.16.37-.28.74-.54,1.13-.78.15-.09.45-.18.5-.12s.45.4.18.71a.78.78,0,0,0-.09.21l1.49.1-.68-.58c.76-.22,1.17.13,1.06.84a4.39,4.39,0,0,0-.1,1.08l1.28-2.46-.11,0a1.55,1.55,0,0,1-1.43.12,3.46,3.46,0,0,0-3.8.57,2.12,2.12,0,0,1-.36.21l-.08-.12,1.24-1a6.45,6.45,0,0,0-.92-.83,3,3,0,0,0-.89-.22l.77-.7a18.64,18.64,0,0,0-1.95-.23,8.19,8.19,0,0,1-3.14-.59,7,7,0,0,1-3.85-4.6,13.6,13.6,0,0,1,0-8.6,7.76,7.76,0,0,1,3.75-4.47,40.19,40.19,0,0,1,6.53-2.64l2.12-.71c-1.22-.72-2.42-.29-3.55-.41s-2.23.51-3.4,1a14.94,14.94,0,0,1,.69-2.24,25,25,0,0,1,1.54-2.65c.22-.34.49-.69,1-.32,0,0,.12,0,.3.06-.26-.5-.94-.82-.42-1.43-.6-.6-1.72-.72-1.59-1.87l-1,.06.11-.15a8.92,8.92,0,0,0-.49-.85c-.37-.53-.77-1-1.15-1.56l.09-.13,2.28,1.59.33-.3.31.87c.43.5.9,1.06,1.38,1.59a.41.41,0,0,0,.35.11,3.7,3.7,0,0,1,1.78-.17c.28.06.45-.18.49-.47,0-.08.14-.15.21-.22,0,.11.12.28.08.33a5.32,5.32,0,0,1-.7.64,2.28,2.28,0,0,1-.57.2,2.78,2.78,0,0,0,.32.67c1,1.09,2,2.17,3,3.25a1.16,1.16,0,0,0,.24.2,3.06,3.06,0,0,1,1.14,1.2,2.39,2.39,0,0,0,.28.24c0-.71.29-1.29,0-1.91-.22-.45-.45-.89-.63-1.35a.49.49,0,0,1,.1-.46,1.8,1.8,0,0,0,.72-1.89,2,2,0,0,0-1.66-1.69A13.18,13.18,0,0,0,205.69,241.33Zm13.39,3.81c0,.23,0,.55.09.69.47.51,1,1,1.51,1.43l.09-.1c-.26-.33-.45-.83-.79-1a1.26,1.26,0,0,1-.9-1.06l.79.78.16-.13-.53-.76Zm-8.49,3.45.38,1.46a4,4,0,0,1-.05-.6c0-1.06-.1-2.13-.14-3.19,0-.22.09-.46,0-.64s-.32-.24-.59-.42c.19.38.42.64.43.91,0,.82,0,1.65,0,2.48a14.77,14.77,0,0,0,.31,5.34c-.1-1.78-.21-3.56-.31-5.34Zm-7,26c-.51.11-1,.2-1.55.35a4.24,4.24,0,0,0-1.18.5,6,6,0,0,0-1,1c-.36.41-.67.86-1,1.3l.1.07.33-.43a6.68,6.68,0,0,1,3-2.17c.46-.17.89-.42,1.33-.63a2.06,2.06,0,0,1,.7-.28c.51,0,.48-.32.58-.69Zm-3.41-25.93c.37-1.2,1.42-1.8,2.24-2.63l-.72.34c.2-.43.36-.77.5-1.12a.68.68,0,0,0-.05-.27,2.6,2.6,0,0,0-.4.1,1,1,0,0,0-.21.18l.26,0c-.33,1.64-1.94,2.59-2.32,4.21l.13.12.39-.52a6.74,6.74,0,0,1,.92-.4,3.41,3.41,0,0,1,1.33-.15,8.11,8.11,0,0,0,3.18.11,1.58,1.58,0,0,1,.65,0c.65.09,1.29.22,2,.34l-1.76-1.2a1.78,1.78,0,0,0-.24-.43l-2.23-2-.33-.22-.13.18,2.95,2.48c-.77.39-.91.37-1.45-.22-.07-.07-.13-.15-.2-.23l-1.46-1.59c-.14.12-.28.24-.41.37-.41.52-.74,1.1-1.46,1.26-.17,0-.32.25-.45.4q-.39.45-.75.9Zm11.19-8.86c.43-1.21.11-2.45.15-3.68.35,1,.14,2.2.69,3.21.29-.38,0-.62-.09-.92a6.54,6.54,0,0,1,0-2.07,1.83,1.83,0,0,1,1.5-1.55c-1.51-2.15-1.94-4.68-2.57-7.27-.6,3.52-1.34,5.8-2.37,7.32.78.37.89,1.24,1.4,1.83a8.49,8.49,0,0,0-.78-1.64.75.75,0,0,1,0-.79c.36-.86.72-1.73,1-2.61.33-1.05.56-2.13.76-2.93,0,1.5.11,3.29.16,5.08a.6.6,0,0,1-.08.39c-.31.38-.08.66.11,1a1.09,1.09,0,0,1,.22.66,12.48,12.48,0,0,0,0,4,4.17,4.17,0,0,1-.42-1.07c-.11-1-.15-2.06-.2-3-.49,1.92.24,3.92,0,5.89l.61.31c-.1-.55-.18-1-.27-1.52l.08,0,.09.35h.07Zm1,7.42c.1,0,.25.07.28.15.14.31.25.63.36.94.86-.81,1.72-1.57,2.52-2.39s1.55-1.7,2.4-2.63a1.88,1.88,0,0,1-1.36-1.3,1.07,1.07,0,0,0-1-.76,4.66,4.66,0,0,0-1.5.23,2.1,2.1,0,0,0-1.44,1.41,1.82,1.82,0,0,0,.69,2,.37.37,0,0,1,.06.34c-.24.53-.5,1-.76,1.55-.07.15-.16.29-.24.43l-.44,2.93.16,0a5.25,5.25,0,0,0,.27-3Zm-1.62,42.22c0-.15-.07-.29-.11-.44-.45-1.18-.89-2.37-1.36-3.55a2.55,2.55,0,0,0-.52-.81c-.73-.76-1.5-1.49-2.25-2.23-.23-.23-.45-.47-.67-.71a1.83,1.83,0,0,0,.45.73c.67.68,1.35,1.35,2,2a3.64,3.64,0,0,1,.76,1.29c.49,1.25,1.11,2.46,1.68,3.68l.18.56.13,0,.09-.71a13,13,0,0,1,.27-2.28,11.68,11.68,0,0,0,.2-3.86c0-.26,0-.52-.05-.78l.11,0c.22.45.43.9.71,1.46l2.91-2.67a7.91,7.91,0,0,1,.81-.58l.15.1a2,2,0,0,1-.17.5,10,10,0,0,1-2.28,2.31,3.39,3.39,0,0,0-1.35,1.62c-.09.32,0,.67-.11,1,0,.12-.17.22-.26.32l-.13-.07c-.24,1-.47,2.05-.71,3.08l.13.05c.41-.93.83-1.83,1.2-2.77a3.72,3.72,0,0,0,.22-1.24,1.3,1.3,0,0,1,.42-1c.69-.61,1.36-1.24,2.07-1.83a3.42,3.42,0,0,0,1.15-1.93c0-.21.08-.42.12-.63l-.17-.12-1.18.83c-.75.55-1.49,1.13-2.26,1.64-.44.29-.58.19-.78-.31s-.38-.86-.53-1.31a6.74,6.74,0,0,1-.17-1l.16-.06a2.36,2.36,0,0,1,.41.35c.29.46.57.93.83,1.4.11.18.19.37.41.2.45-.36.87-.75,1.31-1.14-.41-.4-.73-.65-1.22-.45-.09,0-.26-.07-.37-.14-.28-.19-.53-.54-.82-.57-.46-.05-.5-.29-.52-.63-.05-1.25-.1-2.49-.17-3.73,0-1-.13-2.06-.2-3.08h0l.19.77h0l-.54-4.1a5.52,5.52,0,0,0-.14,1.28c0,1.85.07,3.71.12,5.57,0,1.21.09,2.41.13,3.62,0,.1,0,.26-.06.29-.45.25-.24.67-.24,1,0,1.35.05,2.69.06,4,0,1.57,0,3.14,0,4.71a2.12,2.12,0,0,1-.12.41Zm8.78-19.7v.09c.2,0,.39.08.59.1a9.08,9.08,0,0,0,3.56,0,5.74,5.74,0,0,0,3.87-4,13.4,13.4,0,0,0,.4-7.32,7.43,7.43,0,0,0-3.89-5.25,47.12,47.12,0,0,0-8.71-3.48c-.58-.16-1.14-.36-1.8-.57a3.68,3.68,0,0,1,2.86-.62,4.88,4.88,0,0,0,2.91-.24,1.56,1.56,0,0,1,1.79.21l.64.46.11-.12a3.51,3.51,0,0,0-1.55-1.79,10.38,10.38,0,0,1-1.24-.84,4.4,4.4,0,0,1-.51-.53c-.63.63-1.23,1.23-1.81,1.85-.34.37-.68.72-1.21.41a11.22,11.22,0,0,0,1.09-1,7,7,0,0,1,1.88-1.6,1.66,1.66,0,0,0,.88-1.35c-.1,0-.12.08-.16.13-.35.45-.63.95-1.25,1.12a2.08,2.08,0,0,0-.74.52c-.73.67-1.4,1.39-2.15,2-.39.32-.94.45-1.23.93-.07.12-.24.17-.37.25l-.38.24c.95.39,1.83.65,2.71.92a45.13,45.13,0,0,1,8.21,3.37,6.94,6.94,0,0,1,3.36,4.09,12.59,12.59,0,0,1-.45,8.84,5.45,5.45,0,0,1-1.71,2.19,5.71,5.71,0,0,1-4.27,1l-1.42-.09Zm-16.24-.08c-.41,0-.82.06-1.22.06a17.27,17.27,0,0,1-3.45,0,5.34,5.34,0,0,1-4-3.84,12.6,12.6,0,0,1-.52-6.75,7.45,7.45,0,0,1,4.23-5.78c1.94-.88,3.93-1.64,5.92-2.38,1.31-.48,2.66-.82,4-1.25a3,3,0,0,0,.6-.35l-.1-.17c-.24.09-.48.21-.72.28-1.35.43-2.72.79-4,1.29-2,.75-4,1.51-5.89,2.42a7.21,7.21,0,0,0-4.15,5.2,16.16,16.16,0,0,0-.29,2.28,11.94,11.94,0,0,0,1,6,5.44,5.44,0,0,0,4.32,3.43,13.11,13.11,0,0,0,4.36-.4Zm8.6-29.38c-.16.73.17,1.62-.69,2.12,0,.47-.27,1,.08,1.44.1.14,0,.47-.11.71s-.19.36-.15.41a.67.67,0,0,0,.46.22,4.07,4.07,0,0,0,.72-.13c-.17.65-.74.46-1.09.59v8.48a3.45,3.45,0,0,0,.25-1.1c.09-1.89.17-3.78.23-5.67a2.65,2.65,0,0,1,1-2.23l-.86-1.32.4-.07c0-.25-.08-.47-.12-.7l-.48.7-.23-.09a6.11,6.11,0,0,0,.56-3.36Zm-1.51,39.23c-.26-.2-.43-.41-.64-.46s-.31.23-.4.39c-.18.32-.33.67-.43.88a2.73,2.73,0,0,1-.55.31,2.83,2.83,0,0,1-.51,0l.79-.37c-1-.4-1-.4-1.2.26l1.56,1.38a2.32,2.32,0,0,1,1.38-2.37Zm2.54-1.36c-.76-.19-1,0-.79.67.74-.26,1,.57,1.69.7-.16-.55-.27-1.07-.46-1.54s-.29-.83-1-.8c.18.34.33.64.51,1Zm-2.45,2.37h-.09l-.15,1.77H210v-.91c-.17.43-.15.93-.69,1.14,0,0,0,.12,0,.19-.07.31-.15.63-.23.95.44-.26.47-1,1.26-.92v4.6h.15Zm8.15-37.11c-.29.31-.32.62-.61.87-1,.91-2,1.94-3,2.94a6,6,0,0,0-.53.76c.67-.56,1.23-1.19,1.84-1.78a10.92,10.92,0,0,1,1.67-1.46,1.2,1.2,0,0,0,.58-1.33Zm-8,27.79h-.07l-.17,8.26h.24Zm1.57-30.89c.53,0,1,.54,1.73.31a8.23,8.23,0,0,0-.78-.83,1,1,0,0,0-.62-.28c-.35.07-.44.38-.33.8Zm-4.68,7.87.1-.1-3.4-3.3-.16.17Zm.39-7.35-.13-.08c.25-.05.51-.09.76-.15.9-.22.9-.22.7-1.11,0,0,0,0-.17-.21Zm5.54.41a6.94,6.94,0,0,0-.93,0c-.07,0-.1.25-.16.39.29.05.12.19.08.32a2.34,2.34,0,0,0-.07.45Zm-6.89,40.34c-.24-.79-1.12-1.58-1.66-1.48Zm.59.06c-.09.47.9,1.56,1.73,1.79Zm2.07-3.84-.23-.66a4,4,0,0,0-.9,2.36c.4-.65.23-1.52,1.13-1.7Zm1.46-32.68c.14-.61-.61-.37-.64-.93l-.47.76Zm-6.68-.27c-.11-.71-.85-.67-1.14-1.21C203,244.46,203.28,244.73,204,244.84Zm6.41-2.3c0,.35-.36.92.25,1,.38,0,.31-.42.39-.76l-.42.31-.22-.55Zm5.1,36.78,1.32-.22c-.67-.38-1-.33-1.32.22Zm-6.37-38.2h-.85l.64.71Zm-6.44,3.72-.11.15.46.58.36-.39Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M220.46,273.51l-.18-.35a2.2,2.2,0,0,1,.89,1.21,3.23,3.23,0,0,0,.62,1.14,7.79,7.79,0,0,1,1.62,2.46c.27.6.55,1.18.89,1.9-1.64-1.53-2.56-3.74-5.09-3.91a1.55,1.55,0,0,1,0-.21l1.28-.13-.48-.29.08-.15c.23.12.46.24.69.34l.56.16c-.15-.32-.3-.63-.44-.95S220.62,273.92,220.46,273.51Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M220.46,273.51c.16.41.31.82.48,1.22s.29.63.44.94c-.15-.1-.3-.22-.45-.31s-.5-.39-.7-.35a9.76,9.76,0,0,1-1.87-.14l1.14.49v.1a2.53,2.53,0,0,1-.79-.08c-.56-.23-1.09-.54-1.64-.82v0l-.58-.82c.07-.33.32-.44.68-.23.52.28,1,.6,1.54.89a5.8,5.8,0,0,0,.65.3c.25-.36.49-.73.75-1.07C220.2,273.58,220.35,273.56,220.46,273.51Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M217.08,274.57c-.13.07-.25.2-.39.22-.38,0-.76,0-1.27,0a1.38,1.38,0,0,1,1.68-.22Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M211.5,234.41c-.23-.75.09-1.52,0-2.29C211.63,232.88,212.1,233.62,211.5,234.41Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M97,247.89l9.39,3.14.7-1.22a4.57,4.57,0,0,1,.53-.82.51.51,0,0,1,.72,0,.48.48,0,0,1,.13.33,3.07,3.07,0,0,1-.51,1.16l-4.54,7.7,3.6-.23a14,14,0,0,1,3.78.45,10.83,10.83,0,0,1,3.71,1.62,8.27,8.27,0,0,1,2.43,2.58,6.27,6.27,0,0,1,.89,3.27,9.85,9.85,0,0,1-2.76,6.47q-2.76,3.17-9.81,6.69c-1.65-.61-3.57-1.26-5.76-1.93-3.91,1.78-7.11,2.68-9.63,2.68a6.37,6.37,0,0,1-4.13-1.18,3.44,3.44,0,0,1-1.44-2.71,3.84,3.84,0,0,1,1.74-3,8.35,8.35,0,0,1,5.19-1.37,21.25,21.25,0,0,1,3.34.34l1.7-3-3,.24a16.75,16.75,0,0,1-2.91-.3,8.77,8.77,0,0,1-3-1,4.83,4.83,0,0,1-1.75-1.79,4.56,4.56,0,0,1-.59-2.23,4.77,4.77,0,0,1,1.31-3.29A7.09,7.09,0,0,1,89,258.78l0-.25a8.14,8.14,0,0,1,1.72-4.44A32.88,32.88,0,0,1,97,247.89Zm1,28.7a27.81,27.81,0,0,0-8.49-1.72,4.37,4.37,0,0,0-2.7.75,1.47,1.47,0,0,0-.69,1.22,1.4,1.4,0,0,0,.69,1.23,5.5,5.5,0,0,0,3.14.75A20.45,20.45,0,0,0,98,276.59ZM100.12,262a36.93,36.93,0,0,1-5.25.39,8.68,8.68,0,0,1-4-.67,4,4,0,0,1-1.77-2.08,2.78,2.78,0,0,0-1.49,2.38,2.5,2.5,0,0,0,1.16,2.12c1,.72,2.78,1.08,5.27,1.08a37.66,37.66,0,0,0,4.45-.32Zm4.36-7.67a36,36,0,0,0-5.09-2.17,11.25,11.25,0,0,0-3.22-.55,4.61,4.61,0,0,0-3.18,1.1,3.41,3.41,0,0,0-1.22,2.58,3.09,3.09,0,0,0,1,2.4,4.67,4.67,0,0,0,3.17.93q1.4,0,6.29-.41ZM95.5,272c1.31.29,2.38.55,3.2.8s2.3.73,4.41,1.47q5-2.29,5-4.45a1.65,1.65,0,0,0-.59-1.21,2.12,2.12,0,0,0-1.5-.54,26.1,26.1,0,0,0-2.74.19c-3,.33-5,.49-6,.49Zm4.08-7.15q5-.5,6.9-.5a6,6,0,0,1,4,1.2,3.68,3.68,0,0,1,1.4,2.87,4,4,0,0,1-1.37,2.83,22.07,22.07,0,0,1-5.85,3.43l4.23,1.12a15.28,15.28,0,0,0,4.21-3.65,6.94,6.94,0,0,0,1.48-4.3,5.65,5.65,0,0,0-.93-3,6.35,6.35,0,0,0-2.85-2.38,10.44,10.44,0,0,0-4.42-.88,45.71,45.71,0,0,0-5.18.38Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M120.45,259.09l5.8-7.16h.61l-.21,5.75h4.18V260h-4.18v14l2.33,1.73,1.33-1,.52.63L126.24,279a11.91,11.91,0,0,0-5.29-3.25v-.41a3.05,3.05,0,0,0,1.1-1.17,5.49,5.49,0,0,0,.35-2.23V260h-2Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M136.94,256.82l3.7,3.07L139,261.48v11.33a5.72,5.72,0,0,0,.3,2.33c.2.36.41.54.62.54a.88.88,0,0,0,.42-.11,9,9,0,0,0,1.09-.83l.51.65L137.46,279a6.29,6.29,0,0,1-2.15-2.24,9.75,9.75,0,0,1-.48-3.67V261.48l-1.56-1.59Zm1.57-7.12h2.65l-2.88,4.5h-.83Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M144.38,259.09l5.81-7.16h.6l-.21,5.75h4.19V260h-4.19v14l2.34,1.73,1.33-1,.52.63L150.18,279a12,12,0,0,0-5.3-3.25v-.41a3.09,3.09,0,0,0,1.11-1.17,5.67,5.67,0,0,0,.35-2.23V260h-2Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M163.67,256.82l5.4,3.09-2.22,3.24-4.07-2.35v13.28l4.1,1.83,2.17-1.58.22.89L164.12,279a25.78,25.78,0,0,0-3.41-1.66,21.39,21.39,0,0,0-3.47-.92v-.5a2.51,2.51,0,0,0,1-1.08,7.26,7.26,0,0,0,.33-2.54V260.46A18.38,18.38,0,0,0,163.67,256.82Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M179.39,249.18l.21.5a5.57,5.57,0,0,0-2,2,8.15,8.15,0,0,0-.54,3.44v6.78l6.44-5.12a7.39,7.39,0,0,1,2.67,2.57,10.12,10.12,0,0,1,.63,4.22v9.44a10.12,10.12,0,0,1-.57,3.95,9.92,9.92,0,0,1-3.3,3.84,30.16,30.16,0,0,1-8.06,4.1l-.29-.79a21.79,21.79,0,0,0,5.54-3,6.44,6.44,0,0,0,2-2.87,28.89,28.89,0,0,0,.35-5.95V263.6a5,5,0,0,0-.29-2,4.74,4.74,0,0,0-1.61-1.51L177,263v11.58l1.47,1.49-3.65,3-3.71-3,1.64-1.63V255.46a9.39,9.39,0,0,0-.45-3.53,4.24,4.24,0,0,0-1.8-1.73l.23-.52a7.84,7.84,0,0,1,1.77.7,12.07,12.07,0,0,1,1.74,1.34A10.13,10.13,0,0,1,176.7,250,9.12,9.12,0,0,1,179.39,249.18Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M111.59,298.63a6.93,6.93,0,0,1,3.26,1.7,5,5,0,0,1,1.56,3.64,6.26,6.26,0,0,1-1.22,3.49,20.22,20.22,0,0,1-4.48,4.27,12,12,0,0,1,4.09.92,3.9,3.9,0,0,1,1.82,1.71,8.28,8.28,0,0,1,.52,3.47V325a23.37,23.37,0,0,0-12.62,5.17,13,13,0,0,0-3.44-1.77,17.46,17.46,0,0,0-5.62-.88,10.45,10.45,0,0,0-5.92,1.5c-1,.67-1.5,1.33-1.5,2a2.63,2.63,0,0,0,.43,1.11,2.7,2.7,0,0,1,.43,1.18,1,1,0,0,1-.32.73.92.92,0,0,1-.68.31,1.35,1.35,0,0,1-1.05-.55,2.09,2.09,0,0,1-.47-1.43,3.9,3.9,0,0,1,.57-1.84,16.45,16.45,0,0,1,2.48-3,17.76,17.76,0,0,0,2.43-2.83,3.22,3.22,0,0,0,.53-1.66,2,2,0,0,0-.61-1.51,2.11,2.11,0,0,0-1.55-.59,2,2,0,0,0-1.39.48,2.57,2.57,0,0,0-.72,1.58h-.76c0-.27,0-.46,0-.58a3.8,3.8,0,0,1,1.17-2.87,4.35,4.35,0,0,1,3.13-1.12l.71,0a5.78,5.78,0,0,0-.6-3A3.06,3.06,0,0,0,89,314a3.58,3.58,0,0,0-2,.6,3.24,3.24,0,0,0-1,1.29l-.8-.28a4.75,4.75,0,0,1,1.55-3.18,5,5,0,0,1,3.42-1.18,18.86,18.86,0,0,1,1.92.12,15.83,15.83,0,0,1,.54-4.27,6.61,6.61,0,0,1,1.54-2.45,26.43,26.43,0,0,1,4.1-3.08,16.13,16.13,0,0,1-4.83.94,15.14,15.14,0,0,1-3.33-.5,8.82,8.82,0,0,0-1.68-.27,2.19,2.19,0,0,0-1.59.63,3.89,3.89,0,0,0-.85,2.26h-.79a7.55,7.55,0,0,1,.7-3.18,4.85,4.85,0,0,1,2-2.07,5.3,5.3,0,0,1,2.77-.78,17,17,0,0,1,3.6.62,17.57,17.57,0,0,0,4.08.62,9.63,9.63,0,0,0,2.22-.25,18.41,18.41,0,0,0,2.82-1l.43.92q-4.52,2.19-6,4.26a9.23,9.23,0,0,0-1.49,5.5v8.56a9.32,9.32,0,0,1-3.14,7.93q3.69-1.56,5-3.35a9.07,9.07,0,0,0,1.27-5.27V311a17.08,17.08,0,0,1,.75-6.05,6.74,6.74,0,0,1,2.76-3Q104.82,300.72,111.59,298.63Zm-3.6,2a12.87,12.87,0,0,0-3,1.73,3.66,3.66,0,0,0-1.09,1.67,12.46,12.46,0,0,0-.3,3.28v8.53a10.63,10.63,0,0,1-.42,3.44,5.86,5.86,0,0,1-1.6,2.27,30.79,30.79,0,0,1-4.81,3.24,24.14,24.14,0,0,1,3.65-.29,18.24,18.24,0,0,1,5.43.79V308h.91v5.41a14.85,14.85,0,0,0,4.25-3.54,6.47,6.47,0,0,0,1.37-3.95,4.5,4.5,0,0,0-1.07-3A9.09,9.09,0,0,0,108,300.65Zm-1.26,15.73a9.43,9.43,0,0,0,3.08.6,9.34,9.34,0,0,0,3.08-.6,3.79,3.79,0,0,0-.64-2.31,6,6,0,0,0-2.44-1.65c-1.51,1-2.54,1.65-3.08,1.94Zm6.16.91a9.22,9.22,0,0,1-3.08.63,8.68,8.68,0,0,1-3.08-.63V321a8.78,8.78,0,0,1,3-.58,10.43,10.43,0,0,1,3.16.58Zm0,4.67a9.88,9.88,0,0,0-3.24-.69,7.09,7.09,0,0,0-2.92.69v3.7a14.25,14.25,0,0,1,1.69.9,22,22,0,0,1,4.47-1.74Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M130,300.33v.54a5.32,5.32,0,0,0-2.32,2.09,8.13,8.13,0,0,0-.68,3.76v18.5l2.38,1.77.91-.75.52.75-4.17,3.17a20.57,20.57,0,0,0-2.83-2.19,10.82,10.82,0,0,0-2.47-1v-.46a2.59,2.59,0,0,0,.91-.89,3.89,3.89,0,0,0,.45-1.27c0-.17,0-1,.06-2.5V307a15.37,15.37,0,0,0-.15-2.63A4,4,0,0,0,122,303a6.61,6.61,0,0,0-1.48-1.5l.34-.42a7.25,7.25,0,0,1,3.4,2.21A10.32,10.32,0,0,1,127.1,301,7.32,7.32,0,0,1,130,300.33Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M147.82,308.87l.75.29a12.91,12.91,0,0,0-1.43,2.67,8.41,8.41,0,0,0-.3,2.51v8.86a7.15,7.15,0,0,0,.31,2.76.89.89,0,0,0,.75.55,1.06,1.06,0,0,0,.47-.12c.1-.06.4-.3.89-.71l.51.65-4.42,3.83a8.18,8.18,0,0,1-2.15-2.24,6.27,6.27,0,0,1-.61-2.76l-6.31,5q-3.57-2.93-3.57-5.76a8.29,8.29,0,0,1,.77-3.56,23.76,23.76,0,0,1,3.53-5.11l-2.5-5.35.29-.54c.54,0,.94.07,1.2.07a5.86,5.86,0,0,0,4.32-1.94,14.69,14.69,0,0,0,3.31,1.42,10.5,10.5,0,0,0,2.75.54,1.12,1.12,0,0,0,.67-.16A4.31,4.31,0,0,0,147.82,308.87Zm-5.23,3.95-7.12-2.18L138,316l4.58,2.15Zm0,6.2-5-2.36a10.92,10.92,0,0,0-1.17,4.46,6.59,6.59,0,0,0,3.06,5.56l3.14-2.54Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M151.69,300.87l14.15,9.72a3.57,3.57,0,0,1,.74-1.16,3.78,3.78,0,0,1,1.24-.75v.85a3.18,3.18,0,0,0-.54,1,8.26,8.26,0,0,0-.13,1.87v14a30.11,30.11,0,0,0-3.93,1.74,19.13,19.13,0,0,0-2.78,2,23.41,23.41,0,0,0-4.36-2.33,16.93,16.93,0,0,0-4.08-1v-.4a3.09,3.09,0,0,0,1-1.3,10.83,10.83,0,0,0,.22-2.72v-10.9a11,11,0,0,0,4-1.79L151.69,306Zm11.22,12.73-4.3-2.93a10.29,10.29,0,0,1-1.18.81v12.87l5.48,2.43Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M180.22,308l5.87,6.85-9.32,6.53v3.79l4.83,1.92,3.26-2.23.46.62-6.73,4.71a26.78,26.78,0,0,0-3.4-1.59,31.27,31.27,0,0,0-3.79-1v-.52a2.12,2.12,0,0,0,.94-1,9,9,0,0,0,.24-2.65v-11.9c1.31-.48,2.39-.91,3.25-1.29C176.45,309.88,177.92,309.15,180.22,308Zm-3.16,2.39-.29.15V320l5.48-3.84Z"
                transform="translate(-84.28 -225.9)"
              />
              <path
                d="M198.87,315.69l4.83,2.52V327a9.1,9.1,0,0,0-3.17.86,13.53,13.53,0,0,0-3.21,2.33,12.78,12.78,0,0,0-2.68-1.27,7.92,7.92,0,0,0-2.4-.36,5.5,5.5,0,0,0-3.48,1.19,1.76,1.76,0,0,1-.82.44.7.7,0,0,1-.46-.23.68.68,0,0,1-.22-.46c0-.17.14-.39.43-.67s.45-.48.85-1l1.9-2.35,2.68-3.56-4.55-2.45v-7.76a13.3,13.3,0,0,0,3.37-1.49,10.51,10.51,0,0,0,2.34-2.26,38,38,0,0,0,4.29,1.58,8.47,8.47,0,0,0,2.22.31,2.88,2.88,0,0,0,1.82-.51,1.38,1.38,0,0,0,.65-1.07,1,1,0,0,0-.42-.75,2,2,0,0,1-.81-1.41,1.44,1.44,0,0,1,.36-1,1,1,0,0,1,.79-.39,1.38,1.38,0,0,1,1,.53,2.09,2.09,0,0,1,.47,1.41,4.35,4.35,0,0,1-.38,1.75,11.07,11.07,0,0,1-1.44,2.2ZM196.35,319l-5,6.72a12,12,0,0,1,1.7-.45,7.83,7.83,0,0,1,1.44-.15,9.57,9.57,0,0,1,5,1.58v-6Zm-3.58-1.89,2.85,1.47,4.54-6a9.2,9.2,0,0,1-2.41.4,8.52,8.52,0,0,1-5-1.71Z"
                transform="translate(-84.28 -225.9)"
              />
            </svg>
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:w-80">
          <nav className="hidden lg:flex w-full justify-between ">
            <NavLink
              to={STATIC_PATHS.FOR_HOME}
              className="text-[#333333] hover:text-[#6A0DAD] dark:text-[#E5E5E5] dark:hover:text-[#6A0DAD] font-title text-xl"
            >
              {t("header-page.Home")}
            </NavLink>
            <NavLink
              to={USER_PATHS.FOR_FEED}
              className="text-[#333333] hover:text-[#6A0DAD] dark:text-[#E5E5E5] dark:hover:text-[#6A0DAD] font-title text-xl"
            >
              {t("header-page.Outfits")}
            </NavLink>
            <NavLink
              to={STATIC_PATHS.FOR_ABOUT}
              className="text-[#333333] hover:text-[#6A0DAD] dark:text-[#E5E5E5] dark:hover:text-[#6A0DAD] font-title text-xl"
            >
              {t("header-page.About")}
            </NavLink>
          </nav>
        </div>
        <div className="w-40 lg:w-64 flex justify-between">
          {userId ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <NavLink
                      to={USER_PATHS.FOR_CREATE}
                      className="hidden lg:block"
                    >
                      <Button className="bg-[#6A0DAD] hover:bg-[#6a0dadb3] font-title text-lg">
                        {t("header-page.Create")}
                      </Button>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <NavLink to={AUTH_PATHS.FOR_LOGIN} className="hidden lg:block">
              <Button className="bg-[#6A0DAD] hover:bg-[#6a0dadb3] font-title text-lg w-32">
                {t("header-page.SignIn")}
              </Button>
            </NavLink>
          )}

          <div
            onClick={handleStitchClick}
            className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain dark:bg-[url('/src/assets/images/stitchIconW.png')] size-7 cursor-pointer mt-1"
          ></div>

          <LanguageSwitcher />
          <ModeToggle />
          <HeaderDropdownMenu />
          {userId ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={profileData?.avatar_url || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {t("header-page.MyAccount")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <NavLink to={USER_PATHS.FOR_PROFILE}>
                    <DropdownMenuItem>
                      {t("header-page.Profile")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to={USER_PATHS.FOR_CREATE} className="lg:hidden">
                    <DropdownMenuItem>
                      {t("header-page.Create")}
                    </DropdownMenuItem>
                  </NavLink>
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    {t("header-page.SignOut")}
                  </DropdownMenuItem>
                  <DropdownMenuLabel className="lg:hidden mt-1">
                    {t("header-page.Menu")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="lg:hidden" />
                  <NavLink to={STATIC_PATHS.FOR_HOME}>
                    <DropdownMenuItem className="lg:hidden">
                      {t("header-page.Home")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to={USER_PATHS.FOR_FEED}>
                    <DropdownMenuItem className="lg:hidden">
                      {t("header-page.Outfits")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to={STATIC_PATHS.FOR_ABOUT}>
                    <DropdownMenuItem className="lg:hidden">
                      {t("header-page.About")}
                    </DropdownMenuItem>
                  </NavLink>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
