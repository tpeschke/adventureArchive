import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import local from '../local';

import { ToastrService } from 'ngx-toastr';

class Adventure {
  id: number
  title: string
  summary: string[]
  cover: string
  patreonTier: number
}

@Injectable({
  providedIn: 'root'
})

export class AdventureService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 200) {
        this.toastr.success('', `${error.error.text}`);
      } else if (error.status === 403) {
        this.toastr.warning('', `${error.error}`)
      } else if (error.status === 401) {
        this.toastr.error('', `${error.error}`);
      }
      return of(result as T)
    }
  }

  getAllAdventures(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(local.endpointBase + '/api/AllAdventures')
      .pipe(
        tap(),
        catchError(this.handleError('get all adventures', []))
      )
  }

  getFeaturedAdventure(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(local.endpointBase + '/api/FeaturedAdventure')
      .pipe(
        tap(),
        catchError(this.handleError('get featured', []))
      )
  }

  getSingleAdventure(id): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(local.endpointBase + '/api/SingleAdventure/' + id)
      .pipe(
        tap(),
        catchError(this.handleError('get single adventure', []))
      )
  }

  addAdventure(adventure): any {
    return this.http.post(local.endpointBase + '/api/adventure', adventure)
      .pipe(
        // catchError(this.handleError('search', []))
      )
  }

  searchAdventures(queries): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(local.endpointBase + '/api/search', { params: queries })
      .pipe(
        tap(),
        catchError(this.handleError('get search adventures', []))
      )
  }

  imageUpload(imageForm: FormData, id: number) {
    this.toastr.warning('', `image uploading`)
    return this.http.post(local.endpointBase + '/api/uploadImage/' + id, imageForm);
  }

  pdfUpload(imageForm: FormData, title: string) {
    this.toastr.warning('', `pdf uploading`)
    return this.http.post(local.endpointBase + '/api/uploadPDF/' + title, imageForm);
  }
}