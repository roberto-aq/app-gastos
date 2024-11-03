import { createCategory } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			});
		},
	});

	return {
		mutate,
		isPending,
	};
};
