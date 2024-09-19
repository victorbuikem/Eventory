import { isLoggedIn } from '$lib/server/auth';
import type { PageServerLoad } from './$types';
import db from '$lib/server/prisma';

export const load = (async ({ locals }) => {
	isLoggedIn(locals);

	const Events = await db.event.findMany({
		where: {
			userId: locals.user?.id
		},
		select: {
			title: true,
			time: true
		}
	});

	// format the date string to extract month and day and add it to the events object

	const formatEvent = (events: typeof Events) => {
		return events.map((value) => {
			const event_date = new Date(value.time);
			return {
				...value,
				month: event_date.getMonth(),
				day: event_date.getDate(),
				time: event_date.getHours()
			};
		});
	};
	return {
		events: formatEvent(Events)
	};
}) satisfies PageServerLoad;
