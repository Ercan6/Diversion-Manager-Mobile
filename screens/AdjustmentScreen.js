import { useContext, useState } from 'react';
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
} from 'react-native';

import { AppContext } from '../App';
const { width, height } = Dimensions.get('window');

const Adjustments = ({ navigation }) => {
  const [inputHeight, setInputHeight] = useState(); // Track input height
  const { finalinput, setFinalInput } = useContext(AppContext);
  const [adjustmentsInput, setAdjustmentsInput] = useState('');


 

  const setSelectedAdjustments = (value) => {
    const updatedAdjustments = { ...finalinput, adjustments: value };
    setFinalInput(updatedAdjustments);
  };

  const nextPage = () => {
    if (adjustmentsInput.trim() !== '') {
      setSelectedAdjustments(adjustmentsInput);
      navigation.navigate('Final Input');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please answer the Question.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }

    
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
         <Text style={styles.text2}>
         Does the client need any adjustment to successfully complete the intervention?

          </Text>
        <ScrollView
          style={{ width: '80%', maxHeight:  0.2 * height }} // Set maxHeight for scrolling
          showsVerticalScrollIndicator={false}>
         
          <TextInput
            style={[
              styles.input,
              { height: inputHeight},
            ]} // Dynamically set the height and maxHeight
            placeholderTextColor="rgba(79, 79, 79, 0.5)"
            placeholder="Please enter"
            keyboardType="default"
              autoCorrect={Platform.OS === 'ios' ? false : undefined}
            multiline
            onContentSizeChange={(e) =>
              setInputHeight(
                 Math.min(0.2 * height, e.nativeEvent.contentSize.height) 
              )
            }
            onChangeText={(value) => {
              setFinalInput(value);
              setAdjustmentsInput(value);
            }}
          />
        </ScrollView>

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
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  beginButton: {
    bottom: height * - 0.12,
    height: height * 0.08,
    marginBottom: height * 0.03,
    width: '80%',
    backgroundColor: '#E73D2F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    top: height * 0.001,
    alignSelf:'center',
    color: '#4F4F4F',
    fontSize: 20,
    borderRadius: 25,
    textAlign: 'center',
    width: '90%',
    marginBottom: height * 0.03,
    lineHeight: 25,
  },
  input: {
 minHeight:height * 0.05,
    width: '100%',
    backgroundColor: '#fff',
     borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
     paddingHorizontal: '6%',
    ...Platform.select({
      ios: {
      
      },
      android: {
          paddingVertical: height * 0.02,
      },
    }),
    fontSize: 20,
    color: '#4F4F4F',
    maxHeight: 0.2 * height,
  },
});

export default Adjustments;
