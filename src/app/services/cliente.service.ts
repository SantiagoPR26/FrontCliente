import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ClienteModel } from '../models/cliente.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private _url = environment.url;

  constructor(private http: HttpClient) {}

  getCliente(id: string) {
    return this.http.get<ClienteModel[]>(`${this._url}/search/${id}`);
  }

  getAllClientes(): Observable<ClienteModel[]>{
    return this.http.get<ClienteModel[]>(`${this._url}/searchAll`).pipe(map(res => res));
  }

  saveCliente(request: any): Observable<any> {
    return this.http.post<any>(`${this._url}/create`, request).pipe(map(res => res));
  } 

  editCliente(request: any): Observable<any> {
    return this.http.put<any>(`${this._url}/edit`, request).pipe(map(res => res));
  } 

  deleteCliente(request: any): Observable<any> {
    return this.http.put<any>(`${this._url}/changeStatus`, request).pipe(map(res => res));
  }
}
