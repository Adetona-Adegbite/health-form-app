import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddButton from "../components/AddButton";
import {
  useFonts,
  NanumGothic_400Regular,
} from "@expo-google-fonts/nanum-gothic";
import FormCard from "../components/FormCard";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [fontLoaded] = useFonts({ NanumGothic_400Regular });
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Example timeout, replace with your actual fetch logic
  }, []);
  const forms = [
    { id: 1, title: "Object 1" },
    { id: 2, title: "Object 2" },
    { id: 3, title: "Object 3" },
    { id: 4, title: "Object 4" },
    { id: 5, title: "Object 5" },
  ];
  return (
    <>
      {fontLoaded && (
        <SafeAreaView style={styles.page}>
          <View>
            <View style={styles.top}>
              <View style={styles.userInfo}>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: "bold", fontSize: 25, marginBottom: 10 },
                  ]}
                >
                  Welcome User
                </Text>
                <Text style={[styles.text]}>Make Assessments</Text>
              </View>
            </View>
            <View style={styles.hr} />
            <View style={styles.middle}>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 24 }]}>
                Your Forms
              </Text>
              <AddButton
                onPress={() => {
                  navigation.navigate("new-form");
                }}
              />
            </View>
            <ScrollView
              style={{ height: "30%", marginTop: 30 }}
              contentContainerStyle={{ alignItems: "center" }}
              refreshControl={
                <RefreshControl
                  tintColor="white"
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#fffffa", "#ffffff"]}
                />
              }
            >
              {forms.map((item) => {
                return (
                  <FormCard
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    // onPress={formDetailsHandler.bind(this, item)}
                  />
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#161616",
    paddingTop: Platform.OS == "android" && 30,
  },
  text: {
    fontFamily: "NanumGothic_400Regular",
    color: "white",
    textAlign: "center",
  },
  top: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  userInfo: {
    flex: 1,
    alignItems: "center",
  },
  dp: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
  },
  middle: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    alignItems: "center",
    gap: 30,
  },
  hr: {
    borderBottomColor: "#4E4E4E",
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "auto",
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
});
