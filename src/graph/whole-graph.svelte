<script lang="ts">
	import { onMount } from 'svelte';

	import { debuggingConsole, extractAvailableEdgeType } from './tooling/helper';
	import type {
		ConfigInterface,
		ConvertedData,
		DrawSettingsInterface,
		EdgeType,
		GraphDataNode,
		GraphData,
		RawInputType
	} from './tooling/types';

	// scripts
	import { cleanCanvas, draw, filter, converter, createGraphData } from './tooling/scripts';

	// components
	import RawDataInputer from './tooling/components/raw-data-inputer.svelte';
	import ConfigChanger from './tooling/components/config-changer.svelte';
	import DrawSettingsChanger from './tooling/components/draw-settings-changer.svelte';
	import InfoBox from './tooling/ui/info-box.svelte';
	import FocusControl from './tooling/components/focus-control.svelte';
	import * as d3 from 'd3';

	let redrawFunction = (_: DrawSettingsInterface) => {};
	let rawData: RawInputType;
	let convertedData: ConvertedData;
	let config: ConfigInterface = {
		collapsedNodes: [],
		dependencyLifting: [],
		dependencyTolerance: 0,
		filteredNodes: new Set<string>(),
		nodeInFocus: null
	};
	let graphData: GraphData;
	let drawSettings: DrawSettingsInterface = {
		minimumNodeSize: 100,
		buttonRadius: 5,
		nodeCornerRadius: 15,
		nodePadding: 25,
		textSize: 10,
		shownEdgesType: new Map<EdgeType, boolean>(),
		showEdgeLabels: false,
		showNodeLabels: true,
		renderedLinksId: new Set<string>(),
		nodeDefaultColor: '#6a6ade',
		nodeColors: ['#32a875', '#d46868'],
		innerLayout: 'circular',
		intermediateLayout: 'layerTree',
		rootLayout: 'layerTree',
		isPanning: false
	};

	let svgElement: SVGElement | undefined = undefined;

	let doReconvert = true;
	let doRefilter = true;
	let doRedraw = true;
	let doRelayout = true;

	let isMounted = false;

	function handleOnNodeClick(clickedNode: GraphDataNode) {
		debuggingConsole('clicked');
		console.log(clickedNode);
		config.nodeInFocus = clickedNode;
		// set every other node to not in focus
		graphData.flattenNodes.forEach((node) => {
			if (node !== clickedNode) {
				node.isInFocus = false;
			}
		});
		clickedNode.isInFocus = true;
	}
	function handleNodeCollapseClick(clickedNode: GraphDataNode) {
		// push if not exist
		if (!config.collapsedNodes.includes(clickedNode)) {
			config.collapsedNodes.push(clickedNode);
		} else {
			config.collapsedNodes = config.collapsedNodes.filter((node) => node !== clickedNode);
		}
		// on finish
		doRefilter = true;
		// doRedraw = true;
	}

	function handleDependencyLiftClick(clickedNode: GraphDataNode): void {
		debuggingConsole('clicked');

		// push if not exist
		if (!config.dependencyLifting.find((nodeConfig) => nodeConfig.node.id === clickedNode.id)) {
			config.dependencyLifting.push({ node: clickedNode, sensitivity: config.dependencyTolerance });
		} else {
			// remove if exist
			debuggingConsole('remove');
			config.dependencyLifting = config.dependencyLifting.filter(
				(nodeConfig) => nodeConfig.node.id !== clickedNode.id
			);
		}

		// on finish
		doRefilter = true;
	}
	function doRecenter() {
		// recenter view, reset tranform
		const canvasElement = document.getElementById('canvas')!;
		const canvas = d3.select(canvasElement);
		canvas.attr('transform', `translate(0,0) scale(1)`);
		drawSettings.transformation = d3.zoomIdentity;
	}
	$: {
		if (isMounted) {
			// handle config changes
			if (doReconvert) {
				// will setup graphData. Will also setup shownEdgesType
				convertedData = converter(rawData);
				graphData = createGraphData(convertedData);

				// Initialize shownEdgesType
				extractAvailableEdgeType(graphData.links).forEach((e, index) =>
					drawSettings.shownEdgesType.set(e, index == 0 ? true : false)
				);

				doReconvert = false;
				doRefilter = true;
			}
			if (doRefilter) {
				filter(config, graphData);
				doRefilter = false;
				doRelayout = true;
			}

			if (doRelayout) {
				// remove the old data
				cleanCanvas(svgElement!);
				redrawFunction = draw(
					svgElement!,
					graphData,
					drawSettings,
					handleNodeCollapseClick,
					handleDependencyLiftClick,
					handleOnNodeClick
				);
				doRedraw = true;
				doRelayout = false;
			}

			if (doRedraw) {
				redrawFunction(drawSettings);
			}
		}
	}
	onMount(() => {
		isMounted = true;
		// change mouse cursor to panning mode when space is pressed
		window?.addEventListener('keydown', (e) => {
			if (e.code === 'Space') {
				if (drawSettings.isPanning) return;
				svgElement?.classList.add('cursor-grab');
				drawSettings.isPanning = true;
			}
		});
		// on release, change back to default
		window?.addEventListener('keyup', (e) => {
			if (e.code === 'Space') {
				svgElement?.classList.remove('cursor-grab');
				drawSettings.isPanning = false;
			}
		});
	});
</script>

<div class="flex h-full justify-between">
	<!-- canvas -->
	<div class="relative m-6 w-full">
		<div class="absolute bottom-0 right-0">
			<InfoBox />
		</div>
		<div class="left-0 top-0">
			<!-- recenter -->
			<button on:click={doRecenter}>Recenter</button>
		</div>
		<!-- in focus box -->
		<div class="absolute bottom-0 left-0 rounded-xl border-2 border-black bg-white p-4">
			<FocusControl
				bind:config
				{handleNodeCollapseClick}
				{handleDependencyLiftClick}
				bind:doRefilter
			/>
		</div>
		<svg bind:this={svgElement} class="h-full w-full" />
	</div>

	<!-- vertical line -->
	<div class="w-[2px] bg-neutral-300" />

	<!-- sidepanel -->
	<div class="m-6 flex flex-col">
		<RawDataInputer bind:rawData bind:doReconvert />
		<div class="h-[1px] bg-neutral-300" />
		<!-- <ConfigChanger bind:config bind:doRefilter bind:graphData /> -->
		<div class="h-[1px] bg-neutral-300" />
		<DrawSettingsChanger bind:drawSettings bind:doRedraw bind:doRelayout />
	</div>
</div>
