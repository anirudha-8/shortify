import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getLongUrl } from "../db/apiUrls";
import { storeClicks } from "../db/apiClicks";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
	const { id } = useParams();

	const { loading, data, fn: fnGetLongUrl } = useFetch(getLongUrl, id);

	const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
		id: data?.id,
		original_url: data?.original_url,
	});

	useEffect(() => {
		fnGetLongUrl();
	}, []);

	useEffect(() => {
		if (!loading && data) {
			fnStats();
		}
	}, [loading]);

	useEffect(() => {
		if (!loadingStats && data?.original_url) {
			window.location.href = data.original_url;
		}
	}, [loadingStats, data]);

	if (loading || loadingStats) {
		return (
			<>
				<BarLoader width={"100%"} color="#36d7b7" />
				<br />
				Redirecting...
			</>
		);
	}

	return null;
};
export default RedirectLink;
