import { BarLoader } from "react-spinners";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Error } from "../components/Error";
import { UrlState } from "../context";
import useFetch from "../hooks/useFetch.js";
import { getUrls } from "../db/apiUrls.js";
import { getClicksForUrls } from "../db/apiClicks.js";
import LinkCard from "../components/LinkCard.jsx";

const Dashboard = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const { user } = UrlState();
	const {
		loading: loadingUrls,
		error: errorUrls,
		data: urls,
		fn: fnUrls,
	} = useFetch(getUrls, user?.id);
	const {
		loading: loadingClicks,
		error: errorClicks,
		data: clicks,
		fn: fnClicks,
	} = useFetch(
		getClicksForUrls,
		urls?.map((url) => url.id),
	);

	useEffect(() => {
		fnUrls();
	}, []);
	useEffect(() => {
		if (urls?.length) {
			console.log("URLs loaded:", urls);
			fnClicks();
		}
	}, [urls?.length]);

	const filteredUrls = urls?.filter((url) =>
		url.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
	);

	return (
		<div className="flex flex-col gap-8">
			{(loadingUrls || loadingClicks) && (
				<BarLoader width={"100%"} color="#36d7b7" />
			)}
			<div className="grid grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Links Created</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{urls?.length}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Clicks</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{clicks?.length}</p>
					</CardContent>
				</Card>
			</div>

			<div className="flex justify-between">
				<h1 className="text-4xl font-extrabold">My Links</h1>
				<Button>Create Link</Button>
			</div>

			<div className="relative">
				<Input
					type="text"
					placeholder="Filter Links..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<Filter className="absolute top-2 right-2 p-1" />
			</div>
			{errorUrls && <Error message={errorUrls.message} />}
			{errorClicks && <Error message={errorClicks.message} />}
			{(filteredUrls || []).map((url, i) => {
				return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
			})}
		</div>
	);
};
export default Dashboard;
