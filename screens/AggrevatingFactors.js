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

const AggrevatingFactors = ({ navigation }) => {
  // State to dynamically adjust input field height based on content size
  const [inputHeight, setInputHeight] = useState();

  // Accessing shared state and set state functions from AppContext
  const { gravityscore, setGravityScore } = useContext(AppContext);

  // Local state to store the user's input for this view
  const [aggrevatingFactors, setAggrevatingFactors] = useState("");

  // Function to update aggrevating factors in global state context
  const setSelectedAggrevatingFactors = (value) => {
    const updatedsetAggrevatingFactors = {
      ...gravityscore,
      aggrevatingfactors: value,
    };
    setGravityScore(updatedsetAggrevatingFactors);
  };

  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    if (aggrevatingFactors !== "") {
      // Update collected data if input is valid
      setSelectedAggrevatingFactors(aggrevatingFactors);
      navigation.navigate("Final Gravity Score"); //Navigate to next View
    } else {
      //Alert if the input is empty or invalid
      Alert.alert(
        "Invalid Input",
        "Please enter Aggrevating Factors.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        {/* Scrollable input area to handle long text entries */}
        <ScrollView
          style={{ width: "80%", maxHeight: 0.2 * height }} // Limits scroll height so input button does not disappear
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={[styles.input, { height: inputHeight }]} // Sets dynamic height based on input content
            placeholderTextColor="#rgba(79, 79, 79, 0.5)"
            placeholder="Aggrevating Factors*"
            keyboardType="default"
            multiline // Allows multiline input
            onContentSizeChange={(e) =>
              setInputHeight(
                Math.min(0.2 * height, e.nativeEvent.contentSize.height), // Handles input size
              )
            }
            onChangeText={(value) => {
              setAggrevatingFactors(value); // Update local input state
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
  beginButton: {
    bottom: height * -0.15, //adjusting button positioning
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
    textAlign: "center",
  },
  input: {
    alignSelf: "center",
    minHeight: height * 0.065,
    width: "100%",
    backgroundColor: "#fff",
    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: "6%",
    ...Platform.select({
      ios: {
        paddingVertical: height * 0.02,
      },
      android: {
        paddingVertical: height * 0.02,
      },
    }),
    fontSize: 20,
    color: "#4F4F4F",
  },
});

export default AggrevatingFactors;
