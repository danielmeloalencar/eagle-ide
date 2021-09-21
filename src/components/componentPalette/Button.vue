<template>
<vue-draggable-resizable class="movel" :x="0" :y="0" :w="100" :h="100" :parent="false" :grid="[grid.x,grid.y]" active>
    <button class="container">Button</button>
</vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "../../VueDraggableResizable.css";
import store from "@/store";
export default {
    name: 'RNButton',

      /*  watch: {
            grid: { 
               deep: true,
               handler: function(){
                console.log('Prop changed:');
            }
            }
        },*/
    components: {
        VueDraggableResizable
    },

    data: function () {
        return {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        };
    },
    computed: {
        grid(){
            return store.state.grid;
        }
    },
    methods: {
        onResize: function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        onDrag: function () {

        },
    },
    
    mounted(){
      console.log(this.grid)
    }

};
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}

.movel {
    cursor: move;
}
</style>
