import store from "@/store";

function layerToCodeOpen(properties)
{

  if (properties.type=="View")
  return `<View style={styles.${properties.name}}>`
  if (properties.type=="Button")
  return `<View style={styles.${properties.name}}><Text>${properties.caption}</Text></View>`

}

function layerToCodeClose(properties)
{

  if (properties.type=="View")
  return `</View>`
  if (properties.type=="Button")
  return ``

}

function layersToCSS(properties,parent)
{
  
  var alignHorizontal ='';
  var alignVertical = '';
  var statusbar = properties.considerStatusbar==true? '+ Constants.statusBarHeight' :''; 
 if( properties.align.indexOf("left")>=0  && properties.align.indexOf("right")>=0 )
 {
 alignHorizontal = `left:${properties.x},
 right:${parent.width - (properties.width + properties.x)}`;
 } else if(properties.align.indexOf("right")>=0 )
 {
  alignHorizontal = `right:${parent.width - (properties.width + properties.x)}, 
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
  alignVertical = `top:${properties.y} ${statusbar},
 bottom:${parent.height - (properties.height + properties.y)}`;
 } else if(properties.align.indexOf("bottom")>=0 )
 {
  alignVertical = `bottom:${parent.height - (properties.height + properties.y)}, 
 height:${properties.height}`;
 } 
 else if(properties.align.indexOf("top")>=0 )
 {
  alignVertical = `top:${properties.y}  ${statusbar},
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
  let result="";
  for (let i in obj) {
     result= result + `
          ` + layerToCodeOpen(obj[i])
        
      if (obj[i].children.length >0) {
        result= result + `
` + searchComponents(obj[i].children);
     }
     result= result + `
     ` + layerToCodeClose(obj[i])
  }
  return result;
}


function searchcss(obj, parent=null) {
  if (parent==null)
  parent = {width:375,height:812} //se não tiver pai, use as medidas do canvas

  let result = "";

  for (let i in obj) {
     result= result + `
     ` + layersToCSS(obj[i],parent)
        

      if (obj[i].children.length >0) {
        result= result + `
        ` + searchcss(obj[i].children,obj[i]);
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
