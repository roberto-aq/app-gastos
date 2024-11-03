import { db } from '../../database/config';

export const getCategories = async () => {
	try {
		return await db.getAllAsync('SELECT * FROM categories');
	} catch (error) {
		console.log(error);
		throw new Error('Error al obtener las categorías');
	}
};

export const createCategory = async (category: string) => {
	try {
		await db.runAsync('INSERT INTO categories (name) VALUES (?)', [
			category,
		]);
	} catch (error) {
		console.log(error);
		throw new Error('Error al crear la categoría');
	}
};
