import { lucia } from '$lib/server/auth.js';
import { json, redirect } from '@sveltejs/kit';
import db from '$lib/server/prisma.js';
import { verify } from '@node-rs/argon2';

export const POST = async ({ locals, cookies, request }) => {
	const { email, password } = await request.json();

	// Check User
	const user = await db.user.findUnique({
		where: {
			email
		}
	});

	if (!user) {
		return json(
			{ error: 'Invalid Credentials', success: true },
			{
				status: 401
			}
		);
	}

	const verify_password = verify(user.hashed_password, password);

	if (!verify_password) {
		return json(
			{ error: 'Invalid Credentials', success: true },
			{
				status: 401
			}
		);
	}
	await lucia.invalidateUserSessions(user.id);
	await lucia.deleteExpiredSessions();
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	return redirect(302, '/');
};
