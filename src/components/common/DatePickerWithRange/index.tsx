import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import type { DateType } from '@/types/DateType';

type Props = {
	value: DateType | undefined;
	onChange: (date: DateType | undefined) => void;
	placeholder?: string;
};

export function DatePickerWithRange({
	value,
	onChange,
	placeholder = 'Selecione um período',
}: Props) {
	return (
		<Field className='mx-auto w-fit'>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						id='date-picker-range'
						className='justify-start px-2.5 font-normal capitalize'
					>
						<CalendarIcon />
						{value?.from ? (
							value.to ? (
								<>
									{format(value.from, 'LLL dd, y', {
										locale: ptBR,
									})}{' '}
									-{' '}
									{format(value.to, 'LLL dd, y', {
										locale: ptBR,
									})}
								</>
							) : (
								format(value.from, 'LLL dd, y', {
									locale: ptBR,
								})
							)
						) : (
							<span>{placeholder}</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='start'
				>
					<Calendar
						mode='range'
						defaultMonth={value?.from}
						selected={value}
						onSelect={(range) => onChange(range as DateType)}
						numberOfMonths={2}
						locale={ptBR}
						formatters={{
							formatCaption: (date) => {
								const formatted = format(date, 'MMMM yyyy', { locale: ptBR });
								return formatted.charAt(0).toUpperCase() + formatted.slice(1);
							},
						}}
					/>
				</PopoverContent>
			</Popover>
		</Field>
	);
}
