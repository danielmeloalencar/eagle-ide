<template>
<vue-draggable-resizable class="movel" :active="active" :x="0" :y="0" :w="100" :h="100" :parent="false" :grid="[grid.x,grid.y]">
    <button class="container">Button</button>
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
    width: 100%;
}

.movel {
    cursor: move;
}
</style>
