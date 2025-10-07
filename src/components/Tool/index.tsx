import React from 'react';

interface ToolProps {
	id: string
	name: string
	iconText: string
	iconSubText?: string
	description?: string
	onClick?: (e: React.MouseEvent, id: string) => void
}

const Tool: React.FC<ToolProps> = ({ id, name, iconText, iconSubText, description, onClick }) => {
	const colorsBg = ['bg-blue-500/20','bg-green-500/20','bg-purple-500/20','bg-amber-500/20','bg-pink-500/20','bg-teal-500/20']
	const colorsText = ['text-blue-400','text-green-400','text-purple-400','text-amber-400','text-pink-400','text-teal-400']

	const hashColor = (id: string) => {
		let hash = 0
		for (let i=0; i<id.length; i++) hash = id.charCodeAt(i) + ((hash<<5)-hash)
		return Math.abs(hash)
	}

	const bgColorClass = colorsBg[hashColor(id) % colorsBg.length]
	const textColorClass = colorsText[hashColor(id) % colorsText.length]

	return (
		<div
			onClick={(e) => onClick?.(e, id)}
			className="
        flex flex-col items-center p-2
        rounded-lg cursor-pointer
        transition transform duration-200 hover:scale-105
        text-center
        w-20 sm:w-24
        bg-gray-800/50 hover:bg-gray-700
        dark:bg-gray-900/80 dark:hover:bg-gray-800
        border border-gray-700/50 dark:border-gray-600/50 hover:border-gray-500 dark:hover:border-gray-400
        shadow-sm hover:shadow-md
      "
		>
			<div className={`
        flex flex-col items-center justify-center
        w-12 h-12 sm:w-14 sm:h-14 mb-1
        rounded-full font-bold
        ${bgColorClass} ${textColorClass}
        transition-all duration-200 hover:scale-110
      `}>
				<span className="text-lg sm:text-xl leading-none">{iconText}</span>
				{iconSubText && <span className="text-xs opacity-80 mt-0.5 leading-none">{iconSubText}</span>}
			</div>

			<h3 className="text-sm font-medium text-gray-200 dark:text-gray-100 mt-1 truncate w-full">{name}</h3>
			{description && (
				<p className="hidden sm:block text-xs text-gray-400 mt-0.5 truncate w-full">{description}</p>
			)}
		</div>
	)
}

export default Tool
