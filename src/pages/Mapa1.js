import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import MapView from "react-native-maps";

/*
SP: 
  latitude: -23.5492243,
  longitude: -46.5813785,
DF:
  latitude: -15.8080347,
  longitude: -47.8750231,
CG:
  latitude: -20.4695225,
  longitude: -54.6016767,
*/

export default function Mapa1() {
  const [regionData, setRegionData] = useState({
    latitude: -15.8080347,
    longitude: -47.8750231,
    ...delta,
  });

  const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row" }}
      >
        <Button
          title="Brasilia"
          onPress={() => {
            setRegionData({
              latitude: -15.8080347,
              longitude: -47.8750231,
              ...delta,
            });
          }}
        />
        <Button
          title="São Paulo"
          onPress={() => {
            setRegionData({
              latitude: -23.5492243,
              longitude: -46.5813785,
              ...delta,
            });
          }}
        />
      </View>
      <Text>{regionData.latitude} | {regionData.longitude}</Text>
      {/* <Text>{texto}</Text> */}
      <MapView
        style={styles.mapa}
        // initialRegion={{
        //   latitude: -23.5492243,
        //   longitude: -46.5813785,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        region={regionData}
        // onMapReady={() => {Alert.alert("MApa Totalmente Carregado")}} // Ativa quando o mapa for iniciado
        onRegionChangeComplete={(region) => {
          setRegionData({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          });
          // setTexto(regionData.latitude);
        }} // Ativa quando o mapa terminar de ser movido
        onPress={(e) => {
          Alert.alert(
            "Clicou",
            `
        Latitule: ${e.nativeEvent.coordinate.latitude}
        Longitude: ${e.nativeEvent.coordinate.longitude}
      `
          );
        }} // Quando o mapa for clicado
        mapType='standard' // Tipo do mapa exibido
        scrollEnabled={false} // Ativa ou desativa o movimento do mapa
        zoomEnabled={false} // Ativa ou desativa o zoom do mapa
      // rotateEnabled={false}  // Ativa ou desativa a retacao do mapa
      // showsTraffic={true} // Mostra o trafego
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapa: {
    width: "100%",
    height: 550,
  },
});
