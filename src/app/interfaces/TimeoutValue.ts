export class TimeoutValue<T> {
  private value: T;
  private defaultValue: T;
  private timeoutId: NodeJS.Timeout | null = null;
  private timeout: number;

  constructor(defaultValue: T, timeout: number) {
    this.value = defaultValue;
    this.defaultValue = defaultValue;
    this.timeout = timeout;
  }

  set(val: T) {
    this.clearTimeout();
    this.value = val;
    this.timeoutId = setTimeout(() => this.reset(), this.timeout);
  }

  get() {
    return this.value;
  }

  reset() {
    this.value = this.defaultValue;
    this.clearTimeout();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
