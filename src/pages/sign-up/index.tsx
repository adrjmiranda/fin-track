import { Link } from 'react-router-dom';

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

const SignUp = () => {
	return (
		<main>
			<div className='flex min-h-screen w-screen items-center justify-center'>
				<div className='flex max-w-lg flex-1 flex-col gap-3'>
					<Card className='flex-1'>
						<CardHeader>
							<CardTitle>Crie a sua conta</CardTitle>
							<CardDescription>Insira os seus dados abaixo</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<Input
								type='text'
								placeholder='Digite seu nome'
							/>
							<Input
								type='text'
								placeholder='Digite seu sobrenome'
							/>
							<Input
								type='email'
								placeholder='Digite seu e-mail'
							/>
							<PasswordInput />
							<PasswordInput placeholder='Digite sua senha novamente' />
							<div className='items-top flex space-x-2'>
								<Checkbox id='terms' />
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
						</CardContent>
						<CardFooter>
							<Button className='w-full'>Criar conta</Button>
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
				</div>
			</div>
		</main>
	);
};

export default SignUp;
