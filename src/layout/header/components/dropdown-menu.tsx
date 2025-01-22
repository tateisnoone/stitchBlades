import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
const HeaderDropdownMenu = () => {
  const [user] = useAtom(userAtom);
  return (
    <>
      {user ? null : (
        <DropdownMenu>
          <DropdownMenuTrigger className="lg:hidden">
            <Menu size={28} strokeWidth={1.25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <NavLink to="/login">
              <DropdownMenuItem>Log In</DropdownMenuItem>
            </NavLink>
            <NavLink to="/">
              <DropdownMenuItem>Home</DropdownMenuItem>
            </NavLink>
            <NavLink to="/feed">
              <DropdownMenuItem>Outfits</DropdownMenuItem>
            </NavLink>
            <NavLink to="/about">
              <DropdownMenuItem>About Us</DropdownMenuItem>
            </NavLink>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default HeaderDropdownMenu;
