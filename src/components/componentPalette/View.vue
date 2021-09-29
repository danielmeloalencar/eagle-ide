<template>
<vue-draggable-resizable class="movel" @activated="onActivated" :active="active" :x="0" :y="0" :w="100" :h="100" :parent="false" :grid="[grid.x,grid.y]">
    <div class="container"></div>
</vue-draggable-resizable>
</template>

<script>
import Component from "@/mixins/componentMixin"
export default {
    mixins: [Component],
    
};
</script>

<style scoped>
.container {
    height: 100%;
    background-color: transparent;
    width: 100%;
}

.movel {
    cursor: move;
}
</style>
