import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { usuario } from '../model/usuario';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: postagem = new postagem()
  
  tema: tema = new tema()
  listaTemas: tema[]
  idTema: number

  usuario: usuario = new usuario()
  idUsuario = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit(){

      if(environment.token == ''){
        // alert('Sua seção expirou, faça o login novamente')
        this.router.navigate(['/entrar'])
      }

      this.getAllTemas()
  }


  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp
    })

  }
 
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: tema) => {
      this.tema = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new postagem()
    })

  }


}
