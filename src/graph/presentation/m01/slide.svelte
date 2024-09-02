<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
	import Graph from './graph.svelte';
	import Hypernode from './hypernode.png';
	import Higraph from './higraph.png';
	import ArahImage from './arah.png';
</script>

<Slide>
	<h1 class="text-5xl font-bold">Nested Node</h1>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Nested Node</h1>
	<div class="flex">
		<div class="y-full my-auto text-left">
			<div class="mb-8">
				<div class="text-3xl">Hypernode Model</div>
				<div class="mt-4 text-xl">untuk graph dengan node yang merupakan graph juga</div>
			</div>
			<div class="text-md">(Poulovassilis & Levene, 1994)</div>
		</div>
		<div>
			<img src={Hypernode} alt="graph" class="" />
		</div>
	</div>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Nested Node</h1>
	<div class="flex">
		<div class="y-full my-auto w-1/2 text-left">
			<div class="mb-8">
				<div class="text-3xl">Higraph</div>
			</div>
			<div class="text-md">(Harel, 1988)</div>
		</div>
		<div>
			<img src={Higraph} alt="graph" class="mx-auto w-3/4 object-contain" />
		</div>
	</div>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Nested Node</h1>
	<div class="flex h-[50vh] w-full">
		<div class="flex-1">
			<Graph />
		</div>
	</div>
</Slide>

<Slide>
	<h1 class="text-5xl font-bold">Arah Sisi Berwarna</h1>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Arah Sisi Berwarna</h1>
	<div class="flex">
		<div class="y-full my-auto w-1/2 text-left">
			<div class="mb-8">
				<div class="mt-4 text-xl">
					menggunakan panah, menggunakan intensitas, penggunaan warna, dan lekukan sisi
				</div>
			</div>
			<div class="text-md">Holten dan van Wijk (2009)</div>
		</div>
		<div>
			<img src={ArahImage} alt="graph" class="mx-auto w-3/4 object-contain" />
		</div>
	</div>
</Slide>
