import * as z from 'zod';

export const signUpSchema = z
	.object({
		firstName: z.string().trim().min(2, 'Mínimo de 2 caracteres'),
		lastName: z.string().trim().min(2, 'Mínimo de 2 caracteres'),
		email: z.email('E-mail inválido').trim(),
		password: z.string().min(6, 'Mínimo de 6 caracteres'),
		confirmPassword: z.string(),
		terms: z
			.boolean()
			.refine((val) => val === true, 'Você deve aceitar os termos'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não conincidem',
		path: ['confirmPassword'],
	});
