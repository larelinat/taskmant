import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { Observable, of, tap } from 'rxjs';
import {
  Person,
  PersonCreateData,
  PersonUpdateData,
} from '../interfaces/person';
import { TimeoutValue } from '../interfaces/TimeoutValue';
import { TimeoutSet } from '../interfaces/TimeoutSet';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private url = 'http://localhost:3000/team';
  private isPersonsActual = new TimeoutValue(false, 10000);
  private isPersonActual = new TimeoutSet<number>(10000);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getAll(): Observable<Person[]> {
    const persons = this.localStorageService.getItem<Person[]>('persons');
    if (persons && this.isPersonsActual.get()) {
      return of(persons);
    } else {
      return this.http.get<Person[]>(this.url).pipe(
        tap(persons => {
          this.localStorageService.setItem('persons', persons);
          this.isPersonsActual.set(true);
        })
      );
    }
  }

  get(id: number): Observable<Person> {
    const person = this.localStorageService.getItem<Person>(`person-${id}`);
    if (person && this.isPersonActual.get().has(id)) {
      return of(person);
    } else {
      return this.http.get<Person>(`${this.url}/${id}`).pipe(
        tap(person => {
          this.localStorageService.setItem(`person-${id}`, person);
          this.isPersonActual.set(id);
        })
      );
    }
  }

  create(person: PersonCreateData): Observable<Person> {
    return this.http.post<Person>(this.url, person).pipe(
      tap(newPerson => {
        this.localStorageService.setItem(`person-${newPerson.id}`, newPerson);
        this.isPersonActual.set(newPerson.id);
        this.isPersonsActual.reset();
      })
    );
  }

  update(person: PersonUpdateData): Observable<Person> {
    return this.http.patch<Person>(`${this.url}/${person.id}`, person).pipe(
      tap(newPerson => {
        this.localStorageService.setItem(`person-${newPerson.id}`, newPerson);
        this.isPersonActual.set(newPerson.id);
        this.isPersonsActual.reset();
      })
    );
  }

  delete(id: number): Observable<Person> {
    return this.http.delete<Person>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.localStorageService.removeItem(`person-${id}`);
        this.isPersonActual.reset(id);
        this.isPersonsActual.reset();
        console.log(this.isPersonsActual.get());
      })
    );
  }
}
