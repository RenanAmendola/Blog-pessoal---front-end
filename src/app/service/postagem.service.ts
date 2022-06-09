import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


getAllPostagens(): Observable<postagem[]>{
  return this.http.get<postagem[]>('https://bprenan.herokuapp.com/Postagens', this.token)
}

getByIdPostagem(id: number): Observable<postagem>{
  return this.http.get<postagem>(`https://bprenan.herokuapp.com/Postagens/${id}`, this.token)
}

postPostagem(postagem: postagem): Observable<postagem>{
  return this.http.post<postagem>('https://bprenan.herokuapp.com/Postagens', postagem, this.token)
}

putPostagem(postagem: postagem): Observable<postagem>{
  return this.http.put<postagem>('https://bprenan.herokuapp.com/Postagens', postagem, this.token)
}


deletePostagem(id: number){
  return this.http.delete(`https://bprenan.herokuapp.com/Postagens/${id}`, this.token)
}




}
