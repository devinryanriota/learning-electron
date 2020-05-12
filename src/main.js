const electron = require('electron')
const path = require('path')
const url = require('url')
const sqlite3 = require('sqlite3').verbose()

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
    db.close()
  })

  //database
  initializeDb()

  //Menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

})

//TODO: Register IPC listeners
ipcMain.on('id:search', (e, item) => {
  console.log('ipcmain item', item)

  let sqlString = `SELECT * FROM reservation WHERE id = ?`
  let id = item

  db.get(sqlString, [id], (err, row) => {
    if(err) {
      console.error(err.message)
    }
    
    if(row) {
      console.log(row.id, row.price)
      window.webContents.send('reservation:dataquery', row)
    }
  })
})

const initializeDb = () => {
  const dbPath = path.resolve(__dirname, 'testing.db')
  db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if(err) {
      console.error(err.message)
    }
  })
}

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