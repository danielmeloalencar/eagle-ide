<template>
  <div
    ref="container"
    id="container"
    @click.self="handleCanvasClick"
    @mousewheel="
      (event) => {
        event.deltaY < 0 ? zoom(1) : zoom(-1);
      }
    "
  >
    <div id="canvas" ref="canvas" ke>
      <vue-draggable-resizable
        class="movel"
        :x="0"
        :y="0"
        :w="300"
        :h="100"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="false"
        :grid="[1, 1]"
        active
      >
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

  data: function() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },
  methods: {
    handleCanvasClick: function() {
      alert("CARREGA PROPRIEDADES DO CANVAS");
    },

    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    },

    zoom(level) {
      level === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn();
    },
  },
  mounted: function() {
    this.panzoom = Panzoom(document.getElementById("canvas"), {
      maxScale: 5,
      minScale: 1,
      panOnlyWhenZoomed: false,
      excludeClass: "movel",
      cursor: "grab",
    });

    //Posiciona o canvas no centro do container
    setTimeout(() =>
      this.panzoom.pan(
        this.$refs.container.clientWidth / 2 -
          this.$refs.canvas.clientWidth / 2,
        50
      )
    );
    //this.$refs.container.clientHeight
  },
};
</script>

<style scoped>
#container {
  height: 90%;
  background-color: rgb(80, 78, 78);
  width: 100%;
  overflow: hidden;
  border: 1px dotted rgb(80, 78, 78);
  color: black;
  position: relative;
  overflow: scroll;
}

#canvas {
  height: 120%;
  background-color: #fff;
  width: 40%;
  overflow: hidden;
  border: 1px solid rgb(80, 78, 78);
  color: black;
  position: relative;
  border-radius: 20px;
  -webkit-box-shadow: 5px 5px 18px 5px rgba(0, 0, 0, 0.35);
  box-shadow: 5px 5px 18px 5px rgba(0, 0, 0, 0.35);
}

.movel {
  cursor: move;
}
</style>
