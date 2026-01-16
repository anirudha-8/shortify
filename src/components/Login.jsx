import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Error } from "./Error";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { login } from "../db/apiAuth";

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

	// using custom hook
	const { data, loading, error, fn: fnLogin } = useFetch(login, formData);

	// handle input validations using "Yup"
	const [errors, setErrors] = useState({});
	const handleLogin = async () => {
		setErrors([]);
		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.email("Invalid Email!")
					.required("Email is required!"),
				password: Yup.string()
					.min(6, "Password must be at least 6 characters!")
					.required("Password is required!"),
			});

			await schema.validate(formData, { abortEarly: false });

			await fnLogin();
		} catch (e) {
			const newErrors = {};

			e?.inner?.forEach((err) => {
				newErrors[err.path] = err.message;
			});

			setErrors(newErrors);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					to your account if you already have one
				</CardDescription>
				{error && <Error message={error.message} />}
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="space-y-1">
					<Input
						type="email"
						name="email"
						placeholder="Enter email"
						onChange={handleInputChange}
					/>
					{errors.email && <Error message={errors.email} />}
				</div>
				<div className="space-y-1">
					<Input
						type="password"
						name="password"
						placeholder="Enter password"
						onChange={handleInputChange}
					/>
					{errors.password && <Error message={errors.password} />}
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={handleLogin}>
					{loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
				</Button>
			</CardFooter>
		</Card>
	);
};
export default Login;
