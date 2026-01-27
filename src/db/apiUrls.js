import supabase from "supabase";

export async function getUrls(user_id) {
	let { data, error } = await supabase
		.from("clicks")
		.select("*")
		.eq("user_id", user_id);

	if (error) {
		console.error(error.message);
		throw new Error("Unable to load URLs");
	}
	return data;
}
