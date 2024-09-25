<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import DateTimeInput from '$lib/components/ui/input/date-time-input.svelte';

	let input = $state({
		local: '', // 2024-09-12T21:39
		built: '2024-09-12T21:39'
	});
</script>

DateTime = {JSON.stringify(input.built)}

<Input bind:value={input.built} />
<div class="flex gap-2 items-center">
	<div>
		<span>Native Date Input</span>
		<input
			type="datetime-local"
			class="border-input h-9 w-full rounded-md border px-2"
			bind:value={input.built}
			placeholder="Pick a date"
		/>
	</div>
	<div>
		<span>Custom Date Input</span>
		<DateTimeInput bind:value={input.built} />
	</div>
</div>
