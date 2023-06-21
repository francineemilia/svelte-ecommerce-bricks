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

	const totalAmount = get(cartItems).reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

	const mp = new MercadoPago('YOUR_PUBLIC_KEY');
	const bricksBuilder = mp.bricks();

	const renderCardPaymentBrick = async (bricksBuilder: bricks.Bricks) => {
		await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
			initialization: { amount: totalAmount },
			callbacks: {
				onReady: function () {
					console.log('onReady');
				},
				onError: function (error) {
					console.log(error);
				},
				onSubmit: (cardFormData) => {
					return new Promise((resolve, reject) => {
						fetch('api/process_payment', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(cardFormData)
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

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<a href="/" class="col-span-3 btn variant-filled-primary">Voltar</a>
		<div class="col-span-3" id="cardPaymentBrick_container" />
	</div>
</div>
