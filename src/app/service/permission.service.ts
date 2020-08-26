import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Permission } from '../class/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    public globals: Globals,
    private http: HttpClient
  ) { }

  getPermissions(): Observable<Permission[]> {
    const url = this.globals.apiUrl + '/permissions';
    return this.http.get<Permission[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError('Unknown error' + error.error.message);
    }
    if (!error.status) return throwError(`Server connexion error : ${error.statusText}`);
    if (error.status == 400)
      return throwError(`${error.error.msg} because ${error.error.errors}`);
    return throwError(`${error.error.msg}`);
  }

}