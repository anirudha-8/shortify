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

export async function deleteUrl(id) {
	console.log("Deleting URL of id: ", id);

	const { data, error } = await supabase.from("urls").delete().eq("id", id);

	console.log("Deleted URL id: ", id);

	if (error) {
		console.error(error.message);
		throw new Error("Unable to delete URL");
	}

	return data;
}
