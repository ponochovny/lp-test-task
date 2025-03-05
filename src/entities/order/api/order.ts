import { IOrder } from '@/src/entities/order'

export const fetchOrders = async (): Promise<IOrder[]> => {
	// return Promise.reject(new Error('Not implemented'))
	const response = await fetch('https://fakestoreapi.com/carts')
	return await response.json()
}
