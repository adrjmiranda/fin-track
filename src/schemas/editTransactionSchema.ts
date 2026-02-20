import * as z from 'zod';

import { createTransactionSchema } from './createTransactionSchema';

export const editTransactionSchema = createTransactionSchema.extend({
	id: z.uuid(),
});
