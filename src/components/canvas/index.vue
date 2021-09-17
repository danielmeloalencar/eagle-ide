<template>
  <div class="container" @click.self="handleCanvasClick">
    <vue-draggable-resizable
      :x="300"
      :y="150"
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
    handleCanvasClick: function (){
      console.log("CARREGA PROPRIEDADES DO CANVAS")
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
  },
};
</script>

<style scoped>
.container {
  height: 90%;
  background-color:#FFF;
  width: 100%;
  overflow: hidden;
  border: 1px dotted rgb(80, 78, 78);
  color: black;
  position: relative;

}

</style>