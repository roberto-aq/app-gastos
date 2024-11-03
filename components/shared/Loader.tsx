import { globalStyles } from '@/theme/globals';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const Loader = () => {
	return (
		<View style={globalStyles.containerCenter}>
			<ActivityIndicator animating={true} size={60} />
		</View>
	);
};
