import './App.css'
import React, { createContext, useContext, useState, useEffect } from 'react';
import ToolGrid from "@/components/ToolGrid";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Base58EncodePage from '@/components/ToolPages/Base58EncodePage';
import Base58DecodePage from '@/components/ToolPages/Base58DecodePage';
import QRCodeEncodePage from '@/components/ToolPages/QRCodeEncodePage';
import QRCodeDecodePage from '@/components/ToolPages/QRCodeDecodePage';

// 创建窗口类型上下文
interface WindowTypeContextType {
  isToolWindow: boolean;
}

const WindowTypeContext = createContext<WindowTypeContextType>({
  isToolWindow: false
});

// 创建上下文提供者组件
function WindowTypeProvider({ children }: { children: React.ReactNode }) {
  const [isToolWindow, setIsToolWindow] = useState(false);

  useEffect(() => {
    // 检查URL中是否包含isToolWindow参数
    const urlParams = new URLSearchParams(window.location.search);
    const toolWindowParam = urlParams.get('isToolWindow');
    setIsToolWindow(toolWindowParam === 'true');
  }, []);

  return (
    <WindowTypeContext.Provider value={{ isToolWindow }}>
      {children}
    </WindowTypeContext.Provider>
  );
}

// 创建自定义Hook以便在组件中使用上下文
export function useWindowType() {
  const context = useContext(WindowTypeContext);
  if (!context) {
    throw new Error('useWindowType must be used within a WindowTypeProvider');
  }
  return context;
}

// 主题类型定义
type Theme = 'light' | 'dark' | 'system';

// 创建主题上下文
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  isDarkMode: false
});

// 创建主题提供者组件
function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 从localStorage中获取保存的主题，默认为系统主题
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'system';
  });

  // 计算当前是否为深色模式
  const isDarkMode = React.useMemo(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    // 如果是系统主题，使用媒体查询
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, [theme]);

  // 当主题变化时，更新CSS类和localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 创建自定义Hook以便在组件中使用主题上下文
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function AppContent() {
	const navigate = useNavigate();
	const location = useLocation();
	const { theme, setTheme } = useTheme();

	// 处理生产环境中的路由查询参数
	React.useEffect(() => {
		// 检查是否是初始加载并且有route查询参数
		if (location.pathname === '/' && window.location.search) {
			const urlParams = new URLSearchParams(window.location.search);
			const route = urlParams.get('route');
			if (route) {
				// 确保路由以/开头
				const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
				navigate(normalizedRoute);
			}
		}
	}, [location.pathname, navigate]);

	// 主题切换按钮
	const renderThemeToggle = () => {
		if (location.pathname !== '/') return null;
		
		return (
			<div className="fixed bottom-4 right-4 z-50">
				<div className="flex gap-2 bg-card rounded-full shadow-lg p-1">
					<button
						className={`px-3 py-1 rounded-full text-sm transition-colors ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
						onClick={() => setTheme('light')}
						aria-label="浅色模式"
					>
						☀️
					</button>
					<button
						className={`px-3 py-1 rounded-full text-sm transition-colors ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
						onClick={() => setTheme('dark')}
						aria-label="深色模式"
					>
						🌙
					</button>
					<button
						className={`px-3 py-1 rounded-full text-sm transition-colors ${theme === 'system' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
						onClick={() => setTheme('system')}
						aria-label="跟随系统"
					>
						🖥️
					</button>
				</div>
			</div>
		);
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<ToolGrid />} />
				<Route path="/base58-encode" element={<Base58EncodePage />} />
				<Route path="/base58-decode" element={<Base58DecodePage />} />
				<Route path="/qrcode-encode" element={<QRCodeEncodePage />} />
				<Route path="/qrcode-decode" element={<QRCodeDecodePage />} />
			</Routes>
			{renderThemeToggle()}
		</>
	);
}

function App() {
	return (
		<div className="app-container">
			<Router>
				<ThemeProvider>
					<WindowTypeProvider>
						<AppContent />
					</WindowTypeProvider>
				</ThemeProvider>
			</Router>
		</div>
	)
}

export default App