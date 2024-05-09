import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from './screens/Tasks';
import AddTask from './screens/AddTask';
import TasksContextProvider from './store/tasks-context';

import Ionicons from '@expo/vector-icons/Ionicons';

import Button from './components/UI/Button';
import { useState } from 'react';
import CompletedTasks from './screens/CompletedTasks';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TasksTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Button
            icon="add"
            onPress={() => {
              navigation.navigate('AddTask');
              // setAddingTask(false);
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="AllTasks"
        component={Tasks}
        options={{
          title: 'Tasks',
          tabBarIcon: () => <Ionicons name="list" size={20} />,
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTasks}
        options={{
          title: 'Completed Tasks',
          tabBarIcon: () => <Ionicons name="checkmark" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [addingTask, setAddingTask] = useState(true);

  return (
    <>
      <StatusBar style="auto" />
      <TasksContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{}}>
            <Stack.Screen
              name="Tasks"
              component={TasksTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTask}
              options={{ title: 'Add Task' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
