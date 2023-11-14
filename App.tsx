import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AsyncStorageService } from './src/services/AsyncStorage.service';
import { ClockInOutInterface } from './src/interfaces/ClockInOut';
// import { useFonts, Poppins_900Black } from "@expo-google-fonts/poppins";
// import { AppLoading } from './src/components/AppLoading/AppLoading';


export default function App() {

  let asyncStorageService = new AsyncStorageService();

  const handleClockIn = () => {
    const currentDate = new Date();

    const clockInOut : ClockInOutInterface = {
      id: 1,
      dateTimeIn: currentDate,
    }
    asyncStorageService.saveClockInOnStorage(clockInOut);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.centralButton} onPress={handleClockIn}>
        <Text style={styles.buttonText}>Clock-In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centralButton: {
    backgroundColor: "#1c58d8",
    color: "#fff",
    width: 200,
    height: 200,
    padding: 10,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  }
});
