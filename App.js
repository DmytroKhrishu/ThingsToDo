import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from './screens/Tasks';
import AddTask from './screens/AddTask';
import TasksContextProvider from './store/tasks-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

import Button from './components/UI/Button';
import CompletedTasks from './screens/CompletedTasks';
import EditTask from './screens/EditTask';
import { Colors } from './const/colors';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useEffect, useState, useContext } from 'react';
import LoadingOverlay from './components/UI/LoadingOverlay';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.headerBackground },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.mainBackground },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent() {
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={userEmail ? userEmail : "User"}
        onPress={() => {}}
        inactiveTintColor="white"
      />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Ionicons name="exit" color={color} size={size} />
        )}
        onPress={authCtx.logout}
        inactiveTintColor="white"
      />
    </DrawerContentScrollView>
  );
}

function AuthenticatedStack() {

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.headerBackground },
        headerTintColor: 'white',
        headerRight: () => (
          <Button
            icon="add"
            onPress={() => {
              navigation.navigate('AddTask');
            }}
          />
        ),
        drawerStyle: { backgroundColor: Colors.modalBackground },
      })}
      drawerContent={() => <CustomDrawerContent />}
    >
      <Drawer.Screen
        name="TasksStack"
        component={TasksStack}
        options={({ route }) => ({
          title: 'ThingsToDo',
          headerShown: true,
        })}
      />
    </Drawer.Navigator>
  );
}

function TasksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.headerBackground },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Tasks"
        component={TasksTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{ title: 'Add Task',  }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{ title: 'Edit Task' }}
      />
    </Stack.Navigator>
  );
}

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
        headerStyle: { backgroundColor: Colors.headerBackground },
        headerTintColor: 'white',
        headerTitleAlign: 'center'
      })}
    >
      <Tab.Screen
        name="AllTasks"
        component={Tasks}
        options={{
          title: 'Tasks To Do',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTasks}
        options={{
          title: 'Completed Tasks',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="checkmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <TasksContextProvider>
          <Root />
        </TasksContextProvider>
      </AuthContextProvider>
    </>
  );
}
