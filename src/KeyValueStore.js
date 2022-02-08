// Simulates delay
const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const labels = [
  "Get milk",
  "Clean room",
  "Do push-ups",
  "Mow lawn",
  "Hire assistant"
];
const randomLabel = () => labels[Math.floor(Math.random() * labels.length)];

// Key value database
class KeyValueStore {
  data = {
    todos: Array(3)
      .fill()
      .map((_, id) => ({ id, label: randomLabel() }))
  };
  observers = [];

  // Read the value at some key
  async read(key) {
    await delay(1000);
    return this.data[key];
  }

  // Update the value at some key
  async update(key, v) {
    await delay(1000);
    this.data[key] = typeof v === "function" ? v(this.data[key]) : v;
    this.observers
      .filter((observer) => observer.key === key)
      .forEach((observer) => observer.onNext(this.data[key]));
    return this.data[key];
  }

  // Register an observer for some key
  onUpdate(key, onNext) {
    const observer = { key, onNext };
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter((other) => other !== observer);
    };
  }
}

const kvStore = new KeyValueStore();

// Simulate another person adding a todo to the db every 5 seconds
setInterval(() => {
  kvStore.update("todos", (todos) => {
    const id = Math.max(0, ...todos.map((todo) => todo.id)) + 1;
    return todos.length < 10
      ? todos.concat({ id, label: randomLabel() })
      : todos;
  });
}, 5000);

export default kvStore;
