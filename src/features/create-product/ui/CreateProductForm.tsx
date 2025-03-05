'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { productSchema } from '../models/productSchema'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/src/shared/ui/form'
import { Input } from '@/src/shared/ui/input'
import { Button } from '@/src/shared/ui/button'

import { onSubmitAction } from '../models/formSubmit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProduct } from '@/src/entities/product'
import { Textarea } from '@/src/shared/ui/textarea'

const createProduct = async (data: z.infer<typeof productSchema>) => {
	const res = await fetch(`https://fakestoreapi.com/products`, {
		method: 'POST',
		body: JSON.stringify(data),
	})

	return res.json()
}

const CreateProductForm = () => {
	const [isSuccess, setIsSuccess] = useState(false)
	const [state, formAction] = useActionState(onSubmitAction, {
		message: '',
	})
	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 0,
			category: '',
			image: '',
			...(state?.fields ?? {}),
		},
	})

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			setIsSuccess(true)
			form.reset()
			// queryClient.invalidateQueries({ queryKey: ['products'] })
		},
		onMutate: async (newProduct) => {
			await queryClient.cancelQueries({ queryKey: ['products'] })
			const previousProducts = queryClient.getQueryData([
				'products',
			]) as IProduct[]
			queryClient.setQueryData(
				['products'],
				[...previousProducts, { id: new Date().getTime(), ...newProduct }]
			)
			return { previousProducts }
		},
		onError: (_, __, context) => {
			if (context?.previousProducts) {
				queryClient.setQueryData(['products'], context.previousProducts)
			}
		},
	})

	const formRef = useRef<HTMLFormElement>(null)

	const onSubmitClient = () => {
		mutate(form.getValues())
	}

	useEffect(() => {
		if (form.formState.isDirty) {
			setIsSuccess(false)
		}
	}, [form.formState.isDirty])

	return (
		<Form {...form}>
			{isSuccess && <div className='text-green-500'>Success!</div>}
			<form
				ref={formRef}
				action={formAction}
				onSubmit={form.handleSubmit(onSubmitClient)}
				className='space-y-4'
			>
				<FormField
					disabled={isPending}
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Product title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					disabled={isPending}
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder='Product description' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					disabled={isPending}
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input placeholder='Product price' {...field} type='number' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					disabled={isPending}
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Input placeholder='Product category' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					disabled={isPending}
					control={form.control}
					name='image'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<Input placeholder='Product image' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	)
}

export default CreateProductForm
