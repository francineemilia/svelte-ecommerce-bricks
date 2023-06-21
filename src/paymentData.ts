import { writable } from 'svelte/store';

export const generatedPayment = writable<GeneratedPayment>();

export const savePayment = (id: number) => {
	generatedPayment.set({ id });
};
