// Importing Components and Hooks
import React from 'react';
import { createContext, useState } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native'; // Add Text
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'; // New import

// Importing Screens into App Component
import HomeScreen from './screens/HomeScreen';
import PoliceForce from './screens/PoliceForceScreen';
import QuestionScreen from './screens/QuestionScreen';
import ReportScreen from './screens/ReportScreen';
import CriminalReferenceNumber from './screens/CriminalReferenceScreen';
import Offence from './screens/OffenceScreen';
import GravityScore from './screens/GravityScore';
import FinalGravityScore from './screens/FinalGravityScore';
import PersonalData from './screens/PersonalData';
import Adjustments from './screens/AdjustmentScreen';
import FinalInput from './screens/FinalInputScreen';
import MitigatingFactors from './screens/MitigatingFactors';
import AggrevatingFactors from './screens/AggrevatingFactors';

// Importing Questions Data for the Yes and No Questions
import questionsData from './data/questions.json';

// Navigator for the different Screens
const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');
export const AppContext = createContext();

const App = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [answers, setAnswers] = useState({});
  const [personaldata, setPersonalData] = useState({});
  const [finalinput, setFinalInput] = useState({});
  const [gravityscore, setGravityScore] = useState({});

  return (
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
      }}>
      <SafeAreaProvider style={{backgroundColor: '#f2f2f2'}}>
        <MainApp />
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

const MainApp = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, backgroundColor: '#f2f2f2', paddingTop: insets.top }}>
      <Image style={styles.logo} source={require('./assets/icon.png')} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}>
        
         
  <Stack.Screen name="Start" component={HomeScreen} />
  <Stack.Screen name="Police Force" component={PoliceForce} />

  <Stack.Screen name="Criminal Reference Number" component={CriminalReferenceNumber} />

  <Stack.Screen name="Offence" component={Offence} />


  <Stack.Screen name="Gravity Score" component={GravityScore} />

  <Stack.Screen name="Final Gravity Score" component={FinalGravityScore} />

  <Stack.Screen name="Mitigating Factors" component={ MitigatingFactors } />

    <Stack.Screen name="Aggrevating Factors" component={AggrevatingFactors} />




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

const styles = StyleSheet.create({
  logo: {
    height: height * 0.06,
    alignSelf: 'center',
    width: 'auto',
    aspectRatio: 1,
  },
});

export default App;
