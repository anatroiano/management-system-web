import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface NavbarConfig {
  title: string;
  icon: string;
  showFilter?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navbarConfig = new BehaviorSubject<NavbarConfig>({
    title: 'Dashboard',
    icon: 'dashboard',
    showFilter: false
  });

  navbarConfig$ = this.navbarConfig.asObservable();

  setConfig(config: NavbarConfig): void {
    this.navbarConfig.next(config);
  }
}
