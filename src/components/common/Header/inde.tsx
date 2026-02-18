import { useNavigate } from 'react-router-dom';

import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

import Logo from '@/assets/logo.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

const Header = () => {
	const { user } = useUser();

	const { logoutUser } = useAuth();

	const navigate = useNavigate();

	const handleLogout = () => {
		try {
			logoutUser();
			toast.success('Você saiu.');
			navigate('/login');
		} catch {
			toast.error('Flha ao sair.');
		}
	};

	return (
		<Card>
			<CardContent className='flex items-center justify-between px-8 py-4'>
				<div>
					<img
						src={Logo}
						alt='FinTrack'
					/>
				</div>

				<div>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button
								variant='outline'
								className='flex cursor-pointer justify-between px-2 py-6'
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage src='https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg' />
									<AvatarFallback>
										{user.first_name.charAt(0).toUpperCase() +
											user.last_name.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<p className='text-sm'>
									{user.first_name} {user.last_name}
								</p>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button
									variant='ghost'
									size='sm'
									className='w-full justify-start'
									onClick={handleLogout}
								>
									<LogOutIcon /> Sair
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	);
};

export default Header;
