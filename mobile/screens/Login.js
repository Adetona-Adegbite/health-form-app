import { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import AuthSubmitButton from "../components/AuthSubmitButton";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const handleLogin = async () => {
    // Perform login logic
    // Assuming you receive userId after successful login
    // const userId = 'user123'; // Replace this with the actual userId
    // await AsyncStorage.setItem('userId', userId);
    // navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <View style={styles.page}>
        <Text style={styles.header}>Enter Authorized Credentials</Text>
        <View style={styles.formItem}>
          <Text style={styles.formItemTitle}>Email</Text>
          <TextInput
            style={styles.formItemInput}
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
          />
          <Text style={{ color: "#ccc", alignSelf: "flex-end" }}>
            Forgot password?
          </Text>
        </View>

        <AuthSubmitButton
          onPress={() => {
            navigation.navigate("home");
          }}
        />
        {/* <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or with</Text>
          <View style={styles.line} />
        </View> */}
        {/* <View style={styles.ouath}>
          <OauthButton name="facebook" />
          <OauthButton name="google" />
          <OauthButton name="apple" />
        </View> */}
        {/* <Text style={{ color: "gray" }}>
          Don't have an Account?
          <Text style={{ color: "white" }}>Sign up</Text>
        </Text> */}
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
