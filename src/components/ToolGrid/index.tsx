import React, { useEffect, useState } from 'react'
import Tool from '@/components/Tool'
import { useNavigate } from 'react-router-dom';

interface ToolItem {
	id: string
	name: string
	iconText: string
	iconSubText?: string
	description?: string
	routePath: string
}

const tools: ToolItem[] = [
	{ id: 'base58-encode', name: 'Base58 Encode', iconText: 'B58', iconSubText: 'encode', description: 'Base58 编码', routePath: '/base58-encode' },
	{ id: 'base58-decode', name: 'Base58 Decode', iconText: 'B58', iconSubText: 'decode', description: 'Base58 解码', routePath: '/base58-decode' },
	{ id: 'qrcode-encode', name: '二维码生成', iconText: 'QR', iconSubText: 'encode', description: '生成二维码', routePath: '/qrcode-encode' },
	{ id: 'qrcode-decode', name: '二维码解码', iconText: 'QR', iconSubText: 'decode', description: '解析二维码', routePath: '/qrcode-decode' },
]

const ToolGrid: React.FC = () => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);

	// 当组件挂载时触发动画
	useEffect(() => {
		setIsVisible(true);
	}, []);

	// 检测是否是Windows系统
	const isWindows = navigator.platform.includes('Win');

	const handleToolClick = (e: React.MouseEvent, id: string) => {
		const tool = tools.find(t => t.id === id);
		if (!tool || !tool.routePath) return;

		// 直接从事件对象中检查按键状态
		const isModifierPressed = isWindows ? e.ctrlKey : e.metaKey;
		console.log('isModifierPressed:', isModifierPressed);
		console.log('Attempting to open:', tool.routePath);

		if (isModifierPressed) {
			// 按住Command/Ctrl键，在新窗口打开
			e.preventDefault();
			console.log('Opening in new Electron window:', tool.routePath);
			
			// 使用Electron的IPC调用打开新窗口
			if (window.ipcRenderer) {
				window.ipcRenderer.invoke('window:open', tool.routePath)
					.then(() => console.log('New window opened successfully'))
					.catch(err => console.error('Failed to open new window:', err));
			} else {
				// 降级方案：在浏览器环境中尝试使用window.open
				const url = window.location.origin + tool.routePath;
				const newWindow = window.open(url, '_blank');
				// 检查窗口是否被阻止
				if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
					console.log('New window was blocked by browser');
					window.alert('请允许浏览器打开新窗口，以在新窗口中查看工具。');
				}
			}
		} else {
			// 没有按住，在当前页面路由
			console.log('Navigating in current window:', tool.routePath);
			navigate(tool.routePath);
		}
	};

	return (
		<div className="p-6 pt-10 w-full no-drag">
			<div
				className={`
				select-none
			  grid
			  grid-cols-[repeat(auto-fit,minmax(80px,1fr))]
			  gap-3 sm:gap-4 md:gap-5
			  justify-items-center
			  max-w-4xl
			  mx-auto
			  transition-all duration-700 ease-out
			  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
			`}>
				{tools.map((tool, index) => (
					<div className={`transition-all duration-700 ease-out transform`} style={{ transitionDelay: `${index * 100}ms` }}>
						<Tool 
							key={tool.id} 
							{...tool} 
							onClick={(e) => handleToolClick(e as React.MouseEvent, tool.id)} 
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ToolGrid
