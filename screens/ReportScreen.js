import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import * as MailComposer from 'expo-mail-composer'; // Import expo-mail-composer

const { height } = Dimensions.get('window');

import { SUPPORT_EMAIL, SUPPORT_SUBJECT } from '../config';

const ReportScreen = () => {
  const [problemDescription, setProblemDescription] = useState('');

  const sendReport = async () => {
    console.log(problemDescription);

    if (problemDescription.trim() === '') {
      Alert.alert('Error', 'Please describe the problem.');
      return;
    }

    const result = await MailComposer.composeAsync({
      recipients: [SUPPORT_EMAIL],
      subject: SUPPORT_SUBJECT,
      body: problemDescription,
    });

    if (result.status === 'sent') {
      Alert.alert('Thank you', 'Your report has been sent.');
    } else {
      Alert.alert('Error', 'Failed to send your report. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Describe the problem you're facing"
          multiline
          value={problemDescription}
          onChangeText={setProblemDescription}
          keyboardType="default"
          autoCorrect={Platform.OS === 'ios' ? false : undefined}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendReport(problemDescription)}>
          <Text style={styles.text}>Send Report</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: height * 0.025,
  },
  input: {
    width: '100%',
    height: height * 0.2,
    backgroundColor: '#fff',
    padding: height * 0.02,
    borderRadius: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: height * 0.025,
    color: '#4F4F4F',
  },
  sendButton: {
   
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
  },
});

export default ReportScreen;
