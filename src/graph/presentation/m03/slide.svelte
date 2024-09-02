<!-- this is where we handle the flow of the presentation -->
<script lang="ts">
	import Slide from '$lib/deck/slide.svelte';
	import Graph from './graph.svelte';
</script>

<Slide>
	<h1 class="text-5xl font-bold">Interaktivitas dan customizability</h1>
</Slide>
<Slide>
	<h1 class="mb-12 text-xl font-bold">Interaktivitas dan customizability</h1>
	<div class="flex h-[50vh] w-full">
		<div class="my-auto text-left">
			<div class="mb-8">
				<div class="mt-4 text-xl">
					<div class="fragment">Hover and Infocus Information</div>
					<div class="fragment">Interaktivitas Canvas</div>
					<div class="fragment">Kustomisasi Tampilan Simpul, Label, dan Warna Simpul</div>
				</div>
			</div>
		</div>
		<div class="w-3/4"><Graph /></div>
	</div>
</Slide>
