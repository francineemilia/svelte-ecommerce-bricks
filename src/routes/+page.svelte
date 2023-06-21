<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
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
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Produtos a serem pagos com Checkout Bricks</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<a href="cardPayment" class="col-span-3 btn variant-soft-primary"
			>Checkout com Card Payment Brick</a
		>
		<a href="payment" class="col-span-3 btn variant-soft-primary">Checkout com Payment Brick</a>
		<a href="walletInit" class="col-span-3 btn variant-soft-primary"
			>Checkout com Wallet Brick (preferência na inicialização)</a
		>
		<a href="walletSub" class="col-span-3 btn variant-soft-primary"
			>Checkout com Wallet Brick (preferência no envio)</a
		>
		<a href="statusScreen" class="col-span-3 btn variant-soft-primary"
			>Verifique o status do pagamento com o Status Screen Brick</a
		>
	</div>
</div>
