import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  contries: string = "contries";
  constructor() { }

  setCacheCounties(countriesData: any) {
    localStorage.setItem(this.contries, JSON.stringify(countriesData));
  }


  getCacheCounties() {
    return JSON.parse(localStorage.getItem(this.contries) as string) || null;
  }


}
