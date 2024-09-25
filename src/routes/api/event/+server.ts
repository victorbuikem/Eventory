import { isLoggedIn } from '$lib/server/auth.js';
import { json } from '@sveltejs/kit';
import db from '$lib/server/prisma.js';
import { nanoid } from 'nanoid';

export const POST = async ({ locals, request }) => {
	isLoggedIn(locals);
	let { title, location, date } = await request.json();

	await db.event.create({
		data: {
			name: title,
			location,
			time: date,
			slug: nanoid(8),
			userId: locals.user?.id,
			config: {
				title: '',
				desc: 'What is this event about?',
				attributes: {
					btn_text: 'Submit',
					email_label: 'Email',
					email_placeholder: 'john@doe.com'
				}
			}
		}
	});

	return json({ success: true });
};
