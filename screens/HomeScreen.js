// Importing Components and Hooks from react and react-native
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    navigation.navigate("Police Force");
  };

  // Navigation function for the reporting system
  const reportProblem = () => {
    navigation.navigate("Report");
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        {/* Title of the app */}
        <Text style={styles.title}>Advent Diversion {"\n"} Manager</Text>

        {/* Button to proceed to the next page */}
        <TouchableOpacity style={styles.beginButton} onPress={nextPage}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>

        {/* Button to report a problem */}
        <TouchableOpacity style={styles.reportButton} onPress={reportProblem}>
          <Text style={styles.report}>Report a Problem</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  beginButton: {
    height: height * 0.08,
    marginBottom: height * 0.03, //adjusting button margin
    width: "80%",
    backgroundColor: "#E73D2F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  reportButton: {
    height: height * 0.08,
    marginBottom: height * 0.03, //adjusting button margin
    width: "80%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  report: {
    color: "#E73D2F",
    fontSize: 20,
    borderRadius: 25,
  },
  title: {
    bottom: "40%",
    width: "80%",
    height: "15%",
    borderRadius: 10,
    fontSize: 30,
    color: "#4F4F4F",
    marginBottom: height * 0.05,
    textAlign: "center",
  },
});

export default HomeScreen;
