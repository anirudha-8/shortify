import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../context";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Error } from "./Error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import QRCode from "react-qrcode-logo";
import useFetch from "../hooks/useFetch";
import { createUrl } from "../db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
	const { user } = UrlState();

	const ref = useRef();

	const navigate = useNavigate();
	let [searchParams, setSearchParams] = useSearchParams();
	const longLink = searchParams.get("createNew");

	const [errors, setErrors] = useState({});
	const [formValues, setFormValues] = useState({
		title: "",
		longUrl: longLink ? longLink : "",
		customUrl: "",
	});

	const schema = yup.object().shape({
		title: yup.string().required("Title is required!"),
		longUrl: yup
			.string()
			.url("Must be valid URL!")
			.required("Long URL is required!"),
		customUrl: yup.string(),
	});

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.id]: e.target.value });
	};

	const {
		loading,
		data,
		error,
		fn: fnCreateUrl,
	} = useFetch(createUrl, { ...formValues, user_id: user.id });

	useEffect(() => {
		if (error === null && data) navigate(`/link/${data[0].id}`);
	}, [error, data]);

	const createNewLink = async () => {
		setErrors([]);
		try {
			await schema.validate(formValues, { abortEarly: false });
			const canvas = ref.current.canvasRef.current;
			const blob = await new Promise((resolve) => canvas.toBlob(resolve));

			await fnCreateUrl(blob);
		} catch (error) {
			const newErrors = [];

			error?.inner?.forEach((err) => {
				newErrors[err.path] = err.message;
			});

			setErrors(newErrors);
		}
	};

	return (
		<Dialog
			defaultOpen={longLink}
			onOpenChange={(res) => {
				if (!res) setSearchParams({});
			}}
		>
			{/* The hydration error caused by nested <button> elements should be resolved. The asChild prop on DialogTrigger allows the Button component to act as the dialog trigger without creating an additional button wrapper. */}
			<DialogTrigger asChild>
				<Button variant={"destructive"}>Create New Link</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
				</DialogHeader>

				{formValues?.longUrl && (
					<QRCode value={formValues?.longUrl} size={150} ref={ref} />
				)}

				<Input
					id="title"
					placeholder="Short Link's Title"
					value={formValues.title}
					onChange={handleChange}
				/>
				{errors.title && <Error message={errors.title} />}

				<Input
					id="longUrl"
					placeholder="Enter your looong URL"
					value={formValues.longUrl}
					onChange={handleChange}
				/>
				{errors.longUrl && <Error message={errors.longUrl} />}
				<div className="flex items-center gap-2">
					<Card className={"p-2"}>shortify.com</Card>/
					<Input
						id="customUrl"
						placeholder="Custom Link (Optional)"
						value={formValues.customUrl}
						onChange={handleChange}
					/>
				</div>
				{/* There is no custom error message for customUrl as it is optional */}
				{/* So, here we'll provide the overall form error */}
				{error && <Error message={error.message} />}

				<DialogFooter className="sm:justify-start">
					<Button
						disabled={loading}
						onClick={createNewLink}
						type="submit"
						variant={"destructive"}
					>
						{loading ? <BeatLoader size={10} color="white" /> : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default CreateLink;
