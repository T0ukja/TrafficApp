import React from "react";
import { useState,useEffect} from "react";
import {TouchableOpacity,ActivityIndicator, StyleSheet, Text,View,Modal,Button,FlatList} from "react-native";

import Accordion from 'react-native-collapsible/Accordion';


const Messagemodal =(props)=>{

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [activeSections, setActiveSections] = useState([]);


    const gettrafficmessages = async () => {
        try {//C01502
         const response = await fetch('https://tie.digitraffic.fi/api/traffic-message/v1/messages');
         const json = await response.json();
         setData(json.features);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }

     useEffect(()=>{
gettrafficmessages();
     },[]);
    
  
    const _renderHeader = (section) => {
      return (
        <View style={styles.header}>
          <Text style={styles.item}>{section.properties.announcements[0].title}</Text>
        </View>
      );
    };
  
    const _renderContent = (section) => {
      return (
        <View style={styles.content}>
          <Text style = {{fontSize: 18,color:'black',textAlign:'center'}}>{section.properties.announcements[0].location.description} {"\n"} {section.properties.announcements[0].features[0].name}</Text>
        </View>
      );
    };
  
    const _updateSections = (activeSections) => {
      setActiveSections(activeSections);
    };
    return(
        <Modal visible={props.messagevis}>
   <View>
    <Button title="Back" onPress={props.setmessagevis}/>
    
            

                 {isLoading ? <ActivityIndicator/> : (
        <Accordion
        sections={data}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />

      )}
        </View>
        </Modal>
     
    );

}

const styles = StyleSheet.create({
  
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'black'
  },
  box:{
  borderWidth:2,
  },
  item:{
    color: 'black',
    borderWidth:2,
    fontSize:15,
    margin:5,
    textAlign:'center',
    backgroundColor:'lightblue'
  }
  
  });
export default Messagemodal;


/*

   
*/

/*
<Modal visible={props.messagevis}>



        </Modal>  
/*
import React from "react";
import { useState,useEffect} from "react";
import {TouchableOpacity,ActivityIndicator, StyleSheet, Text,View,Modal,Button,FlatList} from "react-native";




const Messagemodal =(props)=>{

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
const activeSections = [];

    const gettrafficmessages = async () => {
        try {//C01502
         const response = await fetch('https://tie.digitraffic.fi/api/traffic-message/v1/messages');
         const json = await response.json();
         setData(json.features);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }

     useEffect(()=>{
gettrafficmessages();
     },[]);

    return(
        <Modal visible={props.messagevis}>
   <View>
    <Button title="Back" onPress={props.setmessagevis}/>
    
            

                 {isLoading ? <ActivityIndicator/> : (
      <FlatList style ={styles.box}
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>console.log("Moro")}>
        <Text style={styles.item}>{item.properties.announcements[0].title}</Text>

        </TouchableOpacity>
         
      )}
    />

      )}
        </View>
        </Modal>
     
    );

}

const styles = StyleSheet.create({
  
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'black'
  },
  box:{
  borderWidth:2,
  },
  item:{
    color: 'black',
    borderWidth:2,
    fontSize:15,
    margin:5,
    textAlign:'center',
    backgroundColor:'lightblue'
  }
  
  });
export default Messagemodal;


/*

   
*/

/*
<Modal visible={props.messagevis}>



        </Modal>  
*/
