import { ProgressViewIOSComponent } from "react-native";
import React from "react";
import { Modal,Text,Button,Image} from "react-native";

const Imagemodal=(props)=>{
return(
<Modal visible={props.modal}>
<Text>
    Moro{props.url}
</Text>
<Button title="Back" onPress={props.setvisibility}/>
<Image
        
        source={{
          uri: props.url,
        }}
        style={{width: 400, height: 400}} />
</Modal>
);
}

export default Imagemodal;