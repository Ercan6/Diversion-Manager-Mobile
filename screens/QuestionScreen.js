import { useContext, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AppContext } from '../App';

const { width, height } = Dimensions.get('window');

const QuestionScreen = ({ navigation, route }) => {
  const { answers, setAnswers, questions } = useContext(AppContext);
  const { questionId } = route.params;
  const question = useMemo(
    () => questions.find((q) => q.id === questionId),
    [questions, questionId]
  );

  const nextPage = (currentQuestionId, option) => {
    setAnswers({ ...answers, [currentQuestionId]: option });
    const nextQuestionId = currentQuestionId + 1;
    if (questions.find((q) => q.id === nextQuestionId)) {
      navigation.push('Input', { questionId: nextQuestionId });
    } else {
      navigation.navigate('Adjustments');
    }
  };

  return (
    <View style={styles.container}>
      <View key={question.id} style={styles.contentWrapper}>
        <Text style={styles.text}>{question.text}</Text>
        <View style={styles.buttonWrapper}>
          {question.options.map((option) => (
            <View key={option}>
              <TouchableOpacity
                style={[
                  styles.customButton,
                  {
                    backgroundColor:
                      answers[question.id] === option ? '#E73D2F' : '#fff',
                      
                  },
                ]}
                onPress={() => nextPage(question.id, option)}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        answers[question.id] === option ? '#fff' : '#4F4F4F',
                    
                    },
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>

              <View style={styles.buttonSpacing} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: height * 0.05,
    width: '90%',
    lineHeight: 25,
    color: '#4F4F4F',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  customButton: {
    width: width*0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6%',
    height: height * 0.06,
  },

  buttonText: {
    color: '#E73D2F',
    fontSize: 20,
    textAlign: 'center',
  },

  buttonSpacing: {
    height: height * 0.05,
  },
});

export default QuestionScreen;
