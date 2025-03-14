import React from 'react'
import { IProduct } from '../model/product.types'
import Image from 'next/image'
import Rating from '@/src/shared/ui/rating'

const ProductCard = ({ product }: { product: IProduct }) => {
	return (
		<div className='flex grow group'>
			<div className='relative w-1/3 min-h-60 h-full bg-white'>
				<Image
					src={product.image}
					alt='Product Image'
					className='object-contain p-2 object-top'
					fill
				/>
			</div>
			<div className='p-3 w-full bg-gradient-to-tr from-[#40505D] to-[#2C475A] group-hover:from-[#416075] group-hover:to-[#2D587B]'>
				<div className='flex gap-1 items-center w-full'>
					<span className='uppercase text-[#3397F7] font-semibold '>
						{product.category}
					</span>
					<span
						className='text-gray-400 text-xs'
						style={{ textShadow: '1px 1px 2px #3f3f3f' }}
					>
						- {product.price + '$'}
					</span>
					<Rating rate={product.rating?.rate || 0} className='ml-auto' />
				</div>
				<div
					className='text-xl inset-shadow-zinc-950 mb-3 text-gray-300 group-hover:text-white'
					style={{ textShadow: '1px 1px 2px #3f3f3f' }}
				>
					{product.title}
				</div>
				<div
					className='text-gray-400 text-sm'
					style={{ textShadow: '1px 1px 2px #3f3f3f' }}
				>
					{product.description}
				</div>
			</div>
		</div>
	)
}

export default ProductCard
