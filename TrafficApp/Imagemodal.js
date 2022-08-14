import { ProgressViewIOSComponent, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal,Text,Button,Image,View} from "react-native";



const Imagemodal=(props)=>{

var i = 0;

return(
 
<Modal visible={props.modal}>
<Text style={{fontSize:20, color:'black'}}>
Specific road{"\n"}{props.date}
</Text>
<Button title="Back" onPress={props.setvisibility}/>
<>
<ScrollView>

{props.arra.map(img =>  <View>
  
  <Image source={{
          uri: img,
        }}
        style={{width: 400, height: 400}} /> 
     <Text style={{color:'black',fontSize:15, marginBottom:10}}>{props.textarra[i++]}</Text>
  </View>
  )}
</ScrollView>

</>
</Modal>
);
}

export default Imagemodal;
