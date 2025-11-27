import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Link2, LogOut } from "lucide-react";

const Header = () => {
	const user = false;
	const navigate = useNavigate();
	return (
		<nav className="flex justify-between items-center py-4">
			<Link to="/">
				<img src="/public/vite.svg" alt="logo" />
			</Link>
			<div>
				{!user ? (
					<Button onClick={() => navigate("/auth")}>Login</Button>
				) : (
					<DropdownMenu className="outline-0 cursor-pointer">
						<DropdownMenuTrigger className="rounded-full overflow-hidden">
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>AB</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Anya</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link2 className="w-4 h-4"></Link2>
								My Link
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LogOut className="text-red-400 w-4 h-4"></LogOut>
								<span className="text-red-400">LogOut</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</nav>
	);
};
export default Header;
