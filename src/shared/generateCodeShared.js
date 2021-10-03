import store from "@/store";
function layerToCode(properties)
{
  console.log(properties)
  return `<View name="${properties.name}" style={{position:'absolute',top:${properties.y}, left:${properties.x}, height:${properties.height}, width:${properties.width},backgroundColor: '${properties.backgroundColor}'}} ></View>`
}
function search(obj) {
  let result = "";
  // TODO consertar isto. 
  for (let i in obj) {
     result= result + `

     ` + layerToCode(obj[i])
    //processa aqui
         

      if (obj[i].children.length >0) {
        result= result + `

        ` + search(obj[i].children);
     }
  }
  return result;
}

export default {
  
  
  getCode: function (){
      var  componentes = search(store.state.project.pages[store.state.activePage].components);



      let code = `

      import * as React from 'react';
      import { View,Image,Text, StyleSheet } from 'react-native';
      import Constants from 'expo-constants';
      export default function App() {
        return (
          <View style={styles.container}>
            ${componentes}
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          paddingTop: Constants.statusBarHeight,
          backgroundColor: '#ecf0f1',
          padding: 8,
        },
      
        
      });
         
   `
  return code;

    }
};
