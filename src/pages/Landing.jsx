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
		</div>
	);
};
export default Landing;
