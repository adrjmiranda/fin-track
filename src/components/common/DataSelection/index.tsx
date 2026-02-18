import { useState } from 'react';

import { addMonths } from 'date-fns';

import type { DateType } from '@/types/DateType';

import { DatePickerWithRange } from '../DatePickerWithRange';

const DataSelection = () => {
	const [date, setDate] = useState<DateType | undefined>({
		from: new Date(),
		to: addMonths(new Date(), 1),
	});

	return (
		<DatePickerWithRange
			value={date}
			onChange={setDate}
		/>
	);
};

export default DataSelection;
