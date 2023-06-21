import type { RequestHandler } from '@sveltejs/kit';
import mercadopago from 'mercadopago';


mercadopago.configurations.setAccessToken(
	'YOUR_ACCESS_TOKEN'
);

export const POST: RequestHandler = async ({ request }) => {
	const requestData = await request.json();
	const paymentData = requestData.formData ? requestData.formData : requestData;
	const responseData = await mercadopago.payment.create(paymentData);

	return new Response(JSON.stringify(responseData), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
