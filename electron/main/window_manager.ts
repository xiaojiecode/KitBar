import path from "path";
import { BrowserWindow } from 'electron';

const windows = new Map<string, BrowserWindow>();

export function createToolWindow(id: string, url: string) {
	if (windows.has(id)) {
		const win = windows.get(id)!
		win.show();
		win.focus();
		return win;
	}

	const win = new BrowserWindow({
		width: 420,
		height: 500,
		show: true,
		alwaysOnTop: true,
		title: id,
		frame: false, // 无边框窗口
		// 暂时禁用透明效果以测试
		transparent: false,
		backgroundColor: '#ffffff', // 设置白色背景
		// backgroundMaterial: 'acrylic', // 暂时禁用背景模糊效果
		hasShadow: true, // 添加阴影
		resizable: true, // 允许调整大小
		webPreferences: {
			preload: path.join(__dirname, "../preload/index.mjs"),
		},
	});

	win.loadURL(url);
	win.on("closed", () => windows.delete(id));
	windows.set(id, win);

	return win;
}

export function closeToolWindow(id: string) {
	const win = windows.get(id);
	if (win) {
		win.close();
		windows.delete(id);
	}
}

export function toggleAllWindows(show: boolean) {
	for (const win of windows.values()) {
		if (show) win.show();
		else win.hide();
	}
}

export function getOpenWindows() {
	return Array.from(windows.keys());
}
