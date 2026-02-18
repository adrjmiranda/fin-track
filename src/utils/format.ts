// função para formatar um número para moeda BRL
const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
};

export { formatCurrency };
