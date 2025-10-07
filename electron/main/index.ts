import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { release } from 'os'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// The built directory structure
//
// ├─ /dist-electron
// │  ├─ main/index.js    > Electron-Main
// │  └─ preload/index.mjs > Electron-Preload
// ├─ /dist
// │  └─ index.html        > Electron-Renderer
//

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

process.env.APP_ROOT = join(__dirname, '../../')

// @ts-ignore
global.__resources = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.APP_ROOT, 'resources')
  : join(process.env.APP_ROOT, 'dist-electron/resources')

let win: BrowserWindow | null = null
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.APP_ROOT, 'dist/index.html')

async function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    title: 'KitBar',
    frame: false, // 无边框窗口
    // 暂时禁用透明效果以测试
    transparent: false,
    backgroundColor: '#ffffff', // 设置白色背景
    // vibrancy: 'acrylic', // 暂时禁用背景模糊效果
    // visualEffectState: 'active', // 暂时禁用视觉效果状态
    hasShadow: true, // 添加阴影
    resizable: true,
    webPreferences: {
      preload,
      // 启用contextIsolation以允许使用contextBridge
      contextIsolation: true,
      // 当contextIsolation为true时，不应该启用nodeIntegration（安全最佳实践）
      nodeIntegration: false,
    },
  })

  if (url) {
    // electron-vite-vue#298
    await win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    await win.loadFile(indexHtml)
    // 在生产环境中也打开开发工具以方便调试
    win.webContents.openDevTools()
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

  // 窗口大小调整后的事件监听
  win.on('resize', () => {
    const [width, height] = win?.getSize() || [0, 0]
    win?.webContents.send('window:resized', { width, height })
  })

  // 监听窗口状态变化
  win.on('maximize', () => {
    win?.webContents.send('window:maximized')
  })
  
  win.on('unmaximize', () => {
    win?.webContents.send('window:unmaximized')
  })
  
  win.on('minimize', () => {
    win?.webContents.send('window:minimized')
  })
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
    createWindow()
  }
})

// 实现窗口打开的IPC处理
ipcMain.handle('window:open', async (event, { url, id }) => {
  if (!url) return { success: false, error: 'URL is required' }
  
  // 创建新窗口
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: id || 'New Window',
    frame: false, // 无边框窗口
    // 暂时禁用透明效果以测试
    transparent: false,
    backgroundColor: '#ffffff', // 设置白色背景
    // backgroundMaterial: 'acrylic', // 暂时禁用背景模糊效果
    hasShadow: true, // 添加阴影
    resizable: true,
    webPreferences: {
      preload,
      // 启用contextIsolation以允许使用contextBridge
      contextIsolation: true,
      // 当contextIsolation为true时，不应该启用nodeIntegration（安全最佳实践）
      nodeIntegration: false,
    },
  })
  
  // 加载URL
  if (url.startsWith('http')) {
    await newWindow.loadURL(url)
  } else {
    const fileUrl = join(process.env.APP_ROOT, `dist/${url}`)
    await newWindow.loadFile(fileUrl)
  }
  
  // 打开开发工具以方便调试
  newWindow.webContents.openDevTools()
  
  // 等待内容加载完成后自适应大小
  newWindow.webContents.on('did-finish-load', () => {
    newWindow.webContents.executeJavaScript(`
      const documentHeight = document.documentElement.scrollHeight;
      const documentWidth = document.documentElement.scrollWidth;
      ({ width: documentWidth, height: documentHeight });
    `).then(({ width, height }) => {
      newWindow.setSize(
        Math.max(width + 20, 400),
        Math.max(height + 20, 300)
      )
    })
  })
  
  return { success: true, windowId: id || 'window-' + Date.now() }
})

// 实现窗口关闭的IPC处理
ipcMain.handle('window:close', (event, { windowId }) => {
  if (!windowId || windowId === 'main') {
    win?.close()
  } else {
    // 关闭指定ID的窗口（如果有实现窗口管理的话）
    // 这里需要根据实际的窗口管理逻辑来实现
    console.log(`Close window with ID: ${windowId}`)
  }
  return { success: true }
})

// 实现窗口置顶的IPC处理
ipcMain.handle('window:toggle-always-on-top', async (event) => {
  if (!win) return { success: false, error: 'Main window not found' }
  
  const isAlwaysOnTop = !win.isAlwaysOnTop()
  win.setAlwaysOnTop(isAlwaysOnTop)
  
  return { success: true, isAlwaysOnTop }
})

// 添加缺失的window:get-always-on-top处理程序
ipcMain.handle('window:get-always-on-top', (event) => {
  if (!win) return { success: false, isAlwaysOnTop: false }
  
  const isAlwaysOnTop = win.isAlwaysOnTop()
  return { success: true, isAlwaysOnTop }
})

// 实现应用退出的IPC处理
ipcMain.handle('app:quit', () => {
  app.quit()
  return { success: true }
})

// 实现获取窗口大小的IPC处理
ipcMain.handle('window:get-size', (event) => {
  if (!win) return { success: false, width: 0, height: 0 }
  
  const [width, height] = win.getSize()
  return { success: true, width, height }
})

// 实现设置窗口大小的IPC处理
ipcMain.handle('window:set-size', (event, { width, height }) => {
  if (!win) return { success: false, error: 'Main window not found' }
  
  win.setSize(width, height)
  return { success: true }
})
