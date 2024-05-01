import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordCheckService {
  private badWords: Set<string> = new Set();

  constructor(private http: HttpClient) {
    this.loadBadWords();
  }

  private loadBadWords() {
    this.http.get<string[]>('assets/data/words.json').subscribe((words: string[]) => {
      this.badWords = new Set(words);
    });
  }

  containsBadWords(text: string): boolean {
    text = text.toLowerCase();
    for (const badWord of this.badWords) {
      const pattern = new RegExp('\\b' + badWord + '\\b');
      if (pattern.test(text)) {
        return true;
      }
    }
    return false;
  }
}
