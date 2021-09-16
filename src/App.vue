<template>
  <splitpanes
    horizontal
    :push-other-panes="false"
    style="height: 97vh;margin:0px padding:0px"
  >
    <pane min-size="5" size="5" max-size="5" style="display: flex">
      <div style="display: flex; flex: 1">
        <div
          style="
            display: flex;
            margin-right: 10px;
            width: 150px;
            align-items: center;
            justify-content: center;
          "
        >
          <span>EgleIDE</span>
        </div>
        <div style="display:flex; flex: 1; align-items: center; justify-content: start">
          Menu começa aqui
        </div>
      </div>
    </pane>
    <pane>
      <splitpanes :push-other-panes="false">
        <pane min-size="5" size="15">
          <span>Propriedades</span>
        </pane>
        <pane min-size="5" size="70">
          <span>Conteudo </span>
        </pane>
        <pane min-size="5" size="15">
          <span>Componentes</span>
        </pane>
      </splitpanes>
    </pane>
    <pane min-size="5" size="10">
      <span>Console</span>
    </pane>
  </splitpanes>
</template>

<script>
//https://antoniandre.github.io/splitpanes

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import "./css-reset.css";
export default {
  name: "App",
  components: {
    Splitpanes,
    Pane,
  },
};
</script>

<style>
body {
  background-color: #21222c;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.splitpanes {
  background-color: #21222c;
  color: #fff;
}

.splitpanes__splitter {
  background-color: #6272a4;
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(98, 114, 164, 0.8);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -5px;
  right: -5px;
  height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -5px;
  bottom: -5px;
  width: 100%;
}
</style>
