import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { addMonths, format } from 'date-fns';

import type { DateType } from '@/types/DateType';

import { DatePickerWithRange } from '../DatePickerWithRange';

const DataSelection = () => {
	const [searchParams] = useSearchParams();

	const [date, setDate] = useState<DateType | undefined>({
		from: searchParams.get('from')
			? new Date(searchParams.get('from')! + 'T00:00:00')
			: new Date(),
		to: searchParams.get('to')
			? new Date(searchParams.get('to')! + 'T00:00:00')
			: addMonths(new Date(), 1),
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (date?.from && date?.to) {
			const from = date.from;
			const to = date.to;

			const queryParams = new URLSearchParams();
			queryParams.append('from', format(from, 'yyyy-MM-dd'));
			queryParams.append('to', format(to, 'yyyy-MM-dd'));

			navigate(`/?${queryParams.toString()}`);
		}
	}, [date, navigate]);

	return (
		<DatePickerWithRange
			value={date}
			onChange={setDate}
		/>
	);
};

export default DataSelection;
