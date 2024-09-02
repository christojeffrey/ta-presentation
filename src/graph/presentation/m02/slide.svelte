<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
	import Graph from './graph.svelte';
	import FirstImage from './first.png';
	import SecondImage from './second.png';
	import ThirdImage from './third.png';
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
<!-- 
<Slide>
	<h1 class="text-5xl font-bold">Arah Sisi Berwarna</h1>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Arah Sisi Berwarna</h1>
	<div class="flex">
		<h2 class="y-full my-auto w-1/2 text-left">
			<div class="mb-8">
				<div class="mt-4 text-xl">
					menggunakan panah, menggunakan intensitas, penggunaan warna, dan lekukan sisi
				</div>
			</div>
			<div class="text-md">Holten dan van Wijk (2009)</div>
		</h2>
		<div>
			<img src={ArahImage} alt="graph" class="mx-auto w-3/4 object-contain" />
		</div>
	</div>
</Slide> -->
