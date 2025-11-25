import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const [longURL, setLongURL] = useState("");

	const navigate = useNavigate();

	const handleShorten = (e) => {
		e.preventDefault();
		if (longURL) navigate(`/auth?createNew=${longURL}`);
	};

	return (
		<div className="flex flex-col items-center">
			<h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
				The only URL Shortener <br /> you&rsquo;ll ever need! 👇
			</h2>
			<form
				onSubmit={handleShorten}
				className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
			>
				<Input
					type="url"
					placeholder="Enter your loooong URL"
					value={longURL}
					onChange={(e) => setLongURL(e.target.value)}
					className="h-full flex-1 py-4 px-4"
				/>
				<Button type="submit" className="h-full" variant="destructive">
					Shorten!
				</Button>
			</form>
			<img
				src="/banner.jpeg" // replace with 2 in small screens
				className="w-full my-11 md:px-11"
			/>
		</div>
	);
};
export default Landing;
