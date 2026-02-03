import supabase, { supabaseUrl } from "./supabase";

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

export async function createUrl(
	{ title, longUrl, customUrl, user_id },
	qrCode,
) {
	// create text for short URL
	const shortUrl = Math.random().toString(36).substring(2, 6);
	const filename = `qr-${shortUrl}`;

	const { error: storageError } = await supabase.storage
		.from("qrs")
		.upload(filename, qrCode);
	if (storageError) throw new Error(storageError.message);

	const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${filename}`;

	const { data, error } = await supabase
		.from("urls")
		.insert([
			{
				title,
				original_url: longUrl,
				custom_url: customUrl || null,
				user_id,
				short_url: shortUrl,
				qr,
			},
		])
		.select();

	if (error) {
		console.error(error.message);
		throw new Error("Error creating short URL");
	}

	return data;
}
