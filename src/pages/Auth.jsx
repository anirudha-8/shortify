import { useSearchParams } from "react-router-dom";

const Auth = () => {
	const [searchParams] = useSearchParams();
	return (
		<div className="mt-36 flex flex-col items-center gap-10">
			<h1 className="text-5xl font-extrabold">
				{searchParams.get("createNew")
					? "Hold up! Let's login first..."
					: "Login / Sign Up"}
			</h1>
		</div>
	);
};
export default Auth;
