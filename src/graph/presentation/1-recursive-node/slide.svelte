<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
	import Graph from './graph.svelte';
</script>

<Slide animate>
	<div class="flex border-2 border-black h-[70vh]">
		<div class="border-r-2 border-black h-full">
			<Graph />
		</div>
		<ul>
			<li>React</li>
			<li>Solid</li>
			<li>Svelte</li>
			<li>Vue</li>
		</ul>
	</div>
</Slide>
