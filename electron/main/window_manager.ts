import { BrowserWindow } from "electron";
import path from "path";

const windows = new Map<string, BrowserWindow>();

export function createToolWindow(id: string, url: string) {
	if (windows.has(id)) {
		const win = windows.get(id)!;
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
