import { db } from '@/database/config';

export const getAccount = async () => {
	try {
		return await db.getFirstAsync('SELECT * FROM account');
	} catch (error) {
		console.log(error);
		throw new Error('Error al obtener la cuenta');
	}
};
