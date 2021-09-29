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
    RNButton
} from "../componentPalette";
import store from "@/store";
import eventBus from "@/event-bus";

const RNButtonClass = Vue.extend(RNButton);
const RNViewClass = Vue.extend(RNView);

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
            //alert("CARREGA PROPRIEDADES DO CANVAS");
        },
        zoom(level) {
            level === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn();
        },
        makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
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
        }

    },

    beforeDestroy() {
        // Remove all listening events. When this component is referenced multiple times, all referenced listeners are removed
        eventBus.$off("addComponent");

    },
    mounted: function () {

        //Handle add components
        eventBus.$on('addComponent', tipo => {
            let instance = null;
            var obj = {}
            var id = tipo + this.conta(tipo)
            obj = {
                type: tipo,
                name: id,
                id: id,
                children: null,
             };

            switch (tipo) {
                case 'View':
                    instance = new RNViewClass({
                        propsData: {
                            properties: {
                                name: obj.name,
                            }
                        }
                    })

                    instance.$mount() // pass nothing
                    document.getElementById("canvas").appendChild(instance.$el)

                    break;
                case 'Button':
                    //obj será salvo no store, properties são para a DOM
                    obj= {...obj, ...{caption:obj.name}}
                    instance = new RNButtonClass({
                        propsData: {
                            properties: {
                                name: obj.name,
                                caption: obj.name
                            }
                        }
                    })
                    instance.$mount() // pass nothing
                    //console.log(store.state.project.pages[store.state.activePage].components.find(x => x.name === tipo + '_' + id))
                    //store.dispatch('getComponentByName',{project: "DANIEL"});

                    break;

                default:
                    break;
            }

            document.getElementById("canvas").appendChild(instance.$el)
            store.state.project.pages[store.state.activePage].components.push(obj);
            eventBus.$emit("showProperties", obj.name)
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
    background-color: rgb(78, 78, 78);
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
    height: 790px;
    background-color: #fff;
    width: 380px;
    overflow: hidden;
    border: 1px solid rgb(80, 78, 78);
    color: black;
    position: relative;
    border-radius: 20px;
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
