import { Loader } from '@/components/shared/Loader';
import { useCategories, useCreateCategory } from '@/hooks';
import { globalStyles } from '@/theme/globals';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, TextInput, Text, Button } from 'react-native-paper';

export default function CategoriesScreen() {
	const { data: categories, isLoading } = useCategories();
	const { mutate, isPending } = useCreateCategory();

	const [newCategory, setNewCategory] = useState('');

	const addCategory = () => {
		mutate(newCategory);
		setNewCategory('');
	};

	if (isLoading || isPending) return <Loader />;

	return (
		<View style={globalStyles.container}>
			<Text variant='displayLarge'>Categorías</Text>

			<FlatList
				data={categories}
				keyExtractor={c => c.id}
				renderItem={({ item }) => (
					<Card>
						<Card.Title title={item.name} />
					</Card>
				)}
			/>

			<TextInput
				label='Nombre'
				value={newCategory}
				onChangeText={setNewCategory}
			/>

			<Button mode='contained' onPress={addCategory}>
				Agregar
			</Button>
		</View>
	);
}
const styles = StyleSheet.create({});
