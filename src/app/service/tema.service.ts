import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

getAllTema(): Observable<tema[]>{
  return this.http.get<tema[]>('https://bprenan.herokuapp.com/temas', this.token)
}

postTema(tema: tema): Observable<tema>{
  return this.http.post<tema>('https://bprenan.herokuapp.com/temas', tema, this.token)
}

}
