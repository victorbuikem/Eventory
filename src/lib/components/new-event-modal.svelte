<script lang="ts">
	import { type DateValue } from '@internationalized/date';
	import { buttonVariants } from './ui/button';
	import Button from './ui/button/button.svelte';
	import * as Dialog from './ui/dialog/index';
	import DateTimeInput from './ui/input/date-time-input.svelte';
	import Input from './ui/input/input.svelte';
	import { cn } from '$lib/utils';
	import { invalidate } from '$app/navigation';

	let date: DateValue | undefined = undefined;
	let hour: number = 0;
	let minute: number = 0;
	let title = '';
	let location = '';

	const handleSubmit = async () => {
		if (!date) return;
		// Format Date String
		const formattedDate = new Date(date.year, date.month, date.day, hour, minute);
		let res = await fetch('/api/event', {
			method: 'POST',
			body: JSON.stringify({ title, location, date: formattedDate })
		});
		let data = await res.json();
		// invalidate((url) => {
		// 	console.log(url)
		// });
	};

	export let triggerVariant:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| undefined = 'default';
	export let variantClass = '';
</script>

<Dialog.Root>
	<Dialog.Trigger
		class={buttonVariants({ class: cn('ml-4', variantClass), variant: triggerVariant })}
		>Create Event</Dialog.Trigger
	>
	<Dialog.Content showX>
		<div class="max-w-[400px] relative p-1">
			<div>
				<h3 class="font-semibold leading-none tracking-tight">Create New Event</h3>
			</div>
			<div>
				<form class="mt-4 space-y-2" onsubmit={handleSubmit}>
					<label for="title">Event Title</label>
					<Input id="title" bind:value={title} placeholder="Enter a Title" />

					<label for="location">Location</label>

					<Input id="location" bind:value={location} placeholder="A location" />

					<DateTimeInput bind:hour bind:minute bind:value={date} />

					<Button class="w-full mt-4 text-md font-medium" type="submit">Submit</Button>
				</form>
			</div>
		</div></Dialog.Content
	>
</Dialog.Root>
