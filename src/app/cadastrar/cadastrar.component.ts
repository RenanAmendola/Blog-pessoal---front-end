import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: usuario = new usuario

  confirmSenha: string
  TipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }

  tipoUser(event: any){
    this.TipoUsuario = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.TipoUsuario

    if(this.usuario.senha == this.confirmSenha){
      this.authService.cadastrar(this.usuario).subscribe((resp: usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuario criado com sucesso')
       })
      
    } else {
      alert('A senha digitada esta diferente')
    }
  }

}
