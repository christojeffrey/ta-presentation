<script>
	import Slide from '$lib/deck/slide.svelte';
	import D3Image from './d3.png';
	import SvelteImage from './svelte.png';
	import FrontendImage from './frontend.png';
	import ArsitekturImage from './arsitektur.png';
	import JhotdrawImage from './jhotdraw.png';

	import SusImage from './sus.png';
	import BoxPlotImage from './boxplot.png';
</script>

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
	<a href="https://software-visualization.vercel.app/">https://software-visualization.vercel.app/</a
	>
	<img src={FrontendImage} alt="frontend" class="h-full w-full object-contain" />
</Slide>

<Slide>
	<div class="text-4xl font-bold">Arsitektur</div>
	<img src={ArsitekturImage} alt="arsitektur" class="h-full w-full object-contain" />
</Slide>

<Slide>
	<h1 class="text-4xl font-bold">Evaluasi</h1>
</Slide>
<Slide>
	<h1 class="text-4xl font-bold">Evaluasi</h1>

	<h2 class="text-3xl">Think Aloud</h2>
	<h2 class="text-3xl">Tanya jawab</h2>
	<h2 class="text-3xl">Software Usability Scale</h2>
</Slide>
<Slide>
	<h2 class="text-3xl font-bold">Think Aloud</h2>
	<div>JHotDraw</div>
	<img src={JhotdrawImage} alt="arsitektur" class="h-full w-full object-contain" />
</Slide>
<Slide>
	<h2 class="text-3xl font-bold">Think Aloud</h2>
	<div class="flex">
		<div class="flex flex-col gap-4 text-left text-xl">
			<div class="fragment">
				Akan ditambahkan fitur penggambaran bentuk Heksagon pada aplikasi JHotDraw. Dimanakah fitur
				tersebut akan diimplementasikan?
			</div>
			<div class="fragment">
				Fitur heksagon tersebut akan dibuat berdasarkan class lain. Implementasi heksagon akan
				dibuat sebagai turunan dari class ini. Apakah kandidat terbaik untuk class tersebut?
			</div>
			<div class="fragment">
				Posisikan dirimu sebagai salah satu pengembang JHotDraw. Terdapat masalah kinerja dari
				JHotDraw, dan akan dilakukan perubahan secara high level. Apa package atau class utama yang
				akan anda refactor?
			</div>
		</div>
		<img src={JhotdrawImage} alt="jhotdraw" class="h-full w-1/2 object-contain" />
	</div>
</Slide>
<Slide>
	<h2 class="text-3xl font-bold">Tanya Jawab</h2>
</Slide>
<Slide>
	<h2 class="mb-6 text-3xl font-bold">Tanya Jawab</h2>
	<div class="flex">
		<div class="flex flex-col gap-4 text-left text-2xl">
			<div class="fragment">
				Apakah alat visualisasi ini membantu memberikan high level overview?
			</div>
			<div class="fragment">Apakah terdapat kendala dalam menggunakan alat visualisasi?</div>
			<div class="fragment">Menurut Anda, alat ini cocok digunakan dengan tujuan apa?</div>
		</div>
	</div>
</Slide>

<Slide>
	<h2 class="text-3xl font-bold">Positif</h2>
	<div class="flex flex-col gap-4 text-2xl">
		<div>“I can collapse them all first”</div>
		<div>“Drag and drop-nya jalan.”</div>
		<div>“Di kiri bawah ada informasinya. That’s useful”</div>
		<div>"Membantu, apalagi kalo sudah kompleks."</div>
	</div>
</Slide>
<Slide>
	<h2 class="text-3xl font-bold">Negatif</h2>
	<div class="flex flex-col gap-4 text-2xl">
		<div>
			“Wahh... kecil banget lagi. Labelnya kecil banget. Wajar sih kecil. Tapi perlu nge-zoom in
			zoom out.”
		</div>
	</div>
</Slide>
<Slide>
	<h2 class="text-3xl font-bold">Saran</h2>
	<div class="flex flex-col gap-4 text-2xl">
		<div>“Nice to have kalo klik on something, it zooms in”</div>
		<div>“Kalo bisa double click dia bakal ke zoom in”</div>
	</div>
</Slide>

<Slide>
	<h2 class="text-3xl font-bold">Software Usability Scale</h2>
	<div class="flex">
		<div class="flex flex-1 flex-col gap-4 text-left text-xl justify-center">
			<div class="">4 Partisipan</div>
			<div class="">10 Pertanyaan</div>
		</div>
		<div class="h-[50vh] w-1/2">
			<img src={SusImage} alt="SUS" class="h-1/2 w-full object-contain" />
			<img src={BoxPlotImage} alt="box plot" class="h-1/2 w-full object-contain" />
		</div>
	</div>
</Slide>
