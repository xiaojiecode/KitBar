import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { update } from './update'
import { createToolWindow } from './window_manager'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, 'public')
	: RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
	app.quit()
	process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
	win = new BrowserWindow({
		title: 'Main window',
		icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
		webPreferences: {
			preload,
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// nodeIntegration: true,

			// Consider using contextBridge.exposeInMainWorld
			// Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
			// contextIsolation: false,
		},
	})

	if (VITE_DEV_SERVER_URL) { // #298
		win.loadURL(VITE_DEV_SERVER_URL).then()
		// Open devTool if the app is not packaged
		win.webContents.openDevTools()
	} else {
		win.loadFile(indexHtml).then()
	}

	// Test actively push message to the Electron-Renderer
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url)
		return { action: 'deny' }
	})

	// Auto update
	update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	win = null
	if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore()
		win.focus()
	}
})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) {
		allWindows[0].focus()
	} else {
		createWindow().then()
	}
})

// New window example arg: new windows url
ipcMain.handle('window:open', (_, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload,
			nodeIntegration: true,
			contextIsolation: false,
		},
		// 窗口配置，让窗口大小适应内容
		width: 600, // 初始宽度
		height: 400, // 初始高度
		minWidth: 500,
		minHeight: 300,
		show: false, // 先不显示，等内容加载后再显示
		titleBarStyle: 'default', // 使用默认标题栏
		resizable: true, // 允许调整大小
	})

	// 窗口内容加载完成后显示窗口
	childWindow.on('ready-to-show', () => {
		childWindow.show();
		// 内容加载后，根据内容自适应窗口大小
		childWindow.webContents.executeJavaScript(`
			// 获取内容的实际大小
			const contentHeight = document.documentElement.scrollHeight;
			const contentWidth = document.documentElement.scrollWidth;
			// 发送内容大小到主进程
			window.ipcRenderer.send('window:resize', {width: contentWidth + 40, height: contentHeight + 40});
		`);
	});

	// 监听来自渲染进程的窗口大小调整请求
	ipcMain.once('window:resize', (_, {width, height}) => {
		childWindow.setSize(width, height);
	});

	// 统一使用查询参数的方式加载，确保开发和生产环境行为一致
	if (VITE_DEV_SERVER_URL) {
		childWindow.loadURL(`${VITE_DEV_SERVER_URL}?route=${encodeURIComponent(arg)}&isToolWindow=true`)
	} else {
		childWindow.loadFile(indexHtml, { search: `?route=${encodeURIComponent(arg)}&isToolWindow=true` })
	}
})
