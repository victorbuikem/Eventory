<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import {
		type CalendarDateTime,
		DateFormatter,
		getLocalTimeZone,
		parseDateTime
	} from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let value: string | undefined = undefined;

	let in_value: CalendarDateTime;

	const df = new DateFormatter('en-US', {
		dateStyle: 'short',
		timeStyle: 'short',
		hour12: false
	});

	function upDateInnerValue(value: string | undefined) {
		if (!value) return;
		in_value = parseDateTime(value);
	}

	onMount(() => {
		upDateInnerValue(value);

		return () => {};
	});

	$: if (in_value) value = in_value.toString();

	$: upDateInnerValue(value);
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-full justify-start text-left font-normal', !in_value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{in_value ? df.format(in_value.toDate(getLocalTimeZone())) : 'mm/dd/yyyy --:--'}
		</Button>
	</Popover.Trigger>

	<Popover.Content class="w-auto p-0 flex items-center">
		<Calendar bind:value={in_value} initialFocus />
		<div class="flex gap-2 overflow-hidden h-[350px] py-2 pr-2">
			<div class="flex flex-col h-full overflow-y-auto no-scrollbar">
				{#each new Array(24) as _, index (index)}
					<Button
						on:click={() => {
							// @ts-ignore
							in_value.hour = index;
						}}
						variant={in_value.hour === index ? 'secondary' : 'ghost'}
						>{index < 10 ? '0' + index : index}</Button
					>{/each}
			</div>
			<div class="flex flex-col h-full overflow-y-auto no-scrollbar">
				{#each new Array(60) as _, index (index)}
					<Button
						on:click={() => {
							// @ts-ignore
							in_value.minute = index;
						}}
						variant={in_value.minute === index ? 'secondary' : 'ghost'}
						>{index < 10 ? '0' + index : index}</Button
					>{/each}
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
