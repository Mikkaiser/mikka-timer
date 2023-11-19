import { ClockInOutInterface } from "../interfaces/ClockInOut";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
  async saveClockInOnStorage(clockIn: ClockInOutInterface) {
    try {
      const jsonValue = JSON.stringify([clockIn]);
      await AsyncStorage.setItem("@clockInOut", jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllClocksInOnStorage() {
    try {
      const value = await AsyncStorage.getItem("@clockInOut");
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}
