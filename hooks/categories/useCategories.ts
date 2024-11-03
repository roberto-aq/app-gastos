import { getCategories } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
	});

	return {
		data: data ?? [],
		isLoading,
	};
};
