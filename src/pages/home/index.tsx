import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import { useAuth } from '@/hooks/useAuth';

const Home = () => {
	const { logoutUser } = useAuth();

	const navigate = useNavigate();

	return (
		<main>
			<div>
				<button
					type='button'
					onClick={() => {
						try {
							logoutUser();

							toast.success('Você saiu.');

							navigate('/login');
						} catch {
							toast.error('Falha ao tentar fazer logout.');
						}
					}}
				>
					Logout
				</button>
			</div>
		</main>
	);
};

export default Home;
