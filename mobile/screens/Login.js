import { useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import AuthSubmitButton from "../components/AuthSubmitButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://172.20.10.2:1234/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setError(responseData.message);
        setPassword("");
        return;
      }
      await AsyncStorage.setItem(
        "user-id",
        JSON.stringify(responseData.user.user_id)
      );
      navigation.navigate("home");
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <View style={styles.page}>
        <Text style={styles.header}>Enter Authorized Credentials</Text>
        <View style={styles.formItem}>
          <Text style={styles.formItemTitle}>Email</Text>
          <TextInput
            style={styles.formItemInput}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            placeholderTextColor="gray"
          />
        </View>
        <View style={[styles.formItem, { marginBottom: 40 }]}>
          <Text style={styles.formItemTitle}>Create a password</Text>
          <TextInput
            style={styles.formItemInput}
            placeholder="password"
            keyboardType="visible-password"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Text style={{ color: "red", alignSelf: "flex-end" }}>
            {error ? error : ""}
          </Text>
        </View>

        <AuthSubmitButton
          text={loading ? "Loading..." : "Next"}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: 25,
    alignItems: "center", // Center horizontally
  },
  header: {
    fontSize: 26,
    color: "white",
    marginBottom: 35,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  formItem: {
    marginBottom: 10,
    height: "13%",
    gap: 5,
    width: "100%", // Ensure items take full width
  },
  formItemTitle: {
    color: "#ccc",
    fontSize: 14,
  },
  formItemInput: {
    borderBottomWidth: 1, // Add a border only at the bottom
    borderColor: "white", // Border color
    paddingVertical: 16, // Optional: Add padding vertically for better layout
    fontSize: 16,
    paddingLeft: 10,
    color: "white", // Text color
    width: "100%", // Ensure input takes full width
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  orText: {
    color: "#ccc",
    fontSize: 14,
  },
  ouath: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 35,
  },
});
