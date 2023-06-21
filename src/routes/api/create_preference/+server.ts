import type { RequestHandler } from '@sveltejs/kit';
import mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(
	'YOUR_ACCESS_TOKEN'
);

export const POST: RequestHandler = async ({ request }) => {
	let requestData = await request.json();
	let preference = {
		items: requestData.map((item: CartItem) => {
			return {
				title: `Meu produto ${item.id}`,
				unit_price: item.unitPrice,
				quantity: item.quantity
			};
		})
	};

	const responseData = await mercadopago.preferences.create(preference);

	return new Response(JSON.stringify(responseData), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
