<template>
  <splitpanes
    horizontal
    :push-other-panes="true"
    style="height: 100vh;margin:0px padding:0px;overflow:hidden;"
  >
    <pane min-size="5" size="5" max-size="5" style="display: flex">
      <div style="display: flex; flex: 1">
        <div class="logo-container">
          <span class="logo">EagleIDE</span>
        </div>
        <div class="menu-container">Menu começa aqui</div>
      </div>
    </pane>
    <pane>
      <splitpanes :push-other-panes="false">
        <pane min-size="5" size="20" max-size="20" >
          <splitpanes horizontal :push-other-panes="false">
            <pane min-size="5">
              <Box titulo="Layers"> </Box>
            </pane>
            <pane min-size="5">
              <Box titulo="Propriedades"> 
              </Box>
            </pane>
          </splitpanes>
        </pane>
        <pane min-size="5" size="65" class="canvas-container noselect">
          <Canvas v-if="activeTab == 0" />
          <Editor v-if="activeTab == 1" />
          <div
            style="
              height: 5%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #282a36;
              padding: 5px;
            "
          >
            <div
              class="tab"
              :class="{ active: activeTab == 0 }"
              @click="
                () => {
                  this.activeTab = 0;
                }
              "
            >
              DESIGN
            </div>
            <div class="separador"></div>
            <div
              class="tab"
              :class="{ active: activeTab == 1 }"
              @click="
                () => {
                  this.activeTab = 1;
                }
              "
            >
              CÓDIGO
            </div>
          </div>
        </pane>
        <pane min-size="5" max-size="20" size="15">
          <Box titulo="Componentes">
            <button style="flex:1"> Componente Teste </button>
          </Box>
        </pane>
      </splitpanes>
    </pane>
    <pane min-size="5" size="10" class="console">
      <span>20:06 IDE Iniciada</span>
    </pane>
  </splitpanes>
</template>

<script>
//plugin
//https://antoniandre.github.io/splitpanes

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import "./splitpanesCustom.css";
import "../../utils/css-utils.css";

import Box from "../box";
import Canvas from "../canvas";
import Editor from "../codeEditor";
export default {
  name: "mainScreen",
  components: {
    Splitpanes,
    Pane,
    Box,
    Canvas,
    Editor,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

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
  text-align: left;
  color: #807f7f;
}

.menu-container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: start;
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
</style>
