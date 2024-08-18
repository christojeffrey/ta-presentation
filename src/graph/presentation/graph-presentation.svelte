<script>
	import Slide from '$lib/deck/slide.svelte';
	import RecursiveNode from './1-recursive-node/slide.svelte';
	import BackgroundVideo from './graph.mp4';
</script>

<section
	data-background-video={BackgroundVideo}
	data-background-video-loop
	data-background-video-muted
	data-auto-animate="true"
>
	<div class="h-screen flex justify-end relative">
		<div class="absolute h-screen w-screen bg-black opacity-15"></div>
		<div class="h-full w-1/2 text-6xl font-bold bg-white z-10 relative">Graph Visualization</div>
	</div>
</section>

<RecursiveNode />
