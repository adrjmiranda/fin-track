import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { addMonths, format, isValid } from 'date-fns';

import type { DateType } from '@/types/DateType';

import { DatePickerWithRange } from '../DatePickerWithRange';

const DataSelection = () => {
	const [searchParams] = useSearchParams();

	const [date, setDate] = useState<DateType | undefined>(() => {
		const from = searchParams.get('from') ?? '';
		const to = searchParams.get('to') ?? '';

		const paramsAreInvalid =
			!isValid(new Date(from)) || !isValid(new Date(to)) || !from || !to;

		if (paramsAreInvalid)
			return {
				from: new Date(),
				to: addMonths(new Date(), 1),
			};

		return {
			from: new Date(from + 'T00:00:00'),
			to: new Date(to + 'T00:00:00'),
		};
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
