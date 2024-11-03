import { Loader } from '@/components/shared/Loader';
import {
	useCategories,
	useCreateExpense,
	useExpenses,
} from '@/hooks';
import { Category } from '@/interfaces';
import { globalStyles } from '@/theme/globals';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
	StyleSheet,
	View,
	ScrollView,
	useWindowDimensions,
	Platform,
} from 'react-native';
import {
	Button,
	Divider,
	FAB,
	Menu,
	Text,
	TextInput,
} from 'react-native-paper';
import { router } from 'expo-router';

type FormData = {
	title: string;
	amount: number;
	categoryId: number;
	date: string;
	description?: string;
	paymentMethod:
		| 'efectivo'
		| 'transferencia_bancaria'
		| 'tarjeta_credito';
	tax?: number;
	isSubscription?: boolean;
};

const paymentMethods = [
	{ label: 'Efectivo', value: 'efectivo' },
	{
		label: 'Transferencia Bancaria',
		value: 'transferencia_bancaria',
	},
	{ label: 'Tarjeta de Crédito', value: 'tarjeta_credito' },
];

export default function NewExpenseScreen() {
	const [categoryMenuVisible, setCategoryMenuVisible] =
		useState(false);
	const [paymentMethodMenuVisible, setPaymentMethodMenuVisible] =
		useState(false);
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	const { data: categories, isLoading: isLoadingCategories } =
		useCategories();
	const { mutate, isPending } = useCreateExpense();

	const { width } = useWindowDimensions();

	const {
		formState: { errors },
		control,
		handleSubmit,
		setValue,
	} = useForm<FormData>();

	const handleDateChange = (event: any, selectedDate?: Date) => {
		setDatePickerVisible(false);
		if (selectedDate) {
			const year = selectedDate.getFullYear();
			const month = String(selectedDate.getMonth() + 1).padStart(
				2,
				'0'
			); // Asegura dos dígitos
			const day = String(selectedDate.getDate()).padStart(2, '0'); // Asegura dos dígitos
			const formattedDate = `${year}-${month}-${day}`;
			setValue('date', formattedDate); // Setea el valor en React Hook Form
		}
	};

	const onAddExpense = async (data: FormData) => {
		mutate(
			{
				amount: data.amount,
				categoryId: data.categoryId,
				date: data.date,
				description: data.description,
				isSubscription: data.isSubscription,
				paymentMethod: data.paymentMethod,
				tax: data.tax,
				title: data.title,
			},
			{
				onSuccess: () => {
					router.navigate('/expenses');
				},
			}
		);
	};
	if (isPending) return <Loader />;

	return (
		<View style={globalStyles.container}>
			<Text
				variant='displaySmall'
				style={{
					marginVertical: 20,
				}}
			>
				Crear nuevo Gasto
			</Text>

			<ScrollView style={{}}>
				<Controller
					control={control}
					name='title'
					rules={{ required: 'Name is required' }}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							label='Titulo'
							mode='flat'
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							error={!!errors.title}
						/>
					)}
				/>
				{errors.title && (
					<Text style={{ color: 'red' }}>{errors.title.message}</Text>
				)}

				<Controller
					control={control}
					name='amount'
					rules={{ required: 'Monto es requerido' }}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							label='Monto'
							mode='flat'
							value={value?.toString()}
							onBlur={onBlur}
							onChangeText={onChange}
							error={!!errors.title}
							keyboardType='numeric'
						/>
					)}
				/>
				{errors.amount && (
					<Text style={{ color: 'red' }}>
						{errors.amount.message}
					</Text>
				)}

				{/* FECHA */}
				<Text
					variant='headlineSmall'
					style={{ color: '#333', marginVertical: 15 }}
				>
					Fecha:
				</Text>
				<Controller
					control={control}
					name='date'
					rules={{ required: 'Date is required' }}
					render={({ field: { value } }) => (
						<>
							{/* <TextInput
								label='Seleccione Fecha'
								mode='outlined'
								value={value}
								showSoftInputOnFocus={false}
								onFocus={() => setDatePickerVisible(true)} // Muestra el DatePicker al enfocar
								error={!!errors.date}
							/> */}
							<Button
								mode='elevated'
								onPress={() => setDatePickerVisible(true)}
							>
								{value ? value : 'Seleccione una fecha'}
							</Button>
							{datePickerVisible && (
								<DateTimePicker
									value={value ? new Date(value) : new Date()}
									mode='date'
									display={
										Platform.OS === 'ios' ? 'inline' : 'default'
									}
									onChange={handleDateChange}
								/>
							)}
						</>
					)}
				/>
				{errors.date && (
					<Text style={{ color: 'red' }}>{errors.date.message}</Text>
				)}

				{/* SELECT CATEGORIA */}
				<Text
					variant='headlineSmall'
					style={{ color: '#333', marginVertical: 15 }}
				>
					Categoría
				</Text>
				<Controller
					control={control}
					name='categoryId'
					rules={{ required: 'Categoría es requerida' }}
					render={({ field: { onChange, value } }) => (
						<Menu
							visible={categoryMenuVisible}
							onDismiss={() => setCategoryMenuVisible(false)}
							anchor={
								// <TextInput
								// 	label='Seleccione categoría'
								// 	mode='flat'
								// 	value={
								// 		(categories as Category[])?.find(
								// 			cat => cat.id === value
								// 		)?.name || ''
								// 	}
								// 	showSoftInputOnFocus={false}
								// 	onFocus={() => setCategoryMenuVisible(true)}
								// 	error={!!errors.categoryId}
								// />
								<Button
									onPress={() => setCategoryMenuVisible(true)}
									mode='elevated'
								>
									{(categories as Category[])?.find(
										cat => cat.id === value
									)?.name || 'Seleccione categoría:'}
								</Button>
							}
							style={{ width: width - 40, marginTop: 40 }}
						>
							{(categories as Category[]).map(category => (
								<Menu.Item
									key={category.id}
									onPress={() => {
										onChange(category.id);
										setCategoryMenuVisible(false);
									}}
									title={category.name}
								/>
							))}
						</Menu>
					)}
				/>
				{errors.categoryId && (
					<Text style={{ color: 'red' }}>
						{errors.categoryId.message}
					</Text>
				)}
				<Divider />

				{/* SELECT MÉTODO DE PAGO */}
				<Text
					variant='headlineSmall'
					style={{ color: '#333', marginVertical: 15 }}
				>
					Método de pago:
				</Text>
				<Controller
					control={control}
					name='paymentMethod'
					rules={{ required: 'Método de pago es requerido' }}
					render={({ field: { onChange, value } }) => (
						<Menu
							visible={paymentMethodMenuVisible}
							onDismiss={() => setPaymentMethodMenuVisible(false)}
							anchor={
								// <TextInput
								// 	label='Select Payment Method'
								// 	mode='outlined'
								// 	value={
								// 		paymentMethods.find(
								// 			method => method.value === value
								// 		)?.label || ''
								// 	}
								// 	showSoftInputOnFocus={false}
								// 	onFocus={() => setPaymentMethodMenuVisible(true)}
								// 	error={!!errors.paymentMethod}
								// />
								<Button
									onPress={() => setPaymentMethodMenuVisible(true)}
									mode='elevated'
								>
									{paymentMethods.find(
										method => method.value === value
									)?.label || 'Seleccione método de pago'}
								</Button>
							}
							style={{ width: width - 40, marginTop: 40 }}
						>
							{paymentMethods.map(method => (
								<Menu.Item
									key={method.value}
									onPress={() => {
										onChange(method.value);
										setPaymentMethodMenuVisible(false);
									}}
									title={method.label}
								/>
							))}
						</Menu>
					)}
				/>
				{errors.paymentMethod && (
					<Text style={{ color: 'red' }}>
						{errors.paymentMethod.message}
					</Text>
				)}
			</ScrollView>

			<FAB
				icon='content-save'
				style={styles.fab}
				onPress={handleSubmit(onAddExpense)}
				label='Guardar'
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
