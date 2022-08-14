import React, { useEffect, useState } from 'react';
import {Button, ActivityIndicator, StyleSheet,FlatList, Text, TextInput, View,TouchableOpacity} from 'react-native';
import Imagemodal from './Imagemodal';
export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, onChangeText] = useState();
  const [url, seturl]= useState();
  const [modal,setmodal]=useState(false);
  const [date,setdate]=useState();
  const [arra, setarra]=useState([]);
  const [textarra,settextarra]=useState([]);
  var filteredData;
  const gettraffic = async () => {
     try {//C01502
      const response = await fetch('https://tie.digitraffic.fi/api/v3/metadata/camera-stations');
      const json = await response.json();
      setData(json.features);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    gettraffic();
  }, []);

  const trafficsearch = async (id) => {
    try {
     const response = await fetch('https://tie.digitraffic.fi/api/v3/metadata/camera-stations');
     const json = await response.json();
     const data = json.features.filter((dataa) => {
 return dataa.properties.municipality.search(id) != -1;
  })
    
     setData(data);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

  const valueInputHandler=(enteredText)=>{
    onChangeText(enteredText)
   
    }
    const setvisibility=()=>{
      setmodal(!modal)
    }
const getpicture=(url,date)=>{
 setarra(url.map((item) => (item.imageUrl)))
 settextarra(url.map((item) => (item.presentationName)))
console.log(arra, "Arra")
  setdate(date);
  setmodal(!modal)
  

}

  
  return (
    <View style={{ flex: 1, padding: 24 }}>
   <Imagemodal textarra={textarra}date={date}modal={modal} arra={arra} setvisibility={setvisibility} />
   <Text style={{textAlign:'center', fontSize:20, color:'black'}}>
    Search inputbox
   </Text>
   <TextInput
        style={styles.input}
        onChangeText={valueInputHandler}
        value={text}
        placeholder={"Type city"}
      />
   <Button title="Filter" onPress={()=>trafficsearch(text)}/>
     
      {isLoading ? <ActivityIndicator/> : (
      <FlatList style ={styles.box}
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>getpicture(item.properties.presets,item.properties.names.fi)}>
        <Text style={styles.item}>{item.properties.municipality}/{item.properties.name}</Text>

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