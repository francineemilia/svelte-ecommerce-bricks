# Sveltekit + MercadoPago Checkout Bricks

## Intro
This project is a personal project used as much a learning project and as a integration test.
## Technologies

- Sveltkit:
  - Svelt
  - Typescript
  - Tailwind
  - Vite
  - Node
- MercadoPago SDK (Node)
- MercadoPago SDK JS

## Requirements

- Node.js 18.6 or higher (you can download it [here](https://nodejs.org/)).

- [Read the instructions](https://www.mercadopago.com/developers/en/docs/getting-started) on how to create an application at the Mercado Pago Developer Panel in order to acquire your public key and access token. They will grant you access to Mercado Pago's public APIs.

## Installation

1. Clone the project.

```bash
git clone https://github.com/francineemilia/svelte-ecommerce-bricks
```

2. Go to the project's folder.

```bash
cd svelte-ecommerce-bricks
```

3. Then install the dependencies.

```bash
npm install
```

## How to run it

1. Create an .env file in the root folder. You can just rename the `.env.example` to `.env`

2. Changes the `PUBLIC_KEY` and `SECRET_ACTK` to the public key and access token from your MercadoPago aplication

3. Run the following command to start the application:

```bash
npm run dev
``` 

4. Copy the generated URL

### Testing

On MercadoPago [testing instructions](https://www.mercadopago.com/developers/en/docs/checkout-bricks/integration/integration-test) you'll find **[credit cards](https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/test-cards)** that can be used along with this sample and a guide on how to create **test users**.