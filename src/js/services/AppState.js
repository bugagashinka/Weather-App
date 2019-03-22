class AppState {
  constructor() {
    this.watchers = {};
  }

  watch(entity, watcher) {
    this.watchers[entity]
      ? this.watchers[entity].push(watcher)
      : (this.watchers[entity] = [watcher]);
  }

  update(entity, newValue) {
    this.watchers[entity] &&
      this.watchers[entity].forEach(watcher => watcher(newValue));
  }
}
export default new AppState();
