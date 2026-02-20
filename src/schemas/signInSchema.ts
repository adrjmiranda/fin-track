import * as z from 'zod';

export const signInSchema = z.object({
	email: z.email().trim(),
	password: z.string().min(6, 'Mínimo de 6 caracteres'),
});
