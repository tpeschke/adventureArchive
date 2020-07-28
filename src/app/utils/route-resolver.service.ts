import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdventureService } from './adventure.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  constructor(
    private adventureService: AdventureService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = +route.paramMap.get('id');
    console.log(id)
    if (id) {
      return this.adventureService.getSingleAdventure(id)
        .pipe(
          tap(_ => {
            var scrollToTop = window.setInterval(function () {
              var pos = window.pageYOffset;
              if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
              } else {
                window.clearInterval(scrollToTop);
              }
            }, 0);
          }),
          catchError(this.adventureService.handleError('get single adventure', [])
          ));
    } else {
      return null
    }
  }
}
