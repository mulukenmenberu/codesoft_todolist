import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './Dashboard';
import Mine from './Mine';
import Saved from './Saved';
const Tab = createBottomTabNavigator();

export default Tabs = ()=> {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown:false
      }}
      tabBarOptions={{
        showLabel:false

      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="content-save-check" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          tabBarLabel: 'Mine',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-bulleted" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}