import { ClockInOutInterface } from "../interfaces/ClockInOut";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
  async saveClockInOnStorage(clockInOutObject: ClockInOutInterface) {
    try {
      const storedValues = await this.getAllClocksInOnStorage();
      const jsonValue = JSON.stringify([...storedValues!, clockInOutObject]);
      await AsyncStorage.setItem("@clockInOut", jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllClocksInOnStorage(): Promise<ClockInOutInterface[] | undefined> {
    try {
      const value = await AsyncStorage.getItem("@clockInOut");
      const items = JSON.parse(value || "[]") as ClockInOutInterface[];
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem("@clockInOut", '[]');
    } catch (error) {
      console.log(error);
    }
  }
}
