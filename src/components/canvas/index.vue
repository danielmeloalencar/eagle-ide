<template>
<div ref="container" id="container" @click.self="handleCanvasClick" @mousewheel="event => event.deltaY < 0 ? zoom(1) : zoom(-1)">
    <div class="canvasTools">
        x <input type="number" v-model="grid.x" class="input-grid" min="1"> y <input type="number" v-model="grid.y" class="input-grid" min="1">
        <template v-if="showGrid">
            <img src="../../assets/eye-close.png" alt="" width="20" height="20" @click="handleMostrarGrid">
        </template>
        <template v-if="!showGrid">
            <img src="../../assets/eye.png" alt="" width="20" height="20" @click="handleMostrarGrid">
        </template>
    </div>
    <div id="canvas" ref="canvas" :class="showGrid" :style="gridStyle"> </div>
</div>
</template>

<script>
import Vue from 'vue';
import Panzoom from "@panzoom/panzoom"; // Docs https://github.com/timmywil/panzoom
import {
    RNView,
    RNButton,
    RNYoutube
} from "../componentPalette";
import store from "@/store";
import eventBus from "@/event-bus";

const RNButtonClass = Vue.extend(RNButton);
const RNViewClass = Vue.extend(RNView);
const RNYoutubeClass = Vue.extend(RNYoutube);
export default {
    components: {},

    data: function () {
        return {
            mostrarGrid: false
        };
    },
    computed: {
        showGrid() {
            return (this.mostrarGrid ? 'grid' : '')
        },
        grid() {
            return this.$store.state.grid;
        },
        gridStyle() {
            let x = this.grid.x > 1 ? this.grid.x : 0;
            let y = this.grid.y > 1 ? this.grid.y : 0;
            return {
                backgroundSize: ` ${(x>1?x +'px':'auto')} ${(y>1?y +'px':'auto')}`
            };
        }
    },
    methods: {
        handleMostrarGrid: function () {
            this.mostrarGrid = !this.mostrarGrid;
        },
        handleCanvasClick: function () {
            store.state.selectedComponent = null;
            store.state.selectedBeforeComponent = null;
            eventBus.$emit("showProperties", store.state.project.pages[store.state.activePage].name);

            //alert("CARREGA PROPRIEDADES DO CANVAS");
        },
        zoom(level) {
            level === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn();
        },
        conta(tipo) {
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
                if (obj[key]) list.push(obj[key]);

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

            let encontrados = findValues(store.state.project.pages[store.state.activePage].components, "type")
            return encontrados.filter(x => x == tipo).length + 1
        },

        loadComponents(pageIndex = 0) {

          const search = (obj, parent = null) =>{
                for (let i in obj) {
                    console.log("CARREGANDO COMPONENTE AGORA ", obj[i].name)
                    this.loadComponent(parent,obj[i])
                  /*
                    eventBus.$emit("loadComponent", {
                        parent: parent,
                        component: obj[i]
                    })
                    */
                    /// console.log(obj[i], parent);
                    if (obj[i].children.length >0) {
                        search(obj[i].children, obj[i].name);
                    }
                }
            }


            let data = store.state.project.pages[pageIndex].components;
            search(data);
        },
        loadComponent(parent, properties) {
            let instance = null;
            let tipo = properties.type;

            switch (tipo) {
                case 'View':
                    instance = new RNViewClass({
                        propsData: {
                            properties
                        }
                    })

                    instance.$mount() // pass nothing
                    break;
                case 'Button':
                    //obj será salvo no store, properties são para a DOM

                    instance = new RNButtonClass({
                        propsData: {
                            properties
                        }
                    })
                    instance.$mount() // pass nothing
                    //console.log(store.state.project.pages[store.state.activePage].components.find(x => x.name === tipo + '_' + id))
                    //store.dispatch('getComponentByName',{project: "DANIEL"});

                    break;

                default:
                    break;
            }
            if (parent == null)
                document.getElementById("canvas").appendChild(instance.$el);
            else
                document.querySelector("[name='" + parent + "']").appendChild(instance.$el);
            console.log(store.state.project);
            eventBus.$emit("componentAdded", properties)
        }

    },

    beforeDestroy() {
        // Remove all listening events. When this component is referenced multiple times, all referenced listeners are removed
        eventBus.$off("addComponent");
        eventBus.$off("loadComponents");
        this.$el.parentNode.removeChild(this.$el);
    },
    created() {
    

     
        

        //para layers
        eventBus.$on('reloadComponent', data => {
            //carrega o componente
            this.loadComponent(data.parent, data.component)
            //se tiver filhos,carrega tambem recursivamente
            if (data.component.children)
                return search(data.component.children, data.component.name)
            console.log(store.state.project.pages[store.state.activePage].components)

            function search(obj, parent = null) {
                for (let i in obj) {
                    // this.loadComponent(parent, obj[i])
                    this.loadComponent(parent,
                        obj[i]
                    )
                    console.log(obj[i], parent);
                    if (obj[i].children) {
                        return search(obj[i].children, obj[i].name);
                    }
                }
            }
        })
    },

    mounted: function () {
            //para abrir projeto
        eventBus.$on('loadComponent', data => {
            this.loadComponent(data.parent, data.component)
            
        })
       //Para troca de páginas
         eventBus.$on('openPage', index => {
             if(index==store.state.activePage)
             return
              document.getElementById("canvas").innerHTML="";  
                 store.state.activePage =index
                this.loadComponents(index)
                
                         
        })


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

        this.loadComponents();
        eventBus.$emit("showProperties", store.state.project.pages[store.state.activePage].name);
        //Handle add components
        eventBus.$on('addComponent', tipo => {
            let instance = null;
            var obj = {}
            var id = tipo + this.conta(tipo)
            obj = {
                type: tipo,
                name: id,
                id: id,
                considerStatusbar:false,
                children: [],
                align:["left","top"],
                x: getRandomInt(0,this.$refs.container.clientWidth / 4),
                y: getRandomInt(0,this.$refs.container.clientHeight / 4),
                height:100,
                width:100,
            };

            switch (tipo) {
                case 'View':
                    instance = new RNViewClass({
                        propsData: {
                            properties: obj
                        }
                    })

                    instance.$mount() // pass nothing
                    break;
                        case 'Youtube':
                    instance = new RNYoutubeClass({
                        propsData: {
                            properties: obj
                        }
                    })

                    instance.$mount() // pass nothing
                    break;
                case 'Button':
                    //obj será salvo no store, properties são para a DOM
                    obj = {
                        ...obj,
                        ...{
                            caption: obj.name,
                            width:150,
                            height:50
      
                        }
                    }
                    instance = new RNButtonClass({
                        propsData: {
                            properties: obj
                        }
                    })
                    instance.$mount() // pass nothing
                    //console.log(store.state.project.pages[store.state.activePage].components.find(x => x.name === tipo + '_' + id))
                    //store.dispatch('getComponentByName',{project: "DANIEL"});

                    break;

                default:
                    break;
            }

            document.getElementById("canvas").appendChild(instance.$el);

            store.state.project.pages[store.state.activePage].components.push(obj);
            //console.log(store.state.project)
            eventBus.$emit("showProperties", obj.name)
            eventBus.$emit("componentAdded", obj)

        });

        this.panzoom = Panzoom(document.getElementById("canvas"), {
            maxScale: 5,
            minScale: 0.5,
            panOnlyWhenZoomed: false,
            excludeClass: "movel",
            cursor: "grab",
        });

        //Posiciona o canvas no centro do container
        setTimeout(() =>
            this.panzoom.pan(
                this.$refs.container.clientWidth / 2 -
                this.$refs.canvas.clientWidth / 2,
                50
            )
        );
        //this.$refs.container.clientHeight
    },
};
</script>

