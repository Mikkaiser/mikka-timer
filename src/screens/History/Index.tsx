import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProjectColors from "../../utils/Constants";
import { ClockInOutInterface } from "../../interfaces/ClockInOut";
import React, { useEffect, useState } from "react";
import { ClockInOutService } from "../../services/ClockInOut.service";
import { format } from "date-fns";

export default function History() {

    const [clocksList, setClocksList] = useState<ClockInOutInterface[]>([]);

    let clockInOutService = new ClockInOutService();

    useEffect(() => {
      async function getClocks() {
        const storedValues = await clockInOutService.getAll();
        setClocksList(storedValues);
      }
      getClocks();
    }, [clocksList]);

    return (
      <View style={style.container}>
        <LinearGradient
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: -3 }}
          colors={[ProjectColors.primary, ProjectColors.auxiliar]}
          style={style.header}
        >
          <View style={style.limiterSpace}></View>
          <View style={style.headerContent}>
            <Text style={style.headerText}>History</Text>
          </View>
        </LinearGradient>
        <View style={style.contentContainer}>
          <FlatList
            data={clocksList}
            renderItem={({ item }) => (
              <View style={style.listViewItem}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require("../../../assets/clock.png")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View style={{ flex: 4, paddingVertical: 15 }}>
                  <Text>{`Date: ${format(item.dateTimeIn!, 'yyyy-MM-dd')}`}</Text>
                  {/* TODO: add condition to verify IF  CLOCK OUT WAS NOT FILLED YET */}
                  <Text>{`Time: ${format(item.dateTimeOut!, 'hh:mm a')}`}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: ProjectColors.auxiliar,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins_Bold",
                      fontSize: 20,
                    }}
                  >
                    8h
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
}

const style = StyleSheet.create({
  header: {
    width: "100%",
    flex: 2,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  limiterSpace: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins_Bold",
    alignSelf: "center",
  },
  contentContainer: {
    flex: 10,
    borderColor: "#000",
    borderWidth: 1,
    width: "90%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listViewItem: {
    borderColor: "red",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
});