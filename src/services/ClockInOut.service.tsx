import { AsyncStorageService } from "./AsyncStorage.service";
import { ClockInOutInterface } from "../interfaces/ClockInOut";

export class ClockInOutService {
  asyncStorageService = new AsyncStorageService();

  async getAll(): Promise<ClockInOutInterface[]> {
    const storedValues = await this.asyncStorageService.getAllClocksInOnStorage();
    storedValues?.map((item: ClockInOutInterface) => {
      item.dateTimeIn = new Date(item.dateTimeIn as Date);
      item.dateTimeOut = new Date(item.dateTimeOut as Date);

      return item;
    });

    return storedValues as ClockInOutInterface[];
  }

  async saveNew(clockInOutObject: ClockInOutInterface): Promise<void> {
    return await this.asyncStorageService.saveClockInOnStorage(
      clockInOutObject
    );
  }

  async deleteAll(): Promise<void> {
    return await this.asyncStorageService.clearStorage();
  }

  async update(clockInOutObject: ClockInOutInterface): Promise<void> {
    try {
      const storedValues = await this.getAll();
  
      const updatedValues = storedValues?.map((item: ClockInOutInterface) => {
        if (item.id === clockInOutObject.id) {
          return clockInOutObject;
        }
        return item;
      });
  
      if (updatedValues) {
        await this.asyncStorageService.updateClockInOnStorageList(updatedValues);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  async getRegisterFromToday(): Promise<ClockInOutInterface | undefined> {
    const storedValues = await this.getAll();
    const currentDate = new Date();

    if (storedValues) {
      const registerToday = storedValues.find(
        (item: ClockInOutInterface) => {
          return item.dateTimeIn?.toDateString() === currentDate.toDateString()
        }
      );
      return registerToday;
    }
  }
}
