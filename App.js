import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddRoutineScreen from "./src/screens/AddRoutineScreen";
import CustomScreen from "./src/screens/CustomScreen";
import NonCustomScreen from "./src/screens/NonCustomScreen";
import HelpScreen from "./src/screens/HelpScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";


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
    },
  }
);

export default createAppContainer(navigator);
