import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
	value: Date;
	onChange: () => void;
	placeholder?: string;
};

const DatePickerWithRange = ({
	value,
	onChange,
	placeholder = 'Selecione uma data',
}: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					data-empty={!value}
					className='data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal'
				>
					{value ? format(value, 'PPP') : <span>{placeholder}</span>}
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'
			>
				<Calendar
					mode='single'
					selected={value}
					onSelect={onChange}
					defaultMonth={value}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DatePickerWithRange;
