interface TimeoutIds<T> {
  value: T;
  timeoutId: NodeJS.Timeout | null;
}

export class TimeoutSet<T> {
  private value: Set<T>;
  private timeoutIds: TimeoutIds<T>[] = [];
  private timeout: number;

  constructor(timeout: number) {
    this.value = new Set<T>();
    this.timeout = timeout;
  }

  set(val: T) {
    this.reset(val);
    this.value.add(val);
    const timeoutId = setTimeout(() => this.reset(val), this.timeout);
    this.timeoutIds.push({ value: val, timeoutId });
  }

  get() {
    return this.value;
  }

  reset(val: T) {
    const index = this.timeoutIds.findIndex(item => item.value === val);
    if (index !== -1) {
      this.clearTimeout(this.timeoutIds[index].timeoutId);
      this.timeoutIds.splice(index, 1);
      this.value.delete(val);
    }
  }

  private clearTimeout(id: NodeJS.Timeout | null) {
    if (id) {
      clearTimeout(id);
    }
  }
}
