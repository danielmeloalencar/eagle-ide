import store from "@/store";
let canvasWidth= 375;
let canvasHeight = 812;

function layerToCode(properties)
{

  if (properties.type=="View")
  return `<View style={styles.${properties.name}}></View>`
  if (properties.type=="Button")
  return `<View style={styles.${properties.name}}><Text>${properties.caption}</Text></View>`

}


function layersToCSS(properties)
{
  
  var alignHorizontal ='';
  var alignVertical = '';
 if( properties.align.indexOf("left")>=0  && properties.align.indexOf("right")>=0 )
 {
 alignHorizontal = `left:${properties.x},
 right:${canvasWidth - (properties.width + properties.x)}`;
 } else if(properties.align.indexOf("right")>=0 )
 {
  alignHorizontal = `right:${canvasWidth - (properties.width + properties.x)}, 
 width:${properties.width}`;
 } 
 else if(properties.align.indexOf("left")>=0 )
 {
  alignHorizontal = `left:${properties.x},
width:${properties.width}`;
 } 

 //////////////////////////////////////////////////////////////////////////////////////
 if( properties.align.indexOf("top")>=0  && properties.align.indexOf("bottom")>=0 )
 {
  alignVertical = `top:${properties.y} + Constants.statusBarHeight,
 bottom:${canvasHeight - (properties.height + properties.y)}`;
 } else if(properties.align.indexOf("bottom")>=0 )
 {
  alignVertical = `bottom:${canvasHeight - (properties.height + properties.y)}, 
 height:${properties.height}`;
 } 
 else if(properties.align.indexOf("top")>=0 )
 {
  alignVertical = `top:${properties.y} + Constants.statusBarHeight,
height:${properties.height}`;
 } 
 

 if (properties.type=="View")
 {
   return `${properties.name} :{
position:'absolute',
backgroundColor:'${properties.backgroundColor}',
zIndex:${properties.zIndex || 0},
${alignHorizontal},
${alignVertical},  
},
   `
 }

 if (properties.type=="Button")
 {
   return `${properties.name} :{
position:'absolute',
borderWidth:1,
borderRadius:2,
alignItems:'center',
justifyContent:'center',
zIndex:${properties.zIndex || 0},
backgroundColor:'#EFEFEF',
${alignHorizontal},
${alignVertical},  
},
   `
 }

}

function searchComponents(obj) {
  let result = "";
  // TODO consertar isto. 
  for (let i in obj) {
     result= result + `
          ` + layerToCode(obj[i])
    //processa aqui
         

      if (obj[i].children.length >0) {
        result= result + `
          ` + searchComponents(obj[i].children);
     }
  }
  return result;
}


function searchcss(obj) {
  let result = "";
  // TODO consertar isto. 
  for (let i in obj) {
     result= result + `
     ` + layersToCSS(obj[i])
    //processa aqui
         

      if (obj[i].children.length >0) {
        result= result + `
        ` + searchcss(obj[i].children);
     }
  }
  return result;
}
export default {
  
  
  getCode: function (){
      var  componentes = searchComponents(store.state.project.pages[store.state.activePage].components);
      var  componentesCSS = searchcss (store.state.project.pages[store.state.activePage].components);
      var pageName= store.state.project.pages[store.state.activePage].name;

      let code = `
import * as React from 'react';
import { View,Image,Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
      
    function ${pageName}(props) {
        return (
          <View style={styles.container}>${componentes}
          </View>
        );
    }
      
const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
},
        
${componentesCSS}
      });
  export default ${pageName};    
   `
  return code;

    }
};
