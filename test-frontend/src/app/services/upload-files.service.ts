import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  constructor(private http: HttpClient) { }

  upload(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}