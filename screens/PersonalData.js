import { useContext, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For the calendar icon
const { width, height } = Dimensions.get('window');

import { AppContext } from '../App';

const PersonalData = ({ navigation }) => {
  const { personalData, setPersonalData } = useContext(AppContext);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedEthnicityOffender, setSelectedEthnicityOffender] =
    useState('');
  const [selectedEthnicityOfficer, setSelectedEthnicityOfficer] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const genders = ['Male', 'Female', 'Prefer not to State', 'Other'];

  const sexes = ['Male', 'Female'];

  const ethnicities = [
    'IC1 – White European',
    'IC2 – Dark European',
    'IC3 – Afro-Caribbean',
    'IC4 – Asian (South Asian)',
    'IC5 – East/Southeast Asian',
    'IC6 – Arab/North African',
    'IC7 or 0 – Unknown',
  ];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate); // Update selected date
  };

  const nextPage = () => {
    if (
      selectedGender &&
      selectedSex &&
      selectedDate &&
      selectedAge &&
      selectedEthnicityOffender &&
      selectedEthnicityOfficer
    ) {
      const updatedPersonalData = {
        ...personalData,
        gender: selectedGender,
        sex: selectedSex,
        date: selectedDate,
        age: selectedAge,
        ethnicityoffender: selectedEthnicityOffender,
        ethnicityofficer: selectedEthnicityOfficer,
      };

      setPersonalData(updatedPersonalData);
      navigation.navigate('Input');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please fill out the information.',
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
            onValueChange={(value) => setSelectedGender(value)}
            items={genders.map((force) => ({
              label: force,
              value: force,
            }))}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            placeholder={{
              label: 'Gender*...',
              value: null,
              color: '#4F4F4F',
            }}
          />
          <RNPickerSelect
            onValueChange={(value) => setSelectedSex(value)}
            items={sexes.map((force) => ({
              label: force,
              value: force,
            }))}
            style={{
              inputIOS: styles.input2,
              inputAndroid: styles.input2,
            }}
            placeholder={{
              label: 'Sex*',
              value: null,
              color: '#4F4F4F',
            }}
          />

          {/* Date Input with Calendar Icon */}
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              value={selectedDate.toLocaleDateString()} // Display the selected date
              editable={false} // Make the field non-editable
            />
            <TouchableOpacity
              style={styles.calendarIcon}
              onPress={() => setShowDatePicker(true)}>
              <FontAwesome name="calendar" size={24} color="#4F4F4F" />
            </TouchableOpacity>
          </View>
          {showDatePicker &&
            (Platform.OS === 'ios' ? (
              <Modal
                transparent={true}
                animationType="slide"
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={onDateChange}
                      style={{ width: '100%' }}
                    />
                    <TouchableOpacity
                      style={styles.doneButton}
                      onPress={() => setShowDatePicker(false)}>
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            ) : (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            ))}

          <TextInput
            style={styles.age}
            value={selectedAge}
            onChangeText={setSelectedAge}
            placeholder="Age*"
            keyboardType="number-pad"
          />

          <RNPickerSelect
            onValueChange={(value) => setSelectedEthnicityOfficer(value)}
            items={ethnicities.map((force) => ({
              label: force,
              value: force,
            }))}
            style={{
              inputIOS: styles.input3,
              inputAndroid: styles.input3,
            }}
            placeholder={{
              label: 'Officer Defined Ethnicity*',
              value: null,
              color: '#4F4F4F',
            }}
          />

          <RNPickerSelect
            onValueChange={(value) => setSelectedEthnicityOffender(value)}
            items={ethnicities.map((force) => ({
              label: force,
              value: force,
            }))}
            style={{
              inputIOS: styles.input3,
              inputAndroid: styles.input3,
            }}
            placeholder={{
              label: 'Offender Defined Ethnicity*',
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
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beginButton: {
    bottom: height * - 0.05011,
    height: height * 0.07,
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
    width: '90%',
    height: height * 0.07,
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    marginBottom: height * 0.03,
    paddingHorizontal: '6%',
    fontSize: 20,
    color: '#4F4F4F',
    textAlign: 'left',
    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
  },
  input2: {
    alignSelf: 'center',
    width: '90%',
    height: height * 0.07,
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    marginBottom: height * 0.025,
    paddingHorizontal: '6%',
    fontSize: 20,
    color: '#4F4F4F',
    textAlign: 'left',
    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
  },
  input3: {
    alignSelf: 'center',
    width: '90%',
    height: height * 0.07,
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    marginBottom: height * 0.03,
    paddingHorizontal: '6%',
    fontSize: 20,
    color: '#4F4F4F',

    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
  },
  age: {
    marginBottom: height * 0.025,
    width: '104%',
    height: height * 0.08,
    backgroundColor: '#fff',
    paddingHorizontal: '6%',
    fontSize: Platform.select({
      ios: 24,
      android: 18,
    }),
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    color: '#4F4F4F',
    textAlign: 'left',
  },
  dateInputContainer: {
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.083,
    marginBottom: height * 0.019,
    width: '104%',
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: '6%',
  },
  dateInput: {
    flex: 1,
    height: height * 0.075,
    fontSize: 20,
    color: '#4F4F4F',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '5%',
    borderRadius: 20,
    alignItems: 'center',
  },
  doneButton: {
    marginTop: height * 0.01,
    backgroundColor: '#E73D2F',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    borderRadius: 10,
  },
  doneText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PersonalData;
