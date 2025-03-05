import { IProduct } from '@/src/entities/product'

export const fetchProducts = async (): Promise<IProduct[]> => {
	const response = await fetch('https://fakestoreapi.com/products')
	return await response.json()
}

export const deleteProductById = async (
	id: number | string
): Promise<IProduct[]> => {
	// return Promise.reject(new Error('Not implemented'))
	const response = await fetch('https://fakestoreapi.com/products/' + id, {
		method: 'DELETE',
	})
	return await response.json()
}
