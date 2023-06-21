<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { cartItems } from '../../cart';
	import { goto } from '$app/navigation';
	import { savePayment } from '../../paymentData';
	import { clearCart } from '../../cart';

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

	const totalAmount = get(cartItems).reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

	const mp = new MercadoPago('YOUR_PUBLIC_KEY');
	const bricksBuilder = mp.bricks();

	const renderCardPaymentBrick = async (bricksBuilder: bricks.Bricks) => {
		const preferenceId = await createPreference();
		await bricksBuilder.create('payment', 'paymentBrick_container', {
			initialization: { amount: totalAmount, preferenceId: preferenceId },
			customization: {
				paymentMethods: {
					ticket: 'all',
					bankTransfer: 'all',
					creditCard: 'all',
					debitCard: 'all',
					mercadoPago: 'all'
				}
			},
			callbacks: {
				onReady: () => {
					console.log('brick is ready');
				},
				onError: (error) => {
					console.log(error);
				},
				onSubmit: (formData) => {
					return new Promise((resolve, reject) => {
						fetch('api/process_payment', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(formData)
						})
							.then((response) => {
								if (response.status === 200) {
									response.json().then((data) => {
										savePayment(data.body.id);
										clearCart();
									});
								}
								goto('/statusScreen');
							})
							.catch((error) => {
								console.log(error);
							});
					});
				}
			}
		});
	};
	renderCardPaymentBrick(bricksBuilder);
</script>

<div class="container max-h-full h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<a href="/" class="col-span-3 btn variant-filled-primary">Voltar</a>
		<div class="col-span-3 max-h-full h-full" id="paymentBrick_container" />
	</div>
</div>