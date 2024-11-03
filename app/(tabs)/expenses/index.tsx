import { Loader } from '@/components/shared/Loader';
import { formatPrice } from '@/helpers';
import { useAccount, useExpenses } from '@/hooks';
import { globalStyles } from '@/theme/globals';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, FAB, Text } from 'react-native-paper';
export default function ExpensesScreen() {
	const { data: expenses, isLoading: isLoadingExpenses } =
		useExpenses();
	const { data: account, isLoading: isLoadingAccount } = useAccount();

	const queryClient = useQueryClient();

	console.log({
		expenses,
		account,
	});

	if (isLoadingExpenses || isLoadingAccount) return <Loader />;

	return (
		<View style={globalStyles.container}>
			<View style={{}}>
				<Text
					variant='displayLarge'
					style={{ marginBottom: 30, marginTop: 10 }}
				>
					Gastos
				</Text>
			</View>

			<FlatList
				data={expenses}
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				renderItem={({ item }) => (
					<Card>
						<Card.Content>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Text
									style={{
										fontSize: 30,
										marginBottom: 8,
										fontWeight: '700',
									}}
								>
									{item.title}
								</Text>
								<Text style={{ fontSize: 20, fontWeight: '600' }}>
									{item.date}
								</Text>
							</View>
							<View style={{ gap: 12 }}>
								<Text style={{ fontWeight: '700', fontSize: 30 }}>
									{formatPrice(item.amount)}
								</Text>
							</View>
						</Card.Content>
					</Card>
				)}
			/>

			<FAB
				icon='plus'
				style={styles.fab}
				onPress={() => router.push('/expenses/new_expense')}
				variant='surface'
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
