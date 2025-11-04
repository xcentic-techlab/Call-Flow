import { LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileMenuProps {
  user: { name: string; email: string } | null;
}

export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-gray-400/50 rounded-full">
        <Avatar className="h-11 w-11 border-2 border-gray-400/30 hover:border-gray-500/60 transition-all duration-300 cursor-pointer shadow-md hover:shadow-gray-400/30">
          <AvatarFallback className="bg-gray-700 text-white font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg rounded-xl"
      >
        <DropdownMenuLabel>
          <div
            className="flex flex-col space-y-1 
                      text-gray-800"
          >
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs opacity-70">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/20" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-400 focus:text-red-500 focus:bg-red-500/10 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
