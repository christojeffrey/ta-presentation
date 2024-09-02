<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
</script>

<Slide>
	<h1 class="text-5xl font-bold">Keseluruhan</h1>
</Slide>
<Slide>
	<h1 class="text-5xl font-bold">Keseluruhan</h1>
	<div class="text-left">
		<div class="fragment text-3xl">
			Berhasil diimplementasikan alat visualisasi perangkat lunak yang dapat membantu pemahaman
			dengan
		</div>
		<div class="fragment text-3xl">- fitur-fitur untuk melakukan abstraksi visualisasi</div>
		<div class="fragment text-3xl">- fitur-fitur interaktif dan kustomisasi</div>
	</div>
</Slide>

<Slide>
	<h1 class="text-5xl font-bold">Hasil</h1>
</Slide>
<Slide>
	<h1 class="mb-4 text-5xl font-bold">Positif</h1>
	<div class="fragment flex flex-col gap-4 text-left text-3xl">
		<div>
			Fitur-fitur
			<span class="font-bold"> nested node, filter edge </span>
			membantu memberikan abstraksi pada visualisasi perangkat lunak
		</div>
		<div>
			Fitur-fitur
			<span class="font-bold"> drag canvas, zoom canvas, hover and infocus information </span>
			diimplementasikan guna memberikan interaktivitas dan customizability pada alat visualisasi perangkat
			lunak dan mampu membantu pehamanan visualisasi.
		</div>
	</div>
</Slide>
<Slide>
	<h1 class="mb-4 text-5xl font-bold">Negatif</h1>
	<div class="fragment flex flex-col gap-4 text-left text-3xl">
		<div>
			Terdapat fitur-fitur yang menjanjikan secara ide namun <span class="font-bold">
				implementasi kurang tepat
			</span>, seperti collapse node, filter node, dan arah sisi berwarna. Fitur-fitur
		</div>
		<div>
			Alat visualisasi graf yang dibuat berhasil membantu pemahaman perangkat lunak. Namun
			implementasi solusi
			<span class="font-bold"> belum cukup layak untuk digunakan secara luas </span>.
		</div>
	</div>
</Slide>
<Slide>
	<h1 class="mb-4 text-5xl font-bold">Saran</h1>
	<div class="fragment flex flex-col gap-4 text-left text-3xl">
		<div>
			Terdapat fitur-fitur baru yang
			<span class="font-bold"> dapat dieksplorasi </span>
			, yaitu search, highlight related edge on focus, dan code proximity.
		</div>
		<div>
			Terdapat
			<span class="font-bold"> fitur-fitur interaktivitas yang dapat diperbaiki. </span>
			Daripada menggunakan bagian kiri atas visualisasi sebagai anchor, implementasi zoom dapat menggunakan
			cursor pengguna sebagai anchor. Ukuran teks dapat dibuat konstan, tanpa memperdulikan zoom canvas,
			daripada implementasi saat ini yang menyesuaikan dengan zoom canvas. Untuk visualisasi arah sisi
			dan collapse node, perlu dilakukan eksplorasi lebih lanjut untuk mendapatkan implementasi tampilan
			yang lebih tepat.
		</div>
		<div>
			Dapat dilakukan
			<span class="font-bold"> evaluasi untuk mencari letak perbaikan yang paling tepat </span>
			untuk fitur-fitur spesifik, misalnya pada fitur arah sisi berwarna.
		</div>
		<div>
			<span class="font-bold"> Jumlah partisipan </span>
			untuk evaluasi pada penelitian selanjutnya dapat ditingkatkan, untuk memberikan level of confidence
			yang lebih tinggi.
		</div>
	</div>
</Slide>
