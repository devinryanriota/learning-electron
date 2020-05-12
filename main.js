const electron = require('electron')
const path = require('path')
const url = require('url')

const { app, BrowserWindow } = electron

let window = null

app.once('ready', () => {
  window = new BrowserWindow({
    title: 'Learning electron',
    show: false,
    fullscreenable: true
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
})