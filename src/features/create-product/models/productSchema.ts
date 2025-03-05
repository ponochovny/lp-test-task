import { z } from 'zod'

export const productSchema = z.object({
	title: z.string().trim().min(1, {
		message: 'Title is required',
	}),
	description: z.string().trim().min(1, {
		message: 'Description is required',
	}),
	price: z.coerce.number().min(1, {
		message: 'Price must be greater than 0',
	}),
	category: z.string(),
	image: z.string(),
})
