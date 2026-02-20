import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useSearchParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
	ExternalLinkIcon,
	LoaderIcon,
	PiggyBank,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { USER_TRANSACTIONS } from '@/constants/TransactionsQueriesKeys';
import { USER_BALANCE } from '@/constants/UseQueriesKeys';
import { useUser } from '@/hooks/commom/useUser';
import { useTransactionMutations } from '@/hooks/mutations/useTransactionMutations';
import { editTransactionSchema } from '@/schemas/editTransactionSchema';
import type { TransactionFromDbType } from '@/types/TransactionFromDbType';

import DateInput from '../DateInput';

type Props = {
	transaction: TransactionFromDbType;
};

const initialTransacionValues = (transaction: TransactionFromDbType) => ({
	id: transaction.id,
	name: transaction.name,
	type: transaction.type,
	date: new Date(transaction.date),
	amount: Number(transaction.amount),
});

const EditTransactionButton = ({ transaction }: Props) => {
	const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);

	const { updateTransactionMutation } = useTransactionMutations();

	const queryClient = useQueryClient();
	const { user } = useUser();
	const [searchParams] = useSearchParams();

	const form = useForm<z.infer<typeof editTransactionSchema>>({
		resolver: zodResolver(editTransactionSchema),
		defaultValues: initialTransacionValues(transaction),
		shouldUnregister: true,
	});

	useEffect(() => {
		form.reset(initialTransacionValues(transaction));
	}, [form, transaction]);

	const onSubmit = async (values: z.infer<typeof editTransactionSchema>) => {
		try {
			await updateTransactionMutation.mutateAsync({
				id: transaction.id,
				data: {
					name: values.name,
					type: values.type,
					date: values.date.toISOString(),
					amount: values.amount,
				},
			});

			queryClient.invalidateQueries({
				queryKey: [
					USER_BALANCE,
					user?.id,
					searchParams.get('from') ?? '',
					searchParams.get('to') ?? '',
				],
			});
			queryClient.invalidateQueries({
				queryKey: [
					USER_TRANSACTIONS,
					user?.id,
					searchParams.get('from') ?? '',
					searchParams.get('to') ?? '',
				],
			});

			setSheetIsOpen(false);

			toast.success('Transação editada com sucesso!');
		} catch {
			toast.error('Erro ao editar transação');
		}
	};

	return (
		<Sheet
			open={sheetIsOpen}
			onOpenChange={setSheetIsOpen}
		>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
				>
					<ExternalLinkIcon className='text-muted-foreground' />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Editar Transação:</SheetTitle>
					<SheetDescription className='font-bold'>
						{transaction.name}
					</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 px-4'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='flex flex-col space-y-2'>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											placeholder='Nome da transação'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='amount'
							render={({ field }) => (
								<FormItem className='flex flex-col space-y-2'>
									<FormLabel>Valor</FormLabel>
									<FormControl>
										<NumericFormat
											thousandSeparator='.'
											decimalSeparator=','
											prefix='R$ '
											allowNegative={false}
											customInput={Input}
											{...field}
											onChange={() => {}}
											onValueChange={(values) =>
												field.onChange(values.floatValue)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem className='flex flex-col space-y-2'>
									<FormLabel>Data</FormLabel>
									<FormControl>
										<DateInput
											placeholder='Data da transação'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem className='flex flex-col space-y-2'>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<div className='grid grid-cols-3 gap-2'>
											<Button
												type='button'
												variant={
													field.value === 'EARNING' ? 'secondary' : 'outline'
												}
												onClick={() => field.onChange('EARNING')}
											>
												<TrendingUp className='text-green-400' />
												Ganho
											</Button>
											<Button
												type='button'
												variant={
													field.value === 'EXPENSE' ? 'secondary' : 'outline'
												}
												onClick={() => field.onChange('EXPENSE')}
											>
												<TrendingDown className='text-red-400' />
												Gasto
											</Button>
											<Button
												type='button'
												variant={
													field.value === 'INVESTMENT' ? 'secondary' : 'outline'
												}
												onClick={() => field.onChange('INVESTMENT')}
											>
												<PiggyBank className='text-yello-400' />
												Investimento
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<SheetFooter className='flex-row items-center space-x-2 px-0'>
							<SheetClose asChild>
								<Button
									type='reset'
									variant='secondary'
									className='w-full'
									disabled={form.formState.isSubmitting}
								>
									Cancelar
								</Button>
							</SheetClose>
							<Button
								type='submit'
								className='w-full'
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<LoaderIcon className='animate-spin' />
								) : (
									'Atualizar'
								)}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default EditTransactionButton;
