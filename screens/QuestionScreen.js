// Importing Components and Hooks from react and react-native
import { useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

// Create context to share data across components
import { AppContext } from "../App";

// Define dimension for screen height
const { height } = Dimensions.get("window");

// Component for displaying individual questions and navigating to the next question or results screen
const QuestionScreen = ({ navigation, route }) => {
  // Retrieve answers, setAnswers function, and questions from global context
  const { answers, setAnswers, questions } = useContext(AppContext);
  const { questionId } = route.params; // Get current question ID from route parameters

  // Use memo for the current question based on questionId
  const question = useMemo(
    () => questions.find((q) => q.id === questionId),
    [questions, questionId],
  );

  // Function to save the answer and navigate to the next question or results screen
  const nextPage = (currentQuestionId, option) => {
    setAnswers({ ...answers, [currentQuestionId]: option }); // Save the selected answer in global state
    const nextQuestionId = currentQuestionId + 1;

    // Check if there's a next question; navigate accordingly
    if (questions.find((q) => q.id === nextQuestionId)) {
      navigation.push("Input", { questionId: nextQuestionId }); // Go to next question screen
    } else {
      navigation.navigate("Adjustments"); // Navigate to results/adjustments screen if last question
    }
  };

  return (
    <View style={styles.container}>
      <View key={question.id} style={styles.contentWrapper}>
        {/* Display the current question */}
        <Text style={styles.text}>{question.text}</Text>
        {/* Render options as buttons */}
        <View style={styles.buttonWrapper}>
          {question.options.map((option) => (
            <View key={option}>
              <TouchableOpacity
                style={[
                  styles.customButton,
                  {
                    backgroundColor:
                      answers[question.id] === option ? "#E73D2F" : "#fff", // Highlight selected answer
                  },
                ]}
                onPress={() => nextPage(question.id, option)}
              >
                {" "}
                {/* Select answer and navigate */}
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        answers[question.id] === option ? "#fff" : "#4F4F4F", // Change text color if selected
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
              {/* Space between answer options */}
              <View style={styles.buttonSpacing} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  contentWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: height * 0.05,
    width: "90%",
    lineHeight: 25,
    color: "#4F4F4F",
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  customButton: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "6%",
    height: height * 0.06,
  },

  buttonText: {
    color: "#E73D2F",
    fontSize: 20,
    textAlign: "center",
  },
  // Space between buttons
  buttonSpacing: {
    height: height * 0.05,
  },
});

export default QuestionScreen;
