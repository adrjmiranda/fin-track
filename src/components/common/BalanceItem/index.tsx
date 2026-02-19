import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/format';

type Props = {
	title: string;
	Icon: LucideIcon;
	value: string;
	balanceIsPending: boolean;
	iconStyle: string;
};

const BalanceItem = ({
	title,
	Icon,
	value,
	balanceIsPending,
	iconStyle,
}: Props) => {
	return (
		<Card>
			<CardContent className='space-y-3 p-6'>
				<div className='flex items-center gap-2'>
					<div className='bg-muted flex h-8 w-8 items-center justify-center rounded-lg'>
						<Icon className={iconStyle} />
					</div>
					<p className='text-muted-foreground text-sm'>{title}</p>
				</div>
				{balanceIsPending ? (
					<Skeleton className='h-8 w-[200px]' />
				) : (
					<h3 className='text-2xl font-semibold'>
						{formatCurrency(parseFloat(value))}
					</h3>
				)}
			</CardContent>
		</Card>
	);
};

export default BalanceItem;
