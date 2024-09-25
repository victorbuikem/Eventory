<script lang="ts">
	import ThemeSelector from '$lib/components/layout/theme-selector-bar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus } from 'lucide-svelte';
	import { DragHandleDots2, Trash } from 'svelte-radix';
	import { dndzone } from 'svelte-dnd-action';
	import type { PageData } from './$types';

	let items = [
		{ id: 1, name: 'item1' },
		{ id: 2, name: 'item2' },
		{ id: 3, name: 'item3' },
		{ id: 4, name: 'item4' }
	];
	// const { data } = $props();
	export let data: PageData;
	// console.log(data.config);
	// let event_config = $state({ ...data.config! });
	let event_config = { ...data.config! };
</script>

<div>
	<ThemeSelector />
	<div class="px-10 pt-4 flex gap-4">
		<div class="flex flex-col">
			<div class="overflow-hidden rounded-md h-[450px] w-[400px]">
				<img
					class="w-full h-full object-center"
					alt=""
					src="https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				/>
			</div>
			<div class="flex mt-4 ml-2 -space-x-2">
				{#each new Array(3) as _, index}
					<div class="h-10 w-10 rounded-full bg-sky-400 border border-black overflow-hidden">
						<img alt="" src="" class="w-full h-full object-center" />
					</div>
				{/each}
				<button
					class="h-10 w-10 rounded-full bg-gray-200 border flex items-center justify-center border-black"
				>
					<Plus />
				</button>
			</div>
		</div>
		<div class=" w-[400px]">
			<input
				bind:value={event_config.title}
				placeholder="Event Title"
				class="text-2xl w-full border-0 border-b h-12 focus-visible:ring-0 focus:outline-none focus:border-gray-800"
			/>

			<textarea
				class="w-full h-32 rounded-md resize-none px-2 py-1 mt-2 border"
				placeholder="Description"
				bind:value={event_config.desc}
			></textarea>
			<div class="my-4">
				<label for="email">{event_config.attributes.email_label}</label>
				<Input
					id="email"
					type="email"
					placeholder={event_config.attributes.email_placeholder}
					readonly
					on:click={() => {
						alert('dvmnjdnj');
					}}
					class="opacity-50 cursor-pointer"
				/>
				<div>
					<span>Additional Inputs</span>

					<!-- {#if event_config.inputs}
				{#each event_config.inputs as input} 
					<div
						use:dndzone={{ items }}
						on:consider={() => {}}
						on:finalize={() => {}}
						class="flex flex-col gap-2 mt-2"
					>
						{#each items as input (input.id)}
							<div
								class="w-full h-12 bg-white rounded-md border border-black flex gap-2 items-center justify-between"
							>
								<div class="flex items-center gap-1">
									<DragHandleDots2 class="h-full" />
									<div class="text-sm">
										<p class="font-bold">Input Name</p>
										<p>Input Label</p>
									</div>
								</div>
								<Button size="icon" variant="ghost" class="mr-2">
									<Trash class="h-6" />
								</Button>
							</div>
						{/each}
					</div> -->
				</div>
				<Button class="mt-2 w-full" variant="outline">
					<Plus />
					<span>Add Input</span>
				</Button>
			</div>
			<Button class="w-full">{event_config.attributes.btn_text}</Button>
		</div>
	</div>
</div>
