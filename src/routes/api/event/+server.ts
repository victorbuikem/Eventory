import { isLoggedIn } from '$lib/server/auth.js';
import { json } from '@sveltejs/kit';
import db from '$lib/server/prisma.js';
import { nanoid } from 'nanoid';

export const POST = async ({ locals, request }) => {
	isLoggedIn(locals);
	let { title, location, date } = await request.json();

	await db.event.create({
		data: {
			title,
			location,
			time: date,
			invite_page: {},
			slug: nanoid(8),
			userId: locals.user?.id
		}
	});

	return json({ success: true });
};
