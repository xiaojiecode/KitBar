import React, { useState } from 'react'

// 工具项配置接口
interface ToolProps {
	id: string
	name: string
	iconText: string
	iconSubText?: string
	description?: string
	onClick?: (e: React.MouseEvent, id: string) => void
	// UI参数配置选项
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'primary' | 'secondary'
	iconSize?: 'sm' | 'md' | 'lg'
}

const Tool: React.FC<ToolProps> = ({ 
	id, 
	name, 
	iconText, 
	iconSubText, 
	description, 
	onClick, 
	size = 'md', 
	variant = 'default',
	iconSize = 'md' 
}) => {
	// 扁平化主题色
	const bgColors = {
		default: 'bg-white dark:bg-card-dark',
		primary: 'bg-primary/10 dark:bg-primary/20',
		secondary: 'bg-secondary/10 dark:bg-secondary/20'
	};

	const borderColors = {
		default: 'border-border dark:border-border-dark',
		primary: 'border-primary/20 dark:border-primary/30',
		secondary: 'border-secondary/20 dark:border-secondary/30'
	};

	const textColors = {
		default: 'text-text-primary dark:text-text-light',
		primary: 'text-primary dark:text-primary',
		secondary: 'text-secondary dark:text-secondary'
	};

	// 图标背景色 - 扁平化设计
	const iconBgColors = [
		'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
		'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
		'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
		'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
		'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
		'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
	];

	// 工具项尺寸配置
	const sizeClasses = {
		sm: 'w-20 p-2',
		md: 'w-24 sm:w-28 p-3',
		lg: 'w-32 p-4'
	};

	// 图标尺寸配置
	const iconSizeClasses = {
		sm: 'w-10 h-10 text-base',
		md: 'w-12 h-12 text-lg sm:text-xl',
		lg: 'w-16 h-16 text-xl sm:text-2xl'
	};

	// 图标子文本尺寸
	const iconSubTextClasses = {
		sm: 'text-xs',
		md: 'text-xs',
		lg: 'text-sm'
	};

	// 颜色哈希函数
	const hashColor = (id: string) => {
		let hash = 0
		for (let i=0; i<id.length; i++) hash = id.charCodeAt(i) + ((hash<<5)-hash)
		return Math.abs(hash)
	};

	const iconBgClass = iconBgColors[hashColor(id) % iconBgColors.length];

	// 状态管理动画 - 使用单个状态同时控制鼠标移入移出的动画过渡
	const [state, setState] = useState<'idle' | 'hovered' | 'clicked'>('idle');

	// 处理点击事件，添加点击动画效果
	const handleClick = (e: React.MouseEvent) => {
		setState('clicked');
		onClick?.(e, id);
		// 点击动画结束后重置状态
		setTimeout(() => setState('idle'), 300);
	};

	// 打断动画处理 - 使用防抖函数确保动画平滑过渡
	const handleMouseEnter = () => {
		if (state === 'clicked') return; // 点击状态下不响应悬停
		setState('hovered');
	};

	const handleMouseLeave = () => {
		setState('idle');
	};



	return (
			<div
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={`
				  tool-item
				  flex flex-col items-center
				  rounded-lg cursor-pointer
				  transition-transform duration-300 ease-out
				  text-center
				  no-drag
				  ${sizeClasses[size]}
				  ${bgColors[variant]}
				  ${borderColors[variant]}
				  ${textColors[variant]}
				  border
				  shadow-flat
				  ${state === 'hovered' ? 'scale-105' : ''}
				  ${state === 'clicked' ? 'scale-95' : ''}
				`}
			>
			<div className={`
				flex flex-col items-center justify-center
				${iconSizeClasses[iconSize]}
				mb-1 rounded-full font-bold
				${iconBgClass}
				transition-transform duration-200 ease-out
				${state === 'hovered' ? 'scale-105' : ''}
			`}>
				<span className="leading-none">{iconText}</span>
				{iconSubText && <span className={`${iconSubTextClasses[iconSize]} opacity-80 mt-0.5 leading-none`}>{iconSubText}</span>}
			</div>

			<h3 className="text-sm font-medium truncate w-full">
				{name}
			</h3>
			{description && (
				<p className="hidden sm:block text-xs text-text-secondary dark:text-text-muted mt-0.5 truncate w-full">
					{description}
				</p>
			)}
		</div>
	)
}

export default Tool
