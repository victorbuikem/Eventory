<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import Calendar from '$lib/components/calendar-admin.svelte';

	let value = today(getLocalTimeZone());
</script>

<div class="rounded-md h-[500px]">
	<Calendar />
</div>
