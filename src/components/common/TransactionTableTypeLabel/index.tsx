import { CircleIcon } from 'lucide-react';

import type { TransactionTypeType } from '@/types/TransactionTypeType';

type Props = {
	type: TransactionTypeType;
};

const transactionTypeStyle = {
	EARNING: 'bg-green-200 text-green-500',
	EXPENSE: 'bg-red-200 text-red-500',
	INVESTMENT: 'bg-blue-200 text-blue-500',
};

const transactionTypeText = {
	EARNING: 'Ganho',
	EXPENSE: 'Gasto',
	INVESTMENT: 'Investimento',
};

const TransactionTableTypeLabel = ({ type }: Props) => {
	return (
		<div
			className={`${transactionTypeStyle[type]} bg-muted flex w-fit items-center gap-2 rounded-full px-2 py-0.5 text-center text-xs font-medium`}
		>
			<CircleIcon
				size={8}
				className='fill-current'
			/>
			{transactionTypeText[type]}
		</div>
	);
};

export default TransactionTableTypeLabel;
