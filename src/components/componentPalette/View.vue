<template>
<vue-draggable-resizable :active="active" :name="propertiesMutable.name" :style="{zIndex:propertiesMutable.zIndex, backgroundColor:propertiesMutable.backgroundColor}" class="movel" @activated="onActivated" :on-resize="onResize" :on-drag="onDragCallback" :beforeActivate="onBeforeActivate" :on-drag-start="onDragStartCallback"  :x="propertiesMutable.x" :y="propertiesMutable.y" :w="propertiesMutable.width" :h="propertiesMutable.height" :parent="false" :grid="[grid.x,grid.y]" :draggable="draggable">
    <slot>
        </slot>
</vue-draggable-resizable>
</template>

<script>
import Component from "@/mixins/componentMixin"
export default {
    mixins: [Component],
    properties: {
        backgroundColor: {
            default: "transparent"
        },
        zIndex: {
            default: 'auto'
        },
    },
    methods: {
     
    },
    
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
