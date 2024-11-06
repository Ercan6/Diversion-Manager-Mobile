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
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";

// Importing global context from App component to access shared state
import { AppContext } from "../App";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const Adjustments = ({ navigation }) => {
  // State to dynamically adjust input field height based on content size
  const [inputHeight, setInputHeight] = useState();

  // Accessing shared state and set state functions from AppContext
  const { finalinput, setFinalInput } = useContext(AppContext);

  // Local state to store the user's input for this view
  const [adjustmentsInput, setAdjustmentsInput] = useState("");

  // Function to update adjustments in global state context
  const setSelectedAdjustments = (value) => {
    const updatedAdjustments = { ...finalinput, adjustments: value };
    setFinalInput(updatedAdjustments);
  };

  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    if (adjustmentsInput.trim() !== "") {
      // Update adjustments if input is valid
      setSelectedAdjustments(adjustmentsInput);
      navigation.navigate("Final Input"); //Navigate to next View
    } else {
      //Alert if the input is empty or invalid
      Alert.alert(
        "Invalid Input",
        "Please answer the Question.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        {/* Prompt text for this views input*/}
        <Text style={styles.text2}>
          Does the client need any adjustment to successfully complete the
          intervention?
        </Text>

        {/* Scrollable input area to handle long text entries */}
        <ScrollView
          style={{ width: "80%", maxHeight: 0.2 * height }} // Limits scroll height so input button does not disappear.
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={[
              styles.input,
              { height: inputHeight }, // Sets dynamic height based on input content
            ]}
            placeholderTextColor="rgba(79, 79, 79, 0.5)"
            placeholder="Please enter"
            keyboardType="default"
            autoCorrect={Platform.OS === "ios" ? false : undefined} // deactivating auto correct on ios but not on android as it was causing issues on the latter one
            multiline // Allows multiline input
            onContentSizeChange={(e) =>
              setInputHeight(
                Math.min(0.2 * height, e.nativeEvent.contentSize.height), // Handles input size
              )
            }
            onChangeText={(value) => {
              setFinalInput(value); // Update global state with the input
              setAdjustmentsInput(value); // Update local input state
            }}
          />
        </ScrollView>

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
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  beginButton: {
    bottom: height * -0.12, //adjusting button positioning
    height: height * 0.08,
    marginBottom: height * 0.03, //adjusting button margin
    width: "80%",
    backgroundColor: "#E73D2F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    top: height * 0.001,
    alignSelf: "center",
    color: "#4F4F4F",
    fontSize: 20,
    borderRadius: 25,
    textAlign: "center",
    width: "90%",
    marginBottom: height * 0.03,
    lineHeight: 25,
  },
  input: {
    minHeight: height * 0.05,
    width: "100%",
    backgroundColor: "#fff",
    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: "6%",

    //Vertical Padding was making the Placeholder text unreadable on iOS
    ...Platform.select({
      ios: {},
      android: {
        paddingVertical: height * 0.02,
      },
    }),
    fontSize: 20,
    color: "#4F4F4F",
    maxHeight: 0.2 * height,
  },
});

export default Adjustments;
