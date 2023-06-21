<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { cartItems } from '../../cart';

	if (get(cartItems).length === 0) {
		window.location.href = '/';
	}

	async function createPreference() {
		const response = await fetch(`api/create_preference`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(get(cartItems))
		});
		const preference = await response.json();
		const id = preference.body.id;
		return id;
	}

	const mp = new MercadoPago('YOUR_PUBLIC_KEY');
	const bricksBuilder = mp.bricks();

	const renderCardPaymentBrick = async (bricksBuilder: bricks.Bricks) => {
		const preferenceId = await createPreference();
		await bricksBuilder.create('wallet', 'walletBrick_container', {
			initialization: {
				preferenceId: preferenceId
			},
			callbacks: {
				onSubmit: () => {
					return new Promise((resolve, reject) => {
						resolve(preferenceId);
					});
				}
			}
		});
	};
	renderCardPaymentBrick(bricksBuilder);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<a href="/" class="col-span-3 btn variant-filled-primary">Voltar</a>
		<div class="col-span-3" id="walletBrick_container" />
	</div>
</div>
