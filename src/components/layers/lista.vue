<template>
<draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }" @end="handleEnd" @start="handleStart">
    <li :class="selected==el.name ? 'actived':''" v-for="el in tasks" :key="el.name" @click.stop="handleClick(el.name)">{{el.name}}
        <nested-draggable :tasks="el.children" :id="el.name" @end="handleEnd" />
    </li>

</draggable>
</template>

<script>
import store from "@/store";
import draggable from "vuedraggable";
import eventBus from "@/event-bus";
export default {
    props: {
        tasks: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            selected: '',
            moveID: ''
        }
    },
    mounted() {
        eventBus.$on("showProperties", (name) => {
            this.selected = name;
        });
    },

    components: {
        draggable
    },
    name: "nested-draggable",
    methods: {

        handleClick(name) {
            eventBus.$emit("componentSelected", name)
        },
        handleEnd(event) {
            let para = event.to.id.trim();
            if(para=="") para = null
            if (this.moveID == "") return

            function search(name, obj) {
                for (let i in obj) {
                    // this.loadComponent(parent, obj[i])
                    if (obj[i].name == name)
                        return obj[i]; //econtrou, então retorne o objeto

                    if (obj[i].children) {
                        return search(name, obj[i].children);
                    }
                }
            }

            //Remove da DOM apenas, não tem necessidade de remover do store
            eventBus.$emit("deleteDOMComponent", this.moveID);
            // console.log("TENTANDO MOVER ", this.moveID, "PARA",para)

            //pega o objeto do componente a ser movido
            let component = search(this.moveID, store.state.project.pages[store.state.activePage].components)

            eventBus.$emit("reloadComponent", {
                parent: para,
                component: component
            });
           
          

            //console.log("PARA", event.to.id || "nada")
            //  eventBus.$emit("deleteComponent", this.moveID);
            //console.log("ARRASTADO", this.dragStartComponent)

        },
        handleStart(event) {
            //  console.log("QUEM", event.clone.firstChild.data)
            this.moveID = event.clone.firstChild.data.trim();
        },

    }
};
</script>

<style>
.border-pink-500 {
    border-bottom: solid orange 1px;
}

.dragArea {
    min-height: 0px;
    margin: 0px;
    text-align: left;
    cursor: pointer;

}

ul,
li {
    position: relative;
}

ul {
    list-style: none;
    padding-left: 32px;
}

.actived {
    background: #bd93f93f;
    color: #bd93f9;
    border-radius: 2px;
    border-bottom: 1px solid rgb(241, 241, 241);
    padding: 2px;
    transition: background .5s, color 1s, border-radius 1s;
}

li::before,
li::after {
    content: "";
    position: absolute;
    left: -12px;
}

li::before {
    border-top: 1px solid #bd93f9;
    top: 9px;
    width: 8px;
    height: 0;
}

li::after {
    border-left: 1px solid #bd93f9;
    height: 100%;
    width: 0px;
    top: 2px;
}

ul>li:last-child::after {
    height: 8px;
}
</style>
