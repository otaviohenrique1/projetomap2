import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Pin from "../components/Pin";

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

export default function Mapa3() {
  const [regionData, setRegionData] = useState({
    latitude: -15.8080347,
    longitude: -47.8750231,
    ...delta,
  });

  // const [texto, setTexto] = useState("");
  const [markers, setMarkers] = useState([
    {
      key: 0,
      image: require("../../assets/images/carro.png"),
      coords: { latitude: -15.8080374, longitude: -47.8750231 },
      pinColor: "red",
      aviso: "Perigoso",
    },
    {
      key: 1,
      image: require("../../assets/images/carro_down.png"),
      coords: { latitude: -15.8380374, longitude: -47.8850231 },
      pinColor: "green",
      aviso: "Tranquilo",
    },
    {
      key: 2,
      image: require("../../assets/images/carro_left.png"),
      coords: { latitude: -15.8480374, longitude: -47.8950231 },
      pinColor: "red",
      aviso: "Perigoso",
    },
  ]);

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
        // onPress={(e) => {
        //   Alert.alert(
        //     "Clicou",
        //     `
        //       Latitule: ${e.nativeEvent.coordinate.latitude}
        //       Longitude: ${e.nativeEvent.coordinate.longitude}
        //     `
        //   );
        // }} // Quando o mapa for clicado
        // mapType='standard' // Tipo do mapa exibido
        // scrollEnabled={false} // Ativa ou desativa o movimento do mapa
        // zoomEnabled={false} // Ativa ou desativa o zoom do mapa
        // rotateEnabled={false}  // Ativa ou desativa a retacao do mapa
        // showsTraffic={true} // Mostra o trafego
        onPress={(e) => {
          setMarkers([...markers, {
            key: markers.length,
            coords: {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            },
            pinColor: "#FF0000",
            // image: require("./assets/images/carro.png"),
          }])
        }}
      >
        {/* <Marker
          coordinate={{
            latitude: regionData.latitude,
            longitude: regionData.longitude,
          }}
          title='Meu carro'
          description='Gol 1.6 - Placa OHL 2010'
          pinColor={"#00FF00"}
        /> */}
        {markers.map((marker) => {
          return (
            // <Marker
            //   key={marker.key}
            //   coordinate={marker.coords}
            //   title='Meu carro'
            //   description='Gol 1.6 - Placa OHL 2010'
            //   pinColor={marker.pinColor}
            //   // image={marker.image}
            // />
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              // title='Meu carro'
              // description='Gol 1.6 - Placa OHL 2010'
              // pinColor={marker.pinColor}
              // image={marker.image}
            >
              {/* <View style={[styles.viewMarker, {
                backgroundColor: marker.pinColor,
              }]}>
                <Text style={styles.textoMarker}>
                  {marker.aviso}
                </Text>
              </View> */}
              <Pin
                aviso={marker.aviso}
                corFundo={marker.pinColor}
              />
            </Marker>
          );
        })}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

/*
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
*/

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
  viewMarker: {
    height: 30,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textoMarker: {
    color: "#FFFFFF",
  },
});
