import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('gastify_test.db');

/* 
-- Tabla de cuenta para manejar el saldo actual
CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    balance REAL NOT NULL            -- Saldo actual de la cuenta
);

-- Tabla de gastos diarios
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,              -- Fecha del gasto (Formato: YYYY-MM-DD)
    time TEXT,                       -- Hora del gasto (Formato: HH:MM)
    amount REAL NOT NULL,            -- Monto del gasto
    description TEXT,                -- Descripción opcional del gasto
    category_id INTEGER,             -- ID de la categoría (relacionado con la tabla categories)
    payment_method TEXT NOT NULL,    -- Método de pago (Efectivo, Transferencia, Tarjeta)
    tax REAL DEFAULT 0.0,            -- Impuesto aplicable solo para Transferencia o Tarjeta
    is_subscription BOOLEAN,         -- Indica si es un gasto recurrente de suscripción
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de categorías de gastos
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL        -- Nombre de la categoría (Ejemplo: "Taxi", "Comida", "Suscripción")
);

-- Tabla de gastos comunes para selección rápida
CREATE TABLE IF NOT EXISTS common_expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,              -- Nombre del gasto frecuente (Ejemplo: "Taxi", "Suscripción Netflix")
    amount REAL NOT NULL,            -- Monto del gasto frecuente
    category_id INTEGER,             -- Categoría del gasto frecuente
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de ingresos
CREATE TABLE IF NOT EXISTS income (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,              -- Fecha del ingreso (Formato: YYYY-MM-DD)
    amount REAL NOT NULL,            -- Monto del ingreso
    description TEXT,                -- Descripción opcional del ingreso (Ejemplo: "Quincena")
    category TEXT                    -- Categoría opcional del ingreso (Ejemplo: "Salario")
);

*/

export const createDatabase = async () => {
	await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY AUTOINCREMENT,balance REAL NOT NULL); 
        CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL, date TEXT NOT NULL,time TEXT,amount REAL NOT NULL,description TEXT,category_id INTEGER,payment_method TEXT NOT NULL,tax REAL DEFAULT 0.0,is_subscription BOOLEAN);
        CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT UNIQUE NOT NULL);
        CREATE TABLE IF NOT EXISTS common_expenses (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,amount REAL NOT NULL,category_id INTEGER);
        CREATE TABLE IF NOT EXISTS income (id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT NOT NULL,amount REAL NOT NULL,description TEXT,category TEXT);
    `);

	// Insertar un valor inicial en la tabla de account
	const accountResult = await db.getAllAsync('SELECT * FROM account');
	if (accountResult.length === 0) {
		// ! AQUÍ CAMBIAR EL VALOR INICIAL DE LA CUENTA (BALANCE)
		await db.execAsync(
			'INSERT INTO account (balance) VALUES (395.0)'
		);
	}

	// Insertar categorías iniciales
	const categoriesResult = await db.getAllAsync(
		'SELECT * FROM categories'
	);
	if (categoriesResult.length === 0) {
		await db.execAsync(`
            INSERT INTO categories (name) VALUES ('Transporte');
            INSERT INTO categories (name) VALUES ('Comida');
            INSERT INTO categories (name) VALUES ('Bebidas');
            INSERT INTO categories (name) VALUES ('Entretenimiento');
            INSERT INTO categories (name) VALUES ('Salud');
            INSERT INTO categories (name) VALUES ('Educación');
            INSERT INTO categories (name) VALUES ('Supermercado');
            INSERT INTO categories (name) VALUES ('Ropa');
            INSERT INTO categories (name) VALUES ('Casual');
        `);
	}
};
