import { getAccount } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useAccount = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['account'],
		queryFn: getAccount,
	});

	return {
		data: data ?? {},
		isLoading,
	};
};
