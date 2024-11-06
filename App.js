// Importing Components and Hooks from react and react-native
import React from "react";
import { createContext, useState } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Importing Screens for different App Views
import HomeScreen from "./screens/HomeScreen";
import PoliceForce from "./screens/PoliceForceScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ReportScreen from "./screens/ReportScreen";
import CriminalReferenceNumber from "./screens/CriminalReferenceScreen";
import Offence from "./screens/OffenceScreen";
import GravityScore from "./screens/GravityScore";
import FinalGravityScore from "./screens/FinalGravityScore";
import PersonalData from "./screens/PersonalData";
import Adjustments from "./screens/AdjustmentScreen";
import FinalInput from "./screens/FinalInputScreen";
import MitigatingFactors from "./screens/MitigatingFactors";
import AggrevatingFactors from "./screens/AggrevatingFactors";

// Importing Questions Data for the Yes and No Questions
import questionsData from "./data/questions.json";

// Create a stack navigator instance to manage screen transitions
const Stack = createStackNavigator();

// Define dimension for screen height
const { height } = Dimensions.get("window");

// Create context to share data across components
export const AppContext = createContext();

const App = () => {
  // State variables to hold data throughout the app
  const [questions, setQuestions] = useState(questionsData);
  const [answers, setAnswers] = useState({});
  const [personaldata, setPersonalData] = useState({});
  const [finalinput, setFinalInput] = useState({});
  const [gravityscore, setGravityScore] = useState({});

  return (
    // Providing the context to pass data and set state across components
    <AppContext.Provider
      value={{
        answers,
        setAnswers,
        questions,
        setQuestions,
        gravityscore,
        setGravityScore,
        personaldata,
        setPersonalData,
        finalinput,
        setFinalInput,
      }}
    >
      {/* Wrapping the app in a safe area provider to handle device-specific safe areas. 
      This is neccessary because of the some Android front cameras covering up the icon. */}
      <SafeAreaProvider style={{ backgroundColor: "#f2f2f2" }}>
        <MainApp />
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

const MainApp = () => {
  // Accessing device insets to respect safe areas in the layout
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, backgroundColor: "#f2f2f2", paddingTop: insets.top }}
    >
      {/* Displaying the app logo */}
      <Image style={styles.logo} source={require("./assets/icon.png")} />
      {/* Navigation container to manage screen navigation */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        >
          {/* Defining each screen in the stack navigator */}
          <Stack.Screen name="Start" component={HomeScreen} />
          <Stack.Screen name="Police Force" component={PoliceForce} />
          <Stack.Screen
            name="Criminal Reference Number"
            component={CriminalReferenceNumber}
          />
          <Stack.Screen name="Offence" component={Offence} />
          <Stack.Screen name="Gravity Score" component={GravityScore} />
          <Stack.Screen
            name="Final Gravity Score"
            component={FinalGravityScore}
          />
          <Stack.Screen
            name="Mitigating Factors"
            component={MitigatingFactors}
          />
          <Stack.Screen
            name="Aggrevating Factors"
            component={AggrevatingFactors}
          />
          <Stack.Screen name="Personal Data" component={PersonalData} />
          <Stack.Screen name="Adjustments" component={Adjustments} />
          <Stack.Screen
            name="Input"
            component={QuestionScreen}
            initialParams={{ questionId: 1 }}
          />
          <Stack.Screen name="Final Input" component={FinalInput} />
          <Stack.Screen name="Report" component={ReportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  logo: {
    height: height * 0.06,
    alignSelf: "center", // Centers the logo horizontally
    width: "auto", // Auto-width for maintaining aspect ratio
    aspectRatio: 1,
  },
});

export default App;
