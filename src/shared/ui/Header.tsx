'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'

const Header = () => {
	const pathname = usePathname()

	return (
		<div className='pb-4 border-b mb-4 w-full'>
			<Link
				href='/'
				className={cn(pathname === '/' ? '' : 'text-gray-300', 'text-2xl')}
			>
				{pathname === '/' ? 'Home' : 'Back to Home'}
			</Link>
		</div>
	)
}

export default Header
