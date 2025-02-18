import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget';
  private budgetData: any = null;  // Store the data locally

  constructor(private http: HttpClient) {}

  getBudget(): Observable<any> {
    if (this.budgetData) {
      // If budgetData is already populated, return it directly
      return of(this.budgetData);
    } else {
      // If budgetData is empty, make the API call
      return this.http.get<any>(this.apiUrl).pipe(
        catchError(error => {
          console.error('Error fetching budget data', error);
          return of([]); // Return empty array on error
        })
      );
    }
  }

  setBudgetData(data: any): void {
    
    this.budgetData = data;
  }
}
