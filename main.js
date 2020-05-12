const electron = require('electron')
const path = require('path')
const url = require('url')

const { app, BrowserWindow, Menu } = electron

let window = null

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


  //Menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

})

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
      }
    ]
  }
]