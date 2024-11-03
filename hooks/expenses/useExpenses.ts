import { useQuery } from '@tanstack/react-query';

import { getExpenses } from '@/actions';

export const useExpenses = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['expenses'],
		queryFn: getExpenses,
		refetchOnWindowFocus: true,
	});

	return {
		data,
		isLoading,
	};
};
