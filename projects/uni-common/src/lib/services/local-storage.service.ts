import { Injectable } from "@angular/core";

import { UniWindowRefService } from "./window-ref.service";


@Injectable({providedIn: 'root'})
export class UniLocalStorageService {

  private window: Window;

  constructor(private windowRef: UniWindowRefService) {
    this.window = windowRef.nativeWindow;
  }

  getItem(key: string): unknown {
    return JSON.parse(JSON.stringify(this.window.localStorage.getItem(key)));
  }

  setItem(key: string, data: unknown): void {
    this.window.localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string): void {
    this.window.localStorage.removeItem(key);
  }
}
