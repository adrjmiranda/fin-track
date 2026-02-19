import { useMemo } from 'react';

import { PiggyBank, TrendingDown, TrendingUp, WalletIcon } from 'lucide-react';

import { useUser } from '@/hooks/useUser';

import BalanceItem from '../BalanceItem';

const Balance = () => {
	const { balance, balanceIsPending } = useUser();

	const items = useMemo(
		() => [
			{
				title: 'Saldo',
				value: balance?.balance ?? '0',
				Icon: WalletIcon,
				iconStyle: 'text-blue-500',
			},
			{
				title: 'Ganhos',
				value: balance?.earnings ?? '0',
				Icon: TrendingUp,
				iconStyle: 'text-green-500',
			},
			{
				title: 'Gastos',
				value: balance?.expenses ?? '0',
				Icon: TrendingDown,
				iconStyle: 'text-red-500',
			},
			{
				title: 'Investimentos',
				value: balance?.investments ?? '0',
				Icon: PiggyBank,
				iconStyle: 'text-yellow-500',
			},
		],
		[balance],
	);

	return (
		<div className='grid grid-cols-5 gap-6'>
			<div className='col-span-3 grid grid-cols-2 grid-rows-2 gap-6'>
				{items.map((item, index) => (
					<BalanceItem
						key={index}
						title={item.title}
						value={item.value}
						Icon={item.Icon}
						balanceIsPending={balanceIsPending}
						iconStyle={item.iconStyle}
					/>
				))}
			</div>

			<div></div>
		</div>
	);
};

export default Balance;
