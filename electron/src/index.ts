import {app, BrowserWindow} from "electron";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

let mainWindow: BrowserWindow;

function createWindow(){

    const isDev = app.isPackaged;

    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences:{
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(isDev? "http://localhost:4200": `file://${path.join(__dirname, './ui/index.html')}`);
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    console.log("App Loading");
    console.log(process.env.APP_NAME);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", ()=>{
    if(process.platform !== "darwin"){
        app.quit();
    }
})

app.on("activate", ()=>{
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})