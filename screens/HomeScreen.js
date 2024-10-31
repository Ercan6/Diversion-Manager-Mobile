import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const nextPage = () => {
    navigation.navigate('Police Force');
  };

  const reportProblem = () => {
    navigation.navigate('Report');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <Text style={styles.title}>Advent Diversion {'\n'} Manager</Text>

        <TouchableOpacity style={styles.beginButton} onPress={nextPage}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={reportProblem}>
          <Text style={styles.report}>Report a Problem</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  beginButton: {
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
  reportButton: {
    height: height * 0.08,
    marginBottom: height * 0.03,
    width: '80%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  report: {
    color: '#E73D2F',
    fontSize: 20,
    borderRadius: 25,
  },
  title: {
    bottom: '40%',
    width: '80%',
    height: '15%',
    borderRadius: 10,
    fontSize: 30,
    color: '#4F4F4F',
    marginBottom: height * 0.05,
    textAlign: 'center',
  },
});

export default HomeScreen;
