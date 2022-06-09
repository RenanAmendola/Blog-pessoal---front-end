import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { usuario } from '../model/usuario';
import { usuarioLogin } from '../model/usuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient

  ) { }

entrar(usuariorLogin: usuarioLogin): Observable<usuarioLogin>{
  return this.http.post<usuarioLogin>('https://bprenan.herokuapp.com/usuarios/logar', usuariorLogin)
}

cadastrar(usuario: usuario): Observable<usuario>{
  return this.http.post<usuario>('https://bprenan.herokuapp.com/usuarios/cadastrar', usuario)
}

atualizar(usuario: usuario){
  return this.http.put<usuario>('https://bprenan.herokuapp.com/usuarios/atualizar', usuario, this.token)
}

getByIdUsuario(id: number): Observable<usuario>{
  return this.http.get<usuario>(`https://bprenan.herokuapp.com/usuarios/${id}`, this.token)
}

token = {
  headers: new HttpHeaders().set('Authorization', environment.token),
};

refreshToken() {
  this.token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };
}


logado(){
  let ok: boolean = false

  if(environment.token != ''){
    ok = true
  }

  return ok
}



}
