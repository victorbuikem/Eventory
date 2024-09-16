<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import AuthLayout from '$lib/components/layout/auth-layout.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let email = $state('');
	let password = $state('');

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const res = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();
	};
</script>

<AuthLayout>
	<div class="absolute top-0 right-4 mt-4 text-center text-sm text-gray-500">
		<a href="/signup" class={buttonVariants()}>Create your Account</a>
	</div>

	{#snippet header()}
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Sign into your account
		</h2>
		<p>Start managing your online and physical events in one place</p>
	{/snippet}

	<form class="space-y-6" onsubmit={handleSubmit}>
		<div>
			<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
				>Email address</label
			>
			<div class="mt-2">
				<Input bind:value={email} id="email" name="email" type="email" required />
			</div>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
				>Password</label
			>
			<div class="mt-2">
				<Input bind:value={password} id="password" name="password" type="password" required />
			</div>
		</div>

		<div>
			<Button type="submit" class="bg-orange-500  hover:bg-orange-300 w-full">Sign In</Button>
		</div>
	</form>
</AuthLayout>
