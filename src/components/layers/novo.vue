<template>
  <div class="row" style="height:100%;width:100%">
  
        <nested-draggable :tasks="list" />
    </div>

   
  
</template>

<script>
import nestedDraggable from "./lista.vue"; //https://github.com/SortableJS/Vue.Draggable
import store from "@/store";
import eventBus from "@/event-bus";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable
  },
  data() {
    return {
      list: store.state.project.pages[store.state.activePage].components
    };
  },
  mounted(){
        eventBus.$on('openPage', (index)=>{
            this.list= store.state.project.pages[index].components
        })

         eventBus.$on('componentDeleted', (name)=>{
              console.log("Componente", name, "foi removido. Layers atualizados")
            this.list= store.state.project.pages[store.state.activePage].components
        })
        
  }
};
</script>
<style scoped></style>