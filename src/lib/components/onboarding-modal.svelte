<script lang="ts">
	import type { User } from 'lucia/dist/core';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from './ui/input';
	import Button from './ui/button/button.svelte';

	type TProps = {
		user: User | null;
	};

	const { user }: TProps = $props();

	let name = $state('');
	let open = $state(true);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const res = await fetch('/api/me/name', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
		const data = await res.json();
		if (res.ok) {
			open = false;
		} else {
			console.error(data);
		}
	}
</script>

{#if !user?.name}
	<Dialog.Root {open} closeOnOutsideClick={false} closeOnEscape={false}>
		<Dialog.Content showX={false}>
			<Dialog.Header class="mx-4">
				<Dialog.Title>Please Input Your name?</Dialog.Title>
				<p>I am Eventory. I would like to know you more what is your name?</p>
				<Dialog.Description>
					<form onsubmit={handleSubmit} class="space-y-4">
						<Input bind:value={name} placeholder="Victor Kalu" />
						<Button type="submit" class="w-full">Submit</Button>
					</form>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{/if}
