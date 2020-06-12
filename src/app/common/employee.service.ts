import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  addEmp(formdta) {
    return this.http.post(`${this.baseUrl}/empRouter/addemp`, formdta).pipe(
      catchError(this.handleError)
    );
  }

  allEmp() {
    return this.http.get(`${this.baseUrl}/empRouter/getallEmp`).pipe(
      catchError(this.handleError)
    );
  }
   // throw error to component
   handleError(error) {
    return throwError(error);
  }
}
