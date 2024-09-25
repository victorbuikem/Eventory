<script lang="ts">
	import Topbar from '$lib/components/layout/top-bar-nav.svelte';
	import OnboardingModal from '$lib/components/onboarding-modal.svelte';

	const { children, data } = $props();
</script>

<div class="h-full relative">
	<OnboardingModal user={data.user} />
	{#if data.user}
		<Topbar user={data.user} />
	{/if}
	{@render children()}
</div>
