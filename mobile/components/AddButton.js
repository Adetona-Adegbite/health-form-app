import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function AddButton({ onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}> New Assessment</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    overflow: "hidden",
    width: "60%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#04C104",
    borderRadius: 15,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#046404", // Change color when pressed
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});
