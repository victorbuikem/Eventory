<script lang="ts">
	import NewEventModal from '$lib/components/new-event-modal.svelte';
	import CalendarDay from '$lib/components/ui/calendar/calendar-day-admin.svelte';
	import * as Calendar from '$lib/components/ui/calendar/index.js';
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let { data } = $props();
</script>

<CalendarPrimitive.Root
	weekdayFormat="short"
	class="lg:flex lg:h-full lg:flex-col"
	let:months
	let:weekdays
>
	<Calendar.Header
		class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none"
	>
		<Calendar.Heading class="text-base font-semibold leading-6 text-gray-900" />
		<div class="flex items-center">
			<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
				<Calendar.PrevButton
					type="button"
					class="flex h-9 w-12 items-center justify-center rounded-none rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
				/>

				<button
					type="button"
					class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
					>Today</button
				>
				<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
				<Calendar.NextButton
					type="button"
					class="flex h-9 w-12 items-center justify-center rounded-none rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
				/>
			</div>
			<div class="hidden md:flex md:items-center">
				<div class="ml-4 h-6 w-px bg-gray-300"></div>
				<NewEventModal />
			</div>
			<div class="relative ml-6 md:hidden">
				<button
					type="button"
					class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
					id="menu-0-button"
					aria-expanded="false"
					aria-haspopup="true"
				>
					<span class="sr-only">Open menu</span>
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
						/>
					</svg>
				</button>
				<div
					class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-0-button"
					tabindex="-1"
				>
					<div class="py-1" role="none">
						<NewEventModal triggerVariant="secondary" variantClass="text-sm text-gray-700" />
					</div>
					<div class="py-1" role="none">
						<button
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-0-item-1">Go to today</button
						>
					</div>
				</div>
			</div>
		</div>
	</Calendar.Header>
	<div class="relative shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
		<!-- <div class="absolute inset-0 z-10"></div> -->
		{#each months as month}
			<div
				class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
			>
				{#each weekdays as weekday}
					<div class="flex justify-center bg-white py-2">
						{weekday}
					</div>
				{/each}
			</div>
			<div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto ml-0">
				<div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
					{#each month.weeks as weekDates}
						{#each weekDates as date}
							<CalendarDay
								class="relative bg-gray-50 px-3 py-2 text-gray-500"
								{date}
								month={month.value}
								value={data.events}
							/>
						{/each}
					{/each}
				</div>
				<div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
					<!--
			Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
			Is current month, include: "bg-white"
			Is not current month, include: "bg-gray-50"
			Is selected or is today, include: "font-semibold"
			Is selected, include: "text-white"
			Is not selected and is today, include: "text-indigo-600"
			Is not selected and is current month, and is not today, include: "text-gray-900"
			Is not selected, is not current month, and is not today: "text-gray-500"
		  -->
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<!--
			  Always include: "ml-auto"
			  Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
			  Is selected and is today, include: "bg-indigo-600"
			  Is selected and is not today, include: "bg-gray-900"
			-->
						<time datetime="2021-12-27" class="ml-auto">27</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2021-12-28" class="ml-auto">28</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2021-12-29" class="ml-auto">29</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2021-12-30" class="ml-auto">30</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2021-12-31" class="ml-auto">31</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-01" class="ml-auto">1</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-02" class="ml-auto">2</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-03" class="ml-auto">3</time>
						<span class="sr-only">2 events</span>
						<span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
						</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-04" class="ml-auto">4</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-05" class="ml-auto">5</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-06" class="ml-auto">6</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-07" class="ml-auto">7</time>
						<span class="sr-only">1 event</span>
						<span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
						</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-08" class="ml-auto">8</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-09" class="ml-auto">9</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-10" class="ml-auto">10</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-11" class="ml-auto">11</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-12" class="ml-auto">12</time>
						<span class="sr-only">1 event</span>
						<span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
						</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-13" class="ml-auto">13</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-14" class="ml-auto">14</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-15" class="ml-auto">15</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-16" class="ml-auto">16</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-17" class="ml-auto">17</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-18" class="ml-auto">18</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-19" class="ml-auto">19</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-20" class="ml-auto">20</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-21" class="ml-auto">21</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10"
					>
						<time
							datetime="2022-01-22"
							class="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900"
							>22</time
						>
						<span class="sr-only">2 events</span>
						<span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
						</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-23" class="ml-auto">23</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-24" class="ml-auto">24</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-25" class="ml-auto">25</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-26" class="ml-auto">26</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-27" class="ml-auto">27</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-28" class="ml-auto">28</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-29" class="ml-auto">29</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-30" class="ml-auto">30</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-01-31" class="ml-auto">31</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-02-01" class="ml-auto">1</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-02-02" class="ml-auto">2</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-02-03" class="ml-auto">3</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-02-04" class="ml-auto">4</time>
						<span class="sr-only">1 event</span>
						<span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
							<span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
						</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-02-05" class="ml-auto">5</time>
						<span class="sr-only">0 events</span>
					</button>
					<button
						type="button"
						class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
					>
						<time datetime="2022-02-06" class="ml-auto">6</time>
						<span class="sr-only">0 events</span>
					</button>
				</div>
			</div>
		{/each}
	</div>
	<div class="px-4 py-10 sm:px-6 lg:hidden">
		<ol
			class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
		>
			<li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
				<div class="flex-auto">
					<p class="font-semibold text-gray-900">Maple syrup museum</p>
					<time datetime="2022-01-15T09:00" class="mt-2 flex items-center text-gray-700">
						<svg
							class="mr-2 h-5 w-5 text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
								clip-rule="evenodd"
							/>
						</svg>
						3PM
					</time>
				</div>
				<a
					href="#"
					class="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
					>Edit<span class="sr-only">, Maple syrup museum</span></a
				>
			</li>
			<li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
				<div class="flex-auto">
					<p class="font-semibold text-gray-900">Hockey game</p>
					<time datetime="2022-01-22T19:00" class="mt-2 flex items-center text-gray-700">
						<svg
							class="mr-2 h-5 w-5 text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
								clip-rule="evenodd"
							/>
						</svg>
						7PM
					</time>
				</div>
				<a
					href="#"
					class="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
					>Edit<span class="sr-only">, Hockey game</span></a
				>
			</li>
		</ol>
	</div>
</CalendarPrimitive.Root>

<!-- <div class="">
	
		<Calendar.Months class="relative mt-0 space-y-0 mx-auto">
			{#each months as month}
				<Calendar.Grid>
					
					<Calendar.GridBody>
						{#each month.weeks as weekDates}
							<Calendar.GridRow class="mt-2 w-full grid grid-cols-7 gap-px ">
								{#each weekDates as date}
									<Calendar.Cell
										class="h-[90px] relative py-2 px-3 bg-gray-200 text-left p-1 [&:has([data-outside-month])]:bg-accent/50"
										{date}
									>
										<CalendarDay class="" {date} month={month.value}>
											<ol class="h-10 overflow-hidden">
												{#each data.events as event}
													{#if event.month === date.month && event.day === date.day}
														<li class="truncate">{event.title}</li>
													{/if}
												{/each}
											</ol>
										</CalendarDay>
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</Calendar.Months>
	</CalendarPrimitive.Root>
</div> -->
