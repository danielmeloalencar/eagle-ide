<template>
  <div class="container">
    <div class="newProject" @click="newProject()">
      <img src="../../assets/new-file.png" />
      <span>Novo Projeto </span>
    </div>
    <div class="newProject" @click="openProject()">
      <img src="../../assets/folder.png" />
      <span>Abrir Projeto </span>
    </div>
  </div>
</template>

<script>
import store from "@/store";
//import eventBus from "@/event-bus";

const { ipcRenderer } = window.require("electron");
/*
var remote = window.require('@electron/remote');
const BrowserWindow = window.require("electron");
console.log(remote);

console.log(BrowserWindow);
 const files = remote.dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['*.*'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] }
    ]
  });

  console.log(files)
*/

export default {
  methods: {
    newProject() {
      let project = {
        projectName: "Untitled",
        pages: [
          {
            name: "page1",
            components: [],
          },
        ],
      };
      ipcRenderer.on("error", (e, err) => {
        alert(err);
      });
      ipcRenderer.send("create-project", project);

      ipcRenderer.on("project-created", (_event, path) => {
        //let project = JSON.parse(res)
        store.state.project = project;
        store.state.project.projectPath = path;
        this.$router.push({
          name: "Editor",
        });
      });
    },
    openProject() {
      ipcRenderer.send("open-project");
      ipcRenderer.on("project-opened", (_event, res) => {
        let project = JSON.parse(res);
        store.state.project = project;
        this.$router.push({
          name: "Editor",
        });
    
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100vh;
  border: 1px solid #6c3caf;
  padding: 5px;
  margin: 30px;
  border-radius: 10px;
}

.newProject {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 1px solid  #874add;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background-color:  #874add;
  color: #FFFFFF;
  font-size: 14px;
  margin: 10px;
}

.newProject:hover {
  border: 1px solid rgb(206, 171, 171);
  color: rgb(205, 119, 255);
}
</style>
