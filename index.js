let { app, BrowserWindow, ipcMain } = require("electron");
let Datastore = require("nedb");

let win;
let datastore;

function createWindow() {
  win = new BrowserWindow({
    width: 280,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  win.loadFile(__dirname + "/index.html");

  win.addListener("ready-to-show", () => {
    win.show();
  });
}

function initDatastore() {
  let path = app.getPath("userData");

  datastore = new Datastore({
    filename: path + "/notes.json",
  });

  datastore.loadDatabase((err) => {
    if (err) {
      console.log("there was some error in loading the datastore");
      throw err;
    } else {
      console.log("datastore loaded successfully");
    }
  });
}

app.whenReady().then(() => {
  initDatastore();
  createWindow();
});

app.addListener("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//all the ipc calls
ipcMain.on("save_note", (e, note) => {
  datastore.insert(note, (err, new_doc) => {
    console.log(new_doc);
    if (err) {
      console.log("there was some error in inserting the doc");
      throw err;
    } else {
      console.log("data inserted successfully");
    }
  });
});

ipcMain.handle("get_data", (e) => {
  return new Promise((resolve, reject) => {
    datastore.find({}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
});


