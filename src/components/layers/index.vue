<template>
<vue-drag-tree :expand-all="true" class="container" :data='data' :disableDBClick="true" :allowDrag='allowDrag' :allowDrop='allowDrop' :defaultText='"New Node"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler" v-slot="slotProps">
  
    <span :class="[slotProps.isClicked ? 'is-clicked' : 'noClicked']"></span>
    <span class='node-name'>{{slotProps.nodeName}}</span>
</vue-drag-tree>
</template>

<script>
//https://github.com/shuiRong/vue-drag-tree
export default {
    data() {
        return {
            data: [{
                    name: 'Node 0-0',
                    id: 0,
                    children: [{
                            name: 'Node 1-1',
                            id: 3,
                            children: [{
                                    name: 'Node 2-1',
                                    id: 4,
                                    children: []
                                },
                                {
                                    name: 'Node 2-2',
                                    id: 10,
                                    children: []
                                }
                            ]
                        },
                        {
                            name: 'Node 1-2',
                            id: 13,
                            children: []
                        }
                    ]
                },
                {
                    name: 'Node 0-1',
                    id: 14,
                    children: []
                }
            ]
        }
    },
    methods: {
        allowDrag(model, component) {
            console.log(component)
            if (model.name === 'Node 0-1') {
                // can't be dragged
                return false;
            }
            // can be dragged
            return true;
        },
        allowDrop(model, component) {
            console.log(component)
            if (model.name === 'Node 2-2') {
                // can't be placed
                return false;
            }
            // can be placed
            return true;
        },
        curNodeClicked(model, component) {
            console.log('curNodeClicked', model, component);
        },
        dragHandler(model, component, e) {
            console.log('dragHandler: ', model, component, e);
        },
        dragEnterHandler(model, component, e) {
            console.log('dragEnterHandler: ', model, component, e);
        },
        dragLeaveHandler(model, component, e) {
            console.log('dragLeaveHandler: ', model, component, e);
        },
        dragOverHandler(model, component, e) {
            console.log('dragOverHandler: ', model, component, e);
        },
        dragEndHandler(model, component, e) {
            console.log('dragEndHandler: ', model, component, e);
        },
        dropHandler(model, component, e) {
            console.log('dropHandler: ', model, component, e);
        }
    }
}
</script>

<style>
.container {
    flex: 1;
    width: 100%;
    height: 100%;

}

-webkit-zoom-grab {
    cursor: pointer;
}

.dnd-container {
    background: transparent
}

.dnd-container .is-clicked,
.dnd-container .is-hover {
    background: #783dd856;
    cursor: move;
    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}

.item {
    cursor: move;
    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}

.bold {
    font-weight: 700
}

.text {
    font-size: 12px
}

.treeNodeText {
    height: 28px;
    box-sizing: border-box;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.493);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center
}

.changeTree {
    width: 16px;
    color: rgba(255, 255, 255, 0.349)
}

.vue-drag-node-icon {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 10px;
    margin-right: 8px;
    border-left: 4px solid grey;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 0 solid #ff0;
    transition: transform .3s ease-in-out
}

.nodeClicked {
    transform: rotate(90deg)
}
</style>
