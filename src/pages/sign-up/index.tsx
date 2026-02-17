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

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: SignUpFormData) => {
		console.log('Dados do formulário: ', values);
	};

	return (
		<main>
			<div className='flex min-h-screen w-screen items-center justify-center'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex max-w-lg flex-1 flex-col gap-3'
				>
					<Card className='flex-1'>
						<CardHeader>
							<CardTitle>Crie a sua conta</CardTitle>
							<CardDescription>Insira os seus dados abaixo</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-1'>
								<Input
									{...register('firstName')}
									type='text'
									placeholder='Digite seu nome'
								/>
								{errors.firstName && (
									<p className='text-destructive text-xs'>
										{errors.firstName.message}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<Input
									{...register('lastName')}
									type='text'
									placeholder='Digite seu sobrenome'
								/>
								{errors.lastName && (
									<p className='text-destructive text-xs'>
										{errors.lastName.message}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<Input
									{...register('email')}
									type='text'
									placeholder='Digite seu e-mail'
								/>
								{errors.email && (
									<p className='text-destructive text-xs'>
										{errors.email.message}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<PasswordInput {...register('password')} />
								{errors.password && (
									<p className='text-destructive text-xs'>
										{errors.password.message}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<PasswordInput
									{...register('confirmPassword')}
									placeholder='Digite sua senha novamente'
								/>
								{errors.confirmPassword && (
									<p className='text-destructive text-xs'>
										{errors.confirmPassword.message}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<div className='items-top flex space-x-2'>
									<Checkbox
										id='terms'
										onCheckedChange={(checked) =>
											setValue('terms', checked === true)
										}
									/>
									<div className='grid gap-1.5 leading-none'>
										<label
											htmlFor='terms'
											className='text-muted-foreground text-xs opacity-75'
										>
											Ao clicar em "Criar conta", você aceita{' '}
											<a
												href='#'
												className='text-white underline'
											>
												nossos termos de uso e política de privacidade
											</a>
										</label>
									</div>
								</div>
								{errors.terms && (
									<p className='text-destructive text-xs'>
										{errors.terms.message}
									</p>
								)}
							</div>
						</CardContent>
						<CardFooter>
							<Button className='w-full'>
								{isSubmitting ? 'Criando...' : 'Criar conta'}
							</Button>
						</CardFooter>
					</Card>

					<div className='flex items-center justify-center'>
						<p className='text-center opacity-50'>Já possui uma conta?</p>
						<Button
							variant='link'
							asChild
						>
							<Link to='/login'>Faça login</Link>
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default SignUp;
