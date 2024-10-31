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
  Platform,
  Dimensions,
} from 'react-native';

import { AppContext } from '../App';
const { width, height } = Dimensions.get('window');

const CriminalReferenceNumber = ({ navigation }) => {
  const { gravityscore, setGravityScore } = useContext(AppContext);
  const [criminalReference, setCriminalReference] = useState('');

  const setSelectedGravityScore = (value) => {
    const updatedGravityScore = {
      ...gravityscore,
      criminalreferencenumber: value,
    };
    setGravityScore(updatedGravityScore);
  };

  const nextPage = () => {
    if (criminalReference.trim() !== '') {
      setSelectedGravityScore(criminalReference);
      navigation.navigate('Offence');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please enter a Criminal Reference Number.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }

    console.log(gravityscore);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(79, 79, 79, 0.5)"
          autoCorrect={Platform.OS === 'ios' ? false : undefined}
          placeholder="Criminal Reference Number*"
          keyboardType="default"
          onChangeText={(value) => {
            setCriminalReference(value); //?
            setSelectedGravityScore(value); //?
          }}
          maxLength={99}
        />

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  beginButton: {
   bottom: height * - 0.228,
    height: height * 0.08,
    marginBottom: height * 0.035,
    width: '80%',
    backgroundColor: '#E73D2F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    alignSelf: 'center',
    height: Platform.select({
      ios: height * 0.065,
      android: height * 0.08,
    }),
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: '5%',
    fontSize: 20,
    color: '#4F4F4F',
    textAlign: 'left',
    bottom: height * 0.015,
    width: '80%',
  },
});

export default CriminalReferenceNumber;
