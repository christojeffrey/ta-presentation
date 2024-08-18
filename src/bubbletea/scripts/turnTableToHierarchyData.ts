/* eslint-disable @typescript-eslint/no-explicit-any */
import { layers } from '$lib/constant';
import * as d3 from 'd3';

export function turnTableToHierarchyData(table: d3.DSVRowArray<string>) {
	// normalize invalid layers
	table.forEach((row) => {
		if (!layers.includes(row.layer)) {
			row.layer = 'Unknown Layer';
		}
	});

	const obj: any = {};

	table.forEach(({ package: pkg, class: cls, layer, count: cstr }) => {
		const count = parseFloat(cstr);
		if (!obj[pkg]) {
			obj[pkg] = {};
		}
		if (!obj[pkg][cls]) {
			obj[pkg][cls] = [];
		}
		obj[pkg][cls].push({ layer, count });
	});

	const nodes: any = [];

	for (const pkg in obj) {
		const classes = obj[pkg];
		const temporaryTable: any = [];

		for (const cls in classes) {
			const rows = classes[cls];

			// add instances with their respective layers and counts
			rows.forEach((row: { count: any; layer: any }) => {
				temporaryTable.push({
					id: `${cls}-${row.layer}`,
					parent: cls,
					kind: 'layer_info',
					count: row.count,
					layer: row.layer
				});
			});

			// append parent class
			temporaryTable.push({
				id: cls,
				parent: pkg,
				kind: 'class',
				count: 0,
				layer: undefined
			});
		}

		// append package
		temporaryTable.push({
			id: pkg,
			parent: '',
			kind: 'package',
			count: 0,
			layer: undefined
		});

		nodes.push(temporaryTable);
	}

	const roots: d3.HierarchyNode<unknown>[] = [];
	nodes.forEach((temporaryTable: unknown[]) => {
		// turn to d3 hierarchy
		const root = d3
			.stratify()
			.id((d: any) => d.id)
			.parentId((d: any) => d.parent)(temporaryTable);

		roots.push(root);
	});
	return roots;
}
