import LocalStorageService from 'utils/localStorageService';

export class DataStorageController {
  storageService = LocalStorageService;

  key;

  constructor(key, storageService = LocalStorageService) {
    if (!key) throw Error('key is undefined');

    this.storageService = storageService;
    this.key = key;
  }

  getData() {
    return this.storageService.getItem(this.key);
  }

  getItem(key) {
    const data = this.getData();

    if (data) return data[key];
    return null;
  }

  setData(value) {
    this.storageService.setItem(this.key, value);
  }

  removeData() {
    this.storageService.removeItem(this.key);
  }

  updateData(value) {
    this.storageService.updateItem(this.key, value);
  }
}
