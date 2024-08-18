/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove above line
import { adjustHexColor } from "$lib";
import {
	colorMap,
	LAYER_SIZE_MULTIPLIER,
	layers,
	PADDING_X_LAYER,
} from "$lib/constant";
import * as d3 from "d3";

export function renderLayer(
	canvas: d3.Selection<SVGGElement, unknown, null, undefined>,
	roots: any[],
) {
	const biggestRootRadius = roots.reduce((acc, root) => {
		if (acc.value < root.value) {
			return root;
		}
		return acc;
	});

	const layerHeight = biggestRootRadius.r * LAYER_SIZE_MULTIPLIER;

	const defs = canvas.append("svg:defs");

	Object.entries(colorMap).forEach(([key, value]) => {
		const grad = defs
			.append("svg:radialGradient")
			.attr("gradientUnits", "objectBoundingBox")
			.attr("cx", "25%")
			.attr("cy", "25%")
			.attr("r", "100%")
			.attr("id", "grad" + key.split(" ").join(""));

		grad.append("stop").attr("offset", "0%").style("stop-color", "white");

		grad.append("stop").attr("offset", "75%").style(
			"stop-color",
			adjustHexColor(value, -0.1),
		);
	});

	const grad = defs
		.append("svg:radialGradient")
		.attr("gradientUnits", "objectBoundingBox")
		.attr("cx", "25%")
		.attr("cy", "25%")
		.attr("r", "100%")
		.attr("id", "gradElse");

	grad.append("stop").attr("offset", "0%").style("stop-color", "#D9B299");

	grad.append("stop").attr("offset", "75%").style("stop-color", "#ecd8cc");

	// calculate max width
	const maxWidth = roots.reduce((maxWidth, root) => {
		return Math.max(maxWidth, root.isCrossOver ? 0 : (root.containerX + root.r * 2));
	}, 0);

	// RENDER LAYER
	const layerWidth = maxWidth + PADDING_X_LAYER;
	layers.forEach((layer, i) => {
		canvas
			.append("rect")
			.attr("x", 0)
			.attr("y", i * layerHeight)
			.attr("width", layerWidth)
			.attr("height", layerHeight)
			.attr("fill", () => adjustHexColor(colorMap[layer] ?? "#cccccc", 0.7))
			.attr("stroke", "black");

		canvas
			.append("text")
			.attr("x", 5)
			.attr("y", i * layerHeight + 15)
			.attr("fill", "black")
			.attr("text-anchor", "start")
			.attr("font-size", "14px")
			.text(layer);
	});
	canvas
		.append("rect")
		.attr("x", maxWidth + PADDING_X_LAYER)
		.attr("y", 0)
		.attr("width", layerHeight)
		.attr("height", 4 * layerHeight)
		.attr("fill", adjustHexColor(colorMap["Unknown Layer"], 0.7))
		.attr("stroke", "black");
	canvas
		.append("text")
		.attr("x", maxWidth + PADDING_X_LAYER + 5)
		.attr("y", 15)
		.attr("fill", "black")
		.attr("text-anchor", "start")
		.attr("font-size", "14px")
		.text("Not classified");
}
export function renderPack(
	canvas: d3.Selection<SVGGElement, unknown, null, undefined>,
	roots: any[],
	writeDetailHover: (detail: string) => void,
	handleRootClick: (root: any) => void,
	usePieChart: boolean,
) {
	let maxWidth = 0;
	roots.forEach((root) => {
		if (root.containerX + root.r * 2 > maxWidth) {
			maxWidth = root.containerX + root.r * 2;
		}
	});
	// RENDER LAYER
	const layerWidth = maxWidth + PADDING_X_LAYER;
	// RENDER PACKS
	roots.forEach((root, index: number) => {
		if (root.isHidden) {
			return;
		}
		const containerElement = canvas
			.append("g")
			.attr("transform", `translate(${root.containerX},${root.containerY})`)
			.attr("id", `root-${index}`);

		// add container drag
		containerElement.call(
			d3.drag<any, any>().on("drag", function (event) {
				// if not cross over
				if (!root.isCrossOver) {
					const x = event.dx;
					const y = 0;

					root.containerX += x;
					root.containerY += y;

					// limit left and right boundary
					if (root.containerX < 0) {
						root.containerX = 0;
					}
					if (root.containerX + root.r * 2 > layerWidth) {
						root.containerX = layerWidth - root.r * 2;
					}
				} else {
					const x = 0;
					const y = event.dy;

					root.containerX += x;
					root.containerY += y;

					// limit top and bottom boundary
					if (root.containerY < 0) {
						root.containerY = 0;
					}
					// TODO: 1000 should be the height of the grey column
					if (root.containerY + root.r * 2 > 1000) {
						root.containerY = 1000 - root.r * 2;
					}
				}
				d3.select(this).attr(
					"transform",
					`translate(${root.containerX},${root.containerY})`,
				);
			}),
		);

		root.each((d: any) => {
			if (usePieChart && d.data.kind === "layer_info") {
				return;
			}

			const node = containerElement
				.append('g')
				.attr('transform', `translate(${d.x},${d.y})`)
				.attr('class', 'node');

			node
				.append('circle')
				.attr('r', d.r)
				.attr('fill', 'url(#grad' + (d.data?.layer?.split(' ')?.join('') ?? 'Else') + ')')
				.attr('stroke', 'black');

			if (usePieChart && d.data.kind === "class" && d.children){
				// render children as pie
				const data = d.children.map((child: any) => child.data.count);
				const pie = d3.pie().padAngle(0);
				const pieData = pie(data);
				const arc = d3.arc().innerRadius(0).outerRadius(d.r) as any;
				const dataLayer = d.children.map((child: any) => child.data.layer);

				node
					.append('g')
					.selectAll()
					.data(pieData)
					.join('path')
					.attr('fill', (d, i) => {
						console.log('d', d);
						return `url(#grad${dataLayer[i].split(' ').join('')})`;
					})
					.attr('d', arc)
					.append('title')
					.text((d, i) => `${dataLayer[i]}: ${data[i]}`);
			}

			node.on("mouseover", function () {
				const hoverDetail = JSON.stringify(d.data, null, "\t");
				writeDetailHover(hoverDetail);

				d3.select(this).select("circle").attr("stroke-width", 2);
			});

			node.on("mouseout", function () {
				writeDetailHover("{}");
				d3.select(this).select("circle").attr("stroke-width", 1);
			});

			node.on("click", function () {
				handleRootClick(root);
			});

			node.on("contextmenu", (event, d) => {
				event.preventDefault();
				console.log("right click", d);
			});
			// only show text for package
			if (d.data.kind === "package") {
				node
					.append("text")
					.attr("dy", -d.r - 4)
					.attr("fill", "black")
					.attr("text-anchor", "middle")
					.attr("font-size", "12px")
					.text(d.data.id);
			}
		});
	});
}
