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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
	email: z.email().trim(),
	password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

const Login = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
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
								<CardTitle>Entre na sua conta</CardTitle>
								<CardDescription>Insira seus dados abaixo</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
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
							</CardContent>
							<CardFooter>
								<Button className='w-full'>
									{form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
								</Button>
							</CardFooter>
						</Card>

						<div className='flex items-center justify-center'>
							<p className='text-center opacity-50'>Não possui uma conta?</p>
							<Button
								variant='link'
								asChild
								className='-ml-3'
							>
								<Link to='/sign-up'>Criar conta</Link>
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</main>
	);
};

export default Login;
