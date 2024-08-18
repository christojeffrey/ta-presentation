<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import RightPanel from './components/right-panel.svelte';
	import * as Resizable from '$lib/components/ui/resizable';
	import layoutPack from './scripts/layoutPack';
	import { renderLayer, renderPack } from './scripts/renderPack';
	import { turnTableToHierarchyData } from './scripts/turnTableToHierarchyData';
	import * as Tabs from '$lib/components/ui/tabs';
	import HierarchyTable from './components/hierarchy-table.svelte';
	import type { HierarchyData } from '$lib/type';
	let svgElement: SVGElement;

	let isMounted = false;
	let hoverDetail = '';

	let roots = [d3.hierarchy({}) as any];
	let table: d3.DSVRowArray<string>;
	let canvas: any;

	let doRecalculateHierarchyData = true;
	let doRerender = false;

	let usePieChart = false;

	let rootInFocus: HierarchyData | null = null;
	function writeDetailHover(detail: string) {
		hoverDetail = detail;
	}
	function handleRootClick(root: HierarchyData) {
		console.log('root', root);
		rootInFocus = root;
	}
	$: {
		if (isMounted) {
			if (doRecalculateHierarchyData) {
				if (table) {
					roots = turnTableToHierarchyData(table);
				}
				// Construct the treemap layout.
				layoutPack(roots);

				doRecalculateHierarchyData = false;
				doRerender = true;
			}
			if (doRerender) {
				if (svgElement) {
					// clean
					d3.select(svgElement).selectChildren().remove();
				}

				// setup canvas
				canvas = d3.select(svgElement).append('g').attr('id', 'canvas');
				d3.select(svgElement).call(
					d3.zoom<SVGElement, unknown>().on('zoom', ({ transform }) => {
						canvas.attr('transform', transform);
					})
				);
				renderLayer(canvas, roots);
				renderPack(canvas, roots, writeDetailHover, handleRootClick, usePieChart);
				doRerender = false;
			}
		}
	}
	onMount(() => {
		isMounted = true;
	});
</script>

<div class="border- mb-4 h-full w-full">
	<Resizable.PaneGroup direction="horizontal">
		<!-- left -->
		<Resizable.Pane class="p-4" defaultSize={75}>
			<Tabs.Root value="pack" class="h-full">
				<Tabs.List>
					<Tabs.Trigger value="pack">BubbleTea</Tabs.Trigger>
					<Tabs.Trigger value="table">Table</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="pack" class="h-full">
					<svg bind:this={svgElement} class="h-full w-full" width="100%" />
				</Tabs.Content>
				<Tabs.Content value="table" class="h-full overflow-auto">
					<HierarchyTable {table} />
				</Tabs.Content>
			</Tabs.Root>
		</Resizable.Pane>
		<!-- handle -->
		<Resizable.Handle />
		<!-- right -->
		<Resizable.Pane class="pl-4" minSize={20}>
			<RightPanel
				{hoverDetail}
				bind:table
				bind:rootInFocus
				bind:doRecalculateHierarchyData
				bind:roots
				bind:doRerender
				bind:usePieChart
			/>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
