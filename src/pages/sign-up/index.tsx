import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import PasswordInput from '@/components/common/password-input';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const signUpSchema = z
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

const SignUp = () => {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			terms: false,
		},
	});

	const onSubmit = (values: z.infer<typeof signUpSchema>) => {
		console.log(values);
	};

	return (
		<main>
			<div className='flex min-h-screen w-screen items-center justify-center'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex max-w-lg flex-1 flex-col gap-3'
					>
						<Card className='flex-1'>
							<CardHeader className='text-center'>
								<CardTitle>Crie a sua conta</CardTitle>
								<CardDescription>Insira os seus dados abaixo</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<FormField
									control={form.control}
									name='firstName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Digite seu nome'
												/>
											</FormControl>
											<FormMessage className='text-xs' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='lastName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Sobrenome</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Digite seu sobrenome'
												/>
											</FormControl>
											<FormMessage className='text-xs' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>E-mail</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Digite seu e-mail'
												/>
											</FormControl>
											<FormMessage className='text-xs' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha</FormLabel>
											<FormControl>
												<PasswordInput
													{...field}
													placeholder='Digite sua senha'
												/>
											</FormControl>
											<FormMessage className='text-xs' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirmação de senha</FormLabel>
											<FormControl>
												<PasswordInput
													{...field}
													placeholder='Digite sua senha novamente'
												/>
											</FormControl>
											<FormMessage className='text-xs' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='terms'
									render={({ field }) => (
										<FormItem className='flex flex-row items-start space-y-0 space-x-3'>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className='flex flex-1 flex-col space-y-1 leading-none'>
												<FormLabel className='text-xs font-normal opacity-75'>
													<p>
														Ao clicar em "Criar conta", você aceita{' '}
														<a
															href='#'
															className='text-white underline'
														>
															nossos termos de uso e política de privacidade
														</a>
													</p>
												</FormLabel>
												<FormMessage className='text-xs' />
											</div>
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter>
								<Button className='w-full'>
									{form.formState.isSubmitting ? 'Criando...' : 'Criar conta'}
								</Button>
							</CardFooter>
						</Card>

						<div className='flex items-center justify-center'>
							<p className='text-center opacity-50'>Já possui uma conta?</p>
							<Button
								variant='link'
								asChild
								className='-ml-3'
							>
								<Link to='/login'>Faça login</Link>
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</main>
	);
};

export default SignUp;
