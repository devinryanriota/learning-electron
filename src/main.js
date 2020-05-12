const electron = require('electron')
const path = require('path')
const url = require('url')
// const sqlite3 = require('sqlite3').verbose()

const { app, BrowserWindow, Menu, ipcMain } = electron

let window = null
let db = null

app.once('ready', () => {
  window = new BrowserWindow({
    title: 'Learning electron',
    show: false,
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    window.show()
  })

  window.once('closed', () => {
    window = null
  })

  //database
  // initializeDb()

  //Menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

})

//TODO: Register IPC listeners
ipcMain.on('id:search', (e, item) => {
  console.log('ipcmain item', item)
})

// const initializeDb = () => {
//   db = new sqlite3.Database('testing.db', sqlite3.OPEN_READONLY, (err) => {
//     if(err) {
//       console.error(err.message)
//     }
//   })
// }

//Menu template
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click() {
          app.quit()
        }
      }
    ]
  }, 
  {
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      },
      {
        role: 'reload'
      }
    ]
  }
]