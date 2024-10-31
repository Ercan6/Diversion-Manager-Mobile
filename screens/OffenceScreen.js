import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import offenceData from '../data/offenceDataShort.json';
import { AppContext } from '../App';

const { height } = Dimensions.get('window');

const OffenceScreen = ({ navigation }) => {
  const { gravityscore, setGravityScore } = useContext(AppContext);
  const [cjsOffenceCode, setCjsOffenceCode] = useState('');
  const [offenceTitle, setOffenceTitle] = useState('');
  const [legislation, setLegislation] = useState('');
  const [filteredOffences, setFilteredOffences] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputHeightCode, setInputHeightCode] = useState(height * 0.06);
  const [inputHeightTitle, setInputHeightTitle] = useState(height * 0.06);
  const [inputHeightLegislation, setInputHeightLegislation] = useState(
    height * 0.06
  );
  const [focusedInput, setFocusedInput] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

const handleCjsCodeChange = (input) => {
  setCjsOffenceCode(input);
  if (input.length > 0) {
    const filtered = offenceData.filter((offence) =>
      offence['CJS Offence Code'].toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredOffences(filtered);
    setShowSuggestions(filtered.length > 0);
  } else {
    setShowSuggestions(false);
    setFilteredOffences([]);
    setOffenceTitle('');       // Clear offence title
    setLegislation('');  
  }
};

const handleOffenceTitleChange = (input) => {
  setOffenceTitle(input);
  if (input.length > 0) {
    const filtered = offenceData.filter((offence) =>
      offence['Offence Title'].toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredOffences(filtered);
    setShowSuggestions(filtered.length > 0);
  } else {
    setShowSuggestions(false);
    setFilteredOffences([]);
    setCjsOffenceCode('');     // Clear CJS code
    setLegislation('');        // Clear legislation field
  }
};

  const handleSelectOffence = (offence) => {
    setCjsOffenceCode(offence['CJS Offence Code']);
    setOffenceTitle(offence['Offence Title']);
    setLegislation(offence['Legislation']);
    setTimeout(() => {
      setShowSuggestions(false);
      setFilteredOffences([]); // Clear the suggestions list on selection
    }, 100); // Add a slight delay
    Keyboard.dismiss();
  };

  const nextPage = () => {
    if (cjsOffenceCode && offenceTitle) {
      const updatedGravityScore = {
        ...gravityscore,
        cjs: cjsOffenceCode,
        offencetitle: offenceTitle,
        legislation: legislation,
      };
      setGravityScore(updatedGravityScore);
      navigation.navigate('Gravity Score');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please select a valid CJS Offence Code and Offence Title.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.background}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TextInput
              style={[styles.input, { height: inputHeightCode }]}
              placeholder="CJS Offence Code*"
               placeholderTextColor="rgba(79, 79, 79, 0.5)"
              value={cjsOffenceCode}
              onChangeText={handleCjsCodeChange}
              multiline
              autoCorrect={false} // Disable autocorrect on iOS
              onContentSizeChange={(e) =>
                setInputHeightCode(
                  Math.max(height * 0.06, e.nativeEvent.contentSize.height)
                )
              }
              textAlignVertical="center"
              onFocus={() => setFocusedInput('cjsOffenceCode')}
            />
            {showSuggestions && focusedInput === 'cjsOffenceCode' && (
              <FlatList
                style={[
                  styles.suggestionsContainer,
                  { maxHeight: keyboardVisible ? height * 0.15 : height * 0.3 },
                ]}
                data={filteredOffences}
                keyExtractor={(item) => item['CJS Offence Code']}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectOffence(item)}>
                    <Text>{item['CJS Offence Code']}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <TextInput
              style={[styles.input, { height: inputHeightTitle }]}
              placeholder="Offence Title*"
              placeholderTextColor="rgba(79, 79, 79, 0.5)"
              value={offenceTitle}
              onChangeText={handleOffenceTitleChange}
              multiline
              autoCorrect={false} // Disable autocorrect on iOS
              onContentSizeChange={(e) =>
                setInputHeightTitle(
                  Math.max(height * 0.06, e.nativeEvent.contentSize.height)
                )
              }
              textAlignVertical="center"
              onFocus={() => setFocusedInput('offenceTitle')}
            />
            {showSuggestions && focusedInput === 'offenceTitle' && (
              <FlatList
                style={[
                  styles.suggestionsContainer,
                  { maxHeight: keyboardVisible ? height * 0.15 : height * 0.3 },
                ]}
                data={filteredOffences}
                keyExtractor={(item) => item['CJS Offence Code']}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectOffence(item)}>
                    <Text>{item['Offence Title']}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <TextInput
              style={[styles.input, { height: inputHeightLegislation }]}
              placeholder="Legislation*"
               placeholderTextColor="rgba(79, 79, 79, 0.5)"
              value={legislation}
              editable={false}
              multiline
              onContentSizeChange={(e) =>
                setInputHeightLegislation(
                  Math.max(height * 0.06, e.nativeEvent.contentSize.height)
                )
              }
              textAlignVertical="center"
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.beginButton} onPress={nextPage}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6%',
  },
  input: {
    minWidth: '95%',
    maxWidth: '95%',
    minHeight: height * 0.075,
    backgroundColor: '#fff',
    borderRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: '6%',
    fontSize: 20,
    marginBottom: height * 0.02,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#4F4F4F',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    minWidth: '95%',
    maxWidth: '95%',
    borderBottomLeftRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    borderBottomRightRadius: Platform.select({
      ios: 25,
      android: 0,
    }),
    paddingHorizontal: '4%',
    marginTop: height * -0.015,
    marginBottom: height * 0.03,
  },
  suggestionItem: {
    padding: height * 0.01,
  },
  beginButton: {
    bottom: Platform.select({
      ios: height * 0.06,
      android: height * 0.01,
    }),
    width: '80%',
    backgroundColor: '#E73D2F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default OffenceScreen;
