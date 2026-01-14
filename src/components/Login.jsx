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
import { BeatLoader } from "react-spinners";

const Login = () => {
	// handling input
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

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
					<Input
						type="email"
						name="email"
						placeholder="Enter email"
						onChange={handleInputChange}
					/>
					<Error message={"Invalid Email"} />
				</div>
				<div className="space-y-1">
					<Input
						type="password"
						name="password"
						placeholder="Enter password"
						onChange={handleInputChange}
					/>
					<Error message={"Invalid Password"} />
				</div>
			</CardContent>
			<CardFooter>
				<Button>
					{true ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
				</Button>
			</CardFooter>
		</Card>
	);
};
export default Login;
