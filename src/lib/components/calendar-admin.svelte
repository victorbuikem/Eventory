<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import NewEventModal from './new-event-modal.svelte';
	import CalendarDay from './ui/calendar/calendar-day-admin.svelte';
	import * as Calendar from './ui/calendar/index.js';

	type $$Props = CalendarPrimitive.Props;
	type $$Events = CalendarPrimitive.Events;

	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class="lg:flex lg:h-full lg:flex-col">
	<CalendarPrimitive.Root
		bind:value
		bind:placeholder
		{weekdayFormat}
		class={cn('p-3', className)}
		{...$$restProps}
		on:keydown
		let:months
		let:weekdays
	>
		<Calendar.Header
			class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none"
		>
			<Calendar.Heading />
			<div>
				<div class="flex items-center">
					<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
						<Calendar.PrevButton
							class="flex h-9 w-12 items-center justify-center rounded-l-md rounded-r-none border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
						/>
						<button
							class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
							>Today</button
						>
						<Calendar.NextButton
							class="flex h-9 w-12 items-center justify-center rounded-l-none  border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
						/>
					</div>
					<div class="w-px h-6 ml-4 bg-gray-600"></div>
					<NewEventModal />
				</div>
			</div>
		</Calendar.Header>
		<Calendar.Months class="relative mt-0 space-y-0 mx-auto">
			<div class="absolute inset-0 z-10"></div>
			{#each months as month}
				<Calendar.Grid>
					<Calendar.GridHead>
						<Calendar.GridRow
							class="grid grid-cols-7 h-8 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
						>
							{#each weekdays as weekday}
								<Calendar.HeadCell class="bg-white w-full rounded-none">
									{weekday.slice(0, 3)}
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as weekDates}
							<Calendar.GridRow class="mt-2 w-full grid grid-cols-7 gap-px ">
								{#each weekDates as date}
									<Calendar.Cell
										class="h-[90px] relative py-2 px-3 bg-gray-200 text-left p-1 [&:has([data-outside-month])]:bg-accent/50"
										{date}
									>
										<CalendarDay class="" {date} month={month.value}>
											<ol>
												<li>Event 1</li>
												<li>Event 2</li>
												<!-- <li>Event 3</li -->
											</ol>
										</CalendarDay>
										<!-- <div>
											{date.day}
											<ol>
												<li>Event 1</li>
												<li>Event 2</li>
												<li>Event 3</li>
											</ol>
										</div> -->
										<!-- </Calendar.Day> -->
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</Calendar.Months>
	</CalendarPrimitive.Root>
</div>
