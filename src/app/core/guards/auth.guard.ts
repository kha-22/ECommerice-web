import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { AccountService } from 'src/app/account/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accService: AccountService, private router: Router)
  {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
      return this.accService.currentUser$.pipe(
        map(auth => {
          if(auth){
            return true;
          }
          this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
        })
      );
    }
  
}
