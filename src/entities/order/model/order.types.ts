export interface IOrder {
	id: number
	userId: number
	date: string
	products: Product[]
	__v: number
}

export interface Product {
	productId: number
	quantity: number
}
