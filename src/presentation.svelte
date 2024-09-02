<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import BubbleteaPresentation from './bubbletea/presentation/bubbletea-presentation.svelte';
	import GraphPresentation from './graph/presentation/graph-presentation.svelte';
	import Slide from './lib/deck/slide.svelte';
	import { AnimatedCounter } from '@benzara/svelte-animated-counter';
	import GraphImage from './public/graph.png';
	import BubbleteaImage from './public/bubbletea.png';

	const complains = [
		'hmm package yang ini maksudnya apa ya?',
		'kok kerasa overlap ya nama fungsinya...',
		'aku gatau dia nulis apa',
		'hmm ini udah lama gk aku cek, masih relevan gk ya',
		'ini kok jadi lemot sih. bagian mana ya yang salah?',
		'ini intern baru nulis asal-asalan gk ya',
		'haduh ini code base kok gendut banget. harusnya bisa lebih ramping',
		'ini package udah sesuai gk ya sama namanya',
		'aku 3 tahun lalu nulis apa yah hehe udah lupa'
	];
</script>

<!-- together presentation -->
<Slide animate>
	<div class="h-full w-full">
		<div class="mb-12 text-5xl font-bold">
			PENGEMBANGAN ALAT VISUALISASI ARSITEKTUR PERANGKAT LUNAK
		</div>
		<div class="mb-36 text-3xl font-bold">Graph dan BubbleTea</div>
		<div class="flex w-full justify-around text-left">
			<div class="mb-24 text-2xl">
				Penulis:
				<div>13520049 Aditya Prawira Nugroho</div>
				<div>13520055 Christopher Jeffrey</div>
			</div>
			<div class="text-2xl">
				Pembimbing:
				<div>Dr. Yani Widyani, S.T, M.T.</div>
				<div>Satrio Adi Rukmono, S.T., M.T.</div>
			</div>
		</div>
	</div>
</Slide>

<!-- motivasi -->
<Slide>
	<div class="">
		<h1 class="text-6xl font-bold">Motivasi</h1>
	</div>
</Slide>
<Slide>
	<div class="">
		<h1 class="text-6xl font-bold">Motivasi</h1>
		<div class="text-4xl">Perangkat lunak semakin besar dan kompleks</div>
	</div>
</Slide>
<Slide>
	<div class="">
		<div>
			<h1 class="text-6xl font-bold">~27 juta</h1>
			<h2 class="text-4xl">baris kode pada linux repository</h2>
		</div>
		<div class="fragment">
			<h1 class="text-9xl font-bold">700</h1>
			<div class="text-4xl">King James Bible</div>
		</div>
	</div>
</Slide>
<Slide>
	<div class="">
		<h1 class="text-6xl font-bold">15.000+</h1>
		<div class="text-4xl">Kontributor linux repository</div>
		<div class="fragment">3x MABA Sarjana ITB ++</div>
	</div>
</Slide>

<Slide>
	<div class="">
		<AnimatedCounter
			random={true}
			values={complains}
			class="p-2 text-2xl font-bold"
			interval={2000}
			startImmediately={false}
			direction="up"
			loop={true}
			ease=" cubic-bezier(1, 0, 0, 1)"
		/>
	</div>
</Slide>
<Slide>
	<div class="">
		<h1 class="text-6xl font-bold">Lalu Bagaimana?</h1>
	</div>
</Slide>
<Slide>
	<div class="">
		<h1 class="text-6xl font-bold">Visualisasi perangkat lunak</h1>
		<div class="fragment text-4xl">tujuan: membantu pemahaman!</div>
	</div>
</Slide>
<Slide>
	<Slide>
		<div class="">
			<h1 class="text-6xl font-bold">Graph Visualization</h1>
			<img src={GraphImage} alt="graph" class="" />
		</div>
	</Slide>
	<Slide>
		<div class="">
			<h1 class="text-6xl font-bold">Bubble Tea Visualization</h1>
			<img src={BubbleteaImage} alt="graph" class="" />
		</div>
	</Slide>
</Slide>
<GraphPresentation />
<!-- <BubbleteaPresentation /> -->
