import { isLoggedIn } from '$lib/server/auth';
import db from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type TConfig = {
	title: string;
	desc: string;
	attributes: {
		btn_text: string;
		email_label: string;
		email_placeholder: string;
	};
	inputs: any[];
};

export const load = (async ({ url, locals }) => {
	isLoggedIn(locals);
	let event_id = url.searchParams.get('id');

	if (!event_id) error(500, '');

	// @ts-ignore
	const { config } = await db.event.findUnique({
		where: {
			id: event_id
		},
		select: {
			config: true
		}
	});

	if (!config) error(500, '');
	console.log(config);
	return {
		config: { ...config } as unknown as TConfig
	};
}) satisfies PageServerLoad;
