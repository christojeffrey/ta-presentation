<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as d3 from 'd3';
	import type { HierarchyData } from '$lib/type';
	import { convertJsonToCsvText } from '$lib/utils';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	export let roots;
	export let hoverDetail = '';
	export let doRecalculateHierarchyData;
	export let doRerender;
	export let table: d3.DSVRowArray<string>
	export let rootInFocus: HierarchyData | null;
	export let usePieChart = false;

	function inputDataToHierarchyData(csvText: string): any {
		// package, class, layer, count
		table = d3.csvParse(csvText);
	}
	
	function handleFileChange(e: any) {
		const file = e.target?.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target?.result as string;
			if (file.type === "application/json") {
				const csvText = convertJsonToCsvText(JSON.parse(text))
				table = d3.csvParse(csvText);
			} else {
				inputDataToHierarchyData(text);
			}
			doRecalculateHierarchyData = true;
		};
		reader.readAsText(file);
	}

	let objectDetail: any = [];
	$: {
		if (hoverDetail) {
			objectDetail = JSON.parse(hoverDetail);
			objectDetail = Object.entries(objectDetail);
			// remove if type is object or empty
			objectDetail = objectDetail.filter(
				([key, value]: [string, any]) => typeof value !== 'object' && value !== ''
			);
		}
	}
</script>

<div class="mr-2 h-full">
	<div class="mt-2 text-3xl font-bold">BubbleTea Viz</div>
	<Resizable.PaneGroup direction="vertical">
		<!-- first section -->
		<Resizable.Pane class="pt-4" defaultSize={20} minSize={20}>
			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="picture" class="font-bold">Input</Label>
				<Input id="picture" type="file" accept=".json,.csv" on:change={handleFileChange} />
			</div>
			<!-- toggle for pie chart -->
			<div class="mt-2 flex items-center">
				<Switch
					bind:checked={usePieChart}
					on:click={() => {
						doRerender = true;
					}}
				/>
				<Label for="pie-chart" class="ml-2">Use Pie Chart</Label>
			</div>
		</Resizable.Pane>
		<Resizable.Handle />

		<!-- second section -->
		{#if objectDetail.length === 0}
			<Resizable.Pane class="p-4">
				<div class="text-center">Hover on a circle to see its details.</div>
			</Resizable.Pane>
		{:else}
			<Resizable.Pane class="pb-4">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">Attribute</Table.Head>
							<Table.Head class="w-[300px]">Data</Table.Head>
						</Table.Row>
					</Table.Header>
					{#each objectDetail as [key, value]}
						<Table.Body>
							<Table.Row>
								<Table.Cell class="font-medium">{key}</Table.Cell>
								<Table.Cell>{value}</Table.Cell>
							</Table.Row>
						</Table.Body>
					{/each}
				</Table.Root>
			</Resizable.Pane>
		{/if}
	</Resizable.PaneGroup>
</div>
