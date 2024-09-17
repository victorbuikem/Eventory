import { isLoggedIn } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// isLoggedIn(locals, true);
	return {};
}) satisfies PageServerLoad;
