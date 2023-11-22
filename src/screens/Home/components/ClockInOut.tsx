import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ClockInOutInterface } from "../../../interfaces/ClockInOut";
import { AsyncStorageService } from "../../../services/AsyncStorage.service";
import ProjectColors from "../../../utils/Constants";
import { useState } from "react";
import { ClockInOutService } from "../../../services/ClockInOut.service";

export default function Dashboard() {

  const [clocks, setClocks] = useState<ClockInOutInterface[]>([]);
  
  let clockInOutService = new ClockInOutService();

  const handleClockIn = async () => {
    const registerToday = await clockInOutService.getRegisterFromToday();
    const storedValues = await clockInOutService.getAll();

    let clockInOutObject: ClockInOutInterface;

    if(registerToday) {
      clockInOutObject = {
        ...registerToday,
        dateTimeOut: new Date(),
      };
    }
    else {
      clockInOutObject = {
        id: storedValues?.length ? storedValues.length + 1 : 1,
        dateTimeIn: new Date(),
      };
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.upView}>
        <View style={styles.upviewInfo}>
          <View style={styles.upviewInfoHourView}>
            <Text style={styles.upviewInfoTitle}>Total hours balance</Text>
            <Text style={styles.upviewInfoHourBalance}>3 hours - Credit</Text>
          </View>
          <Text style={styles.todayTitle}>Today</Text>
          <View style={styles.upviewInfoHourInOutView}>
            <View style={styles.clockInInfoView}>
              <Text style={styles.dailyDetailsClock}>Clock In</Text>
              <Text style={styles.clockInOutDetails}>08:00 am</Text>
            </View>
            <View style={styles.clockOutInfoView}>
              <Text style={styles.dailyDetailsClock}>Clock Out</Text>
              <Text style={styles.clockInOutDetails}>5:00 pm</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.downView}>
        <View style={styles.roundButton}>
          <TouchableOpacity
            style={styles.centralButton}
            onPress={handleClockIn}
          >
            <Text style={styles.buttonText}>Clock-In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ProjectColors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  roundButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 200,
    bottom: 50,
  },
  centralButton: {
    backgroundColor: ProjectColors.primary,
    width: 200,
    height: 200,
    borderRadius: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Poppins_Bold",
    top: 2,
  },
  upView: {
    flex: 1,
    backgroundColor: ProjectColors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  upviewInfo: {
    backgroundColor: ProjectColors.lightPrimary,
    padding: 20,
    width: "80%",
  },
  upviewInfoHourView: {
    justifyContent: "center",
    alignItems: "center",
  },
  upviewInfoTitle: {
    color: "white",
    fontSize: 15,
    fontFamily: "Poppins_Medium",
  },
  upviewInfoHourBalance: {
    color: ProjectColors.secondary,
    fontSize: 25,
    fontFamily: "Poppins_Bold",
  },
  upviewInfoHourInOutView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  clocksView: {
    flexDirection: "row",
  },
  clockInInfoView: {
    alignItems: "center",
  },
  clockOutInfoView: {
    alignItems: "center",
  },
  dailyDetailsClock: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_Medium",
    opacity: 0.75,
  },
  todayTitle: {
    color: "white",
    fontFamily: "Poppins_Medium",
    opacity: 0.75,
    fontSize: 13,
    textAlign: "center",
    marginTop: "10%",
  },
  clockInOutDetails: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_Medium",
  },

  downView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
  },
});
