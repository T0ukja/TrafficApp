import React, { useEffect, useState } from 'react';
import {Button, ActivityIndicator, StyleSheet,FlatList, Text, TextInput, View,TouchableOpacity} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Imagemodal from './Imagemodal';
export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, onChangeText] = useState();
  const [url, seturl]= useState();
  const [modal,setmodal]=useState(false);
  var filteredData;
  const getMovies = async () => {
     try {//C01502
      const response = await fetch('https://tie.digitraffic.fi/api/v1/data/camera-data/');
      const json = await response.json();
      setData(json.cameraStations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);


  const valueInputHandler=(enteredText)=>{
    onChangeText(enteredText)
    // filteredData = data.cameraPresets.filter(asd => asd.presentationName == "Oulu") 
// console.log(filteredData)
//console.log(data.filter(d=>d.cameraPresets.id.includes("C")))
/*const filtered = data.filter((a)=>{
  return a.presentationName === "Porvoo"})*/
 // const pizzerie = data.filter( (item) => {
 //   return item.cameraPresets.presentationName === "Porvoo"
    
 // })
/*
 var dataa = data.filter((item) => {
  var arvo = item.cameraPresets[0].presentationName
    return arvo.includes('P')
     
        
})
*/
//var dataa = data.filter(item => item.cameraPresets[id].presentationName === "Porvoo");


/*

 var dataa = data.filter(function(item){
  return item.id == "C01502";         
})
*/

//  console.log(pizzerie)
///console.log(data.map((camera) => camera.cameraPresets.presentationName == "Porvoo"))
//setData(data.filter(d=>d.cameraPresets.presentationName == "Oulu"))
    }
    const setvisibility=()=>{
      setmodal(!modal)
    }
const getpicture=(props)=>{
  seturl(props);
  setmodal(!modal)
}

    const getinformation=()=>{
      const dataa = data.filter(obj => obj.cameraPresets.find(o => o.presentationName == text
        ));
        console.log(text)
         console.log(dataa);
         setData(dataa)
    }
  return (
    <View style={{ flex: 1, padding: 24 }}>
   <Imagemodal modal={modal} url={url} setvisibility={setvisibility} />
   <TextInput
        style={styles.input}
        onChangeText={valueInputHandler}
        value={text}
      />
      <Button title="Button" onPress={getinformation} />
   
     
      {isLoading ? <ActivityIndicator/> : (
      <FlatList style ={styles.box}
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>getpicture(item.cameraPresets[0].imageUrl)}>
        <Text style={styles.item}>{item.roadStationId}/{item.cameraPresets[0].presentationName}</Text>

        </TouchableOpacity>
         
      )}
    />

      )}
    </View>
  );

};
const styles = StyleSheet.create({
  
  input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
},
box:{
borderWidth:2,
},
item:{
  borderWidth:2,
  fontSize:15,
  margin:5,
  textAlign:'center',
  backgroundColor:'lightblue'
}

});