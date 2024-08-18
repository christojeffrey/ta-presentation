/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

interface JSONData {
	elements: {
		nodes: {data: any}[], 
		edges: {data: any}[]
	};
}


enum NodeKinds {
	Method = "method",
	Enum = "enum",
	Interface = "interface", // doesn't
	Class = "class",
	Constructor = "ctor",
	Package = "package",
	AbstractClass = "abstract class",
	Script = "script"
}

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function convertJsonToCsvText(jsonData: JSONData): string{
	const columns = "package,class,layer,count\n";
	let csvText = columns
	const layerMap = new Map<string, Map<string, {[key: string]: number}>>(); // Count the layers
	const nodes = jsonData.elements.nodes

	nodes.forEach((node) => {
		// Process only nodes with layer attribute (data.properties.layer)
		if (node.data.properties.layer !== undefined) {
			// If kind is method, ctor, script, then add it to the map
			if (node.data.properties.kind === NodeKinds.Method || node.data.properties.kind === NodeKinds.Constructor || node.data.properties.kind === NodeKinds.Script) {
				// Parse the id
				const id = node.data.id as string;
				const className = id.replace(`.${node.data.properties.simpleName}`, "")
				const packageName = className.split(".")?.reduce((acc, val, idx, arr) => {
					if (idx === arr.length - 1) {
						return acc;
					} 
					return acc.concat(`.${val}`);
				})

				// Check if the package is already in the map
				if (layerMap.has(packageName)) {
					// Check if the class is already in the map
					const packageMap = layerMap.get(packageName);
					if (packageMap!.has(className)) {
						const classMap = packageMap!.get(className);
						classMap![node.data.properties.layer] === undefined ? classMap![node.data.properties.layer] = 1 : classMap![node.data.properties.layer] += 1;
					} else {
						const classMap = {
							[node.data.properties.layer]: 1
						}
						packageMap!.set(className, classMap);
					}
				} else {
					const packageMap = new Map<string, {[key: string]: number}>();
					const classMap = {
						[node.data.properties.layer]: 1
					}
					packageMap.set(className, classMap);
					layerMap.set(packageName, packageMap);
				}
			}
		}
	})

	// Count them and aggregate the data
	layerMap.forEach((packageMap, packageName) => {
		packageMap.forEach((classMap, className) => {
			// Count total of each layer
			const layerCount = Object.keys(classMap).reduce((acc, key) => {
				acc += classMap[key];
				return acc;
			}, 0);

			// Insert into csvText
			Object.keys(classMap).forEach((layer) => {
				const count = classMap[layer]/layerCount;
				csvText = csvText.concat(`${packageName},${className},${layer},${count}\n`);
			})
		})
	})

	return csvText;
}