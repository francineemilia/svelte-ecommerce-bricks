<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { cartItems } from '../../cart';

	import ProductCard from '$lib/productCard.svelte';
	import { PUBLIC_KEY } from '$env/static/public';
	const products: Product[] = [
		{
			name: 'Coffee',
			price: 10,
			id: '1'
		},
		{
			name: 'Sunglasses',
			price: 20,
			id: '2'
		},
		{
			name: 'Water Bottle',
			price: 30,
			id: '3'
		}
	];

	const mp = new MercadoPago(PUBLIC_KEY);
	const bricksBuilder = mp.bricks();

	const renderCardPaymentBrick = async (bricksBuilder: bricks.Bricks) => {
		await bricksBuilder.create('wallet', 'walletBrick_container', {
			callbacks: {
				onSubmit: () => {
					return new Promise((resolve, reject) => {
						fetch(`api/create_preference`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(get(cartItems))
						})
							.then((response) => {
								return response.json();
							})
							.then((response) => {
								resolve(response.body.id);
							})
							.catch((error) => {
								console.log(error);
								reject();
							});
					});
				}
			}
		});
	};
	renderCardPaymentBrick(bricksBuilder);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<a href="/" class="btn variant-filled-primary col-span-3">Voltar</a>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<div id="walletBrick_container" />
		</div>
	</div>
</div>
