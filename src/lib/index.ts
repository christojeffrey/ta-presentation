// place files you want to import through the `$lib` alias in this folder.

export function adjustHexColor(hex: string, percent: number): string {
	// Parse the hex color
	const num = parseInt(hex.slice(1), 16);

	// Extract RGB components
	const rgb = [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];

	const adjustedRgb = rgb
		.map((c) => Math.floor(c + (255 - c) * percent)) // Adjust RGB components based on the percentage
		.map((c) => Math.max(Math.min(c, 255), 0)); // Cap RGB values at 0 and 255

	// Convert RGB back to hex
	const adjustedHex =
		'#' + adjustedRgb.reduce((acc, c) => acc + c.toString(16).padStart(2, '0'), '');

	return adjustedHex;
}
