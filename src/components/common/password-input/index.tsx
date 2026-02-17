import { useState } from 'react';

import { EyeClosed, EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
	placeholder?: string;
};

const PasswordInput = ({ placeholder = 'Digite sua senha' }: Props) => {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	return (
		<div className='relative'>
			<Input
				type={passwordVisible ? 'text' : 'password'}
				placeholder={placeholder}
			/>
			<Button
				variant='ghost'
				className='text-muted-foreground absolute inset-0 my-auto mr-1 ml-auto h-8 w-8'
				onClick={() => setPasswordVisible((prev) => !prev)}
			>
				{passwordVisible ? <EyeClosed /> : <EyeIcon />}
			</Button>
		</div>
	);
};

export default PasswordInput;
