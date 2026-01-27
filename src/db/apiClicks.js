import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
	const { data, error } = await supabase
		.from("clicks")
		.select("*")
		.in("url_id", urlIds);

	if (error) {
		console.error(error.message);
		return null;
	}
	return data;
}
