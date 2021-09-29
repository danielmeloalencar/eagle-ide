<template>
<vue-draggable-resizable :style="{zIndex:properties.zIndex}"  class="movel" @activated="onActivated" :active="active" :x="0" :y="0" :w="100" :h="100" :parent="false" :grid="[grid.x,grid.y]">
    <button class="container">{{properties.caption}}</button>
</vue-draggable-resizable>
</template>

<script>
import Component from "@/mixins/componentMixin"
export default {
    mixins: [Component],
    props: {
     properties:{
      caption: String,
      zIndex:{default: 'auto'},
    }
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
