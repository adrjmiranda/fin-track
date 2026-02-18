import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
	return (
		<div className='bg-background fixed inset-0 z-50 flex flex-col items-center justify-center'>
			<div className='flex flex-col items-center gap-4'>
				<Loader2 className='text-primary size-12 animate-spin' />

				<div className='flex flex-col items-center'>
					<div className='text-xl font-semibold tracking-tight'>FinTrack</div>
					<div className='text-muted-foreground animate-pulse text-sm'>
						Preparando seu ambiente...
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
