<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	export let table: d3.DSVRowArray<string>;
	// package, class , layer, count
	console.log('table', table);
	// parse to array
	let tableArray: any[] = [];
	$: {
		if (table) {
			tableArray = table.map((row) => {
				const newRow: any[] = [];
				table.columns.forEach((column) => {
					newRow.push(row[column]);
				});
				return newRow;
			});
			console.log('tableArray', tableArray);
		}
	}
</script>

{#if table}
	<Table.Root>
		<Table.Caption>Attributes</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Package</Table.Head>
				<Table.Head class="w-[100px]">Class</Table.Head>
				<Table.Head class="w-[100px]">Layer</Table.Head>
				<Table.Head class="w-[100px]">Count</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each tableArray as row}
				<Table.Row>
					{#each row as cell}
						<Table.Cell>{cell}</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{:else}
	<p>No data</p>
{/if}
