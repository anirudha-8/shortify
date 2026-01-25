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
import { UrlState } from "../context";
import useFetch from "../hooks/useFetch";
import { logOut } from "../db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
	const { user, fetchUser } = UrlState();

	const navigate = useNavigate();

	const { loading, fn: fnLogOut } = useFetch(logOut);
	return (
		<>
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
									<AvatarImage
										src={user?.user_metadata?.profile_pic}
										className="object-contain"
									/>
									<AvatarFallback>AB</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									{user?.user_metadata?.name}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link2 className="w-4 h-4"></Link2>
									My Link
								</DropdownMenuItem>
								<DropdownMenuItem>
									<LogOut className="text-red-400 w-4 h-4"></LogOut>
									<span
										className="text-red-400"
										onClick={() => {
											fnLogOut().then(() => {
												fetchUser();
												navigate("/");
											});
										}}
									>
										LogOut
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</nav>
			{loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
		</>
	);
};
export default Header;
