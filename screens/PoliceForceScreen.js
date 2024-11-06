// Importing Components and Hooks from react and react-native
import { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Platform,
} from "react-native";

// Importing Components for native select
import RNPickerSelect from "react-native-picker-select";

// Importing Police Forces Data
import policeForces from "../data/policeForces.json";

// Create context to share data across components
import { AppContext } from "../App";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const PoliceForce = ({ navigation }) => {
  // Accessing shared state and set state functions from AppContext
  const { gravityscore, setGravityScore } = useContext(AppContext);

  // Local states for this view
  const [selectedPoliceForce, setSelectedPoliceForce] = useState("");

  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    // Update collected data if input is valid
    if (selectedPoliceForce) {
      const updatedGravityScore = {
        ...gravityscore,
        policeforce: selectedPoliceForce,
      };
      setGravityScore(updatedGravityScore);
      navigation.navigate("Criminal Reference Number"); //Navigate to next View
    } else {
      //Alert if the input is empty or invalid
      Alert.alert(
        "Invalid Input",
        "Please select a Police Force.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <View style={styles.dropdownContainer}>
          {/* Dropdown for selecting Police Force */}
          <RNPickerSelect
            onValueChange={(value) => setSelectedPoliceForce(value)}
            items={policeForces.map((force) => ({
              label: force,
              value: force,
            }))}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            placeholder={{
              label: "Police Force*",
              value: null,
              color: "#4F4F4F",
            }}
          />
        </View>

        {/* Button to proceed to the next page */}
        <TouchableOpacity style={styles.beginButton} onPress={nextPage}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: "80%",
    marginBottom: height * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  beginButton: {
    bottom: height * -0.215, //adjusting button positioning
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
    borderRadius: 25,
  },
  input: {
    alignSelf: "center",
    // Adjusting Elements to have same dimensions
    width: Platform.select({
      ios: "100%",
      android: "90%",
    }),
    height: height * 0.065,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: "6%",
    // Adjusting Elements to have same dimensions
    fontSize: Platform.select({
      ios: 20,
      android: 21,
    }),
    color: "#4F4F4F",
    // Adjusting Elements to have same dimensions

    transform: Platform.select({
      ios: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
      android: [{ scaleX: 1.17 }, { scaleY: 1.17 }],
    }),
  },
});

export default PoliceForce;
