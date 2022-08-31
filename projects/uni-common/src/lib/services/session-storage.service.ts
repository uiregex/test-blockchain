import { Injectable } from "@angular/core";

import { UniWindowRefService } from "./window-ref.service";


@Injectable({providedIn: 'root'})
export class UniSessionStorageService {

  private readonly window: Window;

  constructor(private windowRef: UniWindowRefService) {
    this.window = windowRef.nativeWindow;
  }

  getItem(key: string): unknown {
    return JSON.parse(JSON.stringify(this.window.sessionStorage.getItem(key)));
  }

  setItem(key: string, data: unknown): void {
    this.window.sessionStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string): void {
    this.window.sessionStorage.removeItem(key);
  }
}
