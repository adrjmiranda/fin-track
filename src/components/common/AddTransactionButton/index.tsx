import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { zodResolver } from '@hookform/resolvers/zod';
import { PiggyBank, PlusIcon, TrendingDown, TrendingUp } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import DateInput from '../DateInput';

const formSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	amount: z.number().positive('Valor deve ser maior que 0'),
	date: z.date(),
	type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
});

const AddTransactionButton = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			amount: 0,
			date: new Date(),
			type: 'EARNING',
		},
		shouldUnregister: true,
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						<PlusIcon />
						Nova Transação
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Adicionar Transação</DialogTitle>
						<DialogDescription>Insira as informações abaixo.</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
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
												// onChange={() => {}}
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
								name='type'
								render={({ field }) => (
									<FormItem className='flex flex-col space-y-2'>
										<FormLabel>Tipo</FormLabel>
										<FormControl>
											<div className='grid grid-cols-3 gap-4'>
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
														field.value === 'INVESTMENT'
															? 'secondary'
															: 'outline'
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

							<DialogFooter className='space-x-2'>
								<DialogClose asChild>
									<Button
										type='reset'
										variant='secondary'
										className='w-full'
									>
										Cancelar
									</Button>
								</DialogClose>
								<Button
									type='submit'
									className='w-full'
								>
									Adicionar
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddTransactionButton;
