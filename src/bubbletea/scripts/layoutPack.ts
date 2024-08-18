/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove above line

import {
	FACTOR,
	LAYER_SIZE_MULTIPLIER,
	layers,
	PADDING_INNER_PACK,
	PADDING_INTER_PACK,
	PADDING_X_LAYER,
} from "$lib/constant";
import * as d3 from "d3";

export default function layoutPack(roots: any[]) {
	const layerCountProto: any = layers.reduce(
		(obj: { [key: string]: number }, item: string) => {
			obj[item] = 0;
			return obj;
		},
		{ "Unknown Layer": 0 },
	);
	// COMPUTE
	roots.forEach((root) => {
		// 1. Compute the pack layout.
		const pack = d3.pack<any>();
		pack.padding(PADDING_INNER_PACK);

		// // Sum and sort the data.
		root.sum((d: any) => d.count);

		// determine the max size of the root based on its value
		const size = Math.log10(root.value + 1) * FACTOR; // make it non linear
		pack.size([size, size]);

		pack(root);

		// 2. find the total 'count' attribute for each layer
		const layerCount: any = { ...layerCountProto };
		let total = 0;
		root.each((d: any) => {
			const layer = d.data.layer;
			layerCount[layer] += d.data.count;
			total += d.data.count;
		});

		const layerPercentage = Object.keys(layerCount).reduce((acc: any, key) => {
			acc[key] = (layerCount[key] / total) * 100;
			return acc;
		}, {});

		// 3. find the dominants layer, and remove non dominant layer.
		/*
			step
			1. sort the layerPercentage from highest to lowest
			2. if the second highest is more than 1.5 times the highest, the it's considered as dominant
			3. do this until non dominan is found, then truncate the rest
			*/
		// turn the layerPercentage into array
		const layerPercentageArray = Object.keys(layerPercentage).map((key) => {
			return { layer: key, percentage: layerPercentage[key] };
		});
		// sort the layerPercentageArray from highest to lowest
		layerPercentageArray.sort((a, b) => b.percentage - a.percentage);

		const dominantLayer = [layerPercentageArray[0]];
		let layerIndexToCheck = 1;
		while (layerIndexToCheck < layerPercentageArray.length) {
			const currentLayer = layerPercentageArray[layerIndexToCheck];
			const previousLayer = layerPercentageArray[layerIndexToCheck - 1];
			if (currentLayer.percentage * 1.5 > previousLayer.percentage) {
				dominantLayer.push(currentLayer);
			} else {
				break;
			}
			layerIndexToCheck++;
		}

		// attach the layerPercentage to the root
		root.data.dominantLayer = dominantLayer;
	});

	// DETERMINE X AND Y - CALCULATE LAYOUT
	// draw each package (which is represented by a root)
	calculateRootsLocationBasedOnDominantLayer(roots);
}

type Circle = {
	x: number;
	y: number;
	r: number;
};
function doesCircleOverlap(circle1: Circle, circle2: Circle) {
	return findMoveNeededInXForCircle2(circle1, circle2) > 0;
}

// find the x and lock the y for the circle to not overlap new x must be to the right of the circle1
function findMoveNeededInXForCircle2(circle1: Circle, circle2: Circle) {
	const targetDistanceInX = Math.sqrt(
		(circle1.r + circle2.r) ** 2 - (circle1.y - circle2.y) ** 2,
	);
	if (Number.isNaN(targetDistanceInX)) {
		return 0;
	}
	const currentDistanceInX = Math.abs(circle1.x - circle2.x);
	let moveNeeded = targetDistanceInX - currentDistanceInX;
	// if circle2 is to the left, add 2 * currentDistanceInX
	if (circle2.x < circle1.x) {
		moveNeeded += 2 * currentDistanceInX;
	}
	return moveNeeded;
}

// find the y and lock the x for the circle to not overlap new y must be to the bottom of the circle1
function findMoveNeededInYForCircle2(circle1: Circle, circle2: Circle) {
	const targetDistanceInY = Math.sqrt(
		(circle1.r + circle2.r) ** 2 - (circle1.x - circle2.x) ** 2,
	);
	if (Number.isNaN(targetDistanceInY)) {
		return 0;
	}
	const currentDistanceInY = Math.abs(circle1.y - circle2.y);
	let moveNeeded = targetDistanceInY - currentDistanceInY;
	// if circle2 is to the top, add 2 * currentDistanceInY
	if (circle2.y < circle1.y) {
		moveNeeded += 2 * currentDistanceInY;
	}
	return moveNeeded;
}

