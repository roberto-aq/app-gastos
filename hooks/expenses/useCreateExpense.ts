import { createExpense } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateExpense = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createExpense,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['expenses'],
			});
		},
	});

	return {
		mutate,
		isPending,
	};
};
