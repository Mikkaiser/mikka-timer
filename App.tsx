import { useFonts } from "expo-font";
import { AppLoading } from "./src/screens/Home/components/AppLoading";
import Dashboard from "./src/screens/Home/components/ClockInOut";
import History from "./src/screens/History/Index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Image, Text } from "react-native";
import ProjectColors from "./src/utils/Constants";

const Tab = createBottomTabNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    Poppins_Bold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    Poppins_Medium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins_SemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            backgroundColor: "#FAFAFA",
            borderRadius: 15,
            height: 70,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused
                      ? ProjectColors.primary
                      : ProjectColors.neutral,
                  }}
                />
                <Text
                  style={{
                    color: focused
                      ? ProjectColors.primary
                      : ProjectColors.neutral,
                    fontFamily: "Poppins_Bold",
                    fontSize: 12,
                  }}
                >
                  HOME
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/history.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused
                      ? ProjectColors.primary
                      : ProjectColors.neutral,
                  }}
                />
                <Text
                  style={{
                    color: focused
                      ? ProjectColors.primary
                      : ProjectColors.neutral,
                    fontFamily: "Poppins_Bold",
                    fontSize: 12,
                  }}
                >
                  HISTORY
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
});