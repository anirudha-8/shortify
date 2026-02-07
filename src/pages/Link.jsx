import { useNavigate, useParams } from "react-router-dom";
import { UrlState } from "../context";
import useFetch from "../hooks/useFetch";
import { deleteUrl, getUrl } from "../db/apiUrls";
import { getClicksForUrl } from "../db/apiClicks";
import { BarLoader, BeatLoader } from "react-spinners";
import { useEffect } from "react";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import LocationStats from "../components/LocationStats";

const Link = () => {
	const downloadImage = async () => {
		const imageUrl = url?.qr;
		const fileName = url?.title;

		try {
			const response = await fetch(imageUrl);
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			const anchor = document.createElement("a");
			anchor.href = blobUrl;
			anchor.download = `${fileName}.png`;

			document.body.appendChild(anchor);

			// to simulate download
			anchor.click();

			document.body.removeChild(anchor);
			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Download failed:", error);
		}
	};

	const navigate = useNavigate();

	const { id } = useParams();

	const { user } = UrlState();

	const {
		loading: loadingUrl,
		data: url,
		error: urlError,
		fn: fnGetUrl,
	} = useFetch(getUrl, { id, user_id: user?.id });

	const {
		loading: loadingStats,
		data: stats,
		fn: fnStats,
	} = useFetch(getClicksForUrl, id);

	const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

	useEffect(() => {
		fnGetUrl();
		fnStats();
	}, []);

	if (urlError) {
		navigate("/dashboard");
	}

	let link = "";
	if (url) {
		link = url?.custom_url ? url?.custom_url : url?.short_url;
	}

	return (
		<>
			{(loadingUrl || loadingStats) && (
				<BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
			)}

			<div className="flex flex-col gap-8 sm:flex-row justify-between">
				{/* URL Details */}
				<div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
					<span className="text-6xl font-extrabold hover:underline cursor-pointer">
						{url?.title}
					</span>

					<a
						href={`https://shortify.com/${link}`}
						target="_blank"
						className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
					>{`https://shortify.com/${link}`}</a>

					<a
						href={url?.original_url}
						target="_blank"
						className="flex items-center gap-1 hover:underline cursor-pointer"
					>
						<LinkIcon className="p-1" /> {url?.original_url}
					</a>

					<span className="flex items-end font-extralight text-sm">
						{new Date(url?.created_at).toLocaleString()}
					</span>

					<div>
						<Button
							variant="ghost"
							className="cursor-pointer"
							onClick={() =>
								navigator.clipboard.writeText(
									`${import.meta.env.VITE_SHORT_URL}/${url?.short_url}`,
								)
							}
						>
							<Copy />
						</Button>
						<Button variant="ghost" onClick={downloadImage}>
							<Download />
						</Button>
						<Button variant="ghost" onClick={() => fnDelete()}>
							{loadingDelete ? (
								<BeatLoader size={5} color="white" />
							) : (
								<Trash />
							)}
						</Button>
					</div>

					<img
						src={url?.qr}
						alt="QR Code Image"
						className="h-48 self-center sm:self-start ring ring-blue-500 p-1 object-contain"
					/>
				</div>

				{/* Stats Details */}
				<Card className="sm:w-3/5">
					<CardHeader>
						<CardTitle className={"text-4xl font-extrabold"}>Stats</CardTitle>
					</CardHeader>
					{stats && stats.length ? (
						<CardContent className={"flex flex-col gap-6"}>
							<Card>
								<CardHeader>
									<CardTitle>Total Clicks</CardTitle>
									<CardContent>{stats?.length}</CardContent>
								</CardHeader>
							</Card>

							<CardTitle>Location Data</CardTitle>
							<LocationStats stats={stats} />

							<CardTitle>Device Info</CardTitle>
							{/* <DeviceStats stats={stats} /> */}
						</CardContent>
					) : (
						<CardContent>
							{loadingStats === false
								? "No statistics yet!"
								: "Loading statistics..."}
						</CardContent>
					)}
				</Card>
			</div>
		</>
	);
};
export default Link;
