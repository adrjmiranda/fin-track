import { PlusIcon } from 'lucide-react';

import Balance from '@/components/common/Balance';
import DataSelection from '@/components/common/DataSelection';
import Header from '@/components/common/Header/inde';
import { Button } from '@/components/ui/button';

const Home = () => {
	return (
		<main>
			<Header />

			<div className='space-y-4 p-8'>
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
				<Balance />
			</div>
		</main>
	);
};

export default Home;
