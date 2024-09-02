<script lang="ts">
	import type { DrawSettingsInterface, LayoutOptions } from '../types';
	export let drawSettings: DrawSettingsInterface;
	export let doRedraw;
	export let doRelayout;
</script>

<div class="w-[100px] overflow-x-clip overflow-y-visible">
	<!-- Filter Edge -->
	<div class="filter-edge">
		<div class="flex h-full w-full flex-col">
			{#if drawSettings.shownEdgesType}
				{#each drawSettings.shownEdgesType as [edgeType, isShown], index}
					<div class="inline align-middle">
						<input
							type="checkbox"
							id={edgeType}
							name="edgeType"
							on:click={(e) => {
								drawSettings.shownEdgesType?.set(edgeType, e.currentTarget.checked);
								doRedraw = true;
							}}
							bind:checked={isShown}
						/>
						<label for={edgeType}>{edgeType}</label>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
