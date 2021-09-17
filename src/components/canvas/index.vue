<template>
  <div class="container">
    <vue-draggable-resizable
      :x="300"
      :y="150"
      :w="100"
      :h="100"
      @dragging="onDrag"
      @resizing="onResize"
      :parent="false"
      :grid="[1, 1]"
    >
      <p>
        Eu sou um componente móvel<br /><br /><br />
        X: {{ x }} / Y: {{ y }} - Largura: {{ width }} / Altura: {{ height }}
      </p>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "./VueDraggableResizable.css";
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
  },
};
</script>

<style>
.container {
  background-color: #FFF;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px dotted rgb(80, 78, 78);
  position: relative;
  color: black;
}

</style>