<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
	import Graph from './graph.svelte';
	import FirstImage from './first.png';
	import SecondImage from './second.png';
	import ThirdImage from './third.png';
	import GraphFilter from './graph-filter.svelte';
	import GraphEdgeCombine from './graph-edge-combine.svelte';
</script>

<Slide>
	<h1 class="text-5xl font-bold">Collapse Node dan Lift Edge</h1>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Collapse Node dan Lift Edge</h1>
	<div class="flex">
		<h2 class="y-full my-auto text-left">
			<div class="mb-8">
				<div class="text-3xl">Lifting dan Hiding</div>
			</div>
			<div class="text-md">(Bril dkk., 2000)</div>
		</h2>
		<div>
			<img src={FirstImage} alt="graph" class="" />
		</div>
	</div>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Collapse Node dan Lift Edge</h1>
	<div class="flex">
		<h2 class="y-full my-auto text-left">
			<div class="mb-8">
				<div class="text-3xl">Lifting dan Hiding</div>
			</div>
			<div class="text-md">(Bril dkk., 2000)</div>
		</h2>
		<div>
			<img src={SecondImage} alt="graph" class="" />
		</div>
	</div>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Collapse Node dan Lift Edge</h1>
	<div class="flex">
		<h2 class="y-full my-auto text-left">
			<div class="mb-8">
				<div class="text-3xl">Lifting dan Hiding</div>
			</div>
			<div class="text-md">(Bril dkk., 2000)</div>
		</h2>
		<div>
			<img src={ThirdImage} alt="graph" class="" />
		</div>
	</div>
</Slide>

<Slide>
	<h1 class="mb-12 text-xl font-bold">Collapse Node dan Lift Edge</h1>
	<div class="flex h-[50vh] w-full">
		<div class="flex-1">
			<Graph />
		</div>
	</div>
</Slide>

<!-- node filter edge filter -->
<Slide>
	<h1 class="text-5xl font-bold">Node Filter dan Edge Filter</h1>
</Slide>

<Slide>
	<h1 class="mb-12 text-xl font-bold">Node Filter dan Edge Filter</h1>
	<div class="flex">
		<h2 class="y-full my-auto text-left">
			<div class="mb-8">
				<div class="text-2xl">
					Miller (Miller, t.t.) mengemukakan bahwa terdapat keterbatasan dan limitasi terhadap
					jumlah informasi yang dapat diterima, dan diproses pada manusia.
				</div>
			</div>
		</h2>
	</div>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Node Filter dan Edge Filter</h1>
	<div class="flex h-[50vh] w-full">
		<div class="flex-1">
			<GraphFilter />
		</div>
	</div>
</Slide>

<!-- edge combine -->
<Slide>
	<h1 class="text-5xl font-bold">Edge Combine dan Tatanan Graf</h1>
</Slide>

<Slide>
	<h1 class="mb-12 text-xl font-bold">Edge Combine dan Tatanan Graf</h1>
	<div class="flex">
		<h2 class="y-full my-auto text-left">
			<div class="mb-8">
				<div class="text-2xl">
					penggabungan sisi dapat mengurangi kekusutan visual (H. Zhou dkk., 2013)
				</div>
			</div>
		</h2>
	</div>
</Slide>

<Slide>
	<h1 class="mb-12 text-xl font-bold">Edge Combine dan Tatanan Graf</h1>
	<div class="flex h-[50vh] w-full">
		<div class="flex-1">
			<GraphEdgeCombine />
		</div>
	</div>
</Slide>
