import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import AddRoutineScreen from "./src/screens/AddRoutineScreen";
import CustomScreen from "./src/screens/CustomScreen";
import NonCustomScreen from "./src/screens/NonCustomScreen";
import HelpScreen from "./src/screens/HelpScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import { Provider as MesocycleProvider } from './src/context/MesocycleContext';
import { setNavigator } from "./src/navigationRef";
import { Provider as DayProvider } from './src/context/DayContext';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    AddRoutine: AddRoutineScreen,
    Custom: CustomScreen,
    NonCustom: NonCustomScreen,
    Help: HelpScreen,
    Workout: WorkoutScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
      headerShown: false,
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />
        <MesocycleProvider>
          <DayProvider>
              <App ref = {(navigator) => {setNavigator(navigator)}}/>
          </DayProvider>
        </MesocycleProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};