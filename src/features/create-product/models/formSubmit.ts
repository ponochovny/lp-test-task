'use server'
import { productSchema } from './productSchema'

export type FormState = {
	message: string
	fields?: Record<string, string | number>
	issues?: string[]
}

export async function onSubmitAction(
	prevState: FormState,
	data: FormData
): Promise<FormState> {
	const formData = Object.fromEntries(data)
	const parsed = productSchema.safeParse(formData)

	if (!parsed.success) {
		return {
			message: 'Invalid form data',
			fields: parsed.data,
			issues: parsed.error.issues.map((issue) => issue.message),
		}
	}

	if (+parsed.data.price <= 0) {
		return {
			message: 'Price must be greater than 0',
			fields: parsed.data,
		}
	}

	return {
		message: 'Success!',
	}
}
