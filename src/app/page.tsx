import { ButtonCreateProduct } from '../features/create-product'
import Hr from '../shared/ui/Hr'
import { CartList } from '../widgets/order-list'
import { ProductList } from '../widgets/product-list'

export default function Home() {
	return (
		<>
			<ProductList />
			<div className='mb-4' />
			<ButtonCreateProduct />
			<Hr />
			<CartList />
		</>
	)
}
