import { ClockInOutInterface } from "../interfaces/ClockInOut";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
    async saveClockInOnStorage(clockIn: ClockInOutInterface) {
        try {
            const jsonValue = JSON.stringify(clockIn);
            await AsyncStorage.setItem("@clockIn", jsonValue);
            console.log(await AsyncStorage.getItem("@clockIn"));
        } catch (error) {
            console.log(error);
        }
    }
}