import { StyleSheet, Text, View } from "react-native";

export default function Pin({aviso, corFundo}) {
  return (
    <View style={[pinStyle.viewMarker, {
      backgroundColor: corFundo,
    }]}>
      <Text style={pinStyle.textoMarker}>
        {aviso}
      </Text>
    </View>
  );
}

const pinStyle = StyleSheet.create({
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
