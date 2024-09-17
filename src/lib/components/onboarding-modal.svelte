<script lang="ts">
	import type { User } from 'lucia/dist/core';

	type TProps = {
		user: User | null;
	};

	const { user }: TProps = $props();
</script>

{#if !user?.name}
	<p>mdv</p>
{/if}
