<template>
  <div class="container">
  <VueCodeEditor 
    v-model="codigo" 
    @init="editorInit" 
    lang="jsx" 
    theme="dracula" 
    width="100%" 
    height="100%"
    :options="{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 14,
        highlightActiveLine: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        showPrintMargin: false,
        showGutter: true,
    }"
    :commands="[
        {
            name: 'save',
            bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
            exec: null,
            readOnly: true,
        },
    ]"
    />
  </div>
</template>

<script>
import VueCodeEditor from 'vue2-code-editor'; //https://www.npmjs.com/package/vue2-code-editor
export default {
  components: {
    VueCodeEditor
  },

  data() {
    return {
  
 codigo: `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 50,
    justifyContent:'center',
    alignItems:'center' 
  },
});

export default function App() {
   return (
    <View style={styles.container}>
      <Text style={{fontSize:30}} >This is magic </Text>
    </View>
  );
}      
 `
    };
  },

      mounted() {
 
   
    
    },
  methods: {
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
flex:1;
  height: 90%;
  background-color:#21222c;
  width: 100%;

  border: 1px dotted rgb(80, 78, 78);
  color: rgb(98, 211, 240);


}
.editor{
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