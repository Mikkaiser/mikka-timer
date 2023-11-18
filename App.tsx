import { useFonts } from "expo-font";
import { AppLoading } from "./src/screens/Home/components/AppLoading";
import Dashboard from "./src/screens/Home/components/ClockInOut";

export default function App() {

  let [fontsLoaded] = useFonts({
    'Poppins_Bold': require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    'Poppins_Medium': require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <Dashboard />;
}