function calculateRootsLocationBasedOnDominantLayer(roots: any[]) {
	const previousRoots: any[] = [];
	const crossOvers: any[] = [];
	// height is the biggest pack size
	const biggestRootRadius = roots.reduce((acc, root) => {
		if (acc.value < root.value) {
		return root;
		}
		return acc;
	});
	
	// arbitrary layer height: 3 times the biggest root radius
	const layerHeight = biggestRootRadius.r * LAYER_SIZE_MULTIPLIER;
	roots.forEach((root) => {
		const dominantLayer = root.data.dominantLayer;
		/*
		if dominant layer > 2 ,set Y to be -100
		if dominant layer = 2, check the two layer. if they're side to side, calculate based on the ratio of those two layer.
		if not, set Y to be -100
		if dominant layer = 1, set Y the center of that layer
		*/
		const isTheDominantLayerContainUnknownLayer = dominantLayer
			.map((layer: any) => {
				return layer.layer;
			})
			.includes('Unknown Layer');

		if (isTheDominantLayerContainUnknownLayer || dominantLayer.length > 2) {
			root.isCrossOver = true;
		} else if (dominantLayer.length === 2) {
			const layer1 = dominantLayer[0].layer;
			const layer2 = dominantLayer[1].layer;
			const layer1Index = layers.indexOf(layer1);
			const layer2Index = layers.indexOf(layer2);
			if (layer1Index + 1 === layer2Index || layer1Index - 1 === layer2Index) {
				const layer1 = dominantLayer[0].layer;
				const layer1Index = layers.indexOf(layer1);
				const layer1Location = (layer1Index + 0.5) * layerHeight;
				const layer1Percentage = dominantLayer[0].percentage;

				const layer2 = dominantLayer[1].layer;
				const layer2Index = layers.indexOf(layer2);
				const layer2Location = (layer2Index + 0.5) * layerHeight;
				const layer2Percentage = dominantLayer[1].percentage;

				// calculate based on ratio
				const distanceAdded = (layer2Location - layer1Location) *
				(layer2Percentage / (layer1Percentage + layer2Percentage));
				root.containerY = layer1Location + distanceAdded;
			} else {
				root.isCrossOver = true;
			}
		} else if (dominantLayer.length === 1) {
			const layer = dominantLayer[0].layer;
			const layerIndex = layers.indexOf(layer);
			root.containerY = (layerIndex + 0.5) * layerHeight;
		} else {
			root.isCrossOver = true;
		}
		
		if (root.isCrossOver) {
			crossOvers.push(root);
		} else {

			// the coordinate is from top left.
			root.containerY -= root.r;

			// calculate the x. check if it overlaps with previous roots. if it does, move it to the right then check again
			root.containerX = PADDING_X_LAYER;

			let isOverlap = false;
			do {
				isOverlap = false;
				for (let i = 0; i < previousRoots.length; i++) {
					const previousRoot = previousRoots[i];
					const circle1 = {
						x: previousRoot.containerX + previousRoot.r, // center of the circle
						y: previousRoot.containerY + previousRoot.r, // center of the circle
						r: previousRoot.r,
					};
					const circle2 = {
						x: root.containerX + root.r, // center of the circle
						y: root.containerY + root.r, // center of the circle
						r: root.r,
					};
					if (doesCircleOverlap(circle1, circle2)) {
						isOverlap = true;
						root.containerX += findMoveNeededInXForCircle2(circle1, circle2) +
							PADDING_INTER_PACK;
						break;
					}
				}
			} while (isOverlap);
			previousRoots.push(root);
		}
	});

	const maxWidth = previousRoots.reduce((maxWidth, root) => {
		return Math.max(maxWidth, root.containerX + root.r * 2);
	}, 0);

	crossOvers.forEach((root)=> {
		// the coordinate is from top left.
		root.containerX = maxWidth + (layerHeight/2) - root.r + PADDING_X_LAYER;

		// calculate the x. check if it overlaps with previous roots. if it does, move it to the right then check again
		root.containerY = PADDING_X_LAYER;

		let isOverlap = false;
		do {
			isOverlap = false;
			for (let i = 0; i < previousRoots.length; i++) {
				const previousRoot = previousRoots[i];
				const circle1 = {
					x: previousRoot.containerX + previousRoot.r, // center of the circle
					y: previousRoot.containerY + previousRoot.r, // center of the circle
					r: previousRoot.r,
				};
				const circle2 = {
					x: root.containerX + root.r, // center of the circle
					y: root.containerY + root.r, // center of the circle
					r: root.r,
				};
				if (doesCircleOverlap(circle1, circle2)) {
					isOverlap = true;
					root.containerY += findMoveNeededInYForCircle2(circle1, circle2) +
						PADDING_INTER_PACK*2;
					break;
				}
			}
		} while (isOverlap);
		previousRoots.push(root);
	});
	
}
