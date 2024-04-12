import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const questionsData = [
  { id: 1, title: "What is the approved name of this network?" },
  {
    id: 2,
    title:
      "Does this network have a profile showing the list of facilities, type and ownership?​",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 3,
    title: "Which facility is the hub for the netork?",
  },
  {
    id: 4,
    title: "Are all facilities within the network NHIA credentialed?",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 5,
    title: "Is there a prescriber at the Hub? (Doctor, PA, NP)?",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 6,
    title: "List the number of staff working in this network.",
  },
  {
    id: 7,
    title: "What is the cadre of staff working in this network. ",
  },
  {
    id: 8,
    title: "Does the hub of the network have a bank account?",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },

  {
    id: 9,
    title: "How many communities are within this network?​",
  },
  {
    id: 10,
    title: "What is the total population served by this network?​",
  },
  {
    id: 11,
    title: "Is the facility HeFRA Accredited?​",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
      { value: 1, label: "Yes, being processed" },
    ],
  },
  {
    id: 12,
    title: "Is the facility NHIA Credentialed?​",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 13,
    title: "Is there a staff on call 24 hours ​",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 14,
    title: "Does the facility conduct Outreach services?",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 15,
    title:
      "Does the facility have an emergency tray with appropriate equipment and items for general emergency ward?",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  {
    id: 16,
    title:
      "Does the facility have Refrigerator/Cold box/Vaccine carrier for storing oxytocin",
    options: [
      { value: 2, label: "Yes" },
      { value: 1, label: "No" },
    ],
  },
  // {
  //   id: 16,
  //   title:
  //     "Does the facility have Refrigerator/Cold box/Vaccine carrier for storing oxytocin",
  //   options: [
  //     { value: 2, label: "Yes" },
  //     { value: 1, label: "No" },
  //   ],
  // },
  // {
  //   id: 17,
  //   title: "Do you exercise regularly?",
  //   options: [
  //     { value: 1, label: "Yes" },
  //     { value: 2, label: "No" },
  //   ],
  // },
  // {
  //   id: 18,
  //   title: "Have you attended a concert before?",
  //   options: [
  //     { value: 1, label: "Yes" },
  //     { value: 2, label: "No" },
  //   ],
  // },
  // {
  //   id: 19,
  //   title: "Do you like to dance?",
  //   options: [
  //     { value: 1, label: "Yes" },
  //     { value: 2, label: "No" },
  //   ],
  // },
  // {
  //   id: 20,
  //   title: "Have you ever gone fishing?",
  //   options: [
  //     { value: 1, label: "Yes" },
  //     { value: 2, label: "No" },
  //   ],
  // },
];

const FormWithNumberedQuestions = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("user-id");
      console.log(userId);
      setUserId(userId);
    };

    getUserId();
  }, []);

  const [answers, setAnswers] = useState(
    Array.from({ length: 16 }, () => ({
      title: "",
      response: { option: "", value: "" },
    }))
  );

  const handleOptionChange = (option, questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      title: questionsData[questionIndex].title,
      response: { option: option.label, value: option.value },
    };
    setAnswers(newAnswers);
  };

  const handleInputChange = (text, questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      title: questionsData[questionIndex].title,
      response: { option: text, value: 0 },
    };
    setAnswers(newAnswers);
  };
  const validateForm = () => {
    for (const answer of answers) {
      if (!answer.response.option && !answer.response.value) {
        // console.log(answer);
        return false;
      }
    }
    //  setFormError("");
    return true;
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      // console.log("Submitted Answers:", answers);
      // const score = answers.filter(
      //   (qResponse) => qResponse.response.value === 1
      // );

      const score = answers.reduce(
        (acc, cur) => acc + parseInt(cur.response.value),
        0
      );
      const maxScore = 20; // Maximum possible score

      const percentage = (score / maxScore) * 100;

      let level;
      if (percentage >= 80) {
        level = "Level 5";
      } else if (percentage >= 60) {
        level = "Level 4";
      } else if (percentage >= 40) {
        level = "Level 3";
      } else if (percentage >= 20) {
        level = "Level 2";
      } else {
        level = "Level 1";
      }
      // console.log("level", level);

      try {
        setLoading(true);

        const data = {
          userId: userId,
          title: answers[0].response.option,
          formData: JSON.stringify(answers),
          score: score,
          percentage: percentage,
          level: level,
        };
        console.log("data", data);

        const response = await fetch("http://172.20.10.2:1234/submit-form/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (!response.ok) {
          Alert.alert(responseData.message);
          console.log(responseData.message);
          return;
        }
        navigation.navigate("home");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
      console.log(score);
    } else {
      Alert.alert("No field can be left empty");
    }
    // console.log(answers);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#80B192" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.questionsContainer}>
          {questionsData.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text
                style={styles.questionTitle}
              >{`${question.id}. ${question.title}`}</Text>
              {question.options ? (
                <View style={styles.optionsContainer}>
                  {question.options.map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      style={[
                        styles.optionButton,
                        answers[index]?.response.option === option.label &&
                          styles.selectedOptionButton,
                      ]}
                      onPress={() => handleOptionChange(option, index)}
                    >
                      <Text>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder="Type your answer here"
                  value={answers[index]?.response.option}
                  onChangeText={(text) => handleInputChange(text, index)}
                />
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFormSubmit}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginTop: 30,
  },
  questionsContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#859982",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    paddingVertical: 20,
  },
  questionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 30,
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "white",
  },
  optionsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  selectedOptionButton: {
    backgroundColor: "#04C104",
  },
  optionButtonText: {
    color: "black",
  },
  selectedOptionButtonText: {
    color: "white",
  },
  submitButton: {
    backgroundColor: "#04C104",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
    width: "60%",
    textAlign: "center",
    height: 40,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FormWithNumberedQuestions;
