'use client'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/src/shared/ui/skeleton'
import type { IProduct } from '../model/product.types'
import { ButtonEditProduct } from '@/src/features/edit-product'
import Image from 'next/image'
import Rating from '@/src/shared/ui/rating'

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
			<div className='relative h-60 my-2 w-full bg-white'>
				<Image
					src={data.image}
					alt='Product Image'
					fill
					loading='lazy'
					style={{ objectFit: 'contain' }}
				/>
			</div>
			<div className='flex gap-1 items-center w-full'>
				<span className='uppercase text-[#3397F7] font-semibold text-sm'>
					{data.category}
				</span>
				<span
					className='text-gray-300 text-sm'
					style={{ textShadow: '1px 1px 2px #3f3f3f' }}
				>
					- {data.price + '$'}
				</span>
				<Rating rate={data.rating?.rate || 0} className='ml-auto' />
			</div>
			<h1 className='text-2xl font-light'>{data.title}</h1>
			<div className='shadow-lg rounded-full w-full shadow-gray-300/30 h-3 mb-6'></div>
			<p className='text-gray-300 text-sm'>{data.description}</p>
			<div className='shadow-lg rounded-full w-full shadow-gray-300/30 h-3 mt-10 transform rotate-180'></div>
			<div className='pt-2 flex gap-1'>
				<ButtonEditProduct product={data} />
			</div>
		</div>
	)
}

export default SingleProduct
