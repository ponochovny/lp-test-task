'use client'

import { type IProduct, deleteProductById } from '@/src/entities/product'
import { Button } from '@/src/shared/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/shared/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

function ButtonDeleteProduct({ product }: { product: IProduct }) {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationFn: deleteProductById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button type='button'>
					<Trash2 className='dark:text-gray-800 hover:dark:text-red-400 w-6' />
				</button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Delete product {`'${product.title}'`}</DialogTitle>
					<DialogDescription>Are you sure?</DialogDescription>
				</DialogHeader>
				{isPending && <p>Loading...</p>}
				<DialogFooter className='sm:justify-start'>
					<Button
						variant={'destructive'}
						onClick={() => mutate(product.id)}
						disabled={isPending}
					>
						Delete
					</Button>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ButtonDeleteProduct
