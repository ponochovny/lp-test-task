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
import CreateProductForm from './CreateProductForm'

function ButtonCreateProduct() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create a product</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Create a product</DialogTitle>
					<DialogDescription>Fill the form</DialogDescription>
				</DialogHeader>
				<CreateProductForm />
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

export default ButtonCreateProduct
