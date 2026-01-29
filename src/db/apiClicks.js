import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
	console.log("Fetching clicks for URL IDs:", urlIds);

	const { data, error } = await supabase
		.from("clicks")
		.select("*")
		.in("url_id", urlIds);

	console.log("Clicks data:", data);

	if (error) {
		console.error(error.message);
		throw new Error("Unable to load clicks!");
	}
	return data;
}
