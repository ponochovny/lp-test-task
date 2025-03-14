'use client'
import { fetchProducts, IProduct } from '@/src/entities/product'
import CardWrapper from '@/src/entities/product/ui/CardWrapper'
import ProductCard from '@/src/entities/product/ui/ProductCard'
import { ButtonDeleteProduct } from '@/src/features/delete-product'
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

const renderControls = ({ product }: { product: IProduct }) => {
	return <ButtonDeleteProduct product={product} />
}

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
			<ul className='grid grid-cols-2 gap-x-4 gap-y-2'>
				{data.map((product) => (
					<li className='flex gap-1' key={product.id}>
						<CardWrapper
							renderControls={renderControls({ product })}
							title='Product'
						>
							<Link
								href={`/product/${product.id}`}
								className='flex gap-1 w-full grow'
							>
								<ProductCard product={product} />
							</Link>
						</CardWrapper>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProductList
