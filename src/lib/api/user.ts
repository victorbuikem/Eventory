export async function getUser() {
	let res = await fetch('/auth/identify');
	let fetchData = await res.json();

	return fetchData.data;
}