<style scoped>
#container {
    height: 90%;
    background-color: rgb(32, 29, 29);
    background-image: url("../../assets/background.png");
    background-repeat: repeat;
    background-position: center;
    background-blend-mode: overlay;
    width: 100%;
    overflow: hidden;
    border: 1px dotted rgb(80, 78, 78);
    color: black;
    position: relative;
    overflow: scroll;
}

#canvas {
    width: 375px;
    height: 812px;
    background-color: #fff;
    overflow: hidden;
    border:none;
    color: black;
    position: relative;
    border-radius: 2px;
    /*mask-image: url('../../assets/iphone.png'); */
    -webkit-box-shadow: 5px 5px 18px 5px rgba(0, 0, 0, 0.541);
    box-shadow: 5px 5px 18px 5px rgba(0, 0, 0, 0.507);
}



.grid {
    background-image:
        repeating-linear-gradient(rgba(204, 204, 204, 0.7) 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, rgba(204, 204, 204, 0.7) 0 1px, transparent 1px 100%);
}

.movel {
    cursor: move;
}

.canvasTools {
    display: flex;
    background-color: rgba(126, 125, 126, 0.4);
    padding: 5px;
    z-index: 999999999999999;
    position: absolute;
    width: 150px;
    height: 50px;
    top: 10px;
    align-items: center;
}

.canvasTools img {
    cursor: pointer;
}

.input-grid {
    width: 33px;
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>
