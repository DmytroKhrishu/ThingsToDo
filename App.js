import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from './screens/Tasks';
import AddTask from './screens/AddTask';
import TasksContextProvider from './store/tasks-context';

import Button from './components/UI/Button';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TasksContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{}}>
            <Stack.Screen
              name="Tasks"
              component={Tasks}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    icon="add"
                    onPress={() => navigation.navigate('AddTask')}
                  />
                ),
              })}
            />
            <Stack.Screen name="AddTask" component={AddTask} options={{title: "Add Task"}} />
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
