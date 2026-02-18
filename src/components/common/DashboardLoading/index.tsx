import { Skeleton } from '@/components/ui/skeleton';

const DashboardLoading = () => {
	return (
		<div className='space-y-4 p-8'>
			<Skeleton className='h-8 w-[200px]' />
			<div className='grid gap-4 md:grid-cols-3'>
				<Skeleton className='h-[120px] rounded-xl' />
				<Skeleton className='h-[120px] rounded-xl' />
				<Skeleton className='h-[120px] rounded-xl' />
			</div>
			<Skeleton className='h-[300px] w-full rounded-xl' />
		</div>
	);
};

export default DashboardLoading;
