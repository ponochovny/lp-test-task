'use client'
import { OrderTitle, fetchOrders } from '@/src/entities/order'
import H3 from '@/src/shared/ui/h3'
import { Skeleton } from '@/src/shared/ui/skeleton'
import { useQuery } from '@tanstack/react-query'

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

const OrderList = () => {
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ['carts'],
		queryFn: fetchOrders,
		staleTime: 10000,
	})

	if (isPending || isFetching) return loadingState()

	if (error) return 'An error has occurred: ' + error.message

	return (
		<div>
			<H3>Orders:</H3>
			<ul className='space-y-2'>
				{data.map((order) => (
					<OrderTitle key={order.id} {...order} />
				))}
			</ul>
		</div>
	)
}

export default OrderList
