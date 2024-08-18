export type HierarchyData = {
	count: number;
	package?: string;
	class?: string;
	layer?: string;
	id: string;
	data?: {
		id: string;
	};
	children?: HierarchyData[];
	isHidden?: boolean;
};
