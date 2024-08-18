<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
	import Graph from './graph.svelte';
</script>

<Slide animate>
	<div class="flex h-screen w-screen m-12">
		<div class="border-r-2 p-4 w-1/2">
			<Graph />
		</div>
		<div class="w-1/2">
			<div class="text-7xl font-bold mx-auto">Recursive Node</div>
		</div>
	</div>
</Slide>
