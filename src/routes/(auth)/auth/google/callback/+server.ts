import db from '$lib/server/prisma.js';
import { google, lucia } from '$lib/server/auth.js';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies, fetch }) => {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	const userState = cookies.get('google_state');
	const userCodeVerifier = cookies.get('google_code');
	if (!code || !state || !userState || !userCodeVerifier) {
		return error(400, { message: 'Invalid Credentials' });
	}

	const { accessToken } = await google.validateAuthorizationCode(code, userCodeVerifier);
	const googleResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const googleUser = await googleResponse.json();
	const existing_user = await db.user.findUnique({ where: { email: googleUser.email } });

	if (existing_user) {
		await lucia.invalidateUserSessions(existing_user.id);
		await lucia.deleteExpiredSessions();
		const session = await lucia.createSession(existing_user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	} else {
		const user = await db.user.create({
			data: {
				name: googleUser.name,
				email: googleUser.email,
				image: googleUser.picture
			}
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	return redirect(302, '/');
};
