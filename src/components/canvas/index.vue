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
    },

    mounted: function () {
        //Handle add components
        this.$root.$on('addComponent', tipo => {
            let instance = null;
            switch (tipo) {
                case 'View':
                    instance = new RNViewClass()
                    instance.$mount() // pass nothing
                    this.$refs.canvas.appendChild(instance.$el)
                    break;
                case 'Button':
                    instance = new RNButtonClass()
                    instance.$mount() // pass nothing
                    this.$refs.canvas.appendChild(instance.$el)
                    break;

                default:
                    break;
            }
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
