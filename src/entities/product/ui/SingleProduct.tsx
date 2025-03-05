'use client'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/src/shared/ui/skeleton'
import type { IProduct } from '../model/product.types'
import H3 from '@/src/shared/ui/h3'
import { ButtonEditProduct } from '@/src/features/edit-product'
import Image from 'next/image'

const fetchData = async (id: string): Promise<IProduct> => {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`)
	return await response.json()
}

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

const SingleProduct = ({ id }: { id: string }) => {
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: [`product-${id}`],
		queryFn: () => fetchData(id),
		staleTime: 10 * 60 * 1000,
	})

	if (isPending || isFetching) return loadingState()

	if (error) return 'An error has occurred: ' + error.message

	return (
		<div>
			<H3>{data.title}</H3>
			<p>{data.description}</p>
			<small className='text-gray-400'>
				<span>Price: {data.price}</span>
				{' | '}
				<span>Category: {data.category}</span>
				{' | '}
				<span>Rating: {data.rating?.rate}</span>
			</small>
			<div className='relative w-30 h-30 my-2'>
				<Image
					src={data.image}
					alt='Product Image'
					fill
					loading='lazy'
					style={{ objectFit: 'contain' }}
				/>
			</div>
			<div className='border-t-1 mt-2 pt-2 flex gap-1'>
				<ButtonEditProduct product={data} />
			</div>
		</div>
	)
}

export default SingleProduct
