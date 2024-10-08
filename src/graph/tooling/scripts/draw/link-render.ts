import { distance, geometricMean, notNaN, toHTMLToken } from '../../helper';
import type {
	DrawSettingsInterface,
	GraphDataEdge,
	GraphDataNode,
	SimpleNodesDictionaryType
} from '../../types';
import { NormalizeWeight } from './helper/normalize-weight';

/**
 * Render and or update all given links
 * Requires access to all nodes via a dictionary, since links might not contain a reference to their source/target
 * Binds the data
 */
export function renderLinks(
	links: GraphDataEdge[],
	nodesDictionary: SimpleNodesDictionaryType,
	linkCanvas: d3.Selection<SVGGElement, unknown, null, undefined>,
	drawSettings: DrawSettingsInterface,
	canvasId: string
) {
	/** Returns the absolute x and y coordinates of a GraphDataNode */
	function getAbsCoordinates(node?: GraphDataNode): { x: number; y: number } {
		if (node) {
			const { x, y } = getAbsCoordinates(node.parent);
			return {
				x: notNaN(node.x! + x),
				y: notNaN(node.y! + y)
			};
		} else {
			return { x: 0, y: 0 };
		}
	}

	/** Returns true if atan2 is between (-3PI/4, -PI/4), (PI/4, 3PI/4) */
	function isVertical(x1: number, x2: number, y1: number, y2: number) {
		const radial = Math.atan2(y2 - y1, x2 - x1);
		return (
			(radial > (Math.PI * -3) / 4 && radial < Math.PI / -4) ||
			(radial > Math.PI / 4 && radial < (3 * Math.PI) / 4)
		);
	}

	function calculateIntersection(
		source: { x: number; y: number; width: number; height: number },
		target: { x: number; y: number; width: number; height: number }
	) {
		const dx = target.x - source.x;
		const dy = target.y - source.y;
		const angle = Math.atan2(dy, dx);

		// Determine intersection with source rectangle
		let x, y;
		if (Math.abs(dx) * source.height > Math.abs(dy) * source.width) {
			// Intersection is with left or right edge of the rectangle
			x = dx > 0 ? source.width / 2 : -source.width / 2;
			y = x * Math.tan(angle);
		} else {
			// Intersection is with top or bottom edge of the rectangle
			y = dy > 0 ? source.height / 2 : -source.height / 2;
			x = y / Math.tan(angle);
		}
		const intersectionSource = { x: source.x + x, y: source.y + y };

		// Determine intersection with target rectangle
		if (Math.abs(dx) * target.height > Math.abs(dy) * target.width) {
			// Intersection is with left or right edge of the rectangle
			x = dx > 0 ? -target.width / 2 : target.width / 2;
			y = x * Math.tan(angle);
		} else {
			// Intersection is with top or bottom edge of the rectangle
			y = dy > 0 ? -target.height / 2 : target.height / 2;
			x = y / Math.tan(angle);
		}
		const intersectionTarget = { x: target.x + x, y: target.y + y };

		return { intersectionSource, intersectionTarget };
	}
	/** Returns path coordinates, and annotates the line-data with extra info */
	function annotateLine(l: GraphDataEdge) {
		const source = typeof l.source === 'string' ? nodesDictionary[l.source] : l.source;
		const target = typeof l.target === 'string' ? nodesDictionary[l.target] : l.target;
		const sourceAbsoluteCoordinate = getAbsCoordinates(source);
		const targetAbsoluteCoordinate = getAbsCoordinates(target);

		l.absoluteCoordinates = [sourceAbsoluteCoordinate, targetAbsoluteCoordinate];
		l.isGradientVertical = isVertical(
			sourceAbsoluteCoordinate.x,
			targetAbsoluteCoordinate.x,
			sourceAbsoluteCoordinate.y,
			targetAbsoluteCoordinate.y
		);
		l.gradientDirection = l.isGradientVertical
			? sourceAbsoluteCoordinate.y < targetAbsoluteCoordinate.y
			: sourceAbsoluteCoordinate.x > targetAbsoluteCoordinate.x;

		const { intersectionSource: s, intersectionTarget: t } = calculateIntersection(
			{
				x: sourceAbsoluteCoordinate.x,
				y: sourceAbsoluteCoordinate.y,
				width: source.width!,
				height: source.height!
			},
			{
				x: targetAbsoluteCoordinate.x,
				y: targetAbsoluteCoordinate.y,
				width: target.width!,
				height: target.height!
			}
		);

		l.labelCoordinates = [s, t];

		/** List of all coordinates the path will need to go through */
		const coordinates = [
			s,
			...l.routing.map((point) => {
				const { x, y } = getAbsCoordinates(point.origin);
				return {
					x: x + point.x,
					y: y + point.y
				};
			}),
			t
		];

		let result = `M ${Math.abs(s.x - t.x) < 0.3 ? s.x + 0.5 : s.x} ${Math.abs(s.y - t.y) < 0.3 ? s.y + 0.5 : s.y} `;

		let maxDistance = -Infinity;
		for (let i = 0; i < coordinates.length - 2; i++) {
			const p1 = coordinates[i];
			const p2 = coordinates[i + 1];
			const p3 = coordinates[i + 2];

			const sigma = 0.25;
			const turnPoint1 = geometricMean(p1, p2, 1 - sigma);
			const turnPoint2 = geometricMean(p2, p3, sigma);

			const labelDistance = distance(p1, p2);
			if (labelDistance > maxDistance) {
				maxDistance = labelDistance;
				l.labelCoordinates = [p1, p2];
			}

			result += `L ${turnPoint1.x} ${turnPoint1.y} Q ${p2.x} ${p2.y}, ${turnPoint2.x} ${turnPoint2.y} `;
		}
		result += `L ${t.x} ${t.y}`;

		return result;
	}
	// Enter
	linkCanvas
		.selectAll('path')
		.data(links, (l) => (l as GraphDataEdge).id)
		.enter()
		.append('path')
		.attr('id', (l) => `${canvasId}-line-${toHTMLToken(l.id)}`)
		.attr('d', annotateLine)
		.attr(
			'stroke',
			(l) =>
				`url(#${toHTMLToken(l.type)}Gradient${l.isGradientVertical ? 'Vertical' : ''}${l.gradientDirection ? 'Reversed' : ''}${canvasId})`
		)
		.attr('stroke-width', (l) => NormalizeWeight(l.weight))
		.attr('fill', 'transparent');

	// Update
	(
		linkCanvas.selectAll('path') as d3.Selection<
			SVGPathElement,
			GraphDataEdge,
			SVGGElement,
			unknown
		>
	)
		.attr('d', annotateLine)
		.attr(
			'stroke',
			(l) =>
				`url(#${toHTMLToken(l.type)}Gradient${l.isGradientVertical ? 'Vertical' : ''}${l.gradientDirection ? 'Reversed' : ''}${canvasId})`
		)
		.attr('display', (l) => (drawSettings.shownEdgesType.get(l.type) ? 'inherit' : 'none'));

	// No exit, since we don't get all edges when updating

	// Labels
	if (drawSettings.showEdgeLabels) {
		linkCanvas
			.selectAll('text')
			.data(links, (l) => (l as GraphDataEdge).id)
			.enter()
			.append('text')
			.attr('class', 'link-label')
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.attr('fill', 'black')
			.attr('font-size', '10px')
			.text((l) => l.id);

		(linkCanvas.selectAll('text') as d3.Selection<d3.BaseType, GraphDataEdge, SVGGElement, unknown>)
			.attr('x', (l) => (l.labelCoordinates![0].x + l.labelCoordinates![1].x) / 2)
			.attr('y', (l) => (l.labelCoordinates![0].y + l.labelCoordinates![1].y) / 2);
	} else if (!drawSettings.showEdgeLabels) {
		linkCanvas.selectAll('text').remove();
	}

	// Cleanup, just to be sure:
	links.forEach((l) => {
		l.labelCoordinates = undefined;
		l.gradientDirection = undefined;
	});
}
