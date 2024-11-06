// Importing Components and Hooks from react and react-native
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Platform,
  Linking,
} from "react-native";

// Importing global context from App component to access shared state
import { AppContext } from "../App";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const FinalGravityScore = ({ navigation }) => {
  // Accessing shared state and set state functions from AppContext
  const { gravityscore, setGravityScore } = useContext(AppContext);

  // Local state to store the user's input for this view
  const [inputValue, setInputValue] = useState("");

  // Function to update collected data in global state context
  const setSelectedGravityScore = (value) => {
    const updatedGravityScore = { ...gravityscore, finalgravityscore: value };
    setGravityScore(updatedGravityScore);
  };

  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    if (inputValue.trim() >= 1 && inputValue.trim() <= 4) {
      // Update collected data if input is valid
      setSelectedGravityScore(inputValue);
      navigation.navigate("Personal Data"); //Navigate to next View
    } else {
      Alert.alert(
        //Alert if the input is empty or invalid
        "Invalid Input",
        "Please enter a valid Gravity Score.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  // URL for the gravity matrix PDF
  const pdfUrl =
    "https://npcc.police.uk/2019%20FOI/Counter%20Terrorism/061%2019%20Gravity%20Matrix.pdf"; // Replace with your PDF URL

  // Function to open the PDF link in the browser
  const openPdf = async () => {
    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(pdfUrl);
    if (supported) {
      // Open the PDF URL
      await Linking.openURL(pdfUrl);
    } else {
      Alert.alert("Error", "Unable to open the PDF link."); // Show alert if the link cannot be opened
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        {/* Input for Gravity Score */}
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(79, 79, 79, 0.5)"
          placeholder="Final Gravity Score*"
          keyboardType="numeric" // Numeric input for score
          value={inputValue}
          onChangeText={(value) => {
            setInputValue(value); // Update local input state
            setSelectedGravityScore(value); // Immediately update gravity score
          }}
          maxLength={99} // Limit input length to 99 characters
        />

        {/* Conditional message based on the input value */}
        {inputValue !== "" && (
          <Text style={styles.resultText}>
            {parseFloat(inputValue) <= 3 && parseFloat(inputValue) >= 1
              ? "Suitable for Diversion"
              : ""}
            {parseFloat(inputValue) === 4 ? "Refer to CPS" : ""}
          </Text>
        )}

        {/* Button to open the Gravity Matrix PDF */}
        <TouchableOpacity style={styles.beginButton2} onPress={openPdf}>
          <Text style={styles.text}>Gravity Matrix(Adult)</Text>
        </TouchableOpacity>

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
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  beginButton: {
    bottom: height * -0.22, //adjusting button positioning
    height: height * 0.08,
    marginBottom: height * 0.03, //adjusting button margin
    width: "80%",
    backgroundColor: "#E73D2F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  beginButton2: {
    bottom: height * -0.22, //adjusting button positioning
    height: height * 0.08,
    marginBottom: height * 0.03, //adjusting button margin
    width: "80%",
    backgroundColor: "#5FBEBF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "white",
    fontSize: 20,
    borderRadius: 25,
  },

  resultText: {
    fontSize: 25,
    color: "#4F4F4F",
  },

  input: {
    alignSelf: "center",
    height: height * 0.07,
    backgroundColor: "#fff",

    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: "6%",
    fontSize: 20,
    color: "#4F4F4F",
    textAlign: "left",
    bottom: height * 0.065,
    width: "80%",
  },
  pdf: {
    flex: 1,
    width: width * 0.9,
    height: height * 0.5,
    marginTop: height * 0.03,
  },
});

export default FinalGravityScore;
