// Importing Components and Hooks from react and react-native
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

// Import library to send emails with attachments
import * as MailComposer from 'expo-mail-composer'; // Import expo-mail-composer

// Define dimension for screen height
const { height } = Dimensions.get('window');

// Importing values from config file for email subject and address
import { SUPPORT_EMAIL, SUPPORT_SUBJECT } from '../config';

const ReportScreen = () => {

    // Local states to store the user's inputs for this view
  const [problemDescription, setProblemDescription] = useState('');

   // Function to send the email
  const sendReport = async () => {

    //Error if Content is empty
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
          //Error for sending email
      Alert.alert('Error', 'Failed to send your report. Please try again.');
    }
  };

  return (
       // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Describe the problem you're facing"
          multiline
          value={problemDescription}
          onChangeText={setProblemDescription}
          keyboardType="default"
          autoCorrect={Platform.OS === 'ios' ? false : undefined} //Deactive autocorrect on iOS
        />

                  {/* Button to submit the email */}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendReport(problemDescription)}>
          <Text style={styles.text}>Send Report</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styling for the components
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
   
    height: height * 0.08,  //adjusting button positioning
    marginBottom: height * 0.03,  //adjusting button margin
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
