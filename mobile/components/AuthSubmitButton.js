import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AuthSubmitButton({ onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Next
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 60,
    backgroundColor: "#04c104",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
