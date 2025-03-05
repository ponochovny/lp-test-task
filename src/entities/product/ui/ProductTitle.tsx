import { IProduct } from '../model/product.types'

interface ProductTitleProps {
	product: IProduct
}

export const ProductTitle = ({ product }: ProductTitleProps) => {
	return <li className='text-lg'>{product.title}</li>
}
