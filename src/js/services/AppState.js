class AppState {
  constructor() {
    this.watchers = {};
  }

  watch(entity, watcher) {
    this.watchers[entity]
      ? this.watchers[entity].add(watcher)
      : (this.watchers[entity] = new Set([watcher]));
  }

  unwatch(entity, watcher) {
    if (this.watchers[entity]) {
      this.watchers[entity].delete(watcher);
    }
  }

  update(entity, newValue) {
    this.watchers[entity] &&
      this.watchers[entity].forEach((watcher) => watcher(newValue));
  }
}

export default new AppState();
