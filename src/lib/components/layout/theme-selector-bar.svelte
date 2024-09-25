<script lang="ts">
	import { CaretDown, CaretUp } from 'svelte-radix';
	import { spring } from 'svelte/motion';

	type TProps = {
		theme?: string;
	};
	let { theme }: TProps = $props();

	let height = spring(64);
	let open = $state(false);
	let current_theme = $state(theme);

	let themes = [
		{
			id: 'hkfjorjwspoqapqekapk',
			name: 'China Wall',
			image:
				'https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		},
		{
			id: 'krjwfhsjhwrsfjhjws',
			name: "London's Rain",
			image:
				'https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		},
		{
			id: 'rjlkjekjdkjqw',
			name: 'Lera',
			image:
				'https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		},
		{
			id: 'kjwdsjwedksjkewdjpo',
			name: 'Anmol',
			image:
				'https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		}
	];
</script>

<div
	style="height:{$height}px"
	class="bg-gray-200 overflow-hidden {open ? 'absolute' : 'relative'} z-10 w-full"
>
	<div class="flex gap-4 px-4 py-2">
		{#each themes as theme}
			<button
				onclick={() => {
					current_theme = theme.id;
				}}
				class="flex gap-px flex-col"
			>
				<div
					class="h-20 w-24 rounded-md overflow-hidden {current_theme === theme.id
						? 'ring ring-indigo-400'
						: ''} ring-offset-1"
				>
					<img alt="" src={theme.image} class="h-full w-full object-center" />
				</div>
				<span class="mx-auto">{theme.name}</span>
			</button>
		{/each}
	</div>
	<button
		onclick={() => {
			$height = open ? 64 : 140;
			open = !open;
			// alert('Opens');
		}}
		class="absolute bottom-0 h-6 inset-x-0 bg-gray-500/40 backdrop-blur-2xl flex items-center justify-center"
	>
		{#if open}
			<CaretUp />
		{:else}
			<CaretDown />
		{/if}
	</button>
</div>
