import { dev } from '$app/environment';
import { Lucia } from 'lucia';
import { Google } from 'arctic';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import db from '../prisma';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'ev_auth_session',
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});

let redirectUrI = dev ? 'http://localhost:6100/auth/google/callback' : '';

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrI);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
