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

const MitigatingFactors = ({ navigation }) => {
  const [inputHeight, setInputHeight] = useState(); // Track input height
  const { gravityscore, setGravityScore } = useContext(AppContext);
  const [mitigatingFactors, setMitigatingFactors] = useState('');

 


  const setSelectedMitigatingFactors = (value) => {
    const updatedMitigatingFactors = { ...gravityscore, mitigatingfactors: value };
    setGravityScore(updatedMitigatingFactors);
  };

  const nextPage = () => {
    if (mitigatingFactors.trim() !== '') {
      setSelectedMitigatingFactors(mitigatingFactors);
      navigation.navigate('Aggrevating Factors');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please enter Mitigating Factors.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }

    console.log(gravityscore);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
     
        <ScrollView
          style={{ width: '80%', maxHeight: 0.2 * height }} 
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={[styles.input, { height: inputHeight }]} 
            placeholderTextColor="rgba(79, 79, 79, 0.5)"
            placeholder="Mitigating Factors*"
            keyboardType="default"
            multiline
            onContentSizeChange={(e) =>
              setInputHeight(
                Math.min(0.2 * height, e.nativeEvent.contentSize.height)
              )
            }
            onChangeText={(value) => {
              setMitigatingFactors(value);
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
  beginButton: {
   bottom: height * - 0.15,
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
    textAlign: 'center',
  },
  input: {
    alignSelf:'center',
        minHeight:height * 0.065,
    width: '100%',
    backgroundColor: '#fff',
     borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
     paddingHorizontal: '6%',
    ...Platform.select({
      ios: {
       paddingVertical: height * 0.02,
      },
      android: {
          paddingVertical: height * 0.02,
      },
    }),
    fontSize: 20,
    color: '#4F4F4F',

  },
});

export default MitigatingFactors;
