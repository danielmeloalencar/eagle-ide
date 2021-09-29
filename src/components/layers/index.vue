<template>
<div class='container-tree'>
    <div class='treeSelf'>
        <vue-drag-tree :data='data' :allowDrag='allowDrag' :allowDrop='allowDrop' :defaultText='"New Node"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler" :disableDBClick='true' expand-all>
        </vue-drag-tree>
    </div>
</div>
</template>

<script>
import store from "@/store";
import eventBus from "@/event-bus";
//https://github.com/shuiRong/vue-drag-tree
export default {
    data() {
        return {
            data: store.state.project.pages[store.state.activePage].components,

        }
    },
    methods: {
        allowDrag(model, component) {
            if (model.nome === 'TESTE') {
                console.log(component)
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
            console.log(store.state.project.pages[store.state.activePage].components)
            eventBus.$emit("componentSelected", model.name)
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
.dnd-container {
    background: transparent !important;
}

.dnd-container .is-clicked,
.dnd-container .is-hover {
    background: #604c7c34 !important;
    /*
    cursor: move !important;
    cursor: grab !important;
    cursor: -moz-grab !important;
    cursor: -webkit-grab !important;
    */

}

.container-tree {
    width: 100%;

}

.treeNodeText {
    color: #e0e0e0fb !important;
    height: 20px !important;
}
</style>
