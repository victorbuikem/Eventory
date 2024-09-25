<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { goto } from '$app/navigation';

	type $$Props = CalendarPrimitive.DayProps & { value: any[] };
	type $$Events = CalendarPrimitive.DayEvents;

	export let date: $$Props['date'];
	export let month: $$Props['month'];
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: any[] = [];
</script>

<CalendarPrimitive.Day
	on:click
	{date}
	{month}
	class={cn(
		'relative py-2 px-3 bg-white cursor-default',
		// Today
		// 'data-[today]:flex data-[today]:h-6 data-[today]:w-6 data-[today]:items-center data-[today]:justify-center data-[today]:rounded-full data-[today]:bg-indigo-600 data-[today]:font-semibold data-[today]:text-white',
		// Disabled
		'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
		// Unavailable
		'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
		// Outside months
		'data-[outside-month]:bg-gray-50 data-[outside-month]:text-gray-500 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground data-[outside-month]:pointer-events-none data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:opacity-30',
		className
	)}
	{...$$restProps}
>
	<span>{date.day}</span>
	<ol class="mt-2">
		{#each value as event}
			{#if event.month === date.month && event.day === date.day}
				<li>
					<button
						on:click={() => {
							goto(`/edit?id=${event.id}`);
						}}
						class="group flex"
					>
						<p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
							{event.name}
						</p>
						<!-- <time
							datetime="2022-01-03T10:00"
							class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
							>{event.time}</time
						> -->
					</button>
				</li>
			{/if}{/each}
	</ol>
</CalendarPrimitive.Day>
