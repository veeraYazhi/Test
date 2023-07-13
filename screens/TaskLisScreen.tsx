import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
} from 'react-native';
import FAB from '../components/Modal/FabButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {FormField} from '../components/FormField/FormField';
import {LABLE} from '../strings/Label';
interface Task {
  id: string;
  task: string;
  des: string;
  priority: string;
  date: any;
  spentTime: string;
}
const EmptyListMessage = () => {
  return <Text>No Data Found</Text>;
};
export const TaskListScreen = ({navigation}) => {
  const [taskListData, setTaskListData] = useState<Task[]>();
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    useCallback(() => {
      retrieveData().then(data => {
        setTaskListData(data);
        console.log('Retrieved data:', data);
      });

      return () => {
        console.log('MyComponent is unfocused');
      };
    }, []),
  );

  const retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('addTaskData');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data);
        return data;
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.log('Failed to retrieve data:', error);
    }
  };
  const addTask = () => {
    navigation.navigate('AddTask');
  };

  const taskListPress = (item: any) => {
    navigation.navigate('TaskSummary', {params: item});
  };
  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  useEffect(() => {
    if (searchText === '') {
      retrieveData().then(data => {
        setTaskListData(data);
        console.log('Retrieved data:', data);
      });
    }
    const filteredData = taskListData?.filter(item =>
      item.priority.toLowerCase().includes(searchText.toLowerCase()),
    );
    setTaskListData(filteredData);
  }, [searchText]);
  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => taskListPress(item)}>
      <View style={styles.item}>
        <View style={styles.itemRow}>
          <View style={styles.itemColumn}>
            <Text style={styles.itemTxt}>{item.task}</Text>
          </View>
          <View style={styles.itemColumn1}>
            <Text style={styles.itemTxt}>Tag: {item.priority}</Text>
          </View>
        </View>
        <View style={styles.itemRow}>
          <View style={styles.itemColumn}>
            <Text style={styles.itemTxt}>{item.des}</Text>
          </View>
          <View style={styles.itemColumn1}>
            <Text style={styles.itemTxt}>{item.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#920000" barStyle="light-content" />
        <View style={styles.innerContainer}>
          <FormField label={LABLE.ADD_TASK.TASK_NAME}>
            <TextInput
              style={styles.input}
              placeholder="Search by tag"
              value={searchText}
              onChangeText={text => handleSearch(text)}
            />
          </FormField>
          <FlatList
            data={taskListData}
            renderItem={renderItem}
            keyExtractor={(item: Task) => item.id}
            ListEmptyComponent={EmptyListMessage}
          />
          <FAB onPress={addTask} title="Add" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  itemTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    flex: 1,
  },
  itemColumn: {
    flex: 3,
  },
  itemColumn1: {
    paddingVertical: 4,
    flex: 2,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
  },
});
