import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactionsQueries } from '@/hooks/queries/useTransactionsQueries';
import type { TransactionFromDbType } from '@/types/TransactionFromDbType';
import { formatCurrency } from '@/utils/format';

import DataTable from '../DataTable';
import EditTransactionButton from '../EditTransactionButton';
import TransactionTableTypeLabel from '../TransactionTableTypeLabel';

const columns: ColumnDef<TransactionFromDbType>[] = [
	{
		accessorKey: 'name',
		header: 'Título',
	},
	{
		accessorKey: 'type',
		header: 'Tipo',
		cell: ({ row: { original: transaction } }) => (
			<TransactionTableTypeLabel type={transaction.type} />
		),
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row: { original: transaction } }) =>
			format(new Date(transaction.date), "dd 'de' MMMMM 'de' yyyy", {
				locale: ptBR,
			}),
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
		cell: ({ row: { original: transaction } }) =>
			formatCurrency(Number(transaction.amount)),
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		cell: ({ row: { original: transaction } }) => (
			<EditTransactionButton transaction={transaction} />
		),
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
		<ScrollArea className='h-auto max-h-[512px] rounded-md border'>
			<DataTable
				columns={columns}
				data={transactions}
			/>
		</ScrollArea>
	);
};

export default TransactionsTable;
