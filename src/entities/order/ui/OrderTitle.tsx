import { dateFormat } from '@/src/shared/lib/utils'
import { IOrder } from '../model/order.types'

const OrderTitle = (order: IOrder) => {
	return (
		<div>
			<small className='text-gray-400'>
				{dateFormat(order.date)} - UserId: {order.userId}
			</small>
			{order.products.map((product) => (
				<div key={product.productId}>
					Product: {product.productId} | Quantity: {product.quantity}
				</div>
			))}
		</div>
	)
}

export default OrderTitle
