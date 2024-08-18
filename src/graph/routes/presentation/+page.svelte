<script>
	import Highlight from 'reveal.js/plugin/highlight/highlight';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import MathReveal from 'reveal.js/plugin/math/math';
	import RevealNotes from 'reveal.js/plugin/notes/notes';

	// Import theme
	import 'reveal.js/dist/theme/black.css';

	// Import CSS for plugins
	import 'reveal.js/plugin/highlight/monokai.css';

	const config = {
		// App Config
		app: {
			name: 'Reveal.js with Svelte and Vite',
		},
		// Reveal Config
		reveal: {
			plugins: [Highlight, Markdown, MathReveal.MathJax2, MathReveal.KaTeX, RevealNotes],
			hash: true,
			mathjax2: {
				config: 'TeX-AMS_HTML-full',
				TeX: {
					Macros: {
						R: '\\mathbb{R}',
						set: ['\\left\\{#1 \\; ; \\; #2\\right\\}', 2],
					},
				},
			},
		},
	};

	import 'reveal.js/dist/reveal.css';

	import Reveal from 'reveal.js';
	import {onMount, tick} from 'svelte';
	import Presentation from './Presentation.svelte';

	onMount(async () => {
		await tick();
		const deck = new Reveal(config.reveal);
		deck.initialize();
	});
</script>

<svelte:head>
	<title>{config.app.name}</title>
</svelte:head>

<div class="reveal">
	<div class="slides">
		<Presentation />
	</div>
</div>
