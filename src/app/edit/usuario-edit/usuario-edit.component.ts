import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: usuario = new usuario()
  idUsuario: number
  confirmSenha: string
  TipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      // alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }



  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }

  tipoUser(event: any){
    this.TipoUsuario = event.target.value
  }


  atualizar(){
    this.usuario.tipo = this.TipoUsuario

    if(this.usuario.senha == this.confirmSenha){
      this.authService.atualizar(this.usuario).subscribe((resp: usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuario atualizado com sucesso, faça o login novamente')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
       })
      
    } else {
      alert('A senha digitada esta diferente')
    }
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: usuario) => {
      this.usuario = resp
    })
  }

}
