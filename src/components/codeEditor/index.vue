<template>
<div class="container">
    <button @click="generateCode"> GET CODE </button>
        <button @click="atualizarCodigo"> Refresh CODE </button>
    <div style="">Dispositivos conectados: {{dispositivos}} </div>

     <VueCodeEditor v-model="codigo" @init="editorInit"  lang="jsx" theme="dracula" width="100%" height="85%" :options="{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 14,
        highlightActiveLine: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        showPrintMargin: false,
        showGutter: true,
    }" :commands="[
        {
            name: 'save',
            bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
            exec: null,
            readOnly: true,
        },
    ]" />
</div>
</template>

<script>
import {
    Snack
} from 'snack-sdk';

import VueCodeEditor from 'vue2-code-editor'; //https://www.npmjs.com/package/vue2-code-editor
import codeGenerator from '@/shared/generateCodeShared.js';
import eventBus from "@/event-bus";
export default {
    components: {
        VueCodeEditor
    },

    data() {
        return {
            url: null,
            SDK:'',
            dispositivos:0,
            codigo:``,
            cod: ``,
            foto:''
        };
    },
    created() {
        this.getCode = codeGenerator.getCode;
    },

    mounted() {
        eventBus.$on("updateCode",()=>{
            setTimeout(()=>{
                 this.atualizarCodigo();
            },1000)
           
        });
           },
    watch:{
        url: function (url){
                eventBus.$emit('qrcode',{url:url})
        },
        codigo: function (){
           
             this.atualizarCodigo();  
        }
    },

    methods: {
        generateCode() {
/*
let img = document.getElementById("imagem") 
// make <canvas> of the same size
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height =img.clientHeight;
let context = canvas.getContext('2d');
context.drawImage(img, 0, 0);
canvas.toBlob((blob) =>{
  this.foto = blob
}, 'image/png');
*/

            this.codigo = this.getCode();
              this.pegaURL();
        },
        pegaURL: async function () {

            // Create Snack
            this.snack = new Snack({
                online: true,
                codeChangesDelay: 500,
                name: 'Meu App',
                dependencies: {},
                });

            // Make the Snack available online
            this.snack.setOnline(true);

            this.snack.getStateAsync().then(response => {
                this.url = response.url;
                this.SDK = response.sdkVersion;
                eventBus.$emit('qrcode',{url:this.url})
            })

            this.snack.addStateListener((state, prevState) => {
                if (state.connectedClients !== prevState.connectedClients) {
                    this.dispositivos = Object.keys(state.connectedClients).length;
                    for (const key in state.connectedClients) {
                        if (!prevState.connectedClients[key]) {
                            console.log('A client has connected! ' + state.connectedClients[key].platform);
                        }
                    }
                }
            });

        },
            atualizarCodigo: async function () {
                  this.codigo=this.getCode();
            this.snack.updateFiles({
                'App.js': {
                    type: 'CODE',
                    contents: this.codigo,
                },
            })

            this.snack.getStateAsync().then(response => {
                console.log(response)
            })
            const {
                id
            } = await this.snack.saveAsync();
            console.log(`Saved with id ${id}`);

            const url = await this.snack.getDownloadURLAsync();
            console.log('Download URL: ' + url);
        },

        dataSumit() {
            //code here
        },
        editorInit: function () {
            // vue2-code-editor/node_modules/
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html') //language 
            require('brace/mode/jsx')
            require('brace/mode/less')
            require('brace/theme/dracula')
            require('brace/snippets/jsx') //snippet
        }
    },

};
</script>

<style scoped>
.container {
    flex: 1;
    height: 90%;
    background-color: #282a36;
    width: 100%;

    border: 1px dotted rgb(80, 78, 78);
    color: rgb(98, 211, 240);

}

.editor {
    height: 100% !important;

}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(78, 65, 100);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(78, 65, 100);
}
</style>
