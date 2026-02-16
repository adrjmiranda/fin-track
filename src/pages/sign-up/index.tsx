import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
							<Input
								type='password'
								placeholder='Digite sua senha'
							/>
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
