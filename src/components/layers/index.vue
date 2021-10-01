<template>
<div class='container-tree'>
    <div class='treeSelf'>
        <vue-drag-tree :data='data' :allowDrag='allowDrag' :allowDrop='allowDrop' :defaultText='"New Node"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-end="dragEndHandler" @drop="dropHandler" :disableDBClick='true' expand-all>
        </vue-drag-tree>
    </div>
</div>
</template>

<script>
import eventBus from "@/event-bus";
import store from "@/store";
//https://github.com/shuiRong/vue-drag-tree
export default {
    data() {
        return {
            data: [],
            dragStartComponent: null,
        }
    },
    mounted(){
        eventBus.$on("openPage",(index) =>{
            this.data=store.state.project.pages[index].components;
        })

        eventBus.$on("componentAdded",(component) =>{
            //verificar antes se tem um component.parent, caso sim, então varrer recursivamente
            //todos os objetos no this.data em busca do parent e fazer o push nele
            //Caso contrário, faça o push abaixo
           let existe = false;
            let todosComponentesArray =this.buscaRecursiva();
            todosComponentesArray.map((comp)=>{
                if (component.name ==comp.name)
                  existe=true;
            })
            console.log("LISTA DE LAYERS", this.buscaRecursiva())
            if(!existe)
             this.data.push(component)
        })
    },
    methods: {
        buscaRecursiva(){
               function findValues(obj, key) {
                return findValuesHelper(obj, key, []);
            }

            function findValuesHelper(obj, key, list) {
                if (!obj) return list;
                if (obj instanceof Array) {
                    for (var i in obj) {
                        list = list.concat(findValuesHelper(obj[i], key, []));
                    }
                    return list;
                }
                if (obj[key]) list.push(obj);

                if ((typeof obj == "object") && (obj !== null)) {
                    var children = Object.keys(obj);
                    if (children.length > 0) {
                        for (i = 0; i < children.length; i++) {
                            list = list.concat(findValuesHelper(obj[children[i]], key, []));
                        }
                    }
                }
                return list;
            }

            let encontrados = findValues(this.data, "type")
            return encontrados;
        },

        allowDrag(model, component) {
            if (model.nome === 'TESTE') {
                console.log(component)
                // can't be dragged
                return false;
            }
            // can be dragged
            return true;
        },
        allowDrop(model) {


            if (model.name === 'Node 2-2') {
                // can't be placed
                return false;
            }
            // can be placed
            return true;

        },
        curNodeClicked(model) {
            eventBus.$emit("componentSelected", model.name)

        },
        dragHandler(model) {
            this.dragStartComponent = model;

        },

        dragEndHandler() {

        },

        dropHandler(model) {
      

            var toRoot = false;
            Object.entries(model.children).forEach(([key, value]) => {
                console.log(key)
                if (value.name == this.dragStartComponent.name)
                    toRoot = true;
            });

          
            if (toRoot==false){
            this.dragStartComponent.parent= null;
            eventBus.$emit("reloadComponent", {parent: null,component: this.dragStartComponent});
            }               
            else{
                this.dragStartComponent.parent= model.name;
  
  
              eventBus.$emit("deleteComponent", this.dragStartComponent.name);
            console.log("ARRASTADO",this.dragStartComponent)
              eventBus.$emit("reloadComponent",{parent: model.name,component: this.dragStartComponent});
          
            }
                

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
