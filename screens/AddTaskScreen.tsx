import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {FormField} from '../components/FormField/FormField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';
import {LABLE} from '../strings/Label';

interface Task {
  id: string;
  task: string;
  des: string;
  priority: string;
  date: any;
  spentTime: string;
}
const taskData: Task[] = [];

const AddTaskScreen = ({navigation}) => {
  const [taskName, setTaskName] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const [description, setDescription] = useState('');
  const [taskError, setTaskError] = useState('');
  const [desError, setDesError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [manualTimeError, setManualTimeError] = useState('');
  const [low, setLow] = useState(true);
  const [medium, setMedium] = useState(false);
  const [high, setHigh] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [spentTime, setSpentTime] = useState('');
  const [manualSpentTime, setManualSpentTime] = useState('');

  const inputRef = useRef(null);
  const startTimer = async () => {
    if (!timerRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerRunning(true);
    }
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position.coords);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    }
  };

  const stopTimer = () => {
    if (timerRunning) {
      clearInterval(intervalRef.current);
      setTimerRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimerRunning(false);
    setElapsedTime(0);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };
  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };
  const addTask = () => {
    if (!taskName) {
      setTaskError('Task title is required');
    } else if (!description) {
      setDesError('Description is required');
    } else if (!spentTime) {
      setTimeError('Spent time is required');
    } else if (!spentTime && !manualSpentTime) {
      setManualTimeError('Spent time is required');
    } else {
      setTaskError('');
      setDesError('');
      setTimeError('');
      setManualTimeError('');
      taskData.push({
        id: Math.random().toString(36).substr(2, 9),
        task: taskName,
        des: description,
        priority: low === true ? 'Low' : medium === true ? 'medium' : 'High',
        date: new Date().toLocaleString(),
        spentTime: spentTime ? spentTime : manualSpentTime,
      });
      storeData(taskData);
      navigation.navigate('TaskList');
      console.log('Name--->', taskData);
    }
  };
  const storeData = async (data: Task[]) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('addTaskData', jsonValue);
      console.log('Data stored successfully.');
    } catch (error) {
      console.log('Failed to store data:', error);
    }
  };

  const doneTimer = () => {
    setSpentTime(formatTime(elapsedTime));
    resetTimer();
    setIsFocused(false);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <FormField label={LABLE.ADD_TASK.TASK_NAME} error={taskError}>
          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            value={taskName}
            onChangeText={text => setTaskName(text)}
          />
        </FormField>
        <FormField label={LABLE.ADD_TASK.DESCRIPTION} error={desError}>
          <TextInput
            style={styles.input}
            value={description}
            multiline={true}
            placeholder="Enter description"
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
          />
        </FormField>
        <View>
          <Text style={styles.labelText}>{LABLE.ADD_TASK.SELECT_TAG}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.CheckBoxInnerRow}>
              <CheckBox
                value={low}
                onValueChange={() => {
                  setLow(!low);
                  setMedium(false);
                  setHigh(false);
                }}
              />
              <Text style={styles.CheckBoxTxt}>{LABLE.ADD_TASK.TAG.LOW}</Text>
            </View>
            <View style={styles.CheckBoxInnerRow}>
              <CheckBox
                value={medium}
                onValueChange={() => {
                  console.log('mmm');
                  setMedium(!medium);
                  setLow(false);
                  setHigh(false);
                }}
              />
              <Text style={styles.CheckBoxTxt}>
                {LABLE.ADD_TASK.TAG.MEDIUM}
              </Text>
            </View>
            <View style={styles.CheckBoxInnerRow}>
              <CheckBox
                value={high}
                onValueChange={() => {
                  setHigh(!high);
                  setLow(false);
                  setMedium(false);
                }}
              />
              <Text style={styles.CheckBoxTxt}>{LABLE.ADD_TASK.TAG.HIGH}</Text>
            </View>
          </View>
          <FormField label={LABLE.ADD_TASK.SPENT_TIME} error={timeError}>
            <TextInput
              style={styles.input}
              ref={inputRef}
              onFocus={handleFocus}
              value={spentTime}
              placeholder="Enter time"
              onChangeText={text => setSpentTime(text)}
            />
          </FormField>
          {isFocused && (
            <View>
              <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
              </View>
              <View style={styles.buttonContainer}>
                {!timerRunning ? (
                  <TouchableOpacity style={styles.button} onPress={startTimer}>
                    <Ionicons
                      name={'play-circle-outline'}
                      size={50}
                      color="#900"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={stopTimer}>
                    <Ionicons
                      name={'stop-circle-outline'}
                      size={50}
                      color="#900"
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={doneTimer}>
                  <Ionicons
                    name={'ios-checkmark-done-circle-outline'}
                    size={50}
                    color="#900"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={resetTimer}>
                  <Ionicons
                    name={'refresh-circle-outline'}
                    size={50}
                    color="#900"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {!spentTime && (
            <FormField
              label={LABLE.ADD_TASK.MANUAL_TIME}
              error={manualTimeError}>
              <TextInput
                style={styles.input}
                value={manualSpentTime}
                placeholder="Enter manua spent time"
                onChangeText={text => setManualSpentTime(text)}
              />
            </FormField>
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={addTask}>
              <Text style={styles.btText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButton: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: '#900',
    borderRadius: 4,
    paddingVertical: 10,
    alignContent: 'center',
  },
  btText: {
    color: 'white',
  },
  item: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStartColor: '#900',
    borderStartWidth: 8,
    borderRadius: 8,
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  CheckBoxTxt: {
    paddingVertical: 6,
  },
  CheckBoxInnerRow: {
    flex: 2,
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
});
export default AddTaskScreen;
