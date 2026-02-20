import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactionsQueries } from '@/hooks/queries/useTransactionsQueries';
import type { TransactionType } from '@/types/TransactionType';
import { formatCurrency } from '@/utils/format';

import DataTable from '../DataTable';
import TransactionTableTypeLabel from '../TransactionTableTypeLabel';

const columns: ColumnDef<TransactionType>[] = [
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
			formatCurrency(transaction.amount),
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		cell: () => (
			<Button
				variant='ghost'
				size='icon'
			>
				<ExternalLinkIcon className='text-muted-foreground' />
			</Button>
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
