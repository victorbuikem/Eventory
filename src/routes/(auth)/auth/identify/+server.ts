import { lucia } from '$lib/server/auth.js';
import { json, redirect } from '@sveltejs/kit';
import db from '$lib/server/prisma.js';

export const GET = async ({ locals, cookies }) => {
	const { user, session } = locals;
	console.log({ user, session });
	// if (!session && !user) return redirect(302, '/login');
	const userData = await db.user.findUnique({
		where: {
			id: user?.id
		},
		select: {
			name: true,
			email: true,
			image: true
		}
	});
	return json({ success: true, data: userData });
};
