export interface Expense {
	amount: number;
	category_id: number;
	date: string;
	description: string | null;
	id: number;
	is_subscription: number; // 0 or 1
	payment_method: string;
	tax: string | null;
	time: string | null;
	title: string;
}

export interface ExpenseInput {
	title: string;
	amount: number;
	date: string;
	paymentMethod:
		| 'efectivo'
		| 'transferencia_bancaria'
		| 'tarjeta_credito';
	categoryId: number;

	description?: string;
	time?: string;
	tax?: number;
	isSubscription?: boolean;
}
