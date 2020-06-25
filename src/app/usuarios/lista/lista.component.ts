import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { UsuariosState } from '../../store/reducers/usuarios.reducer';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  constructor(
    // public usuarioService: UsuarioService
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.usuarioService.getUsers().subscribe(users => {
    //   this.usuarios = users;
    // });
    this.store.select('usuarios').subscribe((usuarios: UsuariosState) => {
      this.usuarios = usuarios.users;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });
    this.store.dispatch(cargarUsuarios());
  }

}
