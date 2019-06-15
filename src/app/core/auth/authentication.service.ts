import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/shared/models/user.model';
import { environment } from '@env/environment';
import { mergeMap, map } from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

const API_USERS_URL = 'api/users';

@Injectable()
export class AuthenticationService {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  currentUser = new BehaviorSubject<User>(new User());

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private http: HttpClient, private adalService: MsAdalAngular6Service) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  login() {
    this.adalService.acquireToken('<RESOURCE>').pipe(
      map((resToken: string) => {
        // manipulate token (e.g save to local storage)
        console.log(resToken);

        this.getUserByUsername(this.adalService.userInfo.userName).subscribe(
          (user) => {
            this.currentUser.next(user);
          }
        );
      })
    ).subscribe();
  }

  logout() {
    this.adalService.logout();
  }

  getUserByUsername(username: string): Observable<User> {
    return environment.isMockEnabled ? this.getFakeUserByUsername(username) : this.getRealUserByUsername(username);
  }

  getFakeUserByUsername(username: string): Observable<User> {
    return this.http.get<User[]>(API_USERS_URL).pipe(
      mergeMap(users => {
        let result = null;
        users.forEach(user => {
          if (user.username === username) {
            result = user;
          }
        });

        return of(result);
      })
    );
  }
  getRealUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(API_USERS_URL + `/?username=${username}`);
  }
}
