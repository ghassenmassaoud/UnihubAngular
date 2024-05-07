import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly FAVORITE_ACTIONS_KEY = 'favoriteActions';


  constructor() {
  }

  saveFavoriteActions(actions: any[]): void {
    localStorage.setItem(this.FAVORITE_ACTIONS_KEY, JSON.stringify(actions));
  }

  getFavoriteActions(): any[] {
    const actionsJson = localStorage.getItem(this.FAVORITE_ACTIONS_KEY);
    return actionsJson ? JSON.parse(actionsJson) : [];
  }}