<template>
<vue-draggable-resizable :style="{zIndex:properties.zIndex}" class="movel" @activated="onActivated" :active="active" :x="0" :y="0" :w="100" :h="100" :parent="false" :grid="[grid.x,grid.y]">
    <div class="container" :style="{backgroundColor:properties.backgroundColor}"></div>
</vue-draggable-resizable>
</template>

<script>
import Component from "@/mixins/componentMixin"
export default {
    mixins: [Component],
    properties: {
        backgroundColor: { default:"transparent"},
        zIndex:{default: 'auto'},
    }
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
