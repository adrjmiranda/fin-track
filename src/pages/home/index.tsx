import AddTransactionButton from '@/components/common/AddTransactionButton';
import Balance from '@/components/common/Balance';
import DataSelection from '@/components/common/DataSelection';
import Header from '@/components/common/Header/inde';
import TransactionsTable from '@/components/common/TransactionsTable';

const Home = () => {
	return (
		<main>
			<Header />

			<div className='space-y-4 p-8'>
				<div className='flex w-full items-center justify-between'>
					<h2 className='flex-1 font-bold'>Dashboard</h2>

					<div className='flex gap-2'>
						<DataSelection />
						<AddTransactionButton />
					</div>
				</div>
				<Balance />
			</div>

			<div className='space-y-4 p-8'>
				<h2 className='flex-1 font-bold'>Transações</h2>
				<TransactionsTable />
			</div>
		</main>
	);
};

export default Home;
