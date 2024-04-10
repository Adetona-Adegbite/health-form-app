import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import HomePage from "./screens/Home";
import FormWithRadioButtons from "./screens/Form";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="auth"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="home"
          component={HomePage}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: false,
            headerStyle: {
              backgroundColor: "#425D4C",
            },
            headerTitle: "New Assessment",
            headerTintColor: "white",
          }}
          name="new-form"
          component={FormWithRadioButtons}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
