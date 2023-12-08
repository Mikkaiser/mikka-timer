import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ClockInOutInterface } from "../../../interfaces/ClockInOut";
import ProjectColors from "../../../utils/Constants";
import { useEffect, useState } from "react";
import { ClockInOutService } from "../../../services/ClockInOut.service";
import { format } from "date-fns";

export default function Dashboard() {

  const [clocks, setClocks] = useState<ClockInOutInterface[]>([]);
  const [clockInToday, setClockInToday] = useState<Date>();
  const [clockOutToday, setClockOutToday] = useState<Date>();
  const [totalExtraHours, setTotalExtraHours] = useState<number>(0);
  
  let clockInOutService = new ClockInOutService();

  useEffect(() => {
    async function getClocks() {
      const storedValues = await clockInOutService.getAll();
      setClocks(storedValues);
    }

    async function getTotalExtraHours() {
      const totalExtraHours = await clockInOutService.getTotalExtraHours();
      setTotalExtraHours(totalExtraHours);
    }


    getClocks();
    getTotalExtraHours();
  }, [])

  useEffect(() => {

    async function getRegisterToday() {
      const registerToday = await clockInOutService.getRegisterFromToday();
      if (registerToday) {
        setClockInToday(registerToday.dateTimeIn!);

        const clockOutTodayIsValid = !isNaN(registerToday.dateTimeOut!.valueOf() as number);
        if (clockOutTodayIsValid) setClockOutToday(registerToday.dateTimeOut!);
      }
    }

    getRegisterToday();
  }, [clocks]);

  const handleClockIn = async () => {
    const registerToday = await clockInOutService.getRegisterFromToday();
    const storedValues = await clockInOutService.getAll();
    let updatedValues: ClockInOutInterface[] = [];

    let clockInOutObject: ClockInOutInterface;

    if(registerToday) {
      clockInOutObject = {
        ...registerToday,
        dateTimeOut: new Date(),
      };

      await clockInOutService.update(
        clockInOutObject
      );

      updatedValues = await clockInOutService.getAll();
    }
    else {
      clockInOutObject = {
        id: storedValues?.length ? storedValues.length + 1 : 1,
        dateTimeIn: new Date(),
      };

      await clockInOutService.saveNew(
        clockInOutObject
      );

      updatedValues = await clockInOutService.getAll();
    }
    
    setClocks(updatedValues);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.upView}>
        <View style={styles.upviewInfo}>
          <View style={styles.upviewInfoHourView}>
            <Text style={styles.upviewInfoTitle}>Total hours balance</Text>
            <Text style={styles.upviewInfoHourBalance}>
              {totalExtraHours > 1
                ? `Credit: ${totalExtraHours} hours`
                : `Credit: ${totalExtraHours} hour`}
            </Text>
          </View>
          <Text style={styles.todayTitle}>Today</Text>
          <View style={styles.upviewInfoHourInOutView}>
            <View style={styles.clockInInfoView}>
              <Text style={styles.dailyDetailsClock}>Clock In</Text>
              <Text style={styles.clockInOutDetails}>
                {!isNaN(clockInToday?.valueOf() as number)
                  ? format(clockInToday!, "HH:mm a")
                  : "--"}
              </Text>
            </View>
            <View style={styles.clockOutInfoView}>
              <Text style={styles.dailyDetailsClock}>Clock Out</Text>
              <Text style={styles.clockInOutDetails}>
                {!isNaN(clockOutToday?.valueOf() as number)
                  ? format(clockOutToday!, "HH:mm a")
                  : "--"}
              </Text>
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
    fontSize: 14,
    fontFamily: "Poppins_Medium",
    opacity: 0.75,
  },
  todayTitle: {
    color: "white",
    fontFamily: "Poppins_Medium",
    opacity: 0.75,
    fontSize: 14,
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
