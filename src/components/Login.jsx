import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Error } from "./Error";

const Login = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					to your account if you already have one
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="space-y-1">
					<Input type="email" name="email" placeholder="Enter email" />
					<Error message={"Invalid Email"} />
				</div>
				<div className="space-y-1">
					<Input type="password" name="password" placeholder="Enter password" />
					<Error message={"Invalid Password"} />
				</div>
			</CardContent>
			<CardFooter>
				<Button>Login</Button>
			</CardFooter>
		</Card>
	);
};
export default Login;
