<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import BubbleteaPresentation from './bubbletea/presentation/bubbletea-presentation.svelte';
	import GraphPresentation from './graph/presentation/graph-presentation.svelte';
	import Slide from './lib/deck/slide.svelte';
</script>

<!-- together presentation -->
<Slide animate>
	<div class="text-6xl font-bold">title?</div>
</Slide>

<GraphPresentation />
<BubbleteaPresentation />
<!-- 
<Slide>
	<Slide>Vertical Slide 1</Slide>
	<Slide>Vertical Slide 2</Slide>
</Slide>

<Slide animate>
	<div class="flex flex-col h-screen w-screen">
		<Graph />
	</div>
	<ul>
		<li>React</li>
		<li>Solid</li>
		<li>Svelte</li>
		<li>Vue</li>
	</ul>
</Slide>

<Slide animate>
	<ul>
		<li>Svelte ❤️</li>
		<li>React</li>
		<li>Solid</li>
		<li>Vue</li>
	</ul>
</Slide> -->
