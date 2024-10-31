import React, { useContext, useState } from 'react';
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
  Linking
} from 'react-native';
import { AppContext } from '../App';


const { width, height } = Dimensions.get('window');

const FinalGravityScore = ({ navigation }) => {
  const { gravityscore, setGravityScore } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');


  const setSelectedGravityScore = (value) => {
    const updatedGravityScore = { ...gravityscore, finalgravityscore: value };
    setGravityScore(updatedGravityScore);
  };

  const nextPage = () => {
    if (inputValue.trim() >= 1 && inputValue.trim() <= 4) {
      setSelectedGravityScore(inputValue);
      navigation.navigate('Personal Data');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid Gravity Score.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  const pdfUrl = 'https://npcc.police.uk/2019%20FOI/Counter%20Terrorism/061%2019%20Gravity%20Matrix.pdf'; // Replace with your PDF URL

  const openPdf = async () => {
    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(pdfUrl);
    if (supported) {
      // Open the PDF URL
      await Linking.openURL(pdfUrl);
    } else {
      Alert.alert('Error', 'Unable to open the PDF link.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(79, 79, 79, 0.5)"
          placeholder="Final Gravity Score*"
          keyboardType="numeric" // Ensuring numeric input
          value={inputValue}
          onChangeText={(value) => {
            setInputValue(value); // Update input state
            setSelectedGravityScore(value); // Update gravity score
          }}
          maxLength={99}
        />

        {inputValue !== '' && (
          <Text style={styles.resultText}>
            {parseFloat(inputValue) <= 3 && parseFloat(inputValue) >= 1
              ? 'Suitable for Diversion'
              : ''}
            {parseFloat(inputValue) === 4 ? 'Refer to CPS' : ''}
          </Text>
        )}
   <TouchableOpacity style={styles.beginButton2}   onPress={openPdf}>
          <Text style={styles.text}>Gravity Matrix(Adult)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.beginButton} onPress={nextPage}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
        

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beginButton: {
     bottom: height * - 0.220,
    height: height * 0.08,
    marginBottom: height * 0.03,
    width: '80%',
    backgroundColor: '#E73D2F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
   beginButton2: {
    bottom: height * -0.22,
    height: height * 0.08,
    marginBottom: height * 0.03,
    width: '80%',
    backgroundColor: '#5FBEBF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    borderRadius: 25,
  },

  resultText: {
    fontSize: 25,
    color: '#4F4F4F',
  },

  input: {
    alignSelf: 'center',
    height: height * 0.07,
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: '6%',
    fontSize: 20,
    color: '#4F4F4F',
    textAlign: 'left',
    bottom: height * 0.065,
    width: '80%',
  },
    pdf: {
    flex: 1,
    width: width * 0.9,
    height: height * 0.5,
    marginTop: height * 0.03,
  },
});

export default FinalGravityScore;
