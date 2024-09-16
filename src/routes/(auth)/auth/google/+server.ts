import { google } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';
import { generateCodeVerifier, generateState } from 'arctic';

export const GET = async ({ cookies }) => {
	const state = generateState();
	const code_verifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, code_verifier, {
		scopes: ['email', 'profile']
	});

	cookies.set('google_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});
	cookies.set('google_code', code_verifier, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
};
