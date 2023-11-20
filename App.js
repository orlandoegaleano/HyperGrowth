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
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as MesocycleProvider } from './src/context/MesocycleContext';
import {Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from "./src/navigationRef";
import { Provider as DayProvider } from './src/context/DayContext';

const navigator = createStackNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
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
    initialRouteName: "Login",
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
        <AuthProvider>
          <App ref = {(navigator) => {setNavigator(navigator)}}/>
        </AuthProvider>
      </DayProvider>
    </MesocycleProvider>
  );
};