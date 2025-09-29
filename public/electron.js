import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import fs from 'fs';

// `__dirname` 없으므로 이렇게 정의
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      contextIsolation: true, //contextIsolation: true: 웹 페이지와 Node.js context를 격리 (보안 향상)//웹 콘텐츠에 sandbox 적용 (더 높은 보안)
      sandbox: true, //웹 콘텐츠에 sandbox 적용 (더 높은 보안)
    },
  });

  const indexPath = path.join(__dirname, '../dist/index.html');

  if (fs.existsSync(indexPath)) {
    win.loadFile(indexPath); //dist/index.html이 존재하면 창에 로드하고
  } else {
    console.error('❌ index.html not found. Run `npm run build` first.');
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});