import kvStore from "KeyValueStore";
import ObservableResource from "./ObservableResource";

export default class KeyValueStoreResource extends ObservableResource {
  constructor(key) {
    super(kvStore.read(key));
    this.key = key;
    kvStore.onUpdate(key, (data) => this.onNext(data));
  }

  async update(value) {
    try {
      this.onNext(await kvStore.update(this.key, value));
    } catch (error) {
      this.onError(error);
    }
  }
}
