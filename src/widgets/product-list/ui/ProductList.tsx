'use client'
import { ProductTitle, fetchProducts } from '@/src/entities/product'
import { ButtonDeleteProduct } from '@/src/features/delete-product'
import H3 from '@/src/shared/ui/h3'
import { Skeleton } from '@/src/shared/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const loadingState = () => (
	<div className='space-y-2'>
		<Skeleton className='w-[100px] h-7 rounded-md' />
		<Skeleton className='w-[200px] h-6 rounded-md' />
		<div className='space-y-1'>
			<Skeleton className='w-full h-4 rounded-md' />
			<Skeleton className='w-full h-4 rounded-md' />
			<Skeleton className='w-[200px] h-4 rounded-md' />
		</div>
	</div>
)

const ProductList = () => {
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ['products'],
		queryFn: fetchProducts,
		staleTime: 10000,
	})

	if (isPending || isFetching) return loadingState()

	if (error) return 'An error has occurred: ' + error.message

	return (
		<div>
			<H3>Products:</H3>
			<ul className='space-y-2'>
				{data.map((product) => (
					<li className='flex gap-1' key={product.id}>
						<Link href={`/product/${product.id}`} className='flex gap-1'>
							<ProductTitle product={product} />
						</Link>
						<ButtonDeleteProduct product={product} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProductList
