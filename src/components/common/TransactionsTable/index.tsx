import { Skeleton } from '@/components/ui/skeleton';
import { useTransactionsQueries } from '@/hooks/queries/useTransactionsQueries';

import DataTable from '../DataTable';

const columns = [
	{
		accessorKey: 'name',
		header: 'Título',
	},
	{
		accessorKey: 'type',
		header: 'Tipo',
	},
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
	},
];

const TransactionsTable = () => {
	const { transactions, isTransactionsLoading } = useTransactionsQueries();

	return isTransactionsLoading ? (
		<>
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-8 w-full' />
		</>
	) : transactions.length === 0 ? (
		<p>Nenhum tarefa para mostrar neste período</p>
	) : (
		<DataTable
			columns={columns}
			data={transactions}
		/>
	);
};

export default TransactionsTable;
