import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../shared/models/auth-response.model';
import {environment} from '../../../environments/environment';
import {noErrorToastContext} from '../context/http-context';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private readonly API = `${environment.baseUrl}/auth`;

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${(this.API)}/login`,
      {email, password},
      {context: noErrorToastContext()}
    );
  }
}
