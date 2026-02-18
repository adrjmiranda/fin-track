import { PlusIcon } from 'lucide-react';

import DataSelection from '@/components/common/DataSelection';
import Header from '@/components/common/Header/inde';
import { Button } from '@/components/ui/button';

const Home = () => {
	return (
		<main>
			<Header />

			<div className='p-8'>
				<div className='flex w-full items-center justify-between'>
					<h2 className='flex-1 font-bold'>Dashboard</h2>

					<div className='flex gap-2'>
						<DataSelection />
						<Button>
							<PlusIcon />
							Nova Transação
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
