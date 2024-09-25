import { isLoggedIn } from '$lib/server/auth.js';
import { json } from '@sveltejs/kit';
import db from '$lib/server/prisma.js';
import { nanoid } from 'nanoid';

export const POST = async ({ locals, request }) => {
	isLoggedIn(locals);
	let { name } = await request.json();

	await db.user.update({
		data: {
			name
		},
		where: {
			id: locals.user?.id
		}
	});

	return json({ success: true });
};
