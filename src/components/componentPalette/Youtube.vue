<template>
<vue-draggable-resizable :name="propertiesMutable.name" :style="{zIndex:propertiesMutable.zIndex}" class="movel" @activated="onActivated" :on-resize="onResize" :on-drag="onDragCallback" :on-drag-start="onDragStartCallback" :active="active" :x="propertiesMutable.x" :y="propertiesMutable.y" :w="propertiesMutable.width" :h="propertiesMutable.height" :parent="false" :grid="[grid.x,grid.y]" :draggable="draggable">
    <div class="container" :style="{backgroundColor:propertiesMutable.backgroundColor}">
        <iframe width="98%" height="98%" src="https://www.youtube.com/embed/U-e4I-7fVY4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
