import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

export class AuthService {

  constructor(private http: HttpClient) { }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>('/admin');
  }
}
