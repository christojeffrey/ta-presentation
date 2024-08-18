<script lang="ts">
	export let id: string | null = null;
	export let animate = true;
	export let restart = false;
	// image background
	export let image: string | null = null;
</script>

<section
	data-auto-animate-id={id}
	data-auto-animate={animate || null}
	data-auto-animate-restart={restart || null}
	data-background-image={image || null}
>
	<slot />
</section>
