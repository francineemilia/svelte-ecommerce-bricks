import { writable, get } from 'svelte/store';

export const cartItems = writable<CartItem[]>([]);

export const addToCart = (id: string, price: number) => {
	let items = get(cartItems);
	let itemPosition = items.findIndex((item) => item.id === id);

	if (itemPosition !== -1) {
		cartItems.update(() => {
			let updatedItems = items.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			return updatedItems;
		});
	} else {
		cartItems.update(() => [...items, { id: id, quantity: 1, unitPrice: price }]);
	}
};

export const removeFromCart = (id: string) => {
	let items = get(cartItems);
	let itemPosition = items.findIndex((item) => item.id === id);

	if (items[itemPosition]?.quantity - 1 === 0) {
		items.splice(itemPosition, 1);
	}

    cartItems.update(() => {
        let updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity -1 };
            }
            return item;
        });
        return updatedItems;
    });
};

export const clearCart = () => {
	cartItems.update(() => []);
};
