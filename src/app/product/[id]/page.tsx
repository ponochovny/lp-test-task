import SingleProduct from '@/src/entities/product/ui/SingleProduct'
import H3 from '@/src/shared/ui/h3'

interface Props {
	params: Promise<{ id: string }>
}

export default async function Product({ params }: Props) {
	const { id } = await params

	if (!id) return <H3>Product not found:</H3>

	return <SingleProduct id={id} />
}
