// Importing Components and Hooks from react and react-native
import { useContext, useState } from "react";
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
} from "react-native";

// Importing global context from App component to access shared state
import { AppContext } from "../App";

// Import library to create PDFs
import * as Print from "expo-print";

// Import library to send emails with attachments
import * as MailComposer from "expo-mail-composer";

// Importing values from config file for email subject and body
import { SUBMISSION_SUBJECT, SUBMISSION_BODY } from "../config";

// Define dimension for screen height
const { height } = Dimensions.get("window");

const FinalInput = () => {
  // Accessing shared states and set states functions from AppContext to access all the collected data
  const { gravityscore, finalinput, personaldata, answers } =
    useContext(AppContext);

  // Local states to store the user's inputs for this view
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [officerEmail, setOfficerEmail] = useState("");

  // Function to create a PDF based on input data
  const createPDF = async () => {
    try {
      // HTML Template for the PDF content. Here all the collected data is being mapped to HTML Elements
      const htmlContent = `
         <h1>Needs Assessment:</h1>
        <p>Criminal Reference Number: ${gravityscore.criminalreferencenumber}</p>
        <p>Police Force: ${gravityscore.policeforce}</p>
        <p>CJS Offence Code: ${gravityscore.cjs}</p>
        <p>Offence Title: ${gravityscore.offencetitle}</p>
        <p>Legislation: ${gravityscore.legislation}</p>
        <p>Gravity Score: ${gravityscore.gravityscore}</p>
        <p>Mitigating Factors: ${gravityscore.mitigatingfactors}</p>
        <p>Aggrevating Factors: ${gravityscore.aggrevatingfactors}</p>
        <p>Final Gravity Score: ${gravityscore.finalgravityscore}</p>

        <h2>Personal Data:</h2>
        <p>Gender: ${personaldata.gender}</p>
        <p>Sex: ${personaldata.sex}</p>
        <p>Date of Birth: ${personaldata.date.toISOString().split("T")[0]}</p> 
        <p>Age: ${personaldata.age}</p>
        <p>Officer defined Ethnicity: ${personaldata.ethnicityofficer}</p>
        <p>>Offender defined Ethnicity: ${personaldata.ethnicityoffender}</p>
        <p>Diagnoses with Neurodiversity Issues such as ADHD/ADD/Autism/Other: ${answers[1]}</p>
        <p>Un-Diagnosed with Neurodiversity Issues: ${answers[2]}</p>
        <p>Diagnoses as Neurodivergent such as Borderline Personality Disorder/Schizophrenia/     Anti-social Personality Disorder/Anxiety/Depression: ${answers[3]}</p>
        <p>Un-diagnosed Neurodivergent issue (suspected): ${answers[4]}</p>
        <h2>Risk Factors and Protective Characteristics</h2>
 <p>Risk Factor: Unemployed or not in full time education or training: ${answers[5]}</p>
        <p>Protective Characteristics: Supportive Family Network: ${answers[6]}</p>
        <p>Risk Factor: Homeless/Unstable accommodation: ${answers[7]}</p>
        <p>Protective Characteristics: Full time employment: ${answers[8]}</p>
<p>Risk Factor: No positive recreational activities: ${answers[9]}</p>
<p>Protective Characteristics: Strong peer support: ${answers[10]}</p>
<p>Risk Factor: Anti-Social peers: ${answers[11]}</p>
<p>Protective Characteristics: Moralistic: ${answers[12]}</p>
<p>Risk Factor: Poor personal relationships: ${answers[13]}</p>
<p>Protective Characteristics: Stable accommodations: ${answers[14]}</p>
       <p>Risk Factor: Alcohol Misuse: ${answers[15]}</p>
        <p>Protective Characteristics: Positive relationships with others: ${answers[16]}</p>
        <p>Risk Factor: Drug misuse ${answers[17]}</p>
        <p>Protective Characteristics: Educated and higher IQ: ${answers[18]}</p>
 <p>Risk Factor: Impulsivity and poor emotional control: ${answers[19]}</p>
        <pProtective Characteristics: Good social skills: ${answers[20]}</p>
        <p>Risk Factor: Attitudes that support crime: ${answers[21]}</p>
        <p>Protective Characteristics: Religious beliefs: ${answers[22]}</p>
<p>Risk Factor: Mental health issues: ${answers[23]}</p>
<p>Protective Characteristics: Involvement in prosocial activities: ${answers[24]}</p>
<p>Risk Factor: Static factors/History of Offending/Age and gender: ${answers[25]}</p>
<p>Protective Characteristics: Highly developed skills for realistic planning: ${answers[26]}</p>
<p>Does the officer in this case believe the client is suitable for an online intervention?: ${answers[27]}</p>
<br>
<p>Does the client need any adjustment to successfully complete the intervention?: ${finalinput.adjustments}</p>
      `;

      // Create PDF from the HTML content
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Send PDF via email
      await sendEmailWithPDF(uri);

      //error for creating pdf
    } catch (error) {
      console.error("Error creating PDF:", error);
      Alert.alert("Error", "Failed to create PDF file.");
    }
  };

  // Function to send the generated PDF via email
  const sendEmailWithPDF = async (pdfPath) => {
    const result = await MailComposer.composeAsync({
      subject: SUBMISSION_SUBJECT,
      recipients: [officerEmail],
      body: SUBMISSION_BODY,
      attachments: [pdfPath],
    });

    if (result.status === "sent") {
      Alert.alert("Submission was successful.");
    } else {
      //Error for sending email
      Alert.alert("Error", "Failed to send email.");
    }
  };

  //Function to handle button press. Checks if inputs are valid and starts pdf creation
  const startPDF = () => {
    // Validate email and ensure fields are not empty
    const isEmailValid =
      officerEmail.includes("@") && officerEmail.includes(".");

    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      officerEmail.trim() !== "" &&
      isEmailValid
    ) {
      createPDF(); // Generate PDF if all fields are valid
    } else {
      Alert.alert(
        "Invalid Input",
        "Please correctly fill out all the required fields.",
        [{ text: "OK" }],
        { cancelable: true },
      );
    }
  };

  return (
    // Dismiss the keyboard when tapping outside the input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <View style={styles.dropdownContainer}>
          {/* Input fields for officer's name and email */}
          <Text style={styles.text2}>Officer's Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name*"
            placeholderTextColor="rgba(79, 79, 79, 0.5)"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name*"
            placeholderTextColor="rgba(79, 79, 79, 0.5)"
          />
          <Text style={styles.text2}>Officer's Email Address</Text>
          <TextInput
            style={styles.input}
            value={officerEmail}
            onChangeText={setOfficerEmail}
            placeholder="Email Address*"
            placeholderTextColor="rgba(79, 79, 79, 0.5)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Button to submit the email */}
          <TouchableOpacity style={styles.beginButton} onPress={startPDF}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  beginButton: {
    bottom: height * -0.065, //adjusting button positioning
    height: height * 0.08,
    marginBottom: height * 0.03, //adjusting button margin
    width: "100%",
    backgroundColor: "#E73D2F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    borderRadius: 25,
  },
  input: {
    alignSelf: "center",
    width: "90%",
    height: height * 0.075,
    backgroundColor: "#fff",
    marginBottom: height * 0.03,
    paddingHorizontal: "6%",
    fontSize: 18,
    color: "#4F4F4F",
    textAlign: "left",
    //Seperating Border Radius for Android and iOS to be more similar to the native UI
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
  },
  text2: {
    marginBottom: height * 0.03,
    color: "#4F4F4F",
    fontSize: 20,
    borderRadius: 25,
    textAlign: "center",
    width: "90%",
  },
});

export default FinalInput;
