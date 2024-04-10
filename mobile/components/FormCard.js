import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
// import ShowDetailsButton from "./DetailsButton";
// import * as Clipboard from "expo-clipboard";

export default function FormCard({ onPress, title, id }) {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{title}</Text>
        <Text style={styles.dataText}>{id}</Text>
      </View>
      {/* <ShowDetailsButton onPress={copyToClipboard} /> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#047104",
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataText: {
    color: "white",
    fontSize: 14,
  },
});
