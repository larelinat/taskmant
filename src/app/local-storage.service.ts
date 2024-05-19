import { Injectable } from '@angular/core';
import { TimeoutSet } from './interfaces/TimeoutSet';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private temporaryKeys = new TimeoutSet<string>(10000);

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  setItemExp<T>(key: string, value: T): void {
    this.temporaryKeys.reset(key);
    localStorage.setItem(key, JSON.stringify(value));
    this.temporaryKeys.set(key);
  }

  getItemExp<T>(key: string): T | null {
    if (this.temporaryKeys.get().has(key)) {
      const item = localStorage.getItem(key);
      if (!item) {
        this.temporaryKeys.reset(key);
        return null;
      }
      return JSON.parse(item);
    } else {
      localStorage.removeItem(key);
    }
    return null;
  }

  removeItemExp(key: string): void {
    this.temporaryKeys.reset(key);
    localStorage.removeItem(key);
  }
}
