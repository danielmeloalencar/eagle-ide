<template>
<vue-draggable-resizable :name="properties.name" :style="{zIndex:propertiesMutable.zIndex}" class="movel" :on-drag="onDragCallback" :beforeActivate="onBeforeActivate" :on-resize="onResize" :on-drag-start="onDragStartCallback" @activated="onActivated" :x="propertiesMutable.x" :y="propertiesMutable.y" :w="propertiesMutable.width" :h="propertiesMutable.height" :parent="false" :grid="[grid.x,grid.y]" :draggable="draggable">
    <button class="container">{{propertiesMutable.caption}}</button>
</vue-draggable-resizable>
</template>

<script>
import Component from "@/mixins/componentMixin"
export default {
    mixins: [Component],
    props: {
        properties: {
            caption: String,
            zIndex: {
                default: 'auto'
            },
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
