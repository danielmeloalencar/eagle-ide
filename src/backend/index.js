const { ipcMain, dialog } = require("electron");
const fs = require("fs");

/**************** Open Project ****************/
ipcMain.on("open-project", async (event, _arg) => {
  const files = await dialog.showOpenDialog({
    buttonLabel: "Selecionar projeto",
    title: "Selecione um projeto Eagle IDE",

    filters: [
      { name: "Eagle IDE Project", extensions: ["eagle"] },
      { name: "Qualquer arquivo", extensions: ["*.*"] },
    ],
  });
  if (files.canceled) {
    return;
  }

  const file = files.filePaths[0];
  const content = fs.readFileSync(file).toString();
  event.reply("project-opened", content);
});

/**************** Create Project ****************/
ipcMain.on("create-project", async (event, arg) => {
  const file = await dialog.showSaveDialog({
    buttonLabel: "Salvar projeto",
    title: "Salvar projeto Eagle IDE",

    filters: [{ name: "Eagle IDE Project", extensions: ["eagle"] }],
  });
  if (file.canceled) {
    return;
  }

  try {
    fs.writeFileSync(file.filePath, JSON.stringify(arg), "utf-8");
  } catch (e) {
    event.reply("error", e.message);
    return;
  }
  //retorna o local do arquivo para gravação posterior
  event.reply("project-created", file.filePath);
});

/**************** Save Project ****************/
ipcMain.on("save-project", async (event, arg) => {
  try {
    console.log(arg);
    fs.writeFileSync(arg.projectPath, JSON.stringify(arg), "utf-8");
  } catch (e) {
    event.reply("error", e.message);
    return;
  }

  event.reply("project-saved");
});
