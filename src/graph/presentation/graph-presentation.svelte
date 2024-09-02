<script>
	import Slide from '$lib/deck/slide.svelte';
	import Motivation from './1-motivation/motivation.svelte';
	import M01 from './m01/slide.svelte';
	import M02 from './m02/slide.svelte';
	import M03 from './m03/slide.svelte';
	import Implementasi from './implementasi/slide.svelte';
	import Keseluruhan from './keseluruhan/slide.svelte';
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
<Implementasi />

<!-- keseluruhan -->
<Keseluruhan />
