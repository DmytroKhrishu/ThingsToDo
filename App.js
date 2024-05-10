import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from './screens/Tasks';
import AddTask from './screens/AddTask';
import TasksContextProvider from './store/tasks-context';

import Ionicons from '@expo/vector-icons/Ionicons';

import Button from './components/UI/Button';
import CompletedTasks from './screens/CompletedTasks';
import EditTask from './screens/EditTask';
import { Colors } from './const/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TasksTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: Colors.tabBarBackground,
          height: 55,
          paddingBottom: 3,
        },
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: { fontSize: 14 },
        headerStyle: {backgroundColor: Colors.headerBackground},
        headerTintColor: "white",
        headerRight: () => (
          <Button
            icon="add"
            onPress={() => {
              navigation.navigate('AddTask');
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
          tabBarIcon: ( {size, color}) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTasks}
        options={{
          title: 'Completed Tasks',
          tabBarIcon: ({size, color}) => (
            <Ionicons name="checkmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TasksContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
             headerStyle: {backgroundColor: Colors.headerBackground}, headerTintColor: 'white'
          }}>
            <Stack.Screen
              name="Tasks"
              component={TasksTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTask}
              options={{ title: 'Add Task', }}
            />
            <Stack.Screen
              name="EditTask"
              component={EditTask}
              options={{ title: 'Edit Task' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksContextProvider>
    </>
  );
}
