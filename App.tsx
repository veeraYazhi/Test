/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Route from './routes/Route';
import AddTaskScreen from './screens/AddTaskScreen';
import {TaskListScreen} from './screens/TaskLisScreen';
import {TaskSummaryScreen} from './screens/TaskSummary';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Route.LOGIN}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{
            title: 'Task List',
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            title: 'Add Task',
          }}
        />
        <Stack.Screen
          name="TaskSummary"
          component={TaskSummaryScreen}
          options={{
            title: 'Task Summary details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
