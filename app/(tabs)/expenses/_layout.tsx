import { Stack } from 'expo-router';

export default function ExpensesLayout() {
	return (
		<Stack initialRouteName='index'>
			<Stack.Screen
				name='new_expense'
				options={{ title: 'Añadir nuevo gasto' }}
			/>
			<Stack.Screen name='index' options={{ headerShown: false }} />
		</Stack>
	);
}
