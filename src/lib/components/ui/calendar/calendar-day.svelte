<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = CalendarPrimitive.DayProps;
	type $$Events = CalendarPrimitive.DayEvents;

	export let date: $$Props['date'];
	export let month: $$Props['month'];
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Day
	on:click
	{date}
	{month}
	class="flex flex-col group-parent"
	{...$$restProps}
	let:selected
	let:disabled
	let:unavailable
	let:builder
>
	<div class={cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-8 p-0 font-normal')}>
		{date.day}
	</div>
	<slot {selected} {disabled} {unavailable} {builder} />
</CalendarPrimitive.Day>
