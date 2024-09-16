import { error, json, redirect } from '@sveltejs/kit';
import db from '$lib/server/prisma.js';
import { lucia } from '$lib/server/auth.js';
import { hash } from '@node-rs/argon2';
import * as z from 'zod';

const SignUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Password should be a minimum of 8 Characters')
});

export const POST = async ({ locals, request, cookies }) => {
	const { email, password } = SignUpSchema.parse(await request.json());

	// Hash Password
	const hashed_password = await hash(password);

	const existing_user = await db.user.findUnique({
		where: {
			email
		}
	});

	if (existing_user) return json({ error: 'Not Allowed', success: false });

	const user = await db.user.create({
		data: {
			email,
			hashed_password // Hashed Password
		},
		select: {
			id: true,
			name: true,
			email: true,
			image: true
		}
	});

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	return redirect(302, '/');
};
