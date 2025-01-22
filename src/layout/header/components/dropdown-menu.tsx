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
            <DropdownMenuItem>Sign In</DropdownMenuItem>
            <DropdownMenuItem>Home</DropdownMenuItem>
            <DropdownMenuItem>Catalog</DropdownMenuItem>
            <DropdownMenuItem>About Us</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default HeaderDropdownMenu;
