<template>
<splitpanes horizontal :push-other-panes="true" style="height: 100vh;margin:0px padding:0px;overflow:hidden;" >
    <pane min-size="10" size="10" max-size="10" style="display: flex" >
        <div style="display: flex; flex: 1" class="noselect">
            <div class="logo-container">
                <img src="@/assets/logo.png" width="50">
                <span class="logo">EagleIDE</span>
            </div>
            <div class="menu-container">{{projectName}}</div>
            <button class="btnSaveProject" @click="saveProject()">Save Project</button>
            <button class="btnCloseProject" @click="closeProject()">Close Project</button>
        </div>
    </pane>
    <pane>
        <splitpanes :push-other-panes="false" >
            <pane min-size="5" size="20" max-size="20"  >
                <splitpanes horizontal :push-other-panes="false" >
                    <pane min-size="5"   >
                        <Box titulo="Layers" v-if="activeTab == 0">
                            <Layers />
                        </Box>
                    </pane>
                    <pane min-size="10" :style="{background:activeTab ===1?'#FFF':''}">
                    <qrcode-vue :value="url" :size="170" level="H" v-if="url && activeTab == 1" class="qrcode" foreground="#604c72" />
  
                        <Box titulo="Properties"  v-if="activeTab == 0">
                            <PropertiesEditor />
                        </Box>
                    </pane>
                </splitpanes>
            </pane>
            <pane min-size="5" :size="activeTab == 0?70:100 " class="canvas-container noselect" :push-other-panes="true"  >
                <Canvas v-show="activeTab == 0" ref="canvas" />
                <Editor v-show="activeTab == 1" />
                <div style="
              height: 5%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #282a36;
              padding: 5px;
            ">
                    <div class="tab" :class="{ active: activeTab == 0 }" @click="
                () => {
                  this.activeTab = 0;
                }
              ">
                        DESIGN
                    </div>
                    <div class="separador"></div>
                    <div class="tab" :class="{ active: activeTab == 1 }" @click="
                () => {
                  this.activeTab = 1;
                }
              ">
                        CODE
                    </div>
                </div>
            </pane>

            <pane min-size="3" max-size="20" size="15" class="noselect">
                <Box titulo="Components" v-if="activeTab == 0">
                    <button class="btn-add-component" @click="addComponent('View')">View </button>
                    <button class="btn-add-component" @click="addComponent('Button')">Button </button>
                    <button class="btn-add-component" @click="addComponent('Youtube')">Youtube Video </button>
                </Box>
            </pane>
            <pane min-size="3" size="10" max-size="15" class="noselect" >

                <Box titulo="Pages"  >
                    <button @click="addPage()" style="width:100%; " class="btnSaveProject">New Page</button>
                    <hr>
                    <button v-for="(page,index) in pages" :key="index" class="btn-select-page" @click="()=>{openPage(index)}">{{page.name}}</button>

                </Box>
            </pane>
        </splitpanes>
    </pane>
    <pane min-size="5" size="10" class="console">
        <span>20:06 IDE started</span>
    </pane>
</splitpanes>
</template>

<script>
//plugin
//https://antoniandre.github.io/splitpanes
import QrcodeVue from 'qrcode.vue'
import {
    Splitpanes,
    Pane
} from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import "../splitpanesCustom.css";
import "../utils/css-utils.css";

import Box from "@/components/box";
import Canvas from "@/components/canvas";
import Editor from "@/components/codeEditor";
import Layers from "@/components/layers/novo.vue";
import PropertiesEditor from "@/components/propertiesEditor";
import eventBus from "@/event-bus";

const {
    ipcRenderer
} = window.require("electron");
import store from "@/store";

export default {
    name: "mainScreen",
    components: {
        Splitpanes,
        Pane,
        Box,
        Canvas,
        Editor,
        Layers,
        PropertiesEditor,
        QrcodeVue
        
    },
    data() {
        return {
            activeTab: 0,
            url:''
        };
    },
    mounted() {
          eventBus.$on('qrcode', (data)=>{
              this.url = data.url;
          })

    },
    computed: {
        projectName: function () {
            return this.$store.state.project.projectName
        },
        pages() {
            return this.$store.state.project.pages
        }

    },

    methods: {
        addPage() {
            let num = this.$store.state.project.pages.length + 1;
            store.state.project.pages.push({
                "name": "page" + num,
                "components": []
            })
               eventBus.$emit('openPage', num - 1)
            eventBus.$emit("showProperties", "page" + num - 1);
         

        },
        addComponent(tipo) {
            eventBus.$emit('addComponent', tipo)
        },
        openPage(index) {
            eventBus.$emit('openPage', index)
            eventBus.$emit("showProperties", store.state.project.pages[index].name);
   
        },
        closeProject() {
            this.$router.push({
                name: 'Home'
            })
            //Limpa State
            store.replaceState({
                grid: {
                    x: 1,
                    y: 1
                },
                selectedComponent: null,
                activePage: 0,
            })
        },
        saveProject() {
            ipcRenderer.on("error", (e, err) => {
                alert(err)
            });
            ipcRenderer.send("save-project", store.state.project);

            ipcRenderer.on("project-saved", () => {
                alert("Projeto Salvo!")
            });
        },

    }

};
</script>

<style>
.logo-container {
    display: flex;
    margin-right: 10px;
    width: 150px;
    align-items: center;
    padding-left: 10px;
}

.logo {
    font-style: italic;
    font-size: 1.3rem;
    font-weight: bolder;
    color: #bd93f9;
}

.menu-container {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.console {
    background-color: #282a36;
    color: #8be9fd;
    font-size: 12px;
    overflow-y: auto;
    padding: 10px;
}

.canvas-container {
    padding: 5px;
}

.separador {
    margin-left: 10px;
    margin-right: 10px;
    border-left: 2px dotted #7979795d;
    height: 50%;
}

.tab {
    cursor: default;
    font-size: 12px;
    padding: 5px;
    color: #bd93f983;

}

.tab.active {
    color: #bd93f9;
    font-weight: bold;
}

.btn-add-component:focus {
    outline: 0;
}

.btn-add-component {
    background-color: #636363;
    color: #FFF;
    border: none;
    margin-top: 2px;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
}

.btn-add-component:hover {
    background-color: #bd93f9;
    color: #FFF;
}

.btn-select-page {
    background-color: #636363;
    color: #FFF;
    border: none;
    margin-top: 2px;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    outline: none;
}

.btn-select-page:hover {
    background-color: #bd93f9;
    color: #FFF;
}

.btnCloseProject {
    margin: 15px;
    background-color: #604c7c;
    color: #FFF;
    border: none;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 5px;

}

.btnCloseProject:hover,
.btnSaveProject:hover {
    background-color: #bd93f9;
}

.btnSaveProject {
    margin: 15px;
    background-color: #604c7c;
    color: #FFF;
    border: none;
    cursor: pointer;
    margin-right: 2px;
    border-radius: 5px;

}

.qrcode{
   margin-top: 20px;
    
}
</style>
