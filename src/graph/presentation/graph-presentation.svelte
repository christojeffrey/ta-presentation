<script>
	import Slide from '$lib/deck/slide.svelte';
	import Motivation from './1-motivation/motivation.svelte';
	import M01 from './m01/slide.svelte';
	import M02 from './m02/slide.svelte';
	import M03 from './m03/slide.svelte';
	import D3Image from './d3.png';
	import SvelteImage from './svelte.png';
	import FrontendImage from './frontend.png';
</script>

<!-- title -->
<Slide>
	<div class="mb-12 text-6xl font-bold">
		Visualisasi Arsitektur Perangkat Lunak Berbasiskan Graf
	</div>
	<div class="text-3xl">Christopher Jeffrey 13520055</div>
</Slide>

<!-- motivation -->
<Motivation />

<!-- perincian -->
<Slide>
	<div>
		<div class="text-6xl font-bold">Perincian</div>
		<div class="text-3xl">Masalah hingga Rancangan Implementasi</div>
	</div>
</Slide>
<!-- M-01 -->
<Slide>
	<div class="text-lg font-bold">M-01</div>

	<div class="text-4xl">
		Pemilihan
		<span class="font-bold"> teknik presentasi visual </span>
		dari simpul dan sisi
	</div>
</Slide>
<!-- nested node -->
<M01 />

<!-- M-02 -->
<Slide>
	<div class="text-lg font-bold">M-02</div>

	<div class="text-4xl">
		Pemilihan
		<span class="font-bold">metode abstraksi </span>
		simpul dan sisi dengan pengurangan informasi yang minimal
	</div>
</Slide>
<M02 />
<!-- M-03 -->
<Slide>
	<div class="text-lg font-bold">M-03</div>

	<div class="text-4xl">
		Penerapan
		<span class="font-bold"> interaktivitas dan customizability </span>
		pada simpul dan sisi
	</div>
</Slide>

<M03 />
<!-- Implementasi -->
<Slide>
	<div class="text-4xl">Implementasi</div>
</Slide>
<Slide>
	<div class="text-4xl">
		<div class="font-bold">Platform dan Pustaka</div>
		<div>untuk mengimplementasikan alat visualisasi</div>
	</div>
	<div class="fragment">
		<div class=" text-3xl">Web app, svelte, D3</div>

		<div class="flex justify-center">
			<div class="w-1/4">
				<img src={D3Image} alt="d3-icon" class="h-full w-full object-contain" />
			</div>
			<div class="w-1/4">
				<img src={SvelteImage} alt="svelte-icon" class="h-full w-full object-contain" />
			</div>
		</div>
	</div>
</Slide>

<!-- tampilan frontend -->
<Slide>
	<img src={FrontendImage} alt="frontend" class="h-full w-full object-contain" />
</Slide>
