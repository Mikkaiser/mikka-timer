import { AsyncStorageService } from "./AsyncStorage.service";
import { ClockInOutInterface } from "../interfaces/ClockInOut";

export class ClockInOutService {
  asyncStorageService = new AsyncStorageService();

  async getAll(): Promise<ClockInOutInterface[] | undefined> {
    return await this.asyncStorageService.getAllClocksInOnStorage();
  }

  async saveNew(clockInOutObject: ClockInOutInterface): Promise<void> {
    return await this.asyncStorageService.saveClockInOnStorage(
      clockInOutObject
    );
  }

  async deleteAll(): Promise<void> {
    return await this.asyncStorageService.clearStorage();
  }

  async getRegisterFromToday(): Promise<ClockInOutInterface | undefined> {
    const storedValues = await this.getAll();
    const currentDate = new Date();

    if (storedValues?.length) {
      const registerToday = storedValues.find(
        (item) => item.dateTimeIn?.toDateString() === currentDate.toDateString()
      );
      return registerToday;
    }
  }
}
