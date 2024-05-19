import { Injectable } from '@angular/core';
import { Person } from '../interfaces/person';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/team';
  private user: Person | null = null;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  get userName(): string {
    return this.user ? this.user.name : '';
  }

  login(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`).pipe(
      tap(person => {
        this.user = person;
        this.localStorageService.setItem<Person>('user', person);
      })
    );
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  logout(): void {
    this.user = null;
    this.localStorageService.removeItem('user');
  }

  isLoggedIn(): boolean {
    if (!this.user) {
      this.user = this.localStorageService.getItem<Person>('user');
    }
    return this.user !== null;
  }
}
