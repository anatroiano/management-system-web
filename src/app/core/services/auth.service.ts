import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../shared/models/auth-response.model';
import {environment} from '../../../enviroments/enviroment';
import {noErrorToastContext} from '../context/http-context';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.baseUrl}/login`,
      {email, password},
      {context: noErrorToastContext()}
    );
  }
}
