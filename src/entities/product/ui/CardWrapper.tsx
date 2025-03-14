import React from 'react'

const CardWrapper = ({
	children,
	renderControls,
	title,
}: {
	children: React.ReactNode
	renderControls: React.ReactNode
	title: string
}) => {
	return (
		<div className='flex flex-col p-[1px] bg-gradient-to-r from-[#1BA0FF] to-[#1869A8] w-full rounded-[8px] overflow-hidden'>
			<div className='px-2 pb-0.5 font-semibold flex justify-between items-center'>
				<span className='uppercase'>{title}</span>
				{renderControls}
			</div>
			{children}
		</div>
	)
}

export default CardWrapper
