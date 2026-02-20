import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import PasswordInput from '@/components/common/PasswordInput';
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
import { useAuth } from '@/hooks/commom/useAuth';
import { signUpSchema } from '@/schemas/signUpSchema';

const SignUp = () => {
	const { registerUser } = useAuth();

	const navigate = useNavigate();

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

	const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
		try {
			await registerUser({
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				password: values.password,
			});

			toast.success('Usuário registrado.');

			navigate('/');
		} catch {
			toast.error('Falha. Usuário não registrado.');
		}
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
