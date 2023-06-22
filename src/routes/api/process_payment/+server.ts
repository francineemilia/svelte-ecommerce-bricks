import type { RequestHandler } from '@sveltejs/kit';
import mercadopago from 'mercadopago';
import { SECRET_ACTK } from '$env/static/private';

mercadopago.configurations.setAccessToken(SECRET_ACTK);

export const POST: RequestHandler = async ({ request }) => {
	const requestData = await request.json();
	const paymentData = requestData.formData ? requestData.formData : requestData;
	const responseData = await mercadopago.payment.create(paymentData);

	return new Response(JSON.stringify(responseData), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
