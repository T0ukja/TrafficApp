import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
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

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
        <Text>{item.roadStationId}{item.cameraPresets[0].presentationName}</Text>
         
      )}
    />
    
      )}
    </View>
  );
};