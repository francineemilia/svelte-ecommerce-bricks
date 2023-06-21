<script lang="ts">
	import { get } from 'svelte/store';
	import { cartItems, addToCart, removeFromCart } from '../cart';
	export let product: Product;

	let cart = get(cartItems);
	let cartItemIndex = cart.findIndex((item) => item.id === product.id);
	let cartProduct = cart[cartItemIndex];
	cartItems.subscribe((value) => {
		cart = value;
		cartItemIndex = cart.findIndex((item) => item.id === product.id);
		cartProduct = cart[cartItemIndex];
	});
</script>

<div class="card" id={product.id}>
	<header class="card-header">
		<h2>{product.name}</h2>
	</header>
	{#if cartProduct !== undefined}
		<div class="card-body px-4">Quantity: <strong>{cartProduct.quantity}</strong></div>
	{/if}
	<div class="card-body px-4">Price: $ {product.price}</div>
	<footer class="card-footer">
		<button
			class="p-2 rounded variant-glass-primary"
			on:click={() => {
				addToCart(product.id, product.price);
			}}>Add</button
		>
		<button
			class="p-2 rounded variant-glass-error"
			on:click={() => {
				removeFromCart(product.id);
			}}>Remove</button
		>
	</footer>
</div>
