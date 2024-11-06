// Importing Components and Hooks from react and react-native
import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

// Importing Offence Data with CJS Code, Offence Title and Legislation
import offenceData from "../data/offenceDataShort.json";

// Create context to share data across components
import { AppContext } from "../App";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const OffenceScreen = ({ navigation }) => {
  // Accessing shared state and set state functions from AppContext
  const { gravityscore, setGravityScore } = useContext(AppContext);

  // Local states for this view
  const [cjsOffenceCode, setCjsOffenceCode] = useState("");
  const [offenceTitle, setOffenceTitle] = useState("");
  const [legislation, setLegislation] = useState("");
  const [filteredOffences, setFilteredOffences] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // States to dynamically adjust input field height based on content size
  const [inputHeightCode, setInputHeightCode] = useState(height * 0.06);
  const [inputHeightTitle, setInputHeightTitle] = useState(height * 0.06);
  const [inputHeightLegislation, setInputHeightLegislation] = useState(
    height * 0.06,
  );

  // Handling keyboard visibility for adjusting component views. Keyboard was causing issues for the dropdown selection
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Filtering offences by CJS code and updating state accordingly
  const handleCjsCodeChange = (input) => {
    setCjsOffenceCode(input);
    if (input.length > 0) {
      const filtered = offenceData.filter((offence) =>
        offence["CJS Offence Code"]
          .toLowerCase()
          .startsWith(input.toLowerCase()),
      );
      setFilteredOffences(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredOffences([]);
      setOffenceTitle(""); // Clear Offence title
      setLegislation(""); // Clear legislation field
    }
  };

  // Filtering offences by title when user inputs offence title
  const handleOffenceTitleChange = (input) => {
    setOffenceTitle(input);
    if (input.length > 0) {
      const filtered = offenceData.filter((offence) =>
        offence["Offence Title"].toLowerCase().startsWith(input.toLowerCase()),
      );
      setFilteredOffences(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredOffences([]);
      setCjsOffenceCode(""); // Clear CJS code
      setLegislation(""); // Clear legislation field
    }
  };

  // Selecting values from suggestion
  const handleSelectOffence = (offence) => {
    setCjsOffenceCode(offence["CJS Offence Code"]);
    setOffenceTitle(offence["Offence Title"]);
    setLegislation(offence["Legislation"]);
    setTimeout(() => {
      setShowSuggestions(false);
      setFilteredOffences([]); // Clear the suggestions list on selection
    }, 100); // Add a slight delay
    Keyboard.dismiss();
  };

  // Navigation function to proceed to the next screen with input validation
  const nextPage = () => {
    if (cjsOffenceCode && offenceTitle) {
      // Update collected data if input is valid
      const updatedGravityScore = {
        ...gravityscore,
        cjs: cjsOffenceCode,
        offencetitle: offenceTitle,
        legislation: legislation,
      };
      setGravityScore(updatedGravityScore);
      navigation.navigate("Gravity Score"); //Navigate to next View
    } else {
      //Alert if the input is empty or invalid
      Alert.alert(
        "Invalid Input",
        "Please select a valid CJS Offence Code and Offence Title.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Fixing weird keyboard and dropdown behaviour */}
      <KeyboardAvoidingView
        style={styles.background}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* CJS Offence Code Input */}
            <TextInput
              style={[styles.input, { height: inputHeightCode }]}
              placeholder="CJS Offence Code*"
              placeholderTextColor="rgba(79, 79, 79, 0.5)"
              value={cjsOffenceCode}
              onChangeText={handleCjsCodeChange} //Searching for CJS Code
              multiline
              autoCorrect={false} // Disable autocorrect
              onContentSizeChange={(e) =>
                setInputHeightCode(
                  Math.max(height * 0.06, e.nativeEvent.contentSize.height), // Handles input size
                )
              }
              textAlignVertical="center"
              onFocus={() => setFocusedInput("cjsOffenceCode")}
            />
            {showSuggestions && focusedInput === "cjsOffenceCode" && (
              //Dropdown list
              <FlatList
                style={[
                  styles.suggestionsContainer,
                  { maxHeight: keyboardVisible ? height * 0.15 : height * 0.3 }, //Additional size adjustments
                ]}
                data={filteredOffences}
                keyExtractor={(item) => item["CJS Offence Code"]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectOffence(item)}
                  >
                    {" "}
                    {/*Filling input fields with selected offence*/}
                    <Text>{item["CJS Offence Code"]}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {/* Offence Title Input */}
            <TextInput
              style={[styles.input, { height: inputHeightTitle }]}
              placeholder="Offence Title*"
              placeholderTextColor="rgba(79, 79, 79, 0.5)"
              value={offenceTitle}
              onChangeText={handleOffenceTitleChange} //Searching for Offence Title
              multiline
              autoCorrect={false} // Disable autocorrect
              onContentSizeChange={(e) =>
                setInputHeightTitle(
                  Math.max(height * 0.06, e.nativeEvent.contentSize.height), // Handles input size
                )
              }
              textAlignVertical="center"
              onFocus={() => setFocusedInput("offenceTitle")}
            />
            {showSuggestions && focusedInput === "offenceTitle" && (
              <FlatList
                style={[
                  styles.suggestionsContainer,
                  { maxHeight: keyboardVisible ? height * 0.15 : height * 0.3 }, //Additional size adjustments
                ]}
                data={filteredOffences}
                keyExtractor={(item) => item["CJS Offence Code"]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectOffence(item)}
                  >
                    {" "}
                    {/*Filling input fields with selected offence*/}
                    <Text>{item["Offence Title"]}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {/* Legislation Field */}
            <TextInput
              style={[styles.input, { height: inputHeightLegislation }]}
              placeholder="Legislation*"
              placeholderTextColor="rgba(79, 79, 79, 0.5)"
              value={legislation}
              editable={false} //Make it non-editable as it has to be filled automatically
              multiline
              onContentSizeChange={(e) =>
                setInputHeightLegislation(
                  Math.max(height * 0.06, e.nativeEvent.contentSize.height), // Handles input size
                )
              }
              textAlignVertical="center"
            />
          </View>
        </ScrollView>

        {/* Button to proceed to the next page */}
        <TouchableOpacity style={styles.beginButton} onPress={nextPage}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "6%",
  },
  input: {
    minWidth: "95%",
    maxWidth: "95%",
    minHeight: height * 0.075,
    backgroundColor: "#fff",
    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: "6%",
    fontSize: 20,
    marginBottom: height * 0.02,
    textAlign: "left",
    textAlignVertical: "center",
    color: "#4F4F4F",
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    minWidth: "95%",
    maxWidth: "95%",
    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderBottomLeftRadius: Platform.select({
      ios: 25,
      android: 0,
    }),

    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderBottomRightRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: "4%",
    marginTop: height * -0.015,
    marginBottom: height * 0.03,
  },
  suggestionItem: {
    padding: height * 0.01,
  },
  beginButton: {
    //adjusting button positioning
    bottom: Platform.select({
      ios: height * 0.06,
      android: height * 0.01,
    }),
    width: "80%",
    backgroundColor: "#E73D2F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.08,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default OffenceScreen;
