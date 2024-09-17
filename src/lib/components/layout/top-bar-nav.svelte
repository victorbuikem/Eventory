<script lang="ts">
	import type { User } from 'lucia/dist/core';
	import * as DropdownMenu from '../ui/dropdown-menu/index.js';
	import * as Avatar from '../ui/avatar/index.js';
	import Button from '../ui/button/button.svelte';
	import { buttonVariants } from '../ui/button/index.js';

	type TProps = {
		user: User | null;
	};

	const { user }: TProps = $props();
</script>

<div class="border-b">
	<div class="flex h-16 items-center px-10">
		<!-- <TeamSwitcher /> -->
		<nav class="flex items-center space-x-4 lg:space-x-6 mx-6">
			<a href="/" class="hover:text-primary text-sm font-medium transition-colors"> Calendar </a>

			<a
				href="/events"
				class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
			>
				Events
			</a>
			<!-- <a
				href="/examples/dashboard"
				class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
			>
				Products
			</a>
			<a
				href="/examples/dashboard"
				class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
			>
				Settings
			</a> -->
		</nav>
		<div class="ml-auto flex items-center space-x-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src={user?.image} alt="@shadcn" />
							<Avatar.Fallback>{user?.name.slice(0, 2) ?? user?.id}</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56" align="end">
					<DropdownMenu.Label class="font-normal">
						<div class="flex flex-col space-y-1">
							<p class="text-sm font-medium leading-none">{user?.name ?? user?.id}</p>
							<p class="text-muted-foreground text-xs leading-none">{user?.email}</p>
						</div>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Item>Billing</DropdownMenu.Item>
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item asChild>
						<a
							href="/auth/logout"
							class={buttonVariants({ variant: 'destructive', class: 'w-full' })}
						>
							Log out
						</a>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</div>
