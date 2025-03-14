import { Star } from 'lucide-react'
import React from 'react'
import { cn } from '../lib/utils'

const Rating = ({ rate, className }: { rate: number; className?: string }) => {
	return (
		<div className={cn(className, 'flex gap-0.5')}>
			{Array.from({ length: 5 }).map((_, index) => (
				<Star
					key={index}
					className={cn('text-gray-500 w-4 stroke-1', [
						index < rate
							? 'fill-amber-200 stroke-amber-300'
							: 'fill-amber-50  stroke-amber-50 opacity-70',
					])}
				/>
			))}
		</div>
	)
}

export default Rating
