import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddRoutineScreen from "./src/screens/AddRoutineScreen";
import CustomScreen from "./src/screens/CustomScreen";
import NonCustomScreen from "./src/screens/NonCustomScreen";
import HelpScreen from "./src/screens/HelpScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { Provider as MesocycleProvider } from './src/context/MesocycleContext';
import { Provider as DayProvider } from './src/context/DayContext';

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    AddRoutine: AddRoutineScreen,
    Custom: CustomScreen,
    NonCustom: NonCustomScreen,
    Help: HelpScreen,
    Workout: WorkoutScreen,
  },
  {
    initialRouteName: "Custom",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <MesocycleProvider>
      <DayProvider>

        <App/>
      </DayProvider>
    </MesocycleProvider>
  );
};