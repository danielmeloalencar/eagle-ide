<template>
  <div class="container" @click.self="handleCanvasClick" @mousewheel=" (event) => { (event.deltaY < 0) ? zoom(1):zoom(-1)}">
    <div class="canvas" id="canvas">
      <vue-draggable-resizable class="movel"
        :x="0"
        :y="0"
        :w="300"
        :h="100"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="false"
        :grid="[1, 1]"
        active>
        <p>
          Eu sou um componente móvel<br /><br /><br />
          X: {{ x }} / Y: {{ y }} - Largura: {{ width }} / Altura: {{ height }}
        </p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "./VueDraggableResizable.css";
import Panzoom from "@panzoom/panzoom"; // Docs https://github.com/timmywil/panzoom

export default {
  components: {
    VueDraggableResizable,
  },

  data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },
  methods: {
    handleCanvasClick: function () {
      alert("CARREGA PROPRIEDADES DO CANVAS");
    },
    
    onResize: function (x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function (x, y) {
      this.x = x;
      this.y = y;
    },

      zoom(level){
            level === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn()
        }
  },
  mounted: function () {
    this.panzoom = Panzoom(document.getElementById("canvas"), {
      maxScale: 5,
      panOnlyWhenZoomed:false,
      excludeClass:'movel'
    });
  },
};
</script>

<style scoped>
.container {
  height: 90%;
  background-color: rgb(80, 78, 78);
  width: 100%;
  overflow: hidden;
  border: 1px dotted rgb(80, 78, 78);
  color: black;
  position: relative;
  overflow: scroll;
}
.canvas {
  height: 120%;
  background-color: #fff;
  width: 40%;
  overflow: hidden;
  border: 1px dotted rgb(80, 78, 78);
  color: black;
  position: relative;
}
</style>