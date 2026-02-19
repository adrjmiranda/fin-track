import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
	value: Date | undefined;
	onChange: (value: Date | undefined) => void;
	placeholder?: string;
};

const DateInput = ({
	value,
	onChange,
	placeholder = 'Selecione a data',
}: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					data-empty={!value}
					className='data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal capitalize'
				>
					{value ? (
						format(value, 'PPP', { locale: ptBR })
					) : (
						<span>{placeholder}</span>
					)}
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
					locale={ptBR}
					className='capitalize'
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DateInput;
