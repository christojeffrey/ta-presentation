<script lang="ts">
	import Heading from '../ui/heading.svelte';
	import type { ConfigInterface, GraphData } from '../types';
	import Button from '../ui/button.svelte';
	export let config: ConfigInterface;
	export let doRefilter: boolean;
	export let graphData: GraphData;

	let filterTextAreaValue: string;
	function parseFilterNode(texts: string): Set<string> {
		if (texts === '' || texts === undefined) return new Set<string>();
		const set = new Set<string>();
		texts.split(',').forEach((text) => {
			set.add(text.trim());
		});
		return set;
	}
</script>

<div>
	<Heading class="mt-2">Config Changer</Heading>
	<div>
		to collapse node, you can click on the red button <br />
		to
		<span class="text-blue-900 font-bold"> lift edge, </span>
		click the green button.

		<!-- Tolerance:
		<input
			type="input"
			style="width: 2em; border: 1px solid black; margin: 0 0 10px 4px;"
			bind:value={dependencyLiftTolarance}
			on:keyup={d => {
				const num = Math.trunc(Number(dependencyLiftTolarance));
				dependencyLiftTolarance = String(num || 0);
				config.dependencyTolerance = num || 0;
			}}
		/> -->
	</div>

	<!-- Filter Node -->
	<div>
		<Heading headingNumber={5}>Filter Node</Heading>
		<div class="my-2 px-2">
			<form
				on:submit={(_) => {
					config.filteredNodes = parseFilterNode(filterTextAreaValue);
					doRefilter = true;
				}}
			>
				<textarea
					class="border-gray-300 border-2 w-full mb-2"
					rows="3"
					placeholder="Type the node id separated by comma e.g. appl, db"
					bind:value={filterTextAreaValue}
				/>
				<Button type="submit">Filter</Button>
			</form>
		</div>
	</div>
	<!-- collapse all -->
	<div>
		<Heading headingNumber={5}>Collapse All</Heading>
		<div class="my-2 px-2">
			<Button
				onClick={() => {
					console.log('testing');
					config.collapsedNodes = graphData.flattenNodes;
					doRefilter = true;
				}}
			>
				Collapse All
			</Button>
		</div>
	</div>
</div>
