import { db } from '@/database/config';
import { Expense, ExpenseInput } from '@/interfaces';

export const getExpenses = async (): Promise<Expense[]> => {
	try {
		return await db.getAllAsync('SELECT * FROM expenses');
	} catch (error) {
		console.log(error);
		throw new Error('Error al obtener los gastos');
	}
};

export const createExpense = async (expense: ExpenseInput) => {
	try {
		await db.runAsync(
			'INSERT INTO expenses (title, amount, date, time, description, category_id, payment_method, tax, is_subscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				expense.title,
				expense.amount,
				expense.date,
				expense.time || null,
				expense.description || null,
				expense.categoryId,
				expense.paymentMethod,
				expense.tax || null,
				expense.isSubscription || 0,
			]
		);
	} catch (error) {
		console.log(error);
		throw new Error('Error al crear el gasto');
	}
};
