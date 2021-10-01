<template>
<vue-draggable-resizable :name="propertiesMutable.name" :style="{zIndex:propertiesMutable.zIndex}" class="movel" @activated="onActivated" :on-resize="onResize" :on-drag="onDragCallback" :on-drag-start="onDragStartCallback" :active="active" :x="propertiesMutable.x" :y="propertiesMutable.y" :w="propertiesMutable.width" :h="propertiesMutable.height" :parent="false" :grid="[grid.x,grid.y]" :draggable="draggable">
    <div class="container" :style="{backgroundColor:propertiesMutable.backgroundColor}">
        <slot>
        </slot>
    </div>
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
