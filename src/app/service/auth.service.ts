import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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



}
