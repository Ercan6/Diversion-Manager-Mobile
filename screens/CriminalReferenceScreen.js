// Importing Components and Hooks from react and react-native
import { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  Dimensions,
} from "react-native";

// Importing global context from App component to access shared state
import { AppContext } from "../App";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const CriminalReferenceNumber = ({ navigation }) => {
  // Accessing shared state and set state functions from AppContext
  const { gravityscore, setGravityScore } = useContext(AppContext);

  // Local state to store the user's input for this view
  const [criminalReference, setCriminalReference] = useState("");

  // Function to update collected data in global state context
  const setSelectedGravityScore = (value) => {
    const updatedGravityScore = {
      ...gravityscore,
      criminalreferencenumber: value,
    };
    setGravityScore(updatedGravityScore);
  };

  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    if (criminalReference.trim() !== "") {
      // Update collected if input is valid
      setSelectedGravityScore(criminalReference);
      navigation.navigate("Offence"); //Navigate to next View
    } else {
      //Alert if the input is empty or invalid
      Alert.alert(
        "Invalid Input",
        "Please enter a Criminal Reference Number.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        {/* Input for Criminal Reference Number */}
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(79, 79, 79, 0.5)"
          autoCorrect={Platform.OS === "ios" ? false : undefined} // deactivating auto correct on ios but not on android as it was causing issues on the latter one
          placeholder="Criminal Reference Number*"
          keyboardType="default"
          onChangeText={(value) => {
            setCriminalReference(value); // Update local input state
            setSelectedGravityScore(value); // Immediately update gravity score
          }}
          maxLength={99} // Limit input length to 99 characters
        />
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
  beginButton: {
    bottom: height * -0.228, //adjusting button positioning
    height: height * 0.08,
    marginBottom: height * 0.035, //adjusting button margin
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
  input: {
    alignSelf: "center",
    // Adjusting height of input to look consistent
    height: Platform.select({
      ios: height * 0.065,
      android: height * 0.08,
    }),
    backgroundColor: "#fff",

    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: "5%",
    fontSize: 20,
    color: "#4F4F4F",
    textAlign: "left",
    bottom: height * 0.015,
    width: "80%",
  },
});

export default CriminalReferenceNumber;
