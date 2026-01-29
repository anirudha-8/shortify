import supabase from "./supabase";

export async function getUrls(user_id) {
	console.log("Fetching URLs for user ID:", user_id);
	let { data, error } = await supabase
		.from("urls")
		.select("*")
		.eq("user_id", user_id);

	console.log("URLs data:", data);
	if (error) {
		console.error(error.message);
		throw new Error("Unable to load URLs");
	}
	return data;
}
