<script lang="ts">
	import Topbar from '$lib/components/layout/top-bar-nav.svelte';
	import OnboardingModal from '$lib/components/onboarding-modal.svelte';

	const { children, data } = $props();
</script>

<!-- <OnboardingModal user={data.user} /> -->
<Topbar user={data.user} />
{@render children()}
