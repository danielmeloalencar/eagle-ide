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
        <pane min-size="5" size="20">
          <splitpanes horizontal :push-other-panes="false">
            <pane min-size="5">
              <Box titulo="Layers"> </Box>
            </pane>
            <pane min-size="5">
              <Box titulo="Propriedades"> </Box>
            </pane>
          </splitpanes>
        </pane>
        <pane min-size="5" size="65" class="canvas-container">
          <Canvas />
        </pane>
        <pane min-size="5" size="15">
          <Box titulo="Componentes"> </Box>
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

import Box from "../box";
import Canvas from "../canvas";

export default {
  name: "mainScreen",
  components: {
    Splitpanes,
    Pane,
    Box,
    Canvas,
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

.logo{
  font-style: italic;
  font-size: 1.3rem;
  font-weight: bolder;
  text-align: left;
  color:#807f7f;
}

.menu-container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: start;
}

.console {
background-color:#282A36;
color:#8be9fd;
font-size: 12px;
overflow-y: auto;
padding: 10px;
}

.canvas-container{
  padding: 10px;
}


</style>
