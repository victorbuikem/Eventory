<script lang="ts">
	import { CalendarIcon } from 'lucide-svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	export let value: DateValue | undefined = undefined;
	export let hour: number = 0;
	export let minute: number = 0;
</script>

<Popover.Root>
	<div class="flex flex-col gap-2">
		<span>Event Start</span>

		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				class={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{value
					? `${df.format(value.toDate(getLocalTimeZone()))} - ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
					: 'Pick a date'}
			</Button>
		</Popover.Trigger>
	</div>

	<Popover.Content class="w-auto p-0 flex items-center">
		<Calendar bind:value initialFocus />
		<div class="flex gap-2 overflow-hidden h-[350px] py-2">
			<div class="flex flex-col h-full overflow-y-auto no-scrollbar">
				{#each new Array(24) as _, index (index)}
					<Button
						on:click={() => {
							hour = index;
						}}
						variant={hour === index ? 'default' : 'ghost'}
						>{index < 10 ? '0' + index : index}</Button
					>{/each}
			</div>
			<div class="flex flex-col h-full overflow-y-auto no-scrollbar">
				{#each new Array(60) as _, index (index)}
					<Button
						on:click={() => {
							minute = index;
						}}
						variant={minute === index ? 'default' : 'ghost'}
						>{index < 10 ? '0' + index : index}</Button
					>{/each}
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
