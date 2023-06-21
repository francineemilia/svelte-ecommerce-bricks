<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { generatedPayment } from '../../paymentData';

	const mp = new MercadoPago('YOUR_PUBLIC_KEY');
	const bricksBuilder = mp.bricks();

	let paymentId: GeneratedPayment = get(generatedPayment);
	
	if (paymentId) {
		const renderStatusScreenBrick = async (bricksBuilder: bricks.Bricks) => {
			await bricksBuilder.create('statusScreen', 'statusScreenBrick_container', {
				initialization: { paymentId: paymentId.id },
				callbacks: {
					onReady: () => {
						console.log('brick is ready');
					},
					onError: (error) => {
						console.log(error);
					}
				}
			});
		};
		renderStatusScreenBrick(bricksBuilder);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		{#if paymentId}
		<div class="col-span-3">
			<a href="/" class="btn variant-soft-primary">Voltar para a home</a>
		</div>
		<div class="col-span-3">
			<div id="statusScreenBrick_container" />
		</div>
		{:else}
		<div class="col-span-3">
			<a href="/" class="btn variant-soft-error">Pagamento não encontrado. Voltar para a home</a>
		</div>
		{/if}
	</div>
</div>
