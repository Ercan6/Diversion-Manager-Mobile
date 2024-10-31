import { useContext, useState } from 'react';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import policeForces from '../data/policeForces.json';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
} from 'react-native';

import { AppContext } from '../App';
const { width, height } = Dimensions.get('window');

const PoliceForce = ({ navigation }) => {
  const { gravityscore, setGravityScore } = useContext(AppContext);
  const [selectedPoliceForce, setSelectedPoliceForce] = useState('');

  const nextPage = () => {
    if (selectedPoliceForce) {
      const updatedGravityScore = {
        ...gravityscore,
        policeforce: selectedPoliceForce,
      };
      setGravityScore(updatedGravityScore);
      navigation.navigate('Criminal Reference Number');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please select a Police Force.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedPoliceForce(value)}
            items={policeForces.map((force) => ({
              label: force,
              value: force,
            }))}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            placeholder={{
              label: 'Police Force*',
              value: null,
              color: '#4F4F4F',
            }}
          />
        </View>

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
  dropdownContainer: {
    width: '80%',
    marginBottom: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  beginButton: {
    bottom: height * - 0.215,
    height: height * 0.08,
    marginBottom: height * 0.03,
    width: '80%',
    backgroundColor: '#E73D2F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    borderRadius: 25,
  },
  input: {
    alignSelf: 'center',
    width: Platform.select({
      ios: '100%',
      android: '90%',
    }),
    height: height * 0.065,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: '6%',
    fontSize: Platform.select({
      ios: 20,
      android: 21,
    }),
    color: '#4F4F4F',
    
    transform: Platform.select({
      ios: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
      android: [{ scaleX: 1.17 }, { scaleY: 1.17 }],
    }),
  },
});

export default PoliceForce;
