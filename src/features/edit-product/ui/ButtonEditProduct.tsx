import { type IProduct } from '@/src/entities/product'
import { Button } from '@/src/shared/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/shared/ui/dialog'
import EditProductForm from './EditProductForm'

const ButtonEditProduct = ({ product }: { product: IProduct }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Edit Product</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Edit the Product</DialogTitle>
					<DialogDescription>Edit the fields</DialogDescription>
				</DialogHeader>
				<EditProductForm product={product} />
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ButtonEditProduct
